import { createClient } from "@supabase/supabase-js"
import { NextRequest, NextResponse } from "next/server"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

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
      match_percentage,
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
          company_name: company || null,
          project_title: projectTitle,
          project_description: projectDescription,
          timeline,
          budget,
          industry: industry || null,
          complexity_score,
          match_percentage,
          status,
          created_at: new Date().toISOString()
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
