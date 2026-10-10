# 🔍 Meta Pixel Verification Guide - Dharmic Parents

## ✅ GOOD NEWS: Your Pixel IS Working!

**Console logs confirm:**
- ✅ fbq function loaded correctly
- ✅ Events are being sent (Lead, Custom events)
- ✅ Pixel Helper detects the pixel

**The "not activated" warning is just a Facebook setup issue, not a code problem!**

---

## 🚀 How to Fix the "Not Activated" Warning

### Method 1: Domain Verification (RECOMMENDED)

1. **Go to Facebook Business Manager:**
   - https://business.facebook.com/settings/

2. **Navigate to Brand Safety → Domains:**
   - Click "Add" button
   - Enter: `dharmicparents.com`
   - Choose verification method (Meta tag is easiest)

3. **Add verification meta tag to your site:**
   - We'll add the meta tag Facebook provides
   - Redeploy your site
   - Click "Verify" in Facebook

### Method 2: Test Events Tool Verification

1. **Go to Events Manager:**
   - https://business.facebook.com/events_manager2

2. **Select your pixel:** `1471294964197881`

3. **Click "Test Events" tab:**
   - Enter URL: `https://dharmicparents.com`
   - Click "Open Website"
   - Browse your site while watching for events

4. **Expected Events to See:**
   - **PageView** - On every page load
   - **ViewContent** - During assessment progress  
   - **Lead** - When assessment starts
   - **CompleteRegistration** - Assessment completion
   - **InitiateCheckout** - Checkout page visit
   - **Purchase** - Successful purchases

---

## 🎯 Key Pages to Test

### Test These URLs in Test Events Tool:
1. **Homepage:** https://dharmicparents.com
   - Should fire: PageView

2. **Assessment:** https://dharmicparents.com/survey.html  
   - Should fire: PageView, ViewContent, Lead, CompleteRegistration

3. **Checkout:** https://dharmicparents.com/checkout.html
   - Should fire: PageView, InitiateCheckout

4. **Meta Pixel Diagnostic:** https://dharmicparents.com/meta-pixel-test.html
   - Should fire: PageView, Lead (test), Custom events

---

## 🔧 If Events Still Don't Show

### Check These Common Issues:

1. **Ad Blockers:** Disable all ad blockers during testing
2. **VPN/Location:** Some VPNs block Facebook pixels  
3. **Browser Privacy:** Use incognito mode for testing
4. **Network:** Corporate networks often block social media pixels

### Verification Commands:

**Open Browser Console on any page and run:**
```javascript
// Check if pixel loaded
console.log('Pixel loaded:', typeof fbq);

// Send test event manually  
fbq('track', 'Lead', {content_name: 'Manual Test'});

// Check pixel queue
console.log('Pixel queue:', window._fbq.queue);
```

---

## 💡 Pro Tips for Facebook Ads Success

### Once Pixel is Verified:

1. **Let it collect data for 7-14 days** before creating audiences
2. **Need 100+ events** per week for stable audience creation  
3. **Purchase events need 50+ per week** for conversion optimization
4. **High-value custom events:** Focus on QualifiedLead, HighValueLead

### Audience Creation Strategy:
- **Week 1-2:** Let pixel collect baseline data
- **Week 3:** Create basic retargeting audiences  
- **Week 4+:** Launch lookalike audiences based on purchasers

---

## 🚨 Next Steps

1. **Domain verification in Business Manager** (recommended)
2. **Test Events tool verification** 
3. **Run console commands** on live site to confirm
4. **Share results** - what events do you see in Test Events?

**Your pixel code is perfect! This is just Facebook being overly cautious about domain ownership.** 🔥