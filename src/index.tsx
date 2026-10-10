import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { getPurchaseEmailHTML } from './email-template'

// Type definitions for Cloudflare bindings
type Bindings = {
  DB: D1Database;
  RESEND_API_KEY: string;
  BREVO_API_KEY?: string; // Optional - for India-friendly email sending
  PHONEPE_MERCHANT_ID: string; // SU2510071650126008106308 - OAuth Client ID
  PHONEPE_API_KEY: string; // Client Secret
  PHONEPE_SALT_INDEX: string; // Client Version
  TEST_MODE?: string; // Optional - for ₹10 test payments
}

const app = new Hono<{ Bindings: Bindings }>()

// =============================================
// API ROUTES - DEFINED FIRST FOR PRIORITY
// =============================================

// Enable CORS for all API routes
app.use('/api/*', cors())

// Simple test endpoint (for debugging)
app.get('/api/test', (c) => {
  console.log('🔥 API TEST ENDPOINT HIT! 🔥');
  console.log('Request path:', c.req.path);
  console.log('Request method:', c.req.method);
  
  const response = { 
    success: true, 
    message: 'API is working perfectly!',
    timestamp: new Date().toISOString(),
    path: c.req.path,
    method: c.req.method
  };
  
  console.log('Returning JSON:', response);
  return c.json(response);
})

// Test email endpoint - Send test purchase email
app.post('/api/test-email', async (c) => {
  try {
    const { env } = c;
    const body = await c.req.json();
    const { email, name, amount, paymentId } = body;
    
    console.log('📧 Test email requested for:', email);
    
    // Send test email
    const result = await sendPurchaseEmail(
      email || 'test@example.com',
      name || 'Test User',
      amount || 799,
      paymentId || 'TEST_' + Date.now(),
      env
    );
    
    return c.json({
      success: true,
      message: 'Test email sent successfully!',
      result: result
    });
  } catch (error) {
    console.error('❌ Test email failed:', error);
    return c.json({
      success: false,
      error: error.message,
      details: error.toString()
    }, 500);
  }
})

// =============================================
// ADMIN DASHBOARD API ROUTES
// =============================================

// Get dashboard analytics
app.get('/api/admin/analytics', async (c) => {
  try {
    const { env } = c;
    
    // Get basic counts
    const totalUsers = await env.DB.prepare('SELECT COUNT(*) as count FROM users').first();
    const totalAssessments = await env.DB.prepare('SELECT COUNT(*) as count FROM assessments').first();
    const totalPurchases = await env.DB.prepare('SELECT COUNT(*) as count FROM purchases WHERE payment_status = "completed"').first();
    const totalRevenue = await env.DB.prepare('SELECT SUM(amount_paid) as total FROM purchases WHERE payment_status = "completed"').first();
    
    // Get recent activity (last 30 days)
    const recentUsers = await env.DB.prepare(`
      SELECT COUNT(*) as count FROM users 
      WHERE created_at >= datetime('now', '-30 days')
    `).first();
    
    const recentAssessments = await env.DB.prepare(`
      SELECT COUNT(*) as count FROM assessments 
      WHERE completed_at >= datetime('now', '-30 days')
    `).first();
    
    const recentPurchases = await env.DB.prepare(`
      SELECT COUNT(*) as count FROM purchases 
      WHERE purchased_at >= datetime('now', '-30 days')
      AND payment_status = 'completed'
    `).first();
    
    // Get top pages
    const topPages = await env.DB.prepare(`
      SELECT page_url, COUNT(*) as views 
      FROM page_views 
      WHERE viewed_at >= datetime('now', '-7 days')
      GROUP BY page_url 
      ORDER BY views DESC 
      LIMIT 10
    `).all();
    
    return c.json({
      success: true,
      analytics: {
        totals: {
          users: totalUsers?.count || 0,
          assessments: totalAssessments?.count || 0,
          purchases: totalPurchases?.count || 0,
          revenue: totalRevenue?.total || 0
        },
        recent_30_days: {
          new_users: recentUsers?.count || 0,
          assessments: recentAssessments?.count || 0,
          purchases: recentPurchases?.count || 0
        },
        top_pages: topPages?.results || []
      }
    });
  } catch (error) {
    console.error('❌ Error fetching analytics:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Get all users with their data
app.get('/api/admin/users', async (c) => {
  try {
    const { env } = c;
    
    const users = await env.DB.prepare(`
      SELECT DISTINCT
        u.id,
        u.name,
        u.email,
        u.phone,
        u.source,
        u.created_at,
        (
          SELECT relationship_health_score 
          FROM assessments 
          WHERE user_id = u.id 
          ORDER BY completed_at DESC 
          LIMIT 1
        ) as relationship_health_score,
        (
          SELECT completed_at 
          FROM assessments 
          WHERE user_id = u.id 
          ORDER BY completed_at DESC 
          LIMIT 1
        ) as assessment_date,
        (
          SELECT SUM(amount_paid) 
          FROM purchases 
          WHERE user_id = u.id 
          AND payment_status = 'completed'
        ) as amount_paid,
        (
          SELECT payment_status 
          FROM purchases 
          WHERE user_id = u.id 
          ORDER BY purchased_at DESC 
          LIMIT 1
        ) as payment_status,
        (
          SELECT purchased_at 
          FROM purchases 
          WHERE user_id = u.id 
          ORDER BY purchased_at DESC 
          LIMIT 1
        ) as purchased_at
      FROM users u
      ORDER BY u.created_at DESC
    `).all();
    
    return c.json({
      success: true,
      users: users?.results || []
    });
  } catch (error) {
    console.error('❌ Error fetching users:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Get assessment results
app.get('/api/admin/assessments', async (c) => {
  try {
    const { env } = c;
    
    const assessments = await env.DB.prepare(`
      SELECT a.* 
      FROM assessments a
      INNER JOIN (
        SELECT email, MAX(completed_at) as latest_date
        FROM assessments
        GROUP BY email
      ) latest ON a.email = latest.email AND a.completed_at = latest.latest_date
      ORDER BY a.completed_at DESC 
      LIMIT 100
    `).all();
    
    return c.json({
      success: true,
      assessments: assessments?.results || []
    });
  } catch (error) {
    console.error('❌ Error fetching assessments:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Get purchase history
app.get('/api/admin/purchases', async (c) => {
  try {
    const { env } = c;
    
    const purchases = await env.DB.prepare(`
      SELECT * FROM purchases 
      ORDER BY purchased_at DESC 
      LIMIT 100
    `).all();
    
    return c.json({
      success: true,
      purchases: purchases?.results || []
    });
  } catch (error) {
    console.error('❌ Error fetching purchases:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// =============================================
// DATA COLLECTION API ROUTES
// =============================================

// Track page views and analytics
app.post('/api/track/pageview', async (c) => {
  try {
    const { env } = c;
    const body = await c.req.json();
    
    const { 
      page_url, 
      page_title, 
      referrer, 
      session_id,
      time_on_page,
      utm_source,
      utm_medium, 
      utm_campaign,
      utm_content,
      utm_term
    } = body;
    
    // Get user details from request
    const ip_address = c.req.header('cf-connecting-ip') || c.req.header('x-forwarded-for') || 'unknown';
    const user_agent = c.req.header('user-agent') || '';
    const country = c.req.header('cf-ipcountry') || 'unknown';
    
    // Determine device type
    const device_type = user_agent.includes('Mobile') ? 'mobile' : 
                       user_agent.includes('Tablet') ? 'tablet' : 'desktop';
    
    // Insert page view
    const result = await env.DB.prepare(`
      INSERT INTO page_views 
      (page_url, page_title, referrer, session_id, ip_address, user_agent, country, 
       device_type, time_on_page, utm_source, utm_medium, utm_campaign, utm_content, utm_term)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      page_url || '', 
      page_title || '', 
      referrer || '', 
      session_id || '', 
      ip_address, 
      user_agent, 
      country, 
      device_type, 
      time_on_page || 0, 
      utm_source || null, 
      utm_medium || null, 
      utm_campaign || null, 
      utm_content || null, 
      utm_term || null
    ).run();
    
    console.log('📊 Page view tracked:', { page_url, ip_address, device_type });
    
    return c.json({ success: true, id: result.meta.last_row_id });
  } catch (error) {
    console.error('❌ Error tracking page view:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Store assessment results
app.post('/api/assessments', async (c) => {
  try {
    const { env } = c;
    const body = await c.req.json();
    
    const {
      name,
      email, 
      phone = null,
      relationship_health_score,
      communication_score = null,
      trust_score = null,
      emotional_connection_score = null,
      conflict_resolution_score = null,
      total_questions = 20
    } = body;
    
    const ip_address = c.req.header('cf-connecting-ip') || c.req.header('x-forwarded-for') || 'unknown';
    const user_agent = c.req.header('user-agent') || '';
    
    // First, create or get user
    let user_id;
    const existingUser = await env.DB.prepare(
      'SELECT id FROM users WHERE email = ?'
    ).bind(email).first();
    
    if (existingUser) {
      user_id = existingUser.id;
      // Update user info
      await env.DB.prepare(`
        UPDATE users SET name = ?, phone = ?, updated_at = CURRENT_TIMESTAMP 
        WHERE id = ?
      `).bind(name, phone, user_id).run();
    } else {
      // Create new user
      const userResult = await env.DB.prepare(`
        INSERT INTO users (name, email, phone, source) 
        VALUES (?, ?, ?, 'survey')
      `).bind(name, email, phone).run();
      user_id = userResult.meta.last_row_id;
    }
    
    // Store assessment result
    const assessmentResult = await env.DB.prepare(`
      INSERT INTO assessments 
      (user_id, name, email, phone, relationship_health_score, communication_score, 
       trust_score, emotional_connection_score, conflict_resolution_score, 
       total_questions, ip_address, user_agent)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      user_id, name, email, phone, relationship_health_score, communication_score,
      trust_score, emotional_connection_score, conflict_resolution_score,
      total_questions, ip_address, user_agent
    ).run();
    
    console.log('✅ Assessment stored:', { name, email, relationship_health_score });
    
    return c.json({ 
      success: true, 
      assessment_id: assessmentResult.meta.last_row_id,
      user_id: user_id,
      score: relationship_health_score
    });
  } catch (error) {
    console.error('❌ Error storing assessment:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Create PhonePe payment order (OAuth2 V2 Checkout API)
app.post('/api/phonepe/create-order', async (c) => {
  try {
    const { env } = c;
    const body = await c.req.json();
    
    // Get the origin from the request to build proper redirect URL
    const origin = new URL(c.req.url).origin;
    
    const { name, email, phone, amount, product_type, has_community_addon } = body;
    
    // Generate unique merchant order ID (must be unique for each transaction)
    const merchantOrderId = 'ORD_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    
    // Convert amount to paise (PhonePe expects amount in paise)
    const amountInPaise = Math.round(amount * 100);
    
    console.log('🌍 Using PhonePe OAuth2 API (Production)');
    console.log('🔑 Client ID:', env.PHONEPE_MERCHANT_ID);
    
    // Step 1: Get OAuth2 access token
    // FIX: Credentials must be sent in the request BODY, not as URL query params.
    // Content-Type: application/x-www-form-urlencoded means body carries the params.
    const authUrl = 'https://api.phonepe.com/apis/identity-manager/v1/oauth/token';
    const authBody = new URLSearchParams({
      client_id: env.PHONEPE_MERCHANT_ID,
      client_secret: env.PHONEPE_API_KEY,
      client_version: env.PHONEPE_SALT_INDEX,
      grant_type: 'client_credentials'
    });

    console.log('🔐 Fetching OAuth token...');

    const authResponse = await fetch(authUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: authBody.toString()
    });
    
    const authResult = await authResponse.json();
    
    if (!authResult.access_token) {
      console.error('❌ Failed to get OAuth token:', authResult);
      return c.json({ 
        success: false, 
        error: 'Failed to authenticate with PhonePe',
        details: authResult
      }, 500);
    }
    
    const accessToken = authResult.access_token;
    console.log('✅ Got OAuth token');
    
    // Step 2: Create checkout order using OAuth2 V2 Pay API
    const checkoutUrl = 'https://api.phonepe.com/apis/pg/checkout/v2/pay';
    
    // Create checkout order payload (SIMPLE format that worked before)
    const orderPayload = {
      merchantOrderId: merchantOrderId,
      amount: amountInPaise,
      expireAfter: 1200, // 20 minutes in seconds
      metaInfo: {
        name: name,
        email: email,
        phone: phone
      },
      paymentFlow: {
        type: 'PG_CHECKOUT',
        message: 'Dharmic Parents Payment',
        merchantUrls: {
          redirectUrl: `${origin}/payment-redirect.html?txn_id=${merchantOrderId}`,
          callbackUrl: `${origin}/api/phonepe/callback`
        }
      }
    };
    
    console.log('🔐 Creating PhonePe checkout order:', merchantOrderId);
    console.log('💰 Amount (paise):', amountInPaise);
    console.log('📦 Payload:', JSON.stringify(orderPayload, null, 2));
    
    // Call PhonePe Checkout API with OAuth token
    const response = await fetch(checkoutUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `O-Bearer ${accessToken}`
      },
      body: JSON.stringify(orderPayload)
    });
    
    const result = await response.json();
    
    console.log('📥 PhonePe API Response:', JSON.stringify(result, null, 2));
    console.log('📥 Response Status:', response.status);
    
    // Check if order creation was successful
    if (!result.orderId || !result.redirectUrl) {
      console.error('❌ PhonePe API error:', result);
      return c.json({ 
        success: false, 
        error: result.message || 'Payment order creation failed',
        code: result.code || response.status,
        details: result
      }, 400);
    }
    
    console.log('✅ PhonePe order created successfully!');
    console.log('📝 Order ID:', result.orderId);
    console.log('🔗 Payment URL:', result.redirectUrl);
    
    return c.json({
      success: true,
      transaction_id: merchantOrderId,
      order_id: result.orderId,
      payment_url: result.redirectUrl,
      state: result.state || 'PENDING',
      amount: amount,
      amount_paise: amountInPaise
    });
  } catch (error) {
    console.error('❌ Error creating PhonePe order:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// PhonePe Webhook - Receives payment status notifications
app.post('/api/phonepe/callback', async (c) => {
  try {
    const { env } = c;
    const body = await c.req.json();
    
    console.log('📥 PhonePe webhook received:', JSON.stringify(body, null, 2));
    
    // PhonePe sends payment status in the callback
    // Verify the callback is authentic (check X-VERIFY header if needed)
    const xVerify = c.req.header('X-VERIFY');
    
    // TODO: Verify webhook signature for security
    // For now, just log the payment status
    
    if (body.code === 'PAYMENT_SUCCESS') {
      console.log('✅ Payment successful:', body.data?.merchantTransactionId);
      
      // Here you would:
      // 1. Update database with payment status
      // 2. Send confirmation email to customer
      // 3. Activate access to purchased content
    } else if (body.code === 'PAYMENT_ERROR' || body.code === 'PAYMENT_DECLINED') {
      console.log('❌ Payment failed:', body.data?.merchantTransactionId);
    } else {
      console.log('ℹ️ Payment status:', body.code);
    }
    
    // Always return 200 OK to PhonePe to acknowledge receipt
    return c.json({ success: true, message: 'Webhook received' });
  } catch (error) {
    console.error('❌ Webhook error:', error);
    return c.json({ success: true, message: 'Webhook received' }); // Still return 200
  }
});

// Check PhonePe payment status (OAuth2 V2 API)
app.get('/api/phonepe/status/:merchantOrderId', async (c) => {
  try {
    const { env } = c;
    const merchantOrderId = c.req.param('merchantOrderId');
    
    // Step 1: Get OAuth token
    // FIX: Credentials must be sent in the request BODY, not as URL query params.
    const authUrl = 'https://api.phonepe.com/apis/identity-manager/v1/oauth/token';
    const authBody = new URLSearchParams({
      client_id: env.PHONEPE_MERCHANT_ID,
      client_secret: env.PHONEPE_API_KEY,
      client_version: env.PHONEPE_SALT_INDEX,
      grant_type: 'client_credentials'
    });

    const authResponse = await fetch(authUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: authBody.toString()
    });
    
    const authResult = await authResponse.json();
    
    if (!authResult.access_token) {
      console.error('❌ Failed to get OAuth token:', authResult);
      return c.json({ success: false, error: 'Authentication failed' }, 500);
    }
    
    const accessToken = authResult.access_token;
    
    // Step 2: Check order status
    const statusUrl = `https://api.phonepe.com/apis/pg/checkout/v2/order/${merchantOrderId}/status`;
    
    const statusResponse = await fetch(statusUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `O-Bearer ${accessToken}`
      }
    });
    
    const statusResult = await statusResponse.json();
    
    console.log('📊 Payment status check:', merchantOrderId, statusResult);
    
    // Return the payment state at top level for consistency with payment-redirect.html
    return c.json({
      success: true,
      order_id: merchantOrderId,
      state: statusResult.state || statusResult.code,
      data: statusResult
    });
  } catch (error) {
    console.error('❌ Error checking payment status:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Store purchase information and send email with PDF
app.post('/api/purchases', async (c) => {
  try {
    const { env } = c;
    const body = await c.req.json();
    
    const {
      name,
      email,
      phone,
      amount_paid,
      has_community_addon,
      payment_id,
      payment_status,
      payment_method,
      product_type
    } = body;
    
    const ip_address = c.req.header('cf-connecting-ip') || c.req.header('x-forwarded-for') || 'unknown';
    const user_agent = c.req.header('user-agent') || '';
    const referrer = c.req.header('referer') || '';
    
    // First, create or get user
    let user_id;
    const existingUser = await env.DB.prepare(
      'SELECT id FROM users WHERE email = ?'
    ).bind(email).first();
    
    if (existingUser) {
      user_id = existingUser.id;
      // Update user info
      await env.DB.prepare(`
        UPDATE users SET name = ?, phone = ?, updated_at = CURRENT_TIMESTAMP 
        WHERE id = ?
      `).bind(name, phone, user_id).run();
    } else {
      // Create new user
      const userResult = await env.DB.prepare(`
        INSERT INTO users (name, email, phone, source) 
        VALUES (?, ?, ?, 'checkout')
      `).bind(name, email, phone).run();
      user_id = userResult.meta.last_row_id;
    }
    
    // Store purchase
    const purchaseResult = await env.DB.prepare(`
      INSERT INTO purchases 
      (user_id, name, email, phone, product_type, amount_paid, currency, 
       has_community_addon, payment_id, payment_status, payment_method, 
       ip_address, user_agent, referrer)
      VALUES (?, ?, ?, ?, ?, ?, 'INR', ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      user_id, name, email, phone, product_type || 'transformation_guide', 
      amount_paid, has_community_addon, payment_id, payment_status, 
      payment_method, ip_address, user_agent, referrer
    ).run();
    
    console.log('💰 Purchase recorded:', { name, email, amount_paid, payment_id });
    
    // Send email with PDF attachment (async - don't block response)
    if (payment_status === 'completed') {
      c.executionCtx.waitUntil(
        sendPurchaseEmail(email, name, amount_paid, payment_id, env).catch(err => {
          console.error('❌ Email sending failed:', err);
        })
      );
      console.log('📧 Email queued for:', email);
    }
    
    return c.json({ 
      success: true, 
      purchase_id: purchaseResult.meta.last_row_id,
      user_id: user_id,
      email_queued: payment_status === 'completed'
    });
  } catch (error) {
    console.error('❌ Error storing purchase:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Helper function to send purchase confirmation email with PDF
async function sendPurchaseEmail(email: string, name: string, amount: number, paymentId: string, env: any) {
  try {
    console.log('📧 Preparing email for:', email);
    console.log('💰 Purchase details:', { name, amount, paymentId });
    
    // Generate email HTML
    const emailHTML = getPurchaseEmailHTML(name, amount, paymentId);
    
    // PDF URL (hosted on your Cloudflare Pages site)
    const fullGuidePDF = 'https://dharmicparents.pages.dev/Dharmic-Father-Son-Transformation-Guide-Complete.pdf';
    
    // Choose email provider: Brevo (if BREVO_API_KEY exists) or Resend
    const useBrevo = env.BREVO_API_KEY && env.BREVO_API_KEY.length > 0;
    
    if (useBrevo) {
      // BREVO API - Works in India, no domain verification needed!
      console.log('📧 Using Brevo API (India-friendly)');
      
      // Use URL attachment instead of base64 (better for large PDFs)
      const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'api-key': env.BREVO_API_KEY,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          sender: {
            name: 'Dharmic Parents',
            email: 'dharmicparents@gmail.com'
          },
          to: [{
            email: email,
            name: name
          }],
          replyTo: {
            email: 'dharmicparents@gmail.com',
            name: 'Dharmic Parents Support'
          },
          subject: '🕉️ Your Dharmic Transformation Package is Ready!',
          htmlContent: emailHTML,
          attachment: [{
            name: 'Dharmic-Father-Son-Transformation-Guide-Complete.pdf',
            url: fullGuidePDF
          }]
        })
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        console.error('❌ Brevo API error:', result);
        throw new Error(`Brevo API error: ${result.message || 'Unknown error'}`);
      }
      
      console.log('✅ Email sent successfully via Brevo:', result.messageId);
      return { success: true, email_id: result.messageId, provider: 'brevo' };
      
    } else {
      // RESEND API - Fallback (limited in India)
      console.log('📧 Using Resend API (limited to verified emails)');
      
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'Dharmic Parents <onboarding@resend.dev>',
          reply_to: 'dharmicparents@gmail.com',
          to: email,
          subject: '🕉️ Your Dharmic Transformation Package is Ready!',
          html: emailHTML,
          attachments: [{
            filename: 'Dharmic-Father-Son-Transformation-Guide-Complete.pdf',
            path: fullGuidePDF
          }]
        })
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        console.error('❌ Resend API error:', result);
        throw new Error(`Resend API error: ${result.message || 'Unknown error'}`);
      }
      
      console.log('✅ Email sent successfully via Resend:', result.id);
      return { success: true, email_id: result.id, provider: 'resend' };
    }
  } catch (error) {
    console.error('❌ Email send error:', error);
    throw error;
  }
}

// Email subscription endpoint
app.post('/api/subscribe', async (c) => {
  try {
    const { env } = c;
    const body = await c.req.json();
    const { email, name, source } = body;
    
    const ip_address = c.req.header('cf-connecting-ip') || c.req.header('x-forwarded-for') || 'unknown';
    
    // Insert or update email subscriber
    await env.DB.prepare(`
      INSERT OR REPLACE INTO email_subscribers (email, name, source, ip_address)
      VALUES (?, ?, ?, ?)
    `).bind(email, name, source || 'website', ip_address).run();
    
    console.log('📧 Email subscriber added:', { email, source });
    
    return c.json({ success: true, message: 'Subscribed successfully!' });
  } catch (error) {
    console.error('❌ Error adding subscriber:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Track lead actions
app.post('/api/track/action', async (c) => {
  try {
    const { env } = c;
    const body = await c.req.json();
    
    const { session_id, email, action_type, action_details, page_url } = body;
    
    await env.DB.prepare(`
      INSERT INTO lead_actions (session_id, email, action_type, action_details, page_url)
      VALUES (?, ?, ?, ?, ?)
    `).bind(session_id, email, action_type, JSON.stringify(action_details), page_url).run();
    
    console.log('🎯 Lead action tracked:', { action_type, email });
    
    return c.json({ success: true });
  } catch (error) {
    console.error('❌ Error tracking action:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// =============================================
// Note: Static files are now handled by Cloudflare Pages directly
// The Worker only handles API routes as defined in _routes.json
// =============================================

export default app