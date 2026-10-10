-- =============================================
-- Dharmic Parents Data Tracking Database Schema
-- =============================================

-- Users table - Store all user contact information
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  source TEXT DEFAULT 'website', -- 'survey', 'checkout', 'newsletter'
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Assessments table - Store survey results and scores
CREATE TABLE IF NOT EXISTS assessments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  
  -- Assessment scores
  relationship_health_score INTEGER NOT NULL,
  communication_score INTEGER,
  trust_score INTEGER,
  emotional_connection_score INTEGER,
  conflict_resolution_score INTEGER,
  
  -- Assessment details
  total_questions INTEGER DEFAULT 20,
  completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  ip_address TEXT,
  user_agent TEXT,
  
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Purchases table - Store payment and purchase information
CREATE TABLE IF NOT EXISTS purchases (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  
  -- Purchase details
  product_type TEXT DEFAULT 'transformation_guide', -- 'transformation_guide', 'community_addon'
  amount_paid DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'INR',
  has_community_addon BOOLEAN DEFAULT FALSE,
  
  -- Payment details
  payment_id TEXT,
  payment_status TEXT DEFAULT 'completed', -- 'pending', 'completed', 'failed', 'dummy'
  payment_method TEXT, -- 'razorpay', 'dummy'
  
  -- Tracking
  purchased_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  ip_address TEXT,
  user_agent TEXT,
  referrer TEXT,
  
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Page Views table - Track website analytics
CREATE TABLE IF NOT EXISTS page_views (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  
  -- Page information
  page_url TEXT NOT NULL,
  page_title TEXT,
  referrer TEXT,
  
  -- User information
  session_id TEXT,
  ip_address TEXT,
  user_agent TEXT,
  country TEXT,
  device_type TEXT, -- 'mobile', 'desktop', 'tablet'
  
  -- Tracking
  viewed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  time_on_page INTEGER, -- seconds spent on page
  
  -- UTM parameters for marketing tracking
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  utm_term TEXT
);

-- Email Subscribers table - Newsletter and marketing
CREATE TABLE IF NOT EXISTS email_subscribers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  status TEXT DEFAULT 'active', -- 'active', 'unsubscribed', 'bounced'
  source TEXT, -- 'homepage', 'assessment', 'checkout'
  subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  ip_address TEXT
);

-- Lead Actions table - Track user engagement
CREATE TABLE IF NOT EXISTS lead_actions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT,
  email TEXT,
  action_type TEXT NOT NULL, -- 'page_view', 'assessment_start', 'assessment_complete', 'checkout_start', 'purchase_complete'
  action_details TEXT, -- JSON string with additional details
  page_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- Create Indexes for Better Performance
-- =============================================

-- Users indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);

-- Assessments indexes  
CREATE INDEX IF NOT EXISTS idx_assessments_user_id ON assessments(user_id);
CREATE INDEX IF NOT EXISTS idx_assessments_email ON assessments(email);
CREATE INDEX IF NOT EXISTS idx_assessments_completed_at ON assessments(completed_at);
CREATE INDEX IF NOT EXISTS idx_assessments_score ON assessments(relationship_health_score);

-- Purchases indexes
CREATE INDEX IF NOT EXISTS idx_purchases_user_id ON purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_purchases_email ON purchases(email);
CREATE INDEX IF NOT EXISTS idx_purchases_payment_id ON purchases(payment_id);
CREATE INDEX IF NOT EXISTS idx_purchases_purchased_at ON purchases(purchased_at);

-- Page Views indexes
CREATE INDEX IF NOT EXISTS idx_page_views_session_id ON page_views(session_id);
CREATE INDEX IF NOT EXISTS idx_page_views_page_url ON page_views(page_url);
CREATE INDEX IF NOT EXISTS idx_page_views_viewed_at ON page_views(viewed_at);
CREATE INDEX IF NOT EXISTS idx_page_views_ip_address ON page_views(ip_address);

-- Email Subscribers indexes
CREATE INDEX IF NOT EXISTS idx_email_subscribers_email ON email_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_email_subscribers_subscribed_at ON email_subscribers(subscribed_at);

-- Lead Actions indexes
CREATE INDEX IF NOT EXISTS idx_lead_actions_session_id ON lead_actions(session_id);
CREATE INDEX IF NOT EXISTS idx_lead_actions_email ON lead_actions(email);
CREATE INDEX IF NOT EXISTS idx_lead_actions_action_type ON lead_actions(action_type);
CREATE INDEX IF NOT EXISTS idx_lead_actions_created_at ON lead_actions(created_at);