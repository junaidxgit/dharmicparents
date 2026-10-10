# 📧 Email Automation Setup Guide

## What's Been Created

✅ **Professional PDF Package** (243 KB)
- Location: `/public/Dharmic-Parents-Transformation-Package.pdf`
- URL: `https://dharmicparents.pages.dev/Dharmic-Parents-Transformation-Package.pdf`
- Includes: Your complete branding, package details, promises, next steps

✅ **Beautiful Email Template**
- File: `/src/email-template.ts`
- Fully branded with Dharmic Parents theme
- Responsive HTML email design
- Includes all package details and call-to-actions

✅ **Backend Integration**
- Email sending function in `/src/index.tsx`
- Automatically triggered after successful payment
- Async execution (doesn't block payment response)

---

## 🚀 How to Enable Email Sending

### Option 1: Resend (Recommended - Easiest)

**Why Resend:**
- ✅ Simple API
- ✅ Great deliverability
- ✅ Free tier: 3,000 emails/month
- ✅ Easy PDF attachments
- ✅ No complex setup

**Setup Steps:**

1. **Sign up:** https://resend.com/signup
2. **Verify your domain** (dharmicparents.com)
3. **Get API key** from dashboard
4. **Add to Cloudflare secrets:**
   ```bash
   npx wrangler secret put RESEND_API_KEY --project-name dharmicparents
   # Enter your API key when prompted
   ```

5. **Update `/src/index.tsx`** - uncomment Resend code:
   ```typescript
   // Add to Bindings type:
   type Bindings = {
     DB: D1Database;
     RESEND_API_KEY: string;  // Add this line
   }
   
   // In sendPurchaseEmail function, uncomment:
   const response = await fetch('https://api.resend.com/emails', {
     method: 'POST',
     headers: {
       'Authorization': `Bearer ${env.RESEND_API_KEY}`,  // Use from env
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       from: 'Dharmic Parents <welcome@dharmicparents.com>',
       to: email,
       subject: '🕉️ Your Dharmic Transformation Package is Ready!',
       html: emailHTML,
       attachments: [{
         filename: 'Dharmic-Parents-Transformation-Package.pdf',
         path: pdfURL
       }]
     })
   });
   ```

6. **Deploy:**
   ```bash
   npm run build
   npx wrangler pages deploy dist --project-name dharmicparents
   ```

---

### Option 2: SendGrid

**Why SendGrid:**
- ✅ Industry standard
- ✅ Powerful features
- ✅ Free tier: 100 emails/day
- ✅ Advanced analytics

**Setup Steps:**

1. **Sign up:** https://sendgrid.com/
2. **Create API key** with "Mail Send" permissions
3. **Verify sender identity** (email address)
4. **Add to Cloudflare secrets:**
   ```bash
   npx wrangler secret put SENDGRID_API_KEY --project-name dharmicparents
   ```

5. **Update code** - uncomment SendGrid section in `/src/index.tsx`

---

### Option 3: Gmail SMTP (Quick Test)

**For Testing Only** (not production-ready):

1. **Enable 2FA** on Gmail account
2. **Generate App Password**
3. **Use nodemailer or similar library**

⚠️ **Not recommended for production** - daily limits & deliverability issues

---

## 📋 Email Sending Flow

```
1. Customer completes payment
   ↓
2. Razorpay payment success callback
   ↓
3. POST /api/purchases (payment_status: "completed")
   ↓
4. Store purchase in database
   ↓
5. Queue email sending (async)
   ↓
6. Send email with PDF attachment
   ↓
7. Customer receives email instantly
```

---

## 🧪 Testing Email Sending

### Test with Real API:

```bash
# After setting up Resend/SendGrid, test with:
curl -X POST https://dharmicparents.pages.dev/api/purchases \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "your-test-email@gmail.com",
    "phone": "9876543210",
    "amount_paid": 10,
    "payment_id": "test_payment_123",
    "payment_status": "completed",
    "payment_method": "razorpay"
  }'
```

### Check Email Logs:

```bash
# View Cloudflare Pages logs:
npx wrangler pages deployment tail --project-name dharmicparents

# Look for:
# ✅ Email would be sent with PDF attachment
# 📧 Preparing email for: test@example.com
```

---

## 📊 Email Service Comparison

| Feature | Resend | SendGrid | Gmail SMTP |
|---------|--------|----------|------------|
| **Free Tier** | 3K/month | 100/day | 500/day |
| **Setup Difficulty** | ⭐ Easy | ⭐⭐ Medium | ⭐⭐⭐ Hard |
| **Deliverability** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **PDF Attachments** | ✅ Easy | ✅ Easy | ✅ Manual |
| **API Quality** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ |
| **Production Ready** | ✅ Yes | ✅ Yes | ❌ No |

**Recommendation:** Use **Resend** for simplicity and reliability.

---

## 🔒 Security Best Practices

1. **Never commit API keys** to git
2. **Use Cloudflare secrets** for production
3. **Use `.dev.vars` file** for local testing:
   ```
   RESEND_API_KEY=re_your_test_key_here
   ```
4. **Add to `.gitignore`:**
   ```
   .dev.vars
   ```

---

## 📝 Email Content Customization

To customize the email:

1. **Edit** `/src/email-template.ts`
2. **Modify** HTML, text, styling
3. **Test** by sending to yourself
4. **Deploy** when satisfied

---

## 🚨 Troubleshooting

### Email not sending:
- ✅ Check API key is set: `npx wrangler secret list --project-name dharmicparents`
- ✅ Check logs: `npx wrangler pages deployment tail`
- ✅ Verify domain in email service
- ✅ Check spam folder

### PDF not attaching:
- ✅ Verify PDF URL is accessible
- ✅ Check PDF file exists in `/public/`
- ✅ Test PDF download manually

### Low deliverability:
- ✅ Verify sender domain (SPF, DKIM, DMARC)
- ✅ Use professional "from" address
- ✅ Avoid spam trigger words

---

## 📧 Next Steps

1. **Choose email service** (Resend recommended)
2. **Sign up and get API key**
3. **Add API key to Cloudflare secrets**
4. **Update code** to enable email sending
5. **Test with your own email**
6. **Deploy to production**
7. **Monitor email delivery** in service dashboard

---

## 💡 Pro Tips

- **Test thoroughly** before going live
- **Monitor email metrics** (open rates, bounces)
- **A/B test subject lines** for better open rates
- **Add unsubscribe link** (best practice)
- **Track email opens** using service analytics

---

## 📞 Need Help?

If you need assistance setting up email automation:
1. Check service documentation
2. Test with curl commands above
3. Review Cloudflare logs for errors
4. Verify all secrets are configured

**Current Status:** Email template ready, backend configured, just needs API key to go live! 🚀
