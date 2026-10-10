# 🚀 Brevo Email Setup - Quick Start Guide

## ✅ Code is READY - Just Add API Key!

The code is already deployed and supports Brevo. You just need to:
1. Create free Brevo account (5 min)
2. Get API key (2 min)
3. Add to Cloudflare (2 min)
4. Test! (1 min)

---

## 📝 Step-by-Step Setup

### Step 1: Create Brevo Account (5 minutes)

1. **Go to**: https://www.brevo.com/
2. **Click**: "Sign up free" (top right)
3. **Enter**:
   - Email: `dharmicparents@gmail.com`
   - Password: (your choice)
   - Company name: Dharmic Parents
4. **Verify email**: Check Gmail inbox for verification link
5. **Complete profile**:
   - Country: India
   - Business type: E-commerce
   - Number of contacts: 0-500

---

### Step 2: Verify Sender Email (3 minutes)

1. **Go to**: https://app.brevo.com/senders
2. **Click**: "Add a sender"
3. **Enter**:
   - Email: `dharmicparents@gmail.com`
   - Name: `Dharmic Parents`
4. **Click**: "Add"
5. **Check Gmail**: Click verification link in Brevo email
6. **Done!** ✅ Green checkmark appears

---

### Step 3: Get API Key (2 minutes)

1. **Go to**: https://app.brevo.com/settings/keys/api
2. **Click**: "Create a new API key"
3. **Name**: `Dharmic Parents Production`
4. **Click**: "Generate"
5. **Copy the key** (starts with `xkeysib-...`)
   - ⚠️ Save it somewhere safe - you can't see it again!

---

### Step 4: Add to Cloudflare (2 minutes)

**Option A - Using Terminal** (if you have wrangler):
```bash
npx wrangler pages secret put BREVO_API_KEY --project-name dharmicparents
# Paste your API key when prompted
```

**Option B - Using Cloudflare Dashboard**:
1. Go to: https://dash.cloudflare.com/
2. Click: "Workers & Pages"
3. Find: "dharmicparents"
4. Click: "Settings" tab
5. Scroll to: "Environment variables"
6. Click: "Add variable"
7. Name: `BREVO_API_KEY`
8. Value: (paste your Brevo API key)
9. Click: "Save"

---

### Step 5: Test Email (1 minute)

**Go to**: https://dharmicparents.pages.dev/test-email.html

**Enter**:
- Email: `dharmicparents@gmail.com` (or any email - it will work!)
- Name: Your name
- Amount: 799
- Click: "Send Test Email"

**Check inbox**: Should receive email with PDF in 5-10 seconds!

---

## ✅ Done! What You Get:

- ✅ Send to **ANY email address** (not just yours!)
- ✅ **300 emails/day** free (9,000/month)
- ✅ Works perfectly in **India**
- ✅ No domain verification needed
- ✅ Beautiful email with PDF attachment
- ✅ Automatic after every payment

---

## 🎯 How to Verify It's Working

### Test 1: Send to Your Gmail
```
Visit: https://dharmicparents.pages.dev/test-email.html
Email: dharmicparents@gmail.com
Result: ✅ Should receive email immediately
```

### Test 2: Send to Different Email
```
Visit: https://dharmicparents.pages.dev/test-email.html
Email: any-other-email@gmail.com
Result: ✅ Should work now (previously failed with Resend!)
```

### Test 3: Make Real Purchase
```
1. Go to checkout page
2. Complete PhonePe payment (₹10 test or ₹799)
3. After payment success
4. Check email inbox
Result: ✅ Should receive transformation guide PDF
```

---

## 📊 Monitoring Emails

**Brevo Dashboard**: https://app.brevo.com/

Here you can see:
- ✅ Emails sent today
- ✅ Delivery rate
- ✅ Opens/clicks (if enabled)
- ✅ Bounces/complaints
- ✅ Daily quota usage (300/day)

---

## 🚨 Troubleshooting

### "API key is invalid"
- Check you copied the full key (starts with `xkeysib-`)
- Create a new key if old one expired
- Make sure no extra spaces when pasting

### "Sender not verified"
- Go to: https://app.brevo.com/senders
- Click verification link in Gmail
- Wait 1-2 minutes after verification

### "Email not received"
- Check spam folder
- Wait 1-2 minutes (sometimes delayed)
- Check Brevo logs: https://app.brevo.com/log

### "Daily limit exceeded"
- Free tier: 300 emails/day
- Upgrade to Lite: ₹2,080/month for 20,000 emails
- Or wait until midnight IST for reset

---

## 💰 Pricing (if you grow)

**Current (Free)**:
- 300 emails/day
- 9,000 emails/month
- Perfect for starting out!

**If you need more**:
- **Lite**: ₹2,080/month (20,000 emails)
- **Business**: ₹5,400/month (40,000 emails)
- **Enterprise**: ₹16,200/month (120,000 emails)

**For reference**: At 10 sales/day, you need ~20 emails/day (well under 300 limit!)

---

## 📞 Support

**Brevo Help Center**: https://help.brevo.com/  
**API Documentation**: https://developers.brevo.com/  
**Status Page**: https://status.brevo.com/  
**Support Email**: contact@brevo.com

---

## ✨ Summary

**Total Setup Time**: 10-15 minutes  
**Monthly Cost**: FREE (300 emails/day)  
**Works in India**: ✅ Yes  
**Domain Verification**: ❌ Not required  
**Sends to Any Email**: ✅ Yes  

**After setup, your customers will automatically receive**:
- Beautiful email with dharmic branding
- 47-page transformation guide PDF
- Order confirmation details
- Next steps instructions

---

**Ready?** Just follow the 5 steps above! 🚀

**Questions?** The code is already deployed. Just add the API key and it works instantly!

---

**Created**: 2025-10-10  
**Current Deployment**: https://dharmicparents.pages.dev  
**Test Page**: https://dharmicparents.pages.dev/test-email.html
