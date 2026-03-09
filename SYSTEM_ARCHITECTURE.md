# System Architecture & Diagrams

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        YOUR PORTFOLIO WEBSITE                            │
└─────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────┐
│                           PUBLIC PAGES                                    │
│  (Home, Projects, About, etc.) - Anyone can access                       │
└──────────────────────────────────────────────────────────────────────────┘
         │
         ├─ /contact ─────────┐
         │  Project Brief Form │
         │  (User Submission)  │
         │                     │
         └─ /admin/login ──────┴─────┐
            Admin Login              │
            (Hidden, link in footer) │
                                     │
┌────────────────────────────────────┴─────────────────────────────────────┐
│                         PROTECTED ROUTES                                  │
│                      (JWT Authentication Required)                        │
├──────────────────────────────────────────────────────────────────────────┤
│  /admin                 Dashboard - Overview & Stats                     │
│  /admin/inquiries       List & Manage - Detailed inquiry management      │
│  /admin/settings        Settings - Account & configuration               │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagram

```
┌──────────────────────────────────────────────────────────────────────────┐
│                           USER SIDE (PUBLIC)                              │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  User Visits Portfolio                                                   │
│     │                                                                    │
│     ├─ Clicks "Submit Project Brief"                                    │
│     │                                                                    │
│     ├─ Fills Form:                                                      │
│     │  ├─ Name, Email, Company                                          │
│     │  ├─ Project Title & Description                                   │
│     │  ├─ Timeline, Budget, Industry                                    │
│     │  └─ Watches AI Complexity Score Update (Real-time)               │
│     │                                                                    │
│     └─ Clicks "Submit Project Brief"                                    │
│          │                                                               │
│          ▼                                                               │
│     POST /api/submit-inquiry                                             │
│     (Public API - No Auth Required)                                     │
│                                                                           │
└──────────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                         BACKEND PROCESSING                                │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  /api/submit-inquiry                                                     │
│  ├─ Validate Input                                                      │
│  │  └─ Check: name, email, title, description (required)               │
│  │                                                                       │
│  ├─ Parse Timeline to Months                                            │
│  │  └─ "3-6 months" → 4 months                                         │
│  │                                                                       │
│  ├─ Validate Complexity Score                                           │
│  │  └─ Ensure 0-100 range                                              │
│  │                                                                       │
│  ├─ Assign Priority                                                     │
│  │  └─ 70+ = High, 40-70 = Medium, <40 = Low                          │
│  │                                                                       │
│  └─ Insert to Supabase                                                  │
│     └─ project_inquiries table                                          │
│                                                                           │
└──────────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                          DATABASE (Supabase)                              │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  ┌─ project_inquiries Table ─────────────────────────────────────────┐  │
│  │                                                                    │  │
│  │  ✓ client_name          "John Doe"                               │  │
│  │  ✓ client_email         "john@company.com"                       │  │
│  │  ✓ client_company       "Tech Corp"                              │  │
│  │  ✓ project_title        "AI Chatbot System"                      │  │
│  │  ✓ project_description  "We need a LLM-based..."                 │  │
│  │  ✓ timeline_months      4                                        │  │
│  │  ✓ budget_range         "50k-100k"                               │  │
│  │  ✓ industry             "FinTech"                                │  │
│  │  ✓ complexity_score     72                                       │  │
│  │  ✓ ai_fit_score         72                                       │  │
│  │  ✓ status               "new"                                    │  │
│  │  ✓ priority             "high"                                   │  │
│  │  ✓ created_at           2026-03-09T10:30:00Z                     │  │
│  │  ✓ admin_notes          (empty, you'll add later)                │  │
│  │                                                                    │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                                                           │
└──────────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                          ADMIN SIDE (YOU)                                 │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  You Visit /admin/login                                                 │
│     │                                                                   │
│     ├─ First Time: Set Admin Password                                  │
│     │     └─ Click "Set Admin Password"                               │
│     │     └─ JWT Token Generated & Stored in localStorage             │
│     │                                                                   │
│     ├─ Returns: Set to /admin Dashboard                               │
│     │                                                                   │
│     ├─ Dashboard Shows:                                               │
│     │  ├─ Total Inquiries: 1                                         │
│     │  ├─ New Inquiries: 1                                           │
│     │  ├─ Average Complexity: 72                                     │
│     │  └─ Recent: John Doe - "AI Chatbot System"                    │
│     │                                                                   │
│     └─ Click "View All Inquiries"                                     │
│          │                                                              │
│          ▼                                                              │
│     Navigate to /admin/inquiries                                       │
│     GET /api/admin/inquiries                                           │
│     (Sends JWT Token in Authorization Header)                          │
│                                                                         │
│  Inquiries Page Shows:                                                 │
│  ├─ John Doe | AI Chatbot | NEW | 72 complexity | 10 mins ago        │
│  │                                                                     │
│  └─ Click to Expand:                                                  │
│     ├─ Read Full Project Description                                 │
│     ├─ Add Admin Note: "Great fit. Contact tomorrow."                │
│     ├─ Change Status: new → interested                               │
│     └─ Save Changes                                                  │
│          │                                                             │
│          ▼                                                             │
│     PATCH /api/admin/inquiries/uuid-123                               │
│     (Authenticated with JWT)                                          │
│     Body: { status: "interested", admin_notes: "Great fit..." }       │
│          │                                                             │
│          ▼                                                             │
│     Database Updated                                                  │
│     Inquiry status changed to "interested"                            │
│     Notes saved                                                       │
│                                                                         │
│  You Email John Directly (Outside System)                              │
│  Once Agreed:                                                          │
│  ├─ Update Status to "completed"                                     │
│  ├─ Add Final Notes: "Project finished. Delivered Dec 2024."          │
│  └─ Archive (keep for records)                                        │
│                                                                           │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## Authentication Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      LOGIN & TOKEN FLOW                                  │
└─────────────────────────────────────────────────────────────────────────┘

1. USER VISITS /admin/login
   │
   ├─ Check if already authenticated
   │  └─ Valid token in localStorage? YES → Redirect to /admin
   │                                   NO  → Show login form
   │
   └─ First Time Setup
      │
      ├─ User sets password
      │  ├─ Password → Hash with ADMIN_PASSWORD_SALT
      │  └─ Store hashed password in admin table
      │
      ├─ POST /api/admin/setup-password
      │  └─ Backend validates, stores hash, returns message
      │
      └─ Redirect to login
         │
         └─ User logs in with password

2. LOGIN ATTEMPT
   │
   ├─ User enters password
   │
   ├─ POST /api/admin/login
   │  ├─ Validate password against stored hash
   │  │
   │  ├─ If Valid:
   │  │  ├─ Create JWT Token
   │  │  │  └─ Payload: { admin: true, exp: +24h }
   │  │  ├─ Sign with ADMIN_JWT_SECRET
   │  │  └─ Return token to client
   │  │
   │  └─ If Invalid:
   │     └─ Return error "Invalid password"
   │
   └─ Client stores token in localStorage
      └─ localStorage.setItem('adminToken', token)

3. ACCESSING PROTECTED ROUTES
   │
   ├─ Middleware checks every /admin/* request
   │  ├─ Get token from localStorage
   │  ├─ Verify token with ADMIN_JWT_SECRET
   │  │
   │  ├─ If Valid:
   │  │  └─ Allow access to page
   │  │
   │  └─ If Invalid/Expired:
   │     └─ Redirect to /admin/login
   │
   └─ API requests include JWT in header
      └─ Authorization: Bearer {token}

4. PROTECTED API ENDPOINTS
   │
   ├─ Request comes with JWT
   │
   ├─ Route handler verifies JWT
   │  ├─ Check signature
   │  ├─ Check expiration
   │  │
   │  ├─ If Valid:
   │  │  └─ Process request (get/update/delete inquiries)
   │  │
   │  └─ If Invalid:
   │     └─ Return 401 Unauthorized
   │
   └─ Response returned to client

5. LOGOUT
   │
   ├─ User clicks logout
   │
   ├─ Frontend clears token
   │  └─ localStorage.removeItem('adminToken')
   │
   ├─ Navigate to /admin/login
   │  │
   │  └─ Middleware detects no token
   │     └─ Allows access to login page
   │
   └─ User must login again
      └─ Repeat from Step 2
```

---

## Component Hierarchy

```
Root Layout (app/layout.tsx)
│
├─ Providers (components/providers.tsx)
│  └─ LanguageProvider
│     └─ AdminProvider (hooks/useAdmin.tsx)
│
├─ Public Pages
│  ├─ Home (app/page.tsx)
│  ├─ Contact (app/contact/page.tsx)
│  │  └─ ProjectBriefForm (components/project-brief-form.tsx)
│  ├─ Portfolio (sections)
│  └─ Footer (components/footer.tsx)
│     └─ Admin Link (hidden, subtle)
│
└─ Protected Admin Pages (middleware authenticated)
   │
   ├─ Admin Layout (app/admin/layout.tsx)
   │  └─ ProtectedAdminLayout (components/admin-layout.tsx)
   │     ├─ AdminSidebar (components/admin-sidebar.tsx)
   │     │  ├─ Dashboard Link
   │     │  ├─ Inquiries Link
   │     │  ├─ Settings Link
   │     │  └─ Logout Button
   │     │
   │     └─ Page Content
   │        ├─ Dashboard (app/admin/page.tsx)
   │        │  └─ Stats Cards, Quick Links
   │        ├─ Inquiries (app/admin/inquiries/page.tsx)
   │        │  ├─ Filter Controls
   │        │  ├─ Inquiry List
   │        │  └─ Detail View
   │        └─ Settings (app/admin/settings/page.tsx)
   │           └─ Account Info
```

---

## API Endpoint Map

```
PUBLIC ENDPOINTS (No Authentication)
├─ POST /api/submit-inquiry
│  ├─ Input: { name, email, company, projectTitle, projectDescription, timeline, budget, industry, complexity_score, ai_fit_score }
│  └─ Output: { success: true, inquiryId: "uuid" }
│
└─ GET /api/ (health check)
   └─ Output: { status: "ok" }

ADMIN ENDPOINTS (JWT Required in Authorization Header)
├─ POST /api/admin/login
│  ├─ Input: { password }
│  └─ Output: { token: "jwt...", message: "Login successful" }
│
├─ POST /api/admin/setup-password
│  ├─ Input: { password }
│  └─ Output: { message: "Password set successfully" }
│
├─ POST /api/admin/logout
│  ├─ Input: (none)
│  └─ Output: { message: "Logged out" }
│
├─ GET /api/admin/stats
│  ├─ Input: (JWT in header)
│  └─ Output: { total: 5, new: 2, interested: 1, completed: 2, avgComplexity: 65 }
│
├─ GET /api/admin/inquiries
│  ├─ Input: (JWT in header, optional ?status=new)
│  └─ Output: [ { ...inquiry }, { ...inquiry } ]
│
├─ PATCH /api/admin/inquiries/[id]
│  ├─ Input: { status?, admin_notes?, priority? }
│  └─ Output: { ...updated_inquiry }
│
└─ DELETE /api/admin/inquiries/[id]
   ├─ Input: (JWT in header)
   └─ Output: { success: true, message: "Inquiry deleted" }
```

---

## Database Relationships

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           Supabase Database                              │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  TABLE: admin_accounts                                                  │
│  ┌────────────────────────────────────────────────────────────────┐    │
│  │ id: UUID                                                       │    │
│  │ password_hash: TEXT (bcrypt hashed)                            │    │
│  │ created_at: TIMESTAMP                                          │    │
│  │ last_login: TIMESTAMP                                          │    │
│  └────────────────────────────────────────────────────────────────┘    │
│                                                                          │
│  TABLE: project_inquiries                                               │
│  ┌────────────────────────────────────────────────────────────────┐    │
│  │ id: UUID                      ← Primary Key                    │    │
│  │ client_name: TEXT                                              │    │
│  │ client_email: TEXT                                             │    │
│  │ client_company: TEXT                                           │    │
│  │ project_title: TEXT                                            │    │
│  │ project_description: TEXT                                      │    │
│  │ timeline_months: INTEGER                                       │    │
│  │ budget_range: TEXT                                             │    │
│  │ industry: TEXT                                                 │    │
│  │ complexity_score: INTEGER (0-100)                              │    │
│  │ ai_fit_score: INTEGER (0-100)                                  │    │
│  │ status: VARCHAR (new, viewed, interested, negotiating, etc)    │    │
│  │ priority: VARCHAR (low, medium, high, critical)                │    │
│  │ admin_notes: TEXT                                              │    │
│  │ assigned_to: VARCHAR                                           │    │
│  │ created_at: TIMESTAMP                                          │    │
│  │ updated_at: TIMESTAMP                                          │    │
│  │ follow_up_date: TIMESTAMP                                      │    │
│  │ responded_at: TIMESTAMP                                        │    │
│  └────────────────────────────────────────────────────────────────┘    │
│                                                                          │
│  INDEX: idx_project_inquiries_status (for fast filtering)               │
│  INDEX: idx_project_inquiries_created_at (for sorting)                 │
│  INDEX: idx_project_inquiries_complexity (for analysis)                 │
│  INDEX: idx_project_inquiries_email (for lookup)                        │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Security Boundaries

```
┌───────────────────────────────────────────────────────────────────────┐
│                      SECURITY PERIMETER                               │
└───────────────────────────────────────────────────────────────────────┘

PUBLIC SIDE (Unprotected)
┌─────────────────────────────┐
│ /contact                    │  ← Anyone can access
│ /submit-inquiry API         │  ← Public endpoint
│ User sees form              │
│ User submits project brief  │
└─────────────────────────────┘

🔐 SECURITY BOUNDARY 🔐
   └─ JWT Authentication Required
   └─ Valid Token in localStorage
   └─ Token Signature Verification

PROTECTED SIDE (Admin Only)
┌─────────────────────────────┐
│ /admin/*                    │  ← JWT Required
│ /api/admin/*                │  ← JWT Required
│ Admin sees dashboard        │
│ Admin manages inquiries     │
│ Supabase Service Role Key   │  ← Server-side only
│ Database Access             │  ← Only via API
└─────────────────────────────┘

Environment Variables
├─ NEXT_PUBLIC_SUPABASE_URL     ← Public (in client bundle)
├─ SUPABASE_SERVICE_ROLE_KEY    ← SECRET (server-only)
├─ ADMIN_PASSWORD_SALT          ← SECRET (server-only)
└─ ADMIN_JWT_SECRET             ← SECRET (server-only)
```

---

## Error Handling Flow

```
User Action
│
├─ Submit Form
│  └─ /api/submit-inquiry
│     ├─ Validation Error?
│     │  └─ Return 400: "Missing required fields"
│     ├─ Database Error?
│     │  └─ Return 500: "Failed to submit inquiry"
│     └─ Success?
│        └─ Return 201: { success: true, inquiryId }
│
├─ Login
│  └─ /api/admin/login
│     ├─ Wrong Password?
│     │  └─ Return 401: "Invalid password"
│     ├─ Server Error?
│     │  └─ Return 500: "Login failed"
│     └─ Success?
│        └─ Return 200: { token: "jwt..." }
│
└─ Access /admin
   └─ Middleware Check
      ├─ No Token?
      │  └─ Redirect to /admin/login
      ├─ Invalid/Expired Token?
      │  └─ Redirect to /admin/login
      └─ Valid Token?
         └─ Allow Access to /admin

API Requests
│
├─ GET /api/admin/inquiries
│  └─ No JWT?
│     └─ Return 401 Unauthorized
│     └─ Redirect to login
│
├─ PATCH /api/admin/inquiries/[id]
│  └─ JWT Invalid?
│     └─ Return 401
│     └─ ID not found?
│        └─ Return 404: "Inquiry not found"
│     └─ Update failed?
│        └─ Return 500: "Update failed"
│
└─ DELETE /api/admin/inquiries/[id]
   └─ Unauthorized?
      └─ Return 401
   └─ Already deleted?
      └─ Return 404
```

---

## Summary

- **Public Layer**: Users submit forms without authentication
- **API Layer**: All data processing handled by secure endpoints
- **Database Layer**: Supabase stores all inquiries with RLS policies
- **Admin Layer**: Protected routes requiring JWT authentication
- **Security**: No secrets exposed to client, all auth server-side

This architecture ensures users can easily submit projects while keeping your admin portal completely secure and private.
