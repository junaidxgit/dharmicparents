// Simple Cloudflare Workers script for Dharmic Parents data collection
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Handle API routes
    if (url.pathname.startsWith('/api/')) {
      return handleAPI(request, env, url);
    }
    
    // Serve static files
    return env.ASSETS.fetch(request);
  }
};

async function handleAPI(request, env, url) {
  // Enable CORS
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const path = url.pathname.replace('/api/', '');
    
    switch (path) {
      case 'assessments':
        if (request.method === 'POST') {
          return await storeAssessment(request, env, corsHeaders);
        }
        break;
        
      case 'purchases':
        if (request.method === 'POST') {
          return await storePurchase(request, env, corsHeaders);
        }
        break;
        
      case 'track/pageview':
        if (request.method === 'POST') {
          return await trackPageView(request, env, corsHeaders);
        }
        break;
        
      case 'admin/analytics':
        if (request.method === 'GET') {
          return await getAnalytics(env, corsHeaders);
        }
        break;
        
      case 'admin/users':
        if (request.method === 'GET') {
          return await getUsers(env, corsHeaders);
        }
        break;
        
      case 'admin/assessments':
        if (request.method === 'GET') {
          return await getAssessments(env, corsHeaders);
        }
        break;
        
      case 'admin/purchases':
        if (request.method === 'GET') {
          return await getPurchases(env, corsHeaders);
        }
        break;
    }
    
    return new Response(JSON.stringify({ success: false, error: 'Not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
    
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
}

// Store assessment results
async function storeAssessment(request, env, corsHeaders) {
  const data = await request.json();
  const {
    name, email, phone,
    relationship_health_score,
    communication_score,
    trust_score,
    emotional_connection_score,
    conflict_resolution_score,
    total_questions
  } = data;
  
  const ip_address = request.headers.get('cf-connecting-ip') || 'unknown';
  const user_agent = request.headers.get('user-agent') || '';
  
  // Create or get user
  let user_id;
  const existingUser = await env.DB.prepare(
    'SELECT id FROM users WHERE email = ?'
  ).bind(email).first();
  
  if (existingUser) {
    user_id = existingUser.id;
    await env.DB.prepare(`
      UPDATE users SET name = ?, phone = ?, updated_at = CURRENT_TIMESTAMP 
      WHERE id = ?
    `).bind(name, phone, user_id).run();
  } else {
    const userResult = await env.DB.prepare(`
      INSERT INTO users (name, email, phone, source) 
      VALUES (?, ?, ?, 'survey')
    `).bind(name, email, phone).run();
    user_id = userResult.meta.last_row_id;
  }
  
  // Store assessment
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
  
  return new Response(JSON.stringify({ 
    success: true, 
    assessment_id: assessmentResult.meta.last_row_id,
    user_id: user_id,
    score: relationship_health_score
  }), {
    headers: { 'Content-Type': 'application/json', ...corsHeaders }
  });
}

// Store purchase information
async function storePurchase(request, env, corsHeaders) {
  const data = await request.json();
  const {
    name, email, phone, amount_paid, has_community_addon,
    payment_id, payment_status, payment_method, product_type
  } = data;
  
  const ip_address = request.headers.get('cf-connecting-ip') || 'unknown';
  const user_agent = request.headers.get('user-agent') || '';
  const referrer = request.headers.get('referer') || '';
  
  // Create or get user
  let user_id;
  const existingUser = await env.DB.prepare(
    'SELECT id FROM users WHERE email = ?'
  ).bind(email).first();
  
  if (existingUser) {
    user_id = existingUser.id;
    await env.DB.prepare(`
      UPDATE users SET name = ?, phone = ?, updated_at = CURRENT_TIMESTAMP 
      WHERE id = ?
    `).bind(name, phone, user_id).run();
  } else {
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
  
  return new Response(JSON.stringify({ 
    success: true, 
    purchase_id: purchaseResult.meta.last_row_id,
    user_id: user_id
  }), {
    headers: { 'Content-Type': 'application/json', ...corsHeaders }
  });
}

// Track page views
async function trackPageView(request, env, corsHeaders) {
  const data = await request.json();
  const { page_url, page_title, referrer, session_id, time_on_page } = data;
  
  const ip_address = request.headers.get('cf-connecting-ip') || 'unknown';
  const user_agent = request.headers.get('user-agent') || '';
  const country = request.headers.get('cf-ipcountry') || 'unknown';
  const device_type = user_agent.includes('Mobile') ? 'mobile' : 
                     user_agent.includes('Tablet') ? 'tablet' : 'desktop';
  
  await env.DB.prepare(`
    INSERT INTO page_views 
    (page_url, page_title, referrer, session_id, ip_address, user_agent, 
     country, device_type, time_on_page)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    page_url, page_title, referrer, session_id, ip_address, 
    user_agent, country, device_type, time_on_page
  ).run();
  
  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json', ...corsHeaders }
  });
}

// Get analytics data
async function getAnalytics(env, corsHeaders) {
  const totalUsers = await env.DB.prepare('SELECT COUNT(*) as count FROM users').first();
  const totalAssessments = await env.DB.prepare('SELECT COUNT(*) as count FROM assessments').first();
  const totalPurchases = await env.DB.prepare('SELECT COUNT(*) as count FROM purchases WHERE payment_status IN ("completed", "dummy")').first();
  const totalRevenue = await env.DB.prepare('SELECT SUM(amount_paid) as total FROM purchases WHERE payment_status IN ("completed", "dummy")').first();
  
  const recentUsers = await env.DB.prepare(`
    SELECT COUNT(*) as count FROM users 
    WHERE created_at >= datetime('now', '-30 days')
  `).first();
  
  const topPages = await env.DB.prepare(`
    SELECT page_url, COUNT(*) as views 
    FROM page_views 
    WHERE viewed_at >= datetime('now', '-7 days')
    GROUP BY page_url 
    ORDER BY views DESC 
    LIMIT 10
  `).all();
  
  return new Response(JSON.stringify({
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
        assessments: 0,
        purchases: 0
      },
      top_pages: topPages?.results || []
    }
  }), {
    headers: { 'Content-Type': 'application/json', ...corsHeaders }
  });
}

// Get users data
async function getUsers(env, corsHeaders) {
  const users = await env.DB.prepare(`
    SELECT 
      u.id, u.name, u.email, u.phone, u.source, u.created_at,
      a.relationship_health_score, a.completed_at as assessment_date,
      p.amount_paid, p.payment_status, p.purchased_at
    FROM users u
    LEFT JOIN assessments a ON u.id = a.user_id
    LEFT JOIN purchases p ON u.id = p.user_id
    ORDER BY u.created_at DESC
    LIMIT 100
  `).all();
  
  return new Response(JSON.stringify({
    success: true,
    users: users?.results || []
  }), {
    headers: { 'Content-Type': 'application/json', ...corsHeaders }
  });
}

// Get assessments data
async function getAssessments(env, corsHeaders) {
  const assessments = await env.DB.prepare(`
    SELECT * FROM assessments 
    ORDER BY completed_at DESC 
    LIMIT 100
  `).all();
  
  return new Response(JSON.stringify({
    success: true,
    assessments: assessments?.results || []
  }), {
    headers: { 'Content-Type': 'application/json', ...corsHeaders }
  });
}

// Get purchases data
async function getPurchases(env, corsHeaders) {
  const purchases = await env.DB.prepare(`
    SELECT * FROM purchases 
    ORDER BY purchased_at DESC 
    LIMIT 100
  `).all();
  
  return new Response(JSON.stringify({
    success: true,
    purchases: purchases?.results || []
  }), {
    headers: { 'Content-Type': 'application/json', ...corsHeaders }
  });
}