# 🚀 DHARMIC PARENTS - DNS SETUP GUIDE
## Copy-Paste Instructions for Cloudflare Dashboard

### 📋 QUICK SETUP CHECKLIST
- [ ] Login to Cloudflare Dashboard
- [ ] Navigate to dharmicparents.com → DNS
- [ ] Add 5 MX Records (copy-paste values below)
- [ ] Add 2 TXT Records (SPF + DMARC)
- [ ] Verify all records added correctly
- [ ] Wait 5-10 minutes for propagation

---

## 📧 MX RECORDS TO ADD (Copy these exactly)

**Click "Add record" for each one:**

### MX Record 1
```
Type: MX
Name: @
Target: aspmx.l.google.com
Priority: 1
TTL: Auto
Proxy: DNS only (grey cloud)
```

### MX Record 2  
```
Type: MX
Name: @
Target: alt1.aspmx.l.google.com
Priority: 5
TTL: Auto
Proxy: DNS only (grey cloud)
```

### MX Record 3
```
Type: MX
Name: @
Target: alt2.aspmx.l.google.com
Priority: 5
TTL: Auto
Proxy: DNS only (grey cloud)
```

### MX Record 4
```
Type: MX
Name: @
Target: alt3.aspmx.l.google.com
Priority: 10
TTL: Auto
Proxy: DNS only (grey cloud)
```

### MX Record 5
```
Type: MX
Name: @
Target: alt4.aspmx.l.google.com
Priority: 10
TTL: Auto
Proxy: DNS only (grey cloud)
```

---

## 🔐 SECURITY RECORDS TO ADD

### SPF Record
```
Type: TXT
Name: @
Content: v=spf1 include:_spf.google.com ~all
TTL: Auto
```

### DMARC Record
```
Type: TXT
Name: _dmarc
Content: v=DMARC1; p=quarantine; rua=mailto:dmarc@dharmicparents.com; ruf=mailto:dmarc@dharmicparents.com; fo=1
TTL: Auto
```

---

## ✅ VERIFICATION CHECKLIST

After adding all records, you should see:

**MX Records (5 total):**
- ✅ aspmx.l.google.com (Priority 1)
- ✅ alt1.aspmx.l.google.com (Priority 5)  
- ✅ alt2.aspmx.l.google.com (Priority 5)
- ✅ alt3.aspmx.l.google.com (Priority 10)
- ✅ alt4.aspmx.l.google.com (Priority 10)

**TXT Records (2 total):**
- ✅ SPF: v=spf1 include:_spf.google.com ~all
- ✅ DMARC: v=DMARC1; p=quarantine...

---

## 🎯 NEXT STEPS AFTER DNS SETUP

1. **Sign up for Google Workspace**: workspace.google.com
2. **Add domain**: dharmicparents.com
3. **Create email**: admin@dharmicparents.com
4. **Test email delivery**
5. **Update website** with professional email addresses

---

## 🆘 NEED HELP?

If you get stuck:
1. **Take screenshot** of your Cloudflare DNS page
2. **Share screenshot** and I'll help troubleshoot
3. **Test with**: mxtoolbox.com/mx/ (enter dharmicparents.com)

## 📞 ESTIMATED TIME: 10 MINUTES

This should take about 10 minutes total:
- 5 minutes to add DNS records
- 5 minutes for propagation
- Ready for Google Workspace setup!