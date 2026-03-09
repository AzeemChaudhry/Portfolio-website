import { createClient } from "@supabase/supabase-js"
import { verifyJWT } from "@/lib/auth-utils"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Verify JWT token
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.slice(7)
    const decoded = verifyJWT(token)
    
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    // Initialize Supabase with service role key
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // Fetch all inquiries
    const { data, error } = await supabase
      .from("project_inquiries")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      throw error
    }

    return NextResponse.json(data || [])
  } catch (error) {
    console.error("[v0] Inquiries endpoint error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
