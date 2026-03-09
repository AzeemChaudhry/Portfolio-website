import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'

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

    if (!password || password.length < 8) {
      return Response.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      )
    }

    const passwordHash = hashPassword(password)

    // Update the admin credentials
    const { error } = await supabase
      .from('admin_credentials')
      .update({
        password_hash: passwordHash,
        is_initialized: true,
        updated_at: new Date().toISOString()
      })
      .eq('id', '00000000-0000-0000-0000-000000000001')

    if (error) {
      console.error('Error updating admin password:', error)
      return Response.json(
        { error: 'Failed to set password' },
        { status: 500 }
      )
    }

    return Response.json({ success: true })
  } catch (error) {
    console.error('Setup error:', error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
