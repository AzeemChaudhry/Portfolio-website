# User Inquiry System - Complete Guide

## System Overview

Your portfolio website now has a complete user inquiry management system with admin portal. Users can submit AI project briefs, and you receive them in a secure admin dashboard.

---

## For End Users (Visitors to Your Portfolio)

### Submitting a Project Brief

1. **Navigate to the Contact Page**
   - URL: `yoursite.com/contact`
   - Title: "Submit Your AI Project"

2. **Fill Out the Form**
   - **Full Name** (required): User's name
   - **Email** (required): Contact email
   - **Company**: Optional company/org name
   - **Industry**: Optional industry designation
   - **Project Title** (required): What the project is called
   - **Project Description** (required): Detailed description of the project
   - **Timeline**: Expected completion time (Immediate, 1-3 months, 3-6 months, 6-12 months, 12+ months)
   - **Budget Range**: Project budget (Under 25k, 25k-50k, 50k-100k, 100k-250k, 250k+)

3. **Watch the Live Scoring**
   - Left side shows "AI Complexity Score" (auto-calculated)
   - Right side shows "Project Match" percentage
   - Scores update as user types in project description
   - Keywords like "LLM", "deep learning", "transformers" increase complexity

4. **Submit the Form**
   - Click "Submit Project Brief"
   - Green confirmation appears: "Project Brief Received!"
   - Form clears automatically
   - User gets confirmation they'll be contacted within 24 hours

5. **What Happens Next**
   - Inquiry appears in your admin dashboard immediately
   - Email notification could be sent (optional, under admin settings)
   - You review and can contact them directly

---

## For Admin (You)

### Accessing the Admin Portal

#### Option 1: Direct URL
- Navigate to: `yoursite.com/admin/login`
- Keep this URL private

#### Option 2: Footer Link
- Subtle "Admin" link appears in footer
- Small lock icon + "Admin" text
- Bottom of every page
- Faded styling so it's not obvious to regular users

### First-Time Setup

1. **Visit `/admin/login`**
2. **Set Admin Password**
   - Create strong password (8+ characters recommended)
   - Confirm password
   - Click "Set Admin Password"
3. **Login**
   - Use the password you just created
   - Redirected to admin dashboard at `/admin`

### Admin Dashboard (`/admin`)

**Overview Panel Shows:**
- **Total Inquiries**: All submissions ever received
- **New Inquiries**: Ones you haven't reviewed yet (status = "new")
- **Interested Projects**: Ones you marked as interested (status = "interested")
- **Average Complexity**: Mean complexity score of all projects
- **Recent Entries**: Last 5 submissions with dates
- **Completed Projects**: Count of finished projects

**Quick Actions:**
- View all inquiries button → goes to detailed inquiries list
- View settings button → admin configuration

### Inquiries Page (`/admin/inquiries`)

**View Mode:**
- **List of all inquiries** with key info:
  - Client name
  - Project title
  - Status badge (color-coded)
  - Complexity score
  - Date submitted
  - Match percentage

**Filtering:**
- Filter by status: New, Viewed, Interested, Negotiating, Rejected, Completed
- Search by client name or email
- See all inquiries or just specific status

**Detailed View:**
- Click any inquiry to expand
- See full project description
- View all client information
- Read AI complexity breakdown
- Access admin notes field

**Managing Each Inquiry:**

1. **View Details**: Click on inquiry to see full information
2. **Update Status**: Change from:
   - `new` → You haven't looked at it
   - `viewed` → You reviewed but need to think
   - `interested` → You want to work on this
   - `negotiating` → In active discussion
   - `completed` → Project finished
   - `rejected` → Not a good fit
3. **Add Notes**: Write internal notes about the project, your thoughts, follow-ups, etc.
4. **Delete**: Remove spam or irrelevant inquiries

### Settings Page (`/admin/settings`)

- Admin account information
- System status and configuration
- Future: Password change, notification settings

### Logout

- Click "Logout" in admin sidebar
- Redirects to `/admin/login`
- Session token cleared from browser

---

## Inquiry Data Fields

Each submission captures:

```
CONTACT INFORMATION
├─ client_name: Full name of person submitting
├─ client_email: Their email address
└─ client_company: Optional company/organization

PROJECT INFORMATION
├─ project_title: Name/title of the project
├─ project_description: Detailed description
├─ project_type: Type of AI project (optional)
├─ industry: Industry vertical (FinTech, Healthcare, etc.)
└─ technologies: Tech mentioned (extracted from description)

PROJECT SCOPE
├─ timeline_months: Expected duration in months
├─ budget_range: Budget bracket (e.g., "50k-100k")
└─ team_size: Size of their team (optional)

AI ANALYSIS
├─ complexity_score: 0-100 (auto-calculated from keywords)
├─ ai_fit_score: 0-100 (how well it matches your expertise)
└─ estimated_effort_days: Estimated effort needed (optional)

ADMIN MANAGEMENT
├─ status: Current status (new, viewed, interested, negotiating, completed, rejected)
├─ admin_notes: Your internal notes (editable)
├─ priority: Low, Medium, High, Critical (auto-set based on complexity)
├─ created_at: When they submitted
└─ updated_at: Last modified date
```

---

## Key Features

### Automatic Complexity Scoring
- Analyzes project description for AI/ML keywords
- Categories:
  - **High complexity**: "federated learning", "reinforcement learning", "LLM", "transformer", "deep learning", "neural"
  - **Medium complexity**: "prediction", "classification", "sentiment", "recommendation"
  - **Low complexity**: "analysis", "dashboard", "reporting", "visualization"
- Longer descriptions get bonus points
- Score displayed in real-time as user types

### Match Percentage
- Based on complexity score
- Shows how well project aligns with your expertise
- Helps you prioritize

### Smart Priority Assignment
- **High/Critical**: Projects with 70+ complexity score
- **Medium**: Projects with 40-70 complexity
- **Low**: Projects with <40 complexity

---

## Security

- **Password Protected**: Only you can access admin portal
- **JWT Authentication**: Secure token-based login
- **Token Expiry**: 24-hour token validity
- **Database Security**: Service role key never exposed to client
- **API Authentication**: All admin endpoints require valid JWT

---

## Best Practices

1. **Check Daily**: Review new inquiries every morning
2. **Respond Quickly**: Update status within 24 hours of review
3. **Use Notes**: Document all conversations and decisions
4. **Set Priority**: Flag high-complexity projects immediately
5. **Keep Records**: Delete completed projects quarterly
6. **Guard Access**: Don't share `/admin` or `/admin/login` URLs

---

## Common Workflows

### Workflow 1: Review & Respond
1. New inquiry arrives
2. Check dashboard notification
3. Open inquiries page
4. Click on new inquiry
5. Read full project details
6. Update status to "viewed"
7. Add note with your decision
8. Update status to "interested" or "rejected"
9. Reach out to client directly via email

### Workflow 2: Project Negotiation
1. Status is "interested"
2. Email conversation with client ongoing
3. Update status to "negotiating"
4. Add notes with timeline, deliverables, budget discussed
5. Once agreed, update status to "completed" (or keep as "negotiating" until final)

### Workflow 3: Maintenance
1. Monthly review of old inquiries
2. Mark clearly rejected projects as "rejected"
3. Delete spam or obviously irrelevant submissions
4. Keep important discussions in notes

---

## Troubleshooting

**Q: I forgot my admin password**
- A: You can reset it. Access `/admin/login` and look for password recovery option (admin only).

**Q: Form says "Submitted" but inquiry doesn't appear**
- A: Try refreshing the dashboard. Check browser console for errors.

**Q: I want to re-open a completed project**
- A: Update the status from "completed" back to "interested".

**Q: How do I notify the user their inquiry was received?**
- A: Copy their email from the inquiry and send them a message manually. This is intentional - you control all communication.

---

## Integrations

The system is fully integrated with:
- **Supabase Database**: All inquiries stored securely
- **Email Capture**: User emails stored for your follow-up
- **JWT Authentication**: Secure admin access
- **Real-time Calculation**: Complexity scores calculated instantly

No external services needed - all self-contained in your portfolio application.
