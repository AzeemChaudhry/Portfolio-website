-- Create project_inquiries table
CREATE TABLE IF NOT EXISTS project_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Contact Information
  client_name VARCHAR(255) NOT NULL,
  client_email VARCHAR(255) NOT NULL,
  client_company VARCHAR(255),
  client_phone VARCHAR(20),
  
  -- Project Details
  project_title VARCHAR(255) NOT NULL,
  project_description TEXT NOT NULL,
  project_type VARCHAR(100), -- ML Model, NLP App, Computer Vision, Chatbot, RAG System, etc
  
  -- Project Specifications
  dataset_size VARCHAR(100), -- Small, Medium, Large, Huge
  timeline_months INTEGER, -- Estimated months to completion
  budget_range VARCHAR(100), -- Budget range in USD
  team_size INTEGER, -- Size of their team
  
  -- AI Complexity & Match Scoring (auto-calculated)
  complexity_score INTEGER, -- 1-10 scale
  ai_fit_score INTEGER, -- 1-10 scale based on AI Engineer match
  estimated_effort_days INTEGER, -- Estimated effort days
  
  -- Technologies Mentioned
  technologies TEXT[], -- Array of tech mentioned: TensorFlow, PyTorch, LLMs, etc
  
  -- Status & Admin Notes
  status VARCHAR(50) DEFAULT 'new', -- new, viewed, interested, negotiating, completed, rejected
  admin_notes TEXT,
  assigned_to VARCHAR(255),
  
  -- Priority & Metadata
  priority VARCHAR(50) DEFAULT 'medium', -- low, medium, high, critical
  estimated_budget_usd INTEGER,
  follow_up_date TIMESTAMP WITH TIME ZONE,
  
  -- Response tracking
  responded_at TIMESTAMP WITH TIME ZONE,
  response_notes TEXT,
  
  -- Notification tracking
  notification_sent BOOLEAN DEFAULT FALSE,
  email_opened BOOLEAN DEFAULT FALSE
);

-- Create indexes for faster queries
CREATE INDEX idx_project_inquiries_status ON project_inquiries(status);
CREATE INDEX idx_project_inquiries_created_at ON project_inquiries(created_at DESC);
CREATE INDEX idx_project_inquiries_complexity ON project_inquiries(complexity_score DESC);
CREATE INDEX idx_project_inquiries_email ON project_inquiries(client_email);

-- Create a trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_project_inquiries_updated_at
BEFORE UPDATE ON project_inquiries
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS (Row Level Security)
ALTER TABLE project_inquiries ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Allow public to insert new inquiries
CREATE POLICY "Allow public insert inquiries" ON project_inquiries
  FOR INSERT WITH CHECK (true);

-- Allow public to view their own inquiries
CREATE POLICY "Allow users to view own inquiries" ON project_inquiries
  FOR SELECT USING (
    auth.jwt() ->> 'email' = client_email OR
    auth.jwt() ->> 'role' = 'admin'
  );

-- Allow only admin to update and delete
CREATE POLICY "Allow admin to manage inquiries" ON project_inquiries
  FOR UPDATE USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Allow admin to delete inquiries" ON project_inquiries
  FOR DELETE USING (auth.jwt() ->> 'role' = 'admin');
