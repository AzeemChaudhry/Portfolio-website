# AI Project Intelligence Board System

## Overview
A seamless, automated project inquiry management system that intelligently assesses incoming AI/ML project proposals and provides an admin dashboard for tracking and managing leads.

## System Architecture

### 1. Client-Facing: Project Brief Form (`/contact`)
**Features:**
- Beautiful, interactive form where clients describe their AI/ML project
- Real-time AI Complexity Score calculation based on project description
- Instant Project Match percentage showing fit with your expertise
- Automatic keyword detection for technologies (Federated Learning, LLMs, etc.)
- Bonus scoring for detailed descriptions (encourages quality submissions)

**How it Works:**
- Form analyzes project description for high-complexity keywords (25 points each): federated learning, reinforcement learning, transformers, deep learning, etc.
- Medium-complexity keywords (12 points): prediction, classification, NLP, recommendation
- Low-complexity keywords (5 points): analysis, reporting, dashboard
- Length bonus: +10 for >200 chars, +15 for >500 chars
- Final score capped at 100

**Data Captured:**
- Client name, email, company, industry
- Project title and detailed description
- Timeline and budget expectations
- Complexity score and match percentage

### 2. Backend: Intelligent Storage
**Database Table: `project_inquiries`**
```
- id (uuid)
- client_name, client_email
- company_name, industry
- project_title, project_description
- timeline, budget
- complexity_score (0-100)
- match_percentage (0-100)
- status (new, reviewed, interested, not-fit, completed)
- admin_notes (for your internal thoughts)
- created_at timestamp
```

### 3. Admin Dashboard (`/admin/inquiries`)
**Your Command Center:**

**Real-time Stats:**
- Total inquiries received
- New inquiries awaiting review
- Interested leads
- Average project complexity

**Features:**
- Search by client name, email, or project title
- Filter by status (New, Reviewed, Interested, Not Fit)
- Click any inquiry to view full details
- Update inquiry status with one click
- Add internal notes for each project
- Delete inquiries you don't need

**Quick Actions:**
- Mark as "Reviewed" after reading
- Mark as "Interested" for projects you want to pursue
- Mark as "Not Fit" for projects outside your scope
- Add private notes about the project

## Workflow

### For Clients:
1. Visit `/contact`
2. Fill out the project brief form
3. Watch real-time complexity & match scores update
4. Submit
5. Get confirmation message
6. You reach out to them within 24 hours

### For You (Admin):
1. Access `/admin/inquiries`
2. See all incoming projects with stats
3. Review new inquiries (sorted by newest first)
4. Click a project to see full details
5. Update status (Reviewed → Interested → etc.)
6. Add internal notes about budget negotiations, timeline feasibility
7. Reach out to clients directly via email

## Smart Scoring System

### Why Complexity Score Matters:
- **0-30:** Simple data analysis, basic dashboards → Easy scope, quick implementation
- **30-60:** Standard ML/predictive models → Medium complexity, 2-4 month projects
- **60-100:** Advanced deep learning, federated learning, production systems → Complex, enterprise scope

### Match Percentage:
- Correlates with complexity (higher complexity = better match for your expertise)
- Clients can see if their project aligns with your skills
- Helps you quickly identify projects worth pursuing

## Email Notifications
Currently logs to console. Ready to integrate with:
- Resend (recommended for Next.js)
- SendGrid
- AWS SES
- Custom email service

When implemented, you'll receive:
- Instant notification when new project submitted
- Client email included for quick follow-up
- Project complexity score for priority assessment

## Future Enhancements
1. Email notifications when projects submitted
2. Export inquiries to CSV/PDF
3. Calendar integration for client follow-ups
4. Project template matching (auto-match projects to past work)
5. Client communication history tracking
6. Rate limiting to prevent spam

## Access
- **Public:** `/contact` - Anyone can submit
- **Admin:** `/admin/inquiries` - Only you can view
  - Note: Currently no auth gate. Add Supabase RLS or Auth.js for security

## Security Notes
The admin dashboard currently has no authentication. Before going public, add:
- Supabase RLS policies
- NextAuth.js / Auth.js for password protection
- IP whitelisting for additional security
