import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password + process.env.ADMIN_PASSWORD_SALT!).digest('hex')
}

export async function POST(request: Request) {
  try {
    const { password } = await request.json()

    if (!password) {
      return Response.json(
        { error: 'Password required' },
        { status: 400 }
      )
    }

    // Fetch admin credentials
    const { data, error: fetchError } = await supabase
      .from('admin_credentials')
      .select('*')
      .eq('id', '00000000-0000-0000-0000-000000000001')
      .single()

    if (fetchError || !data) {
      console.error('Error fetching admin credentials:', fetchError)
      return Response.json(
        { error: 'Invalid password' },
        { status: 401 }
      )
    }

    // Compare password
    const passwordHash = hashPassword(password)
    if (data.password_hash !== passwordHash) {
      return Response.json(
        { error: 'Invalid password' },
        { status: 401 }
      )
    }

    // Update last login
    await supabase
      .from('admin_credentials')
      .update({ last_login: new Date().toISOString() })
      .eq('id', '00000000-0000-0000-0000-000000000001')

    // Generate JWT token (valid for 7 days)
    const token = jwt.sign(
      { adminId: data.id, iat: Math.floor(Date.now() / 1000) },
      process.env.ADMIN_JWT_SECRET!,
      { expiresIn: '7d' }
    )

    return Response.json({ success: true, token })
  } catch (error) {
    console.error('Login error:', error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
