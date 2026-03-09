import { createClient } from "@supabase/supabase-js"
import { NextRequest, NextResponse } from "next/server"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Convert timeline string to months
function parseTimelineToMonths(timeline: string): number {
  const timelineMap: { [key: string]: number } = {
    "Immediate": 0,
    "1-3 months": 2,
    "3-6 months": 4,
    "6-12 months": 9,
    "12+ months": 18
  }
  return timelineMap[timeline] || 3
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      name,
      email,
      company,
      projectTitle,
      projectDescription,
      timeline,
      budget,
      industry,
      complexity_score,
      ai_fit_score,
      status
    } = body

    // Validate required fields
    if (!name || !email || !projectTitle || !projectDescription) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from("project_inquiries")
      .insert([
        {
          client_name: name,
          client_email: email,
          client_company: company || null,
          project_title: projectTitle,
          project_description: projectDescription,
          timeline_months: parseTimelineToMonths(timeline),
          budget_range: budget,
          project_type: null,
          industry: industry || null,
          complexity_score: Math.min(100, Math.max(0, complexity_score || 0)),
          ai_fit_score: Math.min(100, Math.max(0, ai_fit_score || 0)),
          status: status || "new",
          priority: complexity_score >= 70 ? "high" : complexity_score >= 40 ? "medium" : "low"
        }
      ])
      .select()

    if (error) {
      console.error("[v0] Supabase error:", error)
      return NextResponse.json(
        { error: "Failed to submit inquiry" },
        { status: 500 }
      )
    }

    // Send email notification (using Resend or similar)
    // For now, we'll just log it
    console.log("[v0] New project inquiry submitted:", {
      id: data?.[0]?.id,
      projectTitle,
      clientEmail: email,
      complexityScore: complexity_score
    })

    // You can integrate with Resend, SendGrid, or any email service here
    // Example: await sendEmailNotification(email, projectTitle, complexity_score)

    return NextResponse.json(
      {
        success: true,
        message: "Project brief submitted successfully",
        inquiryId: data?.[0]?.id
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("[v0] Error in submit-inquiry:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
