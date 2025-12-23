-- IntentRadar Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ================================================
-- Table: leads
-- Stores scraped leads from social platforms
-- ================================================
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  platform TEXT NOT NULL CHECK (platform IN ('x', 'linkedin', 'reddit')),
  content TEXT NOT NULL,
  niche TEXT NOT NULL CHECK (niche IN ('writing', 'video', 'dev')),
  author_name TEXT,
  author_handle TEXT,
  author_avatar TEXT,
  author_bio TEXT,
  follower_count INTEGER DEFAULT 0,
  is_high_signal BOOLEAN DEFAULT false,
  source_url TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries by niche
CREATE INDEX idx_leads_niche ON leads(niche);

-- Create index for faster queries by platform
CREATE INDEX idx_leads_platform ON leads(platform);

-- Create index for high signal leads
CREATE INDEX idx_leads_high_signal ON leads(is_high_signal) WHERE is_high_signal = true;

-- Create index for recent leads
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);

-- ================================================
-- Table: user_leads
-- Tracks user interactions with leads
-- ================================================
CREATE TABLE user_leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL, -- Clerk User ID
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'saved' CHECK (status IN ('saved', 'contacted', 'hidden')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, lead_id)
);

-- Create index for faster user queries
CREATE INDEX idx_user_leads_user_id ON user_leads(user_id);

-- Create index for status filtering
CREATE INDEX idx_user_leads_status ON user_leads(status);

-- ================================================
-- Function: Update timestamp on row update
-- ================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for leads table
CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger for user_leads table
CREATE TRIGGER update_user_leads_updated_at
  BEFORE UPDATE ON user_leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ================================================
-- Row Level Security (RLS)
-- ================================================

-- Enable RLS on tables
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_leads ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access to leads (for landing page preview)
CREATE POLICY "Allow public read access to leads"
  ON leads FOR SELECT
  TO anon, authenticated
  USING (true);

-- Policy: Allow service role to insert leads (for webhook)
CREATE POLICY "Allow service role to insert leads"
  ON leads FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Policy: Users can only see their own user_leads
CREATE POLICY "Users can view their own user_leads"
  ON user_leads FOR SELECT
  TO authenticated
  USING (user_id = auth.jwt() ->> 'sub');

-- Policy: Users can insert their own user_leads
CREATE POLICY "Users can insert their own user_leads"
  ON user_leads FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.jwt() ->> 'sub');

-- Policy: Users can update their own user_leads
CREATE POLICY "Users can update their own user_leads"
  ON user_leads FOR UPDATE
  TO authenticated
  USING (user_id = auth.jwt() ->> 'sub');

-- Policy: Users can delete their own user_leads
CREATE POLICY "Users can delete their own user_leads"
  ON user_leads FOR DELETE
  TO authenticated
  USING (user_id = auth.jwt() ->> 'sub');

-- ================================================
-- Sample Data (Optional - for testing)
-- ================================================
-- Uncomment to insert sample leads for testing

/*
INSERT INTO leads (platform, content, niche, author_name, author_handle, follower_count, is_high_signal, source_url)
VALUES 
  ('x', 'Looking for a ghostwriter to help with my LinkedIn content. Want to build thought leadership in the AI/ML space. DM if interested.', 'writing', 'Sarah Chen', '@sarahchen_vc', 12400, true, 'https://x.com/sarahchen_vc/status/123'),
  ('linkedin', 'Our startup is hiring a video editor for YouTube content. Must have experience with B2B SaaS. Remote OK.', 'video', 'Marcus Johnson', 'marcus-johnson-ceo', 8900, true, 'https://linkedin.com/posts/123'),
  ('reddit', 'Need a Webflow developer for a complete site redesign. Budget is $5k-8k. Looking to start ASAP.', 'dev', 'techfounder2024', 'u/techfounder2024', 450, false, 'https://reddit.com/r/webflow/comments/123'),
  ('x', 'Seeking a newsletter writer for our weekly VC digest. Competitive pay for the right person.', 'writing', 'Alex Rivera', '@alexrivera_fund', 23500, true, 'https://x.com/alexrivera_fund/status/456'),
  ('linkedin', 'Looking for a React developer to build our customer dashboard. Full-time or contract.', 'dev', 'Jennifer Liu', 'jennifer-liu-cto', 15200, true, 'https://linkedin.com/posts/456');
*/

