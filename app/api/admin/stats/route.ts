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

    // Fetch inquiry data
    const { data, error } = await supabase
      .from("project_inquiries")
      .select("status, complexity_score, created_at")

    if (error) {
      throw error
    }

    if (!data) {
      return NextResponse.json(
        {
          total: 0,
          new: 0,
          interested: 0,
          completed: 0,
          avgComplexity: 0,
          recentCount: 0,
        },
        { status: 200 }
      )
    }

    const now = new Date()
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

    const summary = {
      total: data.length,
      new: data.filter((i: any) => i.status === "new").length,
      interested: data.filter((i: any) => i.status === "interested").length,
      completed: data.filter((i: any) => i.status === "completed").length,
      avgComplexity: Math.round(
        data.reduce((sum: number, i: any) => sum + (i.complexity_score || 0), 0) / (data.length || 1)
      ),
      recentCount: data.filter((i: any) => new Date(i.created_at) > sevenDaysAgo).length,
    }

    return NextResponse.json(summary)
  } catch (error) {
    console.error("[v0] Stats endpoint error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
