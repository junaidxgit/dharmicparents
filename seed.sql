-- =============================================
-- Sample Data for Dharmic Parents Testing
-- =============================================

-- Sample Users
INSERT OR IGNORE INTO users (name, email, phone, source, created_at) VALUES 
  ('Rajesh Kumar', 'rajesh.kumar@gmail.com', '+91-9876543210', 'survey', '2025-09-20 10:30:00'),
  ('Priya Sharma', 'priya.sharma@yahoo.com', '+91-9876543211', 'checkout', '2025-09-21 14:15:00'),
  ('Amit Singh', 'amit.singh@hotmail.com', '+91-9876543212', 'survey', '2025-09-22 09:45:00'),
  ('Sunita Gupta', 'sunita.gupta@gmail.com', '+91-9876543213', 'checkout', '2025-09-22 16:20:00'),
  ('Vikram Patel', 'vikram.patel@gmail.com', '+91-9876543214', 'survey', '2025-09-23 11:10:00');

-- Sample Assessments
INSERT OR IGNORE INTO assessments (
  user_id, name, email, phone, 
  relationship_health_score, communication_score, trust_score, 
  emotional_connection_score, conflict_resolution_score, 
  total_questions, completed_at, ip_address
) VALUES 
  (1, 'Rajesh Kumar', 'rajesh.kumar@gmail.com', '+91-9876543210', 
   78, 72, 85, 70, 68, 20, '2025-09-20 10:35:00', '182.68.45.123'),
  (3, 'Amit Singh', 'amit.singh@hotmail.com', '+91-9876543212', 
   65, 60, 70, 65, 58, 20, '2025-09-22 09:50:00', '203.192.145.78'),
  (5, 'Vikram Patel', 'vikram.patel@gmail.com', '+91-9876543214', 
   82, 88, 85, 80, 75, 20, '2025-09-23 11:15:00', '157.32.67.89');

-- Sample Purchases
INSERT OR IGNORE INTO purchases (
  user_id, name, email, phone, product_type, amount_paid, currency,
  has_community_addon, payment_id, payment_status, payment_method,
  purchased_at, ip_address, user_agent
) VALUES 
  (2, 'Priya Sharma', 'priya.sharma@yahoo.com', '+91-9876543211', 
   'transformation_guide', 799.00, 'INR', FALSE, 
   'pay_MF8xK9L2jK3dR7', 'completed', 'razorpay',
   '2025-09-21 14:20:00', '203.192.145.78', 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X)'),
  (4, 'Sunita Gupta', 'sunita.gupta@gmail.com', '+91-9876543213', 
   'transformation_guide', 1999.00, 'INR', TRUE, 
   'pay_MF8xK9L2jK3dR8', 'completed', 'razorpay',
   '2025-09-22 16:25:00', '182.68.45.123', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'),
  (1, 'Rajesh Kumar', 'rajesh.kumar@gmail.com', '+91-9876543210', 
   'transformation_guide', 799.00, 'INR', FALSE, 
   'dummy_1695462000_abc123', 'dummy', 'dummy_api',
   '2025-09-20 10:40:00', '157.32.67.89', 'Mozilla/5.0 (Android 12; Mobile; rv:91.0)');

-- Sample Page Views
INSERT OR IGNORE INTO page_views (
  page_url, page_title, referrer, session_id, ip_address, user_agent,
  country, device_type, viewed_at, time_on_page
) VALUES 
  ('https://dharmicparents.com/', 'Dharmic Parents - Transform Relationships', 'https://google.com/search', 
   'sess_1695460000_abc123', '182.68.45.123', 'Mozilla/5.0 (iPhone)', 'IN', 'mobile', 
   '2025-09-20 10:25:00', 45),
  ('https://dharmicparents.com/survey.html', 'Take Assessment - Dharmic Parents', 'https://dharmicparents.com/', 
   'sess_1695460000_abc123', '182.68.45.123', 'Mozilla/5.0 (iPhone)', 'IN', 'mobile', 
   '2025-09-20 10:28:00', 320),
  ('https://dharmicparents.com/results.html', 'Assessment Results - Dharmic Parents', 'https://dharmicparents.com/survey.html', 
   'sess_1695460000_abc123', '182.68.45.123', 'Mozilla/5.0 (iPhone)', 'IN', 'mobile', 
   '2025-09-20 10:33:00', 180),
  ('https://dharmicparents.com/checkout.html', 'Complete Purchase - Dharmic Parents', 'https://dharmicparents.com/results.html', 
   'sess_1695460000_abc123', '182.68.45.123', 'Mozilla/5.0 (iPhone)', 'IN', 'mobile', 
   '2025-09-20 10:36:00', 240),
  ('https://dharmicparents.com/about.html', 'About Us - Dharmic Parents', 'https://google.com/search', 
   'sess_1695461000_def456', '203.192.145.78', 'Mozilla/5.0 (Windows)', 'IN', 'desktop', 
   '2025-09-21 14:10:00', 95);

-- Sample Email Subscribers
INSERT OR IGNORE INTO email_subscribers (email, name, status, source, subscribed_at, ip_address) VALUES 
  ('newsletter1@gmail.com', 'Rakesh Verma', 'active', 'homepage', '2025-09-20 15:30:00', '182.68.45.123'),
  ('newsletter2@yahoo.com', 'Meera Joshi', 'active', 'assessment', '2025-09-21 12:45:00', '203.192.145.78'),
  ('newsletter3@hotmail.com', 'Karan Malhotra', 'active', 'checkout', '2025-09-22 18:20:00', '157.32.67.89');

-- Sample Lead Actions
INSERT OR IGNORE INTO lead_actions (session_id, email, action_type, action_details, page_url, created_at) VALUES 
  ('sess_1695460000_abc123', 'rajesh.kumar@gmail.com', 'assessment_started', '{}', '/survey.html', '2025-09-20 10:28:00'),
  ('sess_1695460000_abc123', 'rajesh.kumar@gmail.com', 'assessment_completed', '{"score": 78, "completion_time": 320000}', '/survey.html', '2025-09-20 10:35:00'),
  ('sess_1695460000_abc123', 'rajesh.kumar@gmail.com', 'checkout_page_loaded', '{}', '/checkout.html', '2025-09-20 10:36:00'),
  ('sess_1695460000_abc123', 'rajesh.kumar@gmail.com', 'purchase_completed', '{"amount": 799, "has_community": false}', '/checkout.html', '2025-09-20 10:40:00'),
  ('sess_1695461000_def456', 'priya.sharma@yahoo.com', 'homepage_cta_clicked', '{"button_text": "Take Free Assessment"}', '/', '2025-09-21 14:12:00');