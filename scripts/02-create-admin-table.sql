-- Admin credentials table
CREATE TABLE IF NOT EXISTS admin_credentials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  password_hash TEXT,
  is_initialized BOOLEAN DEFAULT FALSE,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Add RLS policy to prevent direct access
ALTER TABLE admin_credentials ENABLE ROW LEVEL SECURITY;

-- Create policy that prevents read access from public
CREATE POLICY "No public access to admin credentials" 
ON admin_credentials 
FOR ALL 
TO public 
USING (false);

-- Insert a single admin record (no password hash initially - user will set it on first login)
INSERT INTO admin_credentials (id, is_initialized)
VALUES ('00000000-0000-0000-0000-000000000001', false)
ON CONFLICT DO NOTHING;
