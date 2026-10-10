# ⚡ Quick Email Automation Setup (2 Minutes)

## 🎯 What You Need

1. **Resend API Key** - Get it from https://resend.com/signup (free)
2. **2 minutes** - That's all it takes!

---

## 📝 Step-by-Step Setup

### **Step 1: Get Resend API Key (If you don't have one)**

1. Go to: https://resend.com/signup
2. Sign up (free, no credit card)
3. After signup, click **"API Keys"** in dashboard
4. Click **"Create API Key"**
5. Copy the key (starts with `re_`)

---

### **Step 2: Add API Key to Cloudflare**

Run this command in your terminal:

```bash
npx wrangler secret put RESEND_API_KEY --project-name dharmicparents
```

When prompted, **paste your API key** and press Enter.

---

### **Step 3: I'll Update the Code**

Once you give me your API key or confirm it's added, I'll:
1. ✅ Uncomment the email sending code
2. ✅ Configure it with your API key
3. ✅ Deploy to production
4. ✅ Test it

---

### **Step 4: Test Email**

We'll test it by making a test purchase and verifying you receive:
- ✅ Beautiful branded email
- ✅ PDF attached (837 KB - the complete 47-page guide)
- ✅ All purchase details

---

## 🚨 Important Notes

### **Email Address Configuration:**

**For Testing (Right Now):**
- Use: `onboarding@resend.dev` (Resend's test email)
- Or your own email for testing

**For Production (After Domain Verification):**
- Verify your domain: `dharmicparents.com`
- Use: `welcome@dharmicparents.com`
- Much better deliverability

### **Domain Verification (Optional but Recommended):**

After basic setup works, verify your domain for better deliverability:

1. In Resend dashboard, go to **"Domains"**
2. Add `dharmicparents.com`
3. Add DNS records (Resend will show you which ones)
4. Wait for verification (usually 10-30 minutes)

---

## 📊 What Happens After Setup

### **Automatic Flow:**

```
Customer completes Razorpay payment
         ↓
Payment success callback
         ↓
Store purchase in database
         ↓
Queue email sending (async)
         ↓
Send email with PDF via Resend
         ↓
Customer receives email instantly
```

### **Email Contains:**

- ✅ Personalized greeting with customer's name
- ✅ Purchase confirmation (Order ID, Amount, Package)
- ✅ **PDF attached** (Dharmic-Father-Son-Transformation-Guide-Complete.pdf)
- ✅ Next steps guide
- ✅ Support contact info
- ✅ 60-day guarantee
- ✅ Beautiful branding

---

## 🧪 Testing Commands

### **Test Email Sending:**

```bash
curl -X POST https://dharmicparents.pages.dev/api/purchases \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "your-email@gmail.com",
    "phone": "9876543210",
    "amount_paid": 10,
    "payment_id": "test_razorpay_123",
    "payment_status": "completed",
    "payment_method": "razorpay"
  }'
```

Replace `your-email@gmail.com` with your actual email to test.

### **Check Logs:**

```bash
npx wrangler pages deployment tail --project-name dharmicparents
```

Look for:
- `📧 Preparing email for: [email]`
- `✅ Email sent successfully`

---

## ❓ Common Issues

### **Issue: "API key invalid"**

**Solution:** 
- Make sure you copied the full API key
- It should start with `re_`
- Re-add it: `npx wrangler secret put RESEND_API_KEY --project-name dharmicparents`

### **Issue: "Email not received"**

**Solution:**
1. Check spam folder
2. Verify email address is correct
3. Check Resend logs: https://resend.com/logs
4. For production, verify domain first

### **Issue: "PDF not attached"**

**Solution:**
- PDF URL must be publicly accessible
- Check: https://dharmicparents.pages.dev/Dharmic-Father-Son-Transformation-Guide-Complete.pdf
- If 404, redeploy: `npm run build && npx wrangler pages deploy dist`

---

## 📈 Monitoring

### **Resend Dashboard:**
- View sent emails: https://resend.com/emails
- Check delivery status
- See open rates
- Monitor bounces

### **Your Admin Dashboard:**
- See purchases: https://dharmicparents.pages.dev/admin.html
- Track email queue status
- Monitor success rate

---

## 🎉 After Setup is Complete

You'll have:
- ✅ Fully automated email delivery
- ✅ Instant PDF attachment
- ✅ Professional branded emails
- ✅ 3,000 free emails/month
- ✅ Tracking and analytics
- ✅ No manual work required

**Every customer automatically receives their guide within seconds of payment!**

---

## 🆘 Need Help?

If you get stuck:
1. Check Resend docs: https://resend.com/docs
2. View Cloudflare logs: `wrangler pages deployment tail`
3. Test with curl command above
4. Check your spam folder

---

**Ready to activate? Just say "I have the API key" and I'll set it up in 2 minutes!** 🚀
