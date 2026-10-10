# Meta Pixel Events Setup Guide

## ✅ Current Meta Pixel ID
**Pixel ID:** `1385864342964404`

---

## 📊 Standard Events Currently Tracking

### 1. **PageView** (All Pages)
**Tracked on:** Homepage, About, Survey, Results, Checkout, Success
```javascript
fbq('track', 'PageView');
```
**Purpose:** Tracks when users visit any page
**Value:** Basic traffic tracking for remarketing

---

### 2. **ViewContent** (Survey Page)
**Tracked on:** survey.html - Each question view
```javascript
fbq('track', 'ViewContent', {
    content_type: 'assessment',
    content_name: 'Father Son Relationship Assessment',
    content_category: 'survey_progress',
    value: questionNum,
    currency: 'INR'
});
```
**Purpose:** Tracks quiz engagement and progress
**Value:** Identify users interested in assessment

---

### 3. **Lead** (Survey Start)
**Tracked on:** survey.html - First question
```javascript
fbq('track', 'Lead', {
    content_name: 'Assessment Started',
    content_category: 'engagement',
    value: 1,
    currency: 'INR'
});
```
**Purpose:** Captures high-intent users who start quiz
**Value:** Build "quiz takers" audience for retargeting

---

### 4. **InitiateCheckout** (Checkout Page Load)
**Tracked on:** checkout.html - Page load
```javascript
fbq('track', 'InitiateCheckout', {
    content_name: 'Dharmic Transformation Guide',
    content_type: 'product',
    content_category: 'parenting_guide',
    value: 799, // or test amount
    currency: 'INR',
    num_items: 1
});
```
**Purpose:** Track when users reach checkout
**Value:** Create "checkout initiators" audience - warm leads

---

### 5. **AddPaymentInfo** (Form Submit)
**Tracked on:** checkout.html - Form submission
```javascript
fbq('track', 'AddPaymentInfo', {
    content_name: 'Payment Details Submitted',
    content_category: 'checkout',
    value: amount,
    currency: 'INR'
});
```
**Purpose:** Track users who submit payment info
**Value:** Very hot leads who attempted payment

---

### 6. **Purchase** (Payment Success) 💰
**Tracked on:** checkout.html - Payment confirmation
```javascript
fbq('track', 'Purchase', {
    content_name: 'Dharmic Transformation Guide',
    content_type: 'product',
    content_category: 'parenting_guide',
    value: purchaseData.amount_paid,
    currency: 'INR',
    num_items: purchaseData.has_community_addon ? 2 : 1
});
```
**Purpose:** Track completed purchases
**Value:** **MOST IMPORTANT** - Used for conversion optimization and ROAS tracking

---

## 🎯 Custom Events Currently Tracking

### 1. **CompleteRegistration** (Survey Completion)
```javascript
fbq('track', 'CompleteRegistration', {
    content_name: 'Assessment Completed',
    content_category: 'survey_completion',
    value: totalQuestions,
    currency: 'INR'
});
```
**Purpose:** Track quiz completion
**Value:** Build "completed quiz" audience

---

### 2. **TransformationPurchase** (Custom)
```javascript
fbq('trackCustom', 'TransformationPurchase', {
    product_type: 'transformation_guide',
    community_addon: purchaseData.has_community_addon,
    payment_method: purchaseData.payment_method,
    customer_name: purchaseData.name,
    customer_email: purchaseData.email,
    amount: purchaseData.amount_paid
});
```
**Purpose:** Detailed purchase tracking with custom data
**Value:** Advanced analytics and customer segmentation

---

### 3. **HighValueCustomer** (Custom)
```javascript
fbq('trackCustom', 'HighValueCustomer', {
    lifetime_value: purchaseData.amount_paid,
    segment: 'premium'
});
```
**Purpose:** Flag high-value customers (₹997+)
**Value:** Build premium customer audience

---

## 📋 Event Flow (User Journey)

```
1. Homepage Visit
   └─> fbq('track', 'PageView')

2. Quiz Start
   └─> fbq('track', 'Lead')
   └─> fbq('track', 'ViewContent') [per question]

3. Quiz Complete
   └─> fbq('track', 'CompleteRegistration')
   └─> Redirect to Results

4. Results Page
   └─> fbq('track', 'PageView')
   └─> Click "Get Guide" → Checkout

5. Checkout Page Load
   └─> fbq('track', 'InitiateCheckout')

6. Form Submit
   └─> fbq('track', 'AddPaymentInfo')
   └─> Redirect to PhonePe

7. Payment Success
   └─> fbq('track', 'Purchase') 💰
   └─> fbq('trackCustom', 'TransformationPurchase')
   └─> Redirect to Success Page

8. Success Page
   └─> fbq('track', 'PageView')
```

---

## 🎯 Facebook Events Manager Setup

### Step 1: Go to Events Manager
1. Go to: https://business.facebook.com/events_manager2/
2. Select your Pixel: **1385864342964404**
3. You should see events coming in

### Step 2: Verify Events
Use **Test Events** tool:
1. Click "Test Events" in Events Manager
2. Enter your URL: `https://dharmicparents.pages.dev`
3. Browse through the user journey
4. Check if events fire correctly

### Step 3: Create Custom Conversions (Optional)
For better tracking, create custom conversions:

**Conversion 1: Quiz Completion**
- Event: CompleteRegistration
- URL contains: `/results.html`
- Value: Use event value

**Conversion 2: Checkout Started**
- Event: InitiateCheckout  
- URL contains: `/checkout.html`
- Value: Use event value

**Conversion 3: Purchase (Already standard)**
- Event: Purchase
- Value: Use event value

---

## 📊 Recommended Audiences to Create

### 1. **Quiz Starters** (Warm)
- Event: Lead
- Time: Last 30 days
- Use for: Reminder ads to complete quiz

### 2. **Quiz Completers** (Hot)
- Event: CompleteRegistration
- Time: Last 14 days
- Use for: Aggressive conversion ads

### 3. **Checkout Abandoners** (Very Hot)
- Event: InitiateCheckout
- Exclude: Purchase
- Time: Last 7 days
- Use for: Urgent discount/reminder ads

### 4. **Purchasers** (Customers)
- Event: Purchase
- Time: Last 180 days
- Use for: Upsell/community addon ads, lookalike audience

### 5. **High-Value Customers** (VIP)
- Event: HighValueCustomer
- Time: All time
- Use for: Lookalike audience seed, premium offers

---

## 🚀 Campaign Optimization Tips

### For Conversions Campaign:
**Optimization Event:** Purchase
**Why:** Let Facebook optimize for actual sales

### Budget Recommendations:
- **Test Phase:** ₹500-1,000/day
- **Scale Phase:** ₹2,000-5,000/day when ROAS > 2

### Key Metrics to Watch:
- **Cost Per Purchase:** Target < ₹400 (profitable)
- **ROAS (Return on Ad Spend):** Target > 2.5x
- **Link CTR:** Target > 1.5%
- **Purchase Conversion Rate:** Target > 3%

---

## ⚠️ Common Issues & Solutions

### Issue 1: Events Not Firing
**Solution:** Check browser console for errors
```javascript
// Test in browser console:
fbq('track', 'PageView');
```

### Issue 2: Duplicate Events
**Solution:** Make sure pixel code is only loaded once per page

### Issue 3: Low Match Quality
**Solution:** Pass customer information with events:
```javascript
fbq('track', 'Purchase', {
    value: 799,
    currency: 'INR'
}, {
    em: 'customer@email.com',  // Hashed email
    ph: '919876543210',        // Hashed phone
    fn: 'john',                // First name
    ln: 'doe'                  // Last name
});
```

---

## 🔍 Testing Your Events

### Browser Console Test:
```javascript
// 1. Open browser console (F12)
// 2. Type: fbq
// 3. Should see function definition

// 4. Test event:
fbq('track', 'PageView');

// 5. Check if event fires in Network tab
// Look for: facebook.com/tr?id=1385864342964404
```

### Test Events Tool:
1. https://business.facebook.com/events_manager2/
2. Click your pixel
3. "Test Events" tab
4. Enter your URL
5. Browse site and verify events appear

---

## 📈 Current Status

✅ **Pixel Installed:** Yes (All pages)
✅ **PageView Tracking:** Active
✅ **Lead Tracking:** Active (Quiz start)
✅ **Purchase Tracking:** Active
✅ **Custom Events:** Active (TransformationPurchase, HighValueCustomer)

### Next Steps:
1. ✅ Verify events in Facebook Events Manager
2. ✅ Create custom audiences (Quiz takers, Checkout abandoners)
3. ✅ Set up Conversions campaign with Purchase optimization
4. ✅ Monitor ROAS and cost per purchase
5. ✅ Create lookalike audiences from purchasers

---

## 💡 Pro Tips

1. **Always test with Test Events tool** before running ads
2. **Let pixel collect data for 7 days** before scaling
3. **Use Purchase event for optimization** - it's the money event
4. **Create lookalike audiences** from purchasers for scaling
5. **Exclude purchasers** from acquisition campaigns to save money
6. **Track ROAS daily** - pause if ROAS < 1.5x

---

## 📞 Need Help?

If events aren't tracking properly:
1. Check browser console for errors
2. Use Facebook Pixel Helper Chrome extension
3. Verify pixel ID is correct: `1385864342964404`
4. Test with Test Events tool in Events Manager

---

**Last Updated:** 2025-01-11
**Pixel ID:** 1385864342964404
**Status:** ✅ Active and Tracking
