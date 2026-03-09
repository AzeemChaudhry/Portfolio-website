# Quick Reference Card

## For You (Admin)

### Access Points
| Page | URL | Purpose |
|------|-----|---------|
| Admin Login | `/admin/login` | Initial login and password setup |
| Dashboard | `/admin` | Overview of all inquiries |
| Inquiries List | `/admin/inquiries` | Detailed list with filtering |
| Settings | `/admin/settings` | Account & system settings |

### Keyboard Shortcuts (Coming Soon)
- `Ctrl + K`: Search inquiries
- `Ctrl + N`: View new inquiries only
- `Ctrl + L`: Logout

### Status Meanings
| Status | Meaning | Action |
|--------|---------|--------|
| `new` | Not reviewed yet | Review & decide |
| `viewed` | You've looked at it | Decide next steps |
| `interested` | You want to pursue | Reach out to client |
| `negotiating` | In active discussion | Update progress in notes |
| `completed` | Project finished | Archive/close |
| `rejected` | Not a good fit | Archive |

### Priority Levels
| Priority | When | Complexity |
|----------|------|-----------|
| Critical | Urgent, high value | 80-100 |
| High | Important fit | 70-79 |
| Medium | Standard projects | 40-69 |
| Low | Simpler projects | 0-39 |

---

## For Users (Public)

### Form Fields
```
REQUIRED:
✓ Full Name
✓ Email
✓ Project Title
✓ Project Description

OPTIONAL:
○ Company
○ Industry
○ Timeline (default: 3-6 months)
○ Budget (default: 50k-100k)
```

### What Happens After Submit
1. ✓ Form shows green "Received" confirmation
2. ✓ Inquiry appears in your admin dashboard
3. ✓ You can review and respond
4. ✓ You contact them directly when ready

---

## Database Fields Reference

### inquiry_id
UUID, auto-generated

### client_name (TEXT, REQUIRED)
Full name of the person submitting

### client_email (TEXT, REQUIRED)
Email address for contact

### client_company (TEXT, OPTIONAL)
Company or organization name

### project_title (TEXT, REQUIRED)
Title of the project

### project_description (TEXT, REQUIRED)
Detailed project description

### project_type (TEXT, OPTIONAL)
Type: ML Model, NLP, Vision, Chatbot, RAG, etc.

### timeline_months (INTEGER)
0 (Immediate), 2, 4, 9, 18 (12+ months)

### budget_range (TEXT)
Budget bracket selected by user

### industry (TEXT, OPTIONAL)
FinTech, Healthcare, E-commerce, etc.

### complexity_score (0-100, AUTO)
Auto-calculated from keywords in description

### ai_fit_score (0-100, AUTO)
How well it matches your expertise

### status (VARCHAR, DEFAULT: 'new')
Current status of the inquiry

### admin_notes (TEXT)
Your internal notes (editable)

### priority (VARCHAR)
Auto-set based on complexity_score

### created_at (TIMESTAMP)
When user submitted

### updated_at (TIMESTAMP)
When last modified

---

## Scoring Algorithm

### Complexity Score Calculation

**High Value Keywords** (+25 each):
- federated learning, reinforcement learning
- generative, GPT, LLM, transformer
- neural, deep learning
- computer vision, NLP, production ML, MLOps

**Medium Value Keywords** (+12 each):
- prediction, classification, clustering
- regression, sentiment, recommendation
- anomaly, automation, data science

**Low Value Keywords** (+5 each):
- analysis, reporting, dashboard
- analytics, visualization

**Length Bonuses**:
- 200+ characters: +10
- 500+ characters: +15

**Cap**: Maximum 100 points

### Example
```
Description: "We need a large language model for customer service automation"

Keywords found:
- "language model" (LLM context): +25
- "automation": +12
- 50 characters: 0 bonus
= 37 points (Medium complexity)
```

---

## Security Checklist

- [ ] Password set (8+ characters, strong)
- [ ] Logged in successfully
- [ ] `/admin` redirects to dashboard
- [ ] `/admin/inquiries` shows list
- [ ] Can view full inquiry details
- [ ] Can update status
- [ ] Can add notes
- [ ] Logout works

---

## Maintenance Checklist

### Daily
- [ ] Check for new inquiries
- [ ] Update inquiry statuses
- [ ] Respond to interested projects

### Weekly
- [ ] Archive completed projects
- [ ] Delete spam inquiries
- [ ] Review notes and priorities

### Monthly
- [ ] Export/backup inquiry data
- [ ] Review project success rate
- [ ] Analyze complexity trends

---

## Common Issues & Fixes

### Issue: Token Expired
**Fix**: Logout and login again (auto-redirect)

### Issue: Can't See Inquiry
**Fix**: Check if it's in the correct status filter

### Issue: Form Won't Submit
**Fix**: Check all required fields filled (Name, Email, Title, Description)

### Issue: Score Not Updating
**Fix**: Click elsewhere and back, page might need refresh

---

## API Endpoints (For Developers)

### Public
```
POST /api/submit-inquiry
- No auth required
- Body: form data
- Returns: { success, inquiryId }
```

### Admin (Require JWT Token)
```
GET /api/admin/inquiries
- Header: Authorization: Bearer {token}
- Returns: [ {...inquiry} ]

GET /api/admin/stats
- Header: Authorization: Bearer {token}
- Returns: { total, new, interested, completed, avgComplexity }

PATCH /api/admin/inquiries/[id]
- Header: Authorization: Bearer {token}
- Body: { status, admin_notes, priority }
- Returns: updated inquiry

DELETE /api/admin/inquiries/[id]
- Header: Authorization: Bearer {token}
- Returns: { success }
```

---

## Quick Links

| Link | Purpose |
|------|---------|
| `/` | Portfolio home |
| `/contact` | Submit project brief form |
| `/admin/login` | Admin login (keep private) |
| `/admin` | Admin dashboard |
| `/admin/inquiries` | Inquiry list & management |
| `/admin/settings` | Admin settings |

---

## Need Help?

Check these docs in order:
1. **QUICK_REFERENCE.md** (this file) - Quick answers
2. **USER_INQUIRY_SYSTEM.md** - Detailed user & inquiry system guide
3. **ADMIN_SETUP_GUIDE.md** - Admin login and setup guide
4. **PROJECT_INQUIRY_SYSTEM.md** - Technical documentation
