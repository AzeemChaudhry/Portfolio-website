import jwt from 'jsonwebtoken'
import crypto from 'crypto'

const JWT_SECRET = process.env.ADMIN_JWT_SECRET!
const PASSWORD_SALT = process.env.ADMIN_PASSWORD_SALT!

export interface AdminTokenPayload {
  adminId: string
  iat: number
  exp?: number
}

/**
 * Verify and decode a JWT token
 */
export function verifyToken(token: string): AdminTokenPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AdminTokenPayload
    return decoded
  } catch (error) {
    console.error('[v0] Token verification failed:', error)
    return null
  }
}

/**
 * Generate a JWT token for admin
 */
export function generateToken(adminId: string): string {
  return jwt.sign(
    { adminId, iat: Math.floor(Date.now() / 1000) },
    JWT_SECRET,
    { expiresIn: '7d' }
  )
}

/**
 * Hash a password with salt
 */
export function hashPassword(password: string): string {
  return crypto
    .createHash('sha256')
    .update(password + PASSWORD_SALT)
    .digest('hex')
}

/**
 * Get token from request headers (Authorization header)
 */
export function getTokenFromHeaders(headers: Headers): string | null {
  const authHeader = headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  return authHeader.substring(7) // Remove "Bearer " prefix
}

/**
 * Check if token is valid (used in middleware)
 */
export function isTokenValid(token: string): boolean {
  return verifyToken(token) !== null
}
