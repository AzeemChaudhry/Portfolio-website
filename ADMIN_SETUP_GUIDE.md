# Admin Portal Setup & Login Guide

## Quick Start - How to Login as Admin

### Step 1: Access Admin Login
Navigate to: **`/admin/login`** (keep this URL private/secret)

### Step 2: First-Time Setup
On your first visit, you'll be asked to set a password:
- Create a strong password (minimum 8 characters)
- Confirm the password
- Click "Set Admin Password"

### Step 3: Login
Use your newly created password to login. You'll be redirected to the admin dashboard at `/admin`

## Inquiry Management

### How User Inquiries Flow Into Your Admin Dashboard

1. **User Submits Project Brief**
   - User fills out the form at `/contact` (titled "Submit Your AI Project")
   - Form captures: Name, Email, Company, Project Title, Description, Timeline, Budget, Industry
   - AI complexity score is calculated automatically based on keywords

2. **Data Saved to Database**
   - Inquiry saved to `project_inquiries` table in Supabase
   - Status automatically set to "new"
   - Timestamp recorded

3. **Admin Dashboard Shows Inquiries**
   - Dashboard at `/admin` displays:
     - Total inquiries count
     - New inquiries (status: "new")
     - Interested inquiries (status: "interested")
     - Completed projects (status: "completed")
     - Average complexity score

4. **Admin Inquiries Page**
   - Navigate to `/admin/inquiries` to see detailed list
   - Filter by status (new, viewed, interested, negotiating, rejected, completed)
   - Search inquiries by client name or email
   - View full project details

### Managing Inquiries

**View Details**
- Click on any inquiry to see full project description
- AI complexity and match scores are shown
- Client contact information is available

**Update Status**
- Change status based on your communication:
  - `new`: Initial state
  - `viewed`: You've reviewed it
  - `interested`: You want to pursue this
  - `negotiating`: In discussion with client
  - `completed`: Project finished
  - `rejected`: Not a good fit

**Add Admin Notes**
- Add personal notes about the inquiry
- Track follow-up dates and communication
- Keep internal comments

**Delete Inquiries**
- Remove spam or irrelevant inquiries
- Permanently removes from dashboard

## Admin Features

### Dashboard (`/admin`)
- **Quick Stats**: Total, new, interested, completed counts
- **Average Complexity**: See your typical project difficulty
- **Recent Entries**: Latest 5 inquiries
- **Quick Navigation**: Links to inquiries and settings

### Inquiries Page (`/admin/inquiries`)
- **List View**: All inquiries with status filtering
- **Search**: Find inquiries by client name or email
- **Detailed View**: Full project information
- **Status Management**: Update inquiry status
- **Notes**: Add internal comments
- **Deletion**: Remove unwanted inquiries

### Settings Page (`/admin/settings`)
- Admin account management
- System information display
- Password management (planned feature)

## Security & Access

- **Admin Login**: `/admin/login` (hidden from public)
- **Admin Dashboard**: `/admin` (requires authentication)
- **JWT Token**: Stored in localStorage, auto-validated
- **Token Expiry**: Set to 24 hours
- **Logout**: Available in admin sidebar

## Inquiry Database Fields

Each inquiry contains:

```
- client_name (text)
- client_email (email)
- client_company (text, optional)
- project_title (text)
- project_description (text)
- project_type (text, optional)
- timeline_months (number)
- budget_range (text)
- industry (text, optional)
- complexity_score (1-100)
- ai_fit_score (1-100)
- status (new, viewed, interested, negotiating, completed, rejected)
- admin_notes (text, editable)
- priority (low, medium, high, critical)
- created_at (timestamp)
- updated_at (timestamp)
```

## Best Practices

1. **Set a Strong Password**: Use a password manager
2. **Check Regularly**: Review new inquiries daily
3. **Respond Quickly**: Update status as you communicate
4. **Use Notes**: Document all conversations and decisions
5. **Archive Old Entries**: Delete or mark completed projects
6. **Keep URL Private**: Don't share `/admin` or `/admin/login` URLs

## Troubleshooting

**Forgotten Password?**
- Access the admin login at `/admin/login`
- If you forgot your password, you'll need to reset it (admin function)

**Token Expired?**
- You'll be redirected to login automatically
- Simply login again to get a new token

**Inquiry Not Appearing?**
- Check that the form was successfully submitted (green confirmation message)
- Verify the database connection in Supabase
- Check admin dashboard for the inquiry

## API Endpoints (Backend)

All inquiries data flows through these secure endpoints:

- `GET /api/admin/inquiries` - List all inquiries (requires JWT)
- `GET /api/admin/stats` - Dashboard statistics (requires JWT)
- `PATCH /api/admin/inquiries/[id]` - Update inquiry status/notes (requires JWT)
- `DELETE /api/admin/inquiries/[id]` - Delete inquiry (requires JWT)
- `POST /api/submit-inquiry` - Public endpoint for form submissions

All admin endpoints require a valid JWT token in the Authorization header.
