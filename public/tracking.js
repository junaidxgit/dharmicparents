// =============================================
// Dharmic Parents Analytics & Tracking Library
// =============================================

(function() {
    'use strict';
    
    // Global tracking configuration
    window.DharmicTracking = window.DharmicTracking || {};
    
    const config = {
        apiBase: '', // Same origin
        sessionId: generateSessionId(),
        userId: localStorage.getItem('dharmic_user_id') || null,
        debug: true
    };
    
    // Generate unique session ID
    function generateSessionId() {
        return 'sess_' + Date.now() + '_' + Math.random().toString(36).substring(2);
    }
    
    // Utility functions
    function log(message, data) {
        if (config.debug) {
            console.log('🔍 Dharmic Tracking:', message, data || '');
        }
    }
    
    function getUrlParams() {
        const params = new URLSearchParams(window.location.search);
        return {
            utm_source: params.get('utm_source'),
            utm_medium: params.get('utm_medium'),
            utm_campaign: params.get('utm_campaign'),
            utm_content: params.get('utm_content'),
            utm_term: params.get('utm_term')
        };
    }
    
    function getCurrentPageData() {
        return {
            page_url: window.location.href,
            page_title: document.title,
            referrer: document.referrer,
            session_id: config.sessionId,
            ...getUrlParams()
        };
    }
    
    // API call wrapper
    async function apiCall(endpoint, data) {
        try {
            const response = await fetch(`${config.apiBase}/api/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            if (result.success) {
                log(`✅ ${endpoint} tracked successfully`, result);
            } else {
                log(`❌ ${endpoint} tracking failed`, result);
            }
            return result;
        } catch (error) {
            log(`❌ Error calling ${endpoint}:`, error);
            return { success: false, error: error.message };
        }
    }
    
    // =============================================
    // MAIN TRACKING FUNCTIONS
    // =============================================
    
    // Track page views
    function trackPageView(additionalData = {}) {
        const pageData = {
            ...getCurrentPageData(),
            ...additionalData
        };
        
        log('📊 Tracking page view', pageData);
        apiCall('track/pageview', pageData);
        
        // Track time on page when user leaves
        let startTime = Date.now();
        window.addEventListener('beforeunload', function() {
            const timeOnPage = Math.round((Date.now() - startTime) / 1000);
            navigator.sendBeacon(`${config.apiBase}/api/track/pageview`, JSON.stringify({
                ...pageData,
                time_on_page: timeOnPage
            }));
        });
    }
    
    // Track user actions
    function trackAction(actionType, actionDetails = {}) {
        const actionData = {
            session_id: config.sessionId,
            email: config.userId,
            action_type: actionType,
            action_details: actionDetails,
            page_url: window.location.href
        };
        
        log(`🎯 Tracking action: ${actionType}`, actionData);
        apiCall('track/action', actionData);
    }
    
    // Store assessment results
    async function storeAssessment(assessmentData) {
        log('📝 Storing assessment', assessmentData);
        const result = await apiCall('assessments', assessmentData);
        
        if (result.success && result.user_id) {
            // Store user ID for future tracking
            localStorage.setItem('dharmic_user_id', result.user_id);
            config.userId = result.user_id;
        }
        
        return result;
    }
    
    // Store purchase information
    async function storePurchase(purchaseData) {
        log('💰 Storing purchase', purchaseData);
        const result = await apiCall('purchases', purchaseData);
        
        if (result.success && result.user_id) {
            localStorage.setItem('dharmic_user_id', result.user_id);
            config.userId = result.user_id;
        }
        
        return result;
    }
    
    // Email subscription
    async function subscribeEmail(email, name, source = 'website') {
        const subscriptionData = { email, name, source };
        log('📧 Email subscription', subscriptionData);
        return await apiCall('subscribe', subscriptionData);
    }
    
    // =============================================
    // AUTO-TRACKING SETUP
    // =============================================
    
    // Auto-track page view on load
    document.addEventListener('DOMContentLoaded', function() {
        log('🚀 Dharmic Tracking initialized');
        
        // Track page view
        trackPageView();
        
        // Track specific page types
        const currentPage = window.location.pathname;
        
        if (currentPage.includes('survey.html')) {
            trackAction('assessment_page_view');
        } else if (currentPage.includes('checkout.html')) {
            trackAction('checkout_page_view');
        } else if (currentPage.includes('success.html')) {
            trackAction('purchase_success_page_view');
        } else if (currentPage.includes('results.html')) {
            trackAction('results_page_view');
        }
        
        // Track external link clicks
        document.addEventListener('click', function(e) {
            const link = e.target.closest('a');
            if (link && link.href && !link.href.includes(window.location.hostname)) {
                trackAction('external_link_click', {
                    url: link.href,
                    text: link.textContent.trim()
                });
            }
        });
        
        // Track form interactions
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('focus', function() {
                trackAction('form_focus', { form_id: form.id || 'unknown' });
            }, true);
            
            form.addEventListener('submit', function() {
                trackAction('form_submit', { form_id: form.id || 'unknown' });
            });
        });
    });
    
    // =============================================
    // PUBLIC API
    // =============================================
    
    // Expose tracking functions globally
    window.DharmicTracking = {
        trackPageView,
        trackAction,
        storeAssessment,
        storePurchase,
        subscribeEmail,
        config
    };
    
    log('✅ Dharmic Tracking library loaded');
    
})();