# Email Automation Setup Guide - Dharmic Parents

## 🚨 CURRENT STATUS: Email Sending is LIMITED

**Issue**: Resend free tier only allows sending emails to **your own verified email address** (dharmicparents@gmail.com).

**Solution**: You need to verify your custom domain (dharmicparents.com) with Resend to send emails to customers.

---

## 📧 What's Working Now

✅ Email automation code is **fully functional**  
✅ Beautiful HTML email template with PDF attachment  
✅ Automatic email sending after successful payments  
✅ Test email endpoint at `/api/test-email`  

**BUT**: Emails can only be sent to `dharmicparents@gmail.com` (your Resend account email)

---

## 🔧 How to Fix (Verify Domain)

### Option 1: Verify dharmicparents.com Domain (RECOMMENDED)

1. **Go to Resend Dashboard**: https://resend.com/domains
2. **Click "Add Domain"**
3. **Enter**: `dharmicparents.com`
4. **Copy DNS Records** provided by Resend
5. **Add to Cloudflare DNS**:
   - Go to Cloudflare → DNS → Add records
   - Add all SPF, DKIM, and MX records from Resend
6. **Wait for verification** (usually 5-15 minutes)
7. **Update email sender** to use `noreply@dharmicparents.com`

**After verification**, update `src/index.tsx`:
```typescript
from: 'Dharmic Parents <noreply@dharmicparents.com>',
```

### Option 2: Use Resend Free Domain (Quick Test)

For testing only, keep using `onboarding@resend.dev` but understand:
- Can only send to your own email
- Not suitable for production
- Customer emails won't work

---

## 📝 DNS Records You'll Need to Add

Once you add domain in Resend, you'll get records like:

```
Type    Name                Value
TXT     @                   v=spf1 include:_spf.resend.com ~all
TXT     resend._domainkey   [DKIM key from Resend]
MX      @                   feedback-smtp.us-east-1.amazonses.com (Priority: 10)
```

**Add these in Cloudflare DNS Settings**.

---

## 🧪 Testing Email System

### Test Page (Browser)
Visit: https://dharmicparents.pages.dev/test-email.html

**Steps**:
1. Enter YOUR email: `dharmicparents@gmail.com` (the only one that works now)
2. Enter your name
3. Click "Send Test Email"
4. Check your inbox

### Test API (Command Line)
```bash
curl -X POST https://dharmicparents.pages.dev/api/test-email \
  -H "Content-Type: application/json" \
  -d '{
    "email":"dharmicparents@gmail.com",
    "name":"Test User",
    "amount":799,
    "paymentId":"TEST_123"
  }'
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Test email sent successfully!",
  "result": {
    "success": true,
    "email_id": "re_..."
  }
}
```

---

## 🔄 How Email Automation Works Now

### When Customer Makes Real Payment:

1. **Customer completes PhonePe payment**
2. **payment-redirect.html** verifies payment status
3. **If payment = COMPLETED**:
   - Calls `/api/purchases` with customer details
   - Backend records purchase in database
   - Backend sends email via Resend API
   - Email includes PDF attachment
4. **Customer redirected to success page**

### Email Contents:

- ✅ Beautiful dharmic-themed HTML template
- ✅ Order confirmation with Payment ID
- ✅ **PDF Attachment**: Full 47-page transformation guide
- ✅ Next steps instructions
- ✅ Support contact info
- ✅ Company branding

---

## 📊 Current Email Flow

```
Payment Success (PhonePe)
   ↓
payment-redirect.html detects COMPLETED
   ↓
Calls POST /api/purchases
   ↓
Backend: sendPurchaseEmail()
   ↓
Resend API
   ↓
✅ Email delivered (if domain verified)
❌ Error: "only send to your own email" (if not verified)
```

---

## 🚀 Production Checklist

- [ ] Verify dharmicparents.com domain in Resend
- [ ] Add DNS records to Cloudflare
- [ ] Wait for DNS propagation (5-15 minutes)
- [ ] Update `from` address in `src/index.tsx`
- [ ] Test with real customer email
- [ ] Monitor Resend logs for delivery

---

## 📦 Files Modified

1. **src/index.tsx**:
   - Added `/api/test-email` endpoint
   - Email sending via Resend API
   - PDF attachment support

2. **public/payment-redirect.html**:
   - Added purchase recording after payment
   - Automatic email trigger on success

3. **public/test-email.html**:
   - New test page for manual email testing

4. **src/email-template.ts**:
   - Beautiful HTML email template
   - Dharmic branding and colors

---

## 💡 Alternative Solutions

### If You Don't Want to Verify Domain:

**Option A**: Use Gmail SMTP (requires app password)
**Option B**: Use SendGrid (free tier: 100 emails/day)
**Option C**: Use Amazon SES (requires AWS account)

But **Resend is the best** - just needs domain verification!

---

## 🆘 Support

**Resend Issues**: https://resend.com/support  
**Resend Docs**: https://resend.com/docs  
**DNS Help**: Cloudflare DNS documentation

---

## 📌 Quick Summary

**Problem**: Can only email dharmicparents@gmail.com  
**Solution**: Verify dharmicparents.com domain in Resend  
**Time**: ~15 minutes setup + DNS propagation  
**Cost**: FREE (Resend free tier: 100 emails/day, 3,000/month)

---

**Created**: 2025-10-10  
**Status**: Email automation code ready, domain verification pending  
**Test URL**: https://dharmicparents.pages.dev/test-email.html
