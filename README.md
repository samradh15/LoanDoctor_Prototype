Build a complete single-file React JSX mobile app prototype for 
"Loan Doctor Fintech" — a role-based platform where one app serves 
five different user types. The role selected at login determines 
which interface opens. This is a production-grade, investor-ready 
Antigravity prototype.

Output ONE file: loan-doctor-platform.jsx

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DESIGN SYSTEM (same across ALL roles)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Colors:
  bg:           #111510
  card1:        #1C2118
  card2:        #242B20
  clay:         #C84B0C   ← primary action
  teal:         #4CC9A0   ← success / AI / positive
  amber:        #F5A623   ← warning / pending
  red:          #E05252   ← rejection / alert
  textPrimary:  #EDF0E8
  textMuted:    #7A8072
  border:       rgba(237,240,232,0.07)
  borderMid:    rgba(237,240,232,0.12)

Role accent colors (used in role badges and nav highlights):
  Customer:       #C84B0C  (clay)
  Sales Exec:     #4CC9A0  (teal)
  Team Leader:    #F5A623  (amber)
  Franchisee:     #A78BFA  (purple)
  Administrator:  #60A5FA  (blue)

Typography (Google Fonts):
  Fraunces 400/600/700/900     → headings, numbers
  Plus Jakarta Sans 400/500/600/700 → body, labels
  Syne Mono                    → tags, badges, timestamps, mono data

Rules:
  Cards: 1px border rgba(237,240,232,0.07), radius 14px
  Nested cards: radius 10px
  CTAs: radius 13px, clay shadow 0 4px 20px rgba(200,75,12,0.35)
  Chips/tags: radius 5px (NOT pill), Syne Mono
  Input fields: height 48px, bg card2, border border, radius 10px
  Section labels: Syne Mono, 9px, letterSpacing 1.5px, textMuted
  Mobile frame: 375×812px, radius 46px, dark desktop bg #0A0A0A
  Dynamic island: 116×32px black pill, top center, z-index 999

CSS Animations required:
  fadeUp     — screen entry 0.3s ease
  slideUp    — bottom sheet cubic-bezier(.16,1,.3,1)
  slideLeft  — screen push from right
  rA/rB/rC   — voice ring pulses (2.4s, different delays)
  sBar       — sound bar scaleY (0.9s staggered)
  blink      — status dots 1.2s
  spin       — loader 0.7s linear
  strokeIn   — SVG checkmark draw
  popIn      — scale from 0 cubic-bezier
  msgIn      — chat message slide up 0.22s
  dotP       — timeline dot pulse 1.2s
  badgeP     — offer badge pulse 2s
  fabP       — floating button ring pulse 2s
  countUp    — number animation on dashboard mount
  shimmer    — skeleton loading state

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ONBOARDING — SHARED (all roles)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

S01 — SPLASH
  Centered Loan Doctor cross logo in rounded square (clay)
  "YOUR LOAN. OUR PRESCRIPTION." Syne Mono, spaced
  Clay radial glow background
  Dot progress indicator (first dot wider, clay)
  Auto-advance to S02 after 2.5s

S02 — WHY CHOOSE US
  Top illustration zone (200px): two dashed concentric circles,
  cross icon centered, "TRUSTED BY 50,000+ USERS" badge
  3 value prop cards:
    AI Voice Matching (clay icon)
    200+ Verified Schemes (teal icon)
    6 Indian Languages (amber icon)
  "Get Started" clay CTA → S03

S03 — LANGUAGE SELECT
  2-col grid, 6 tiles: हिंदी · English · Tamil · Telugu · Marathi · Punjabi
  Selected: clay border + popIn checkmark badge
  CTA label changes to selected language → S04

S04 — ROLE SELECT ← PROTOTYPE ONLY, replaces OTP
  Heading: "Select Your Role"
  Subtext: "This is a prototype — pick a role to preview that experience"
  
  5 role cards in vertical list, each tappable:
  
  ┌─────────────────────────────────────────┐
  │  👤  Customer                           │
  │      "Apply for loans & track status"   │
  │      Clay accent dot                    │
  └─────────────────────────────────────────┘
  ┌─────────────────────────────────────────┐
  │  🤝  Sales Executive                    │
  │      "Create leads & collect documents" │
  │      Teal accent dot                    │
  └─────────────────────────────────────────┘
  ┌─────────────────────────────────────────┐
  │  👥  Team Leader                        │
  │      "Manage team & track performance"  │
  │      Amber accent dot                   │
  └─────────────────────────────────────────┘
  ┌─────────────────────────────────────────┐
  │  🏢  Franchisee                         │
  │      "Oversee branch & revenue"         │
  │      Purple accent dot                  │
  └─────────────────────────────────────────┘
  ┌─────────────────────────────────────────┐
  │  ⚙️  Administrator                      │
  │      "Full system control"              │
  │      Blue accent dot                    │
  └─────────────────────────────────────────┘
  
  Selected card: role accent color border + checkmark
  "Enter as [Role Name]" clay CTA
  → Routes to respective home based on selected role

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ROLE 1 — CUSTOMER APP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
After role select → S06 Voice Welcome (skip marketing page)
Marketing page only accessible from call-booked screen.

─────────────────────────────────
S06 — Voice AI Welcome
─────────────────────────────────
Dark screen #0E1210, teal radial glow
"AI ADVISOR ACTIVE" Syne Mono label
3 pulsing rings (rA/rB/rC, different delays and opacities)
Teal cross icon in 70px circle at center
Hindi speech bubble from AI below rings
8-bar sound equalizer (staggered sBar)
Large clay mic button at bottom (54px circle)
"Tap to respond" Syne Mono label
Ghost CTA: "Prefer to talk to a person?" → S09_Request_Call

─────────────────────────────────
S07 — AI Chatbot Interface (MAIN CONVERSATION SCREEN)
─────────────────────────────────
This is a full persistent chatbot UI.

Header:
  Back button
  AI avatar (teal cross in circle, 30px)
  "Loan Doctor AI" + "Live" blinking teal dot
  "Specialist" ghost button (clay outline, top-right) → S09

Chat area (flex:1, scrollable):
  Messages stream in with 850ms delay:
    AI: "नमस्ते! आपका स्वागत है। किस purpose के लिए loan 
         चाहते हैं?"
    User: "Business expand के लिए — कपड़े की दुकान है।"
    AI: "Business कितने साल पुराना है? Monthly turnover?"
    User: "3 साल पुराना, ₹40,000 monthly।"
    AI: "Aadhaar, PAN, 6 months bank statement available?"
    User: "हाँ, सब available हैं।"
    AI: "Perfect! Profile analyse हो रहा है…"
    [1800ms pause → RESULT BLOCK appears inline]

  RESULT BLOCK (full width inside chat):
    Pill: blinking teal dot + "AI MATCHED 3 SCHEMES FOR YOU"
    3 scheme cards (tappable → SchemeDetail, passes data):
      Card 1: MUDRA Tarun | Up to ₹10L | 8.5% p.a. | 94%
        "BEST MATCH" ribbon (clay, top-right corner)
      Card 2: CGTMSE Scheme | Up to ₹5L | 9.2% p.a. | 87%
      Card 3: PM SVANidhi | Up to ₹5L | 7% p.a. | 81%
    Full-width clay CTA: "Explore All Schemes →" → SchemesBrowser
    Ghost text link: "Talk to a specialist →" → S09

Input bar (fixed bottom):
  Text field: "Type or tap mic…"
  Clay mic circle button (right)

─────────────────────────────────
SchemesBrowser — Blinkit-Style Scheme Browsing
─────────────────────────────────
Search bar
Location pill (clay) → LocSheet (State + City dropdowns + GPS button)
Filter button
Central / State sliding toggle
Category swimlanes (horizontal scroll per category):
  Central: Business Loans · Small Traders · Agriculture · Women Schemes
  State: Business Loans · Startups · Agriculture

Scheme card (minWidth 152px):
  Tag badge if applicable (clay, top)
  Cross icon in clay bg square
  Title + Ministry label
  Amount (clay mono) + Rate (teal mono)
  Tappable → SchemeDetail

FLOATING CONSULTANT BUTTON (only in pre-purchase browse):
  Bottom-right, 52px circle, clay bg
  Person icon (white)
  "Consult" label beneath
  fabP pulsing ring animation
  On tap → S09_Request_Call
  Hide after hasPurchase=true

Scheme Data — Central:
  Business Loans:
    MUDRA Tarun | PM Mudra Yojana | ₹10L | 8.5% | 5yr | tag:🔥 Popular
    MUDRA Kishore | PM Mudra Yojana | ₹5L | 8.2% | 5yr
    CGTMSE | Min. MSME | ₹5L | 9.2% | 7yr | tag: No Collateral
  Small Traders:
    PM SVANidhi | Min. Housing | ₹5L | 7% | 3yr | tag: ⚡ Fast
    MUDRA Shishu | PM Mudra Yojana | ₹50K | Low | 3yr
  Agriculture:
    Kisan Credit Card | NABARD | ₹3L | 4% | 1yr | tag: ⚡ Fast
    PM Fasal Bima | Min. Agriculture | Crop cover | 1.5%
  Women Schemes:
    Mahila Udyam Nidhi | SIDBI | ₹10L | 7.5% | 10yr | tag: Women Only
    Stree Shakti | SBI | ₹25L | 0.5% off | 5yr

Scheme Data — State (Tamil Nadu default):
  Business: TNSCB Loan | ₹3L | 6.5% | 5yr
            MSME TN | ₹10L | 8% | 7yr | tag: State Special
  Startups: Kalaignar Startup | ₹5L | 0% | 3yr | tag: 0% Interest
  Agriculture: NABARD Rural TN | ₹2L | 4% | 2yr

─────────────────────────────────
SchemeDetail — Full Scheme Page
─────────────────────────────────
Back button + scheme name header + tag chip

YouTube video thumbnail:
  Dark gradient bg, large play button centered
  Duration pill bottom-right
  Title overlay bottom-left with clay dot

2×2 stats grid:
  Loan Amount (clay) | Interest Rate (teal)
  Tenure (teal) | Collateral (teal if None, amber otherwise)

"✅ Eligibility Checklist" card:
  4 items with teal check circles

"📄 Documents Required" card:
  7 items: Aadhaar · PAN · Photo · Bank Statement ·
           Project Report (DPR) · Quotations · Category Certificate
  Each with clay bullet dot

"⚡ How It Works" card:
  4 numbered steps (clay number circles):
  1. Apply via Loan Doctor
  2. Documents verified in 24hrs
  3. Lender assigns case
  4. Disbursed in 5–7 working days

BEFORE PURCHASE — 2 CTAs:
  Primary (clay): "Continue & Buy — Apply for [Scheme]" → Payment
  Secondary (ghost): "Consult a Specialist First" → SpecialistConfirm

AFTER PURCHASE — 1 CTA:
  "Apply for [Scheme]" (clay)
  No specialist CTA

─────────────────────────────────
SpecialistConfirm — Book Consultation
─────────────────────────────────
Agent card:
  Clay avatar, "Ramesh K. — Senior Loan Advisor"
  "Free 20-min · No commitment"
  ★★★★★ 4.9 · "847 consultations done"

Date row (horizontal scroll, 5 days):
  Today · Tomorrow · Wed 5 · Thu 6 · Fri 7
  Selected: clay pill

Time slot grid (2 cols × 3 rows):
  10:00 AM · 11:30 AM · 1:00 PM
  2:30 PM · 4:00 PM · 5:30 PM
  Selected: clay border + checkmark

Scheme reference chip (clay) — scheme name pre-filled

"Confirm Consultation" clay CTA → SpecialistBooked
"Skip — Explore All Schemes" ghost text → SchemesBrowser

─────────────────────────────────
SpecialistBooked — Confirmation
─────────────────────────────────
Dark screen, teal glow
Pulsing teal calendar/check icon
"Consultation Confirmed!"
3 info cards:
  📱 Google Meet link sent to WhatsApp
  📅 Date · Time · 20 minutes
  📋 Ref: LD-CONSULT-2024-12 · [Scheme Name]
Primary CTA (clay): "Explore All Schemes" → SchemesBrowser
Ghost: "Go to Home" → MarketingHome

─────────────────────────────────
S09 — Request a Call
─────────────────────────────────
"Free Expert Consultation" teal info card
Pre-filled name + mobile
Loan purpose dropdown (6 options)
3 time slot options (clay when selected):
  Morning 9–12 / Afternoon 12–4 / Evening 4–7
"Request Callback" clay CTA → S10_CallBooked
"100% free · No spam · Cancel anytime" notice

─────────────────────────────────
S10 — Call Booked
─────────────────────────────────
Dark screen, teal glow
Pulsing teal call icon
"Callback Booked!"
Agent card: Ramesh K., time slot, REF: LD-CALL-2024-041
WhatsApp confirmation notice
"Explore App While You Wait" clay CTA → MarketingHome

─────────────────────────────────
MarketingHome (accessible after call booked)
─────────────────────────────────
Hero: AI eligibility CTA + "Talk to Specialist" ghost
Achievement bar: ₹47Cr+ · 50K+ · 200+ · 98%
Live Offers (horizontal scroll, pulsing badges)
Video Library (horizontal scroll, 3 thumbnails)
Success Stories (3 testimonial cards with stars)
Bottom repeat CTA

─────────────────────────────────
Payment Screen
─────────────────────────────────
Header: "Choose Your Plan" / scheme name

TOKEN AMOUNT card (₹999):
  Features: Agent in 2hrs, doc help, submission
  Radio selector

FULL SERVICE card (₹10,000):
  "RECOMMENDED ★" teal ribbon
  Features: Priority, dedicated agent, 1hr response,
  end-to-end, 6mo follow-up
  Radio selector

3 payment tiles: GPay/UPI · Card · Net Banking
"Pay [₹999 / ₹10,000] Securely" clay CTA + lock icon
Spinner 1.8s → PaySuccess
"256-bit SSL · Razorpay Secured" notice

─────────────────────────────────
PaySuccess
─────────────────────────────────
Dark screen, teal glow
Animated SVG strokeIn checkmark
"Payment Successful!"
3 cards:
  Invoice sent to WhatsApp (wa icon)
  Ramesh K. — Your Agent (clay)
  Case Ref: LD-2024-038 (teal)
"Open My Application" clay CTA → Customer Main App

─────────────────────────────────
CUSTOMER MAIN APP (5-tab nav, post purchase)
─────────────────────────────────
Tabs: Home · Schemes · My App · Chat · Profile

FLOATING MIC BUTTON (all tabs except Chat):
  Bottom-right, 52px clay circle, above nav bar
  Mic icon (white), fabP pulsing ring
  Tooltip: "Ask AI"
  On tap → opens S07 chatbot as overlay
  Hidden when navTab === "chat"

TAB 1 — HOME (full marketing + status hybrid):
  Application status card (clay border):
    "MUDRA Tarun Loan" + "IN REVIEW" amber badge
    Progress bar 35% animates on mount (clay→amber gradient)
    4-step timeline:
      Applied ✓ (clay) → Docs ✓ (clay) →
      Review ⟳ (amber pulsing dot) → Approved ○ (gray)
  Quick actions: "Upload Docs" → myapp tab | "Chat Agent" → chat tab
  Achievement strip: ₹47Cr+ · 50K+ · 98%
  Video Library (horizontal scroll, 3 videos)
  Success Stories (3 testimonial cards)
  Live Offers (horizontal scroll, 2 offer cards)
  Other Schemes You May Like (horizontal scroll, 3 chips)

TAB 2 — SCHEMES:
  Same SchemesBrowser component
  showSpec=false (no specialist CTA after purchase)
  No floating consultant button
  Floating mic remains

TAB 3 — MY APPLICATION (full dashboard):
  Header card (clay border):
    "MY APPLICATION" mono
    "MUDRA Tarun Loan" serif + "LD-2024-038" clay chip
    "IN REVIEW" amber badge
    Large progress bar 35% (animates 0→35% on mount)
    "Step 2 of 4 — Document Verification"
  
  APPLICATION JOURNEY section (vertical timeline):
    ✓ Application Submitted — Mar 1 · 10:32 AM (clay, done)
    ✓ Payment Received ₹999 — Mar 1 · 10:35 AM (clay, done)
    ⟳ Document Verification (amber, current, pulsing dot):
      "2 of 4 documents uploaded"
      Inline mini doc status:
        Aadhaar ✓ · PAN ✓ · Bank Statement ✗ · Business Proof ✗
      Small "Upload Missing Docs" clay button → upload sheet
    ○ Loan Disbursement (gray, future):
      "Expected 5–7 working days after approval"
  
  DOCUMENT CHECKLIST section:
    "2 of 4 uploaded" + progress bar (clay→amber)
    7 document cards:
      Aadhaar Card ✓ (teal border)
      PAN Card ✓ (teal border)
      Photograph ✗ (clay border + Upload button)
      Bank Statement ✗ (clay border + Upload button +
        warning: "All 6 months must be from same account")
      Project Report (DPR) ✗ (clay border + Upload button)
      Quotations ✗ (clay border + Upload button)
      Category Certificate — Optional (gray border + Add button)
    Upload tap → Sheet with Camera / Browse Files
    Tapping option → marks doc uploaded, clay→teal transition
    Encryption notice (lock icon)
    "Submit All Documents" CTA — disabled until 7/7 required, then clay
  
  RECENT UPDATES section:
    "Documents received" — teal left border — Mar 2 · 9:41 AM
    "Action required: Upload Bank Statement" — clay left border — Today

TAB 4 — CHAT:
  Agent header:
    Avatar with online teal dot
    "Ramesh K." + "Loan Advisor · MUDRA Tarun"
    Call + video icons right
  Case reference strip: LD-2024-038 (clay)
  4 messages (staggered msgIn):
    System: "Case registered. Ramesh K. assigned." (teal full-width)
    Agent: "Namaste Rahul ji! Please upload Bank Statement…"
    User: "Done, uploaded ✓"
    System: "Documents received. Review in progress." (teal full-width)
  Input bar + mic button (NO floating mic on this tab)

TAB 5 — PROFILE:
  "RK" initials avatar + Rahul Kumar + Edit pill
  Mini app card: MUDRA Tarun + IN REVIEW + 35% bar
  Settings groups:
    ACCOUNT: Language · Notifications toggle (working) · Mobile
    SUPPORT: Contact Agent · Help & FAQ · Report Issue
    LEGAL: Privacy Policy · Terms of Service
  Log Out ghost button

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ROLE 2 — SALES EXECUTIVE APP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
After role select → Sales Executive Home

Bottom nav (4 tabs): Home · Leads · Checklist · Profile

─────────────────────────────────
SE_Home — Sales Executive Dashboard
─────────────────────────────────
Header:
  "Good morning 👋"
  "Arjun Singh — Sales Executive"
  Teal role badge: "SALES EXEC"
  Bell icon with notification dot

WEEKLY EARNINGS TRACKER CARD (most prominent, full width):
  Background: dark gradient with teal glow
  "THIS WEEK'S COLLECTION" mono label
  Large number: ₹38,400 (countUp animation on mount)
  Current slab indicator:
    "GROWTH PERFORMER" amber badge
    "8% incentive active"
  Progress bar showing gap to next slab:
    Clay fill to 78% (₹38,400 of ₹50,000)
    "₹11,600 more to reach HIGH PERFORMER (10%)"
    Animated shimmer on bar
  This week's incentive: ₹3,072 (8% of ₹38,400)
  "If you reach ₹50,000 → earn ₹5,000 + ₹1,500 bonus"
  
  Slab ladder visualization (4 rows):
    ○ Starter  ₹25K–₹35K   5%     (gray)
    ✓ Growth   ₹35K–₹50K   8%     (teal — CURRENT)
    ○ High     ₹50K–₹1L    10% + ₹1,500 bonus  (gray)
    ○ Superstar ₹1L+       10% + ₹3,000 bonus  (gray)
  
  "Week: Sunday – Saturday" Syne Mono footer

KPI ROW (4 cards, horizontal):
  My Leads: 12 | Converted: 4 | Pending: 6 | Approved: 2
  Each card: Syne Mono number (large, colored), label below

RECENT LEADS section:
  3 lead cards:
    Lead name + loan type + amount + status chip
    Status chips: PENDING (amber) · APPROVED (teal) · OBJECTION (red)
  "View All Leads →" → Leads tab

OBJECTION ALERTS:
  Red-bordered card if any:
    "⚠️ Objection on Ravi Kumar's application"
    "Missing: Bank statement page 3"
    "Resolve Now" clay button

─────────────────────────────────
SE_Leads — Lead Management
─────────────────────────────────
Header: "My Leads" + "New Lead +" clay button (top-right)
Search bar
Filter chips: All · Pending · Approved · Objection · Rejected

Lead cards (vertical list):
  Lead avatar (initials) + Name + Loan type
  Amount chip + Scheme chip + Status chip
  "Last updated: Today 2:30 PM" timestamp
  Tappable → Lead Detail screen

New Lead button → SE_NewLead form

SE_NewLead — Create Lead (multi-step form):
  Step indicator: 1 → 2 → 3 → 4 → 5 → 6
  
  STEP 1 — Basic Applicant Details:
    Full Name (as per Aadhaar)
    Date of Birth
    PAN Number
    Mobile number (Aadhaar-linked?) toggle
    Current address same as Aadhaar? toggle
    Category dropdown: General/SC/ST/OBC/Minority/Women
  
  STEP 2 — Eligibility Check:
    Prior govt subsidy loan? Yes/No toggle
    First business under this scheme? Yes/No toggle
    Current occupation (text)
    Approx monthly income (₹)
    Existing loans running? Yes/No + amount
    Approx CIBIL score (slider or text)
  
  STEP 3 — Business & Project Details:
    Type of business proposed (dropdown)
    Total project cost (₹)
    Promoter contribution available? Yes/No
    Machinery quotations available? Yes/No
    Business location finalized? Yes/No
    IF EXISTING BUSINESS:
      Udyam Registration? Yes/No
      GST Registration? Yes/No
      Bank statement 6 months? Yes/No
  
  STEP 4 — Financial Validation:
    Savings/Current account? Yes/No
    Ready to invest margin money? Yes/No
    NPA/Overdue history? Yes/No
  
  STEP 5 — Document Upload:
    7 document upload cards:
      Aadhaar Copy · PAN Copy · Photograph · Bank Statement ·
      Project Report (DPR) · Quotations · Category Certificate
    Each: "Upload" → Sheet (Camera / Browse)
    Uploaded: teal border + filename
    Not uploaded: clay border + upload button
    Progress: "X of 7 uploaded"
  
  STEP 6 — Final Declaration + Submission:
    4 customer confirmation toggles (all must be ON to enable submit):
      "Customer confirms all information is correct"
      "Customer confirms documents are genuine"
      "Customer understands approval depends on bank"
      "Customer is ready for digital submission"
    
    Backend Officer section:
      Officer name field
      Today's date (auto-filled)
      "Approve for Digital Submission" clay CTA
    
    Submit CTA: disabled until all 4 toggles ON + officer name filled
    "Submit Application" clay CTA → success animation
  
  Each step: "Next →" clay CTA + "← Back" ghost
  Progress bar at top showing step completion

─────────────────────────────────
SE_Checklist — Pre-Digital Validation Checklist
─────────────────────────────────
Standalone checklist view for existing leads.
Shows all 6 sections in accordion format.
Each section expandable, shows fields with:
  Customer answer (filled/pending)
  Verified toggle (Yes/No)
  Status: COMPLETE (teal) / INCOMPLETE (clay) / PENDING (amber)

Overall checklist score: "4 of 6 sections complete"
Progress bar (teal)
"Mark as Verified & Submit" clay CTA (disabled until 6/6)

─────────────────────────────────
SE_Profile — Sales Exec Profile
─────────────────────────────────
Avatar (initials) + Name + Executive ID
Teal "SALES EXECUTIVE" role badge
Commission summary card:
  This month earned: ₹12,400
  This week: ₹3,072
  Pending payout: ₹8,200
Settings: Language · Notifications · Change PIN · Log Out

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ROLE 3 — TEAM LEADER APP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Bottom nav (4 tabs): Home · Team · Leads · Profile

─────────────────────────────────
TL_Home — Team Leader Dashboard
─────────────────────────────────
Header:
  "Priya Menon — Team Leader"
  Amber role badge: "TEAM LEADER"

TEAM WEEKLY TARGET CARD (most prominent):
  "TEAM WEEKLY COLLECTION" mono label
  ₹1,84,200 (countUp on mount, large serif)
  Target: ₹2,50,000
  Progress bar: 73.6% fill (clay→amber gradient)
  "₹65,800 more to unlock your 1% incentive (₹2,500)"
  
  If target crossed:
    Teal glow card
    "🎉 Target Achieved! Your incentive: ₹X"
  
  Week: Sunday–Saturday progress indicator

TL KPI ROW (horizontal scroll, 5 cards):
  Team Size: 8 | Total Leads: 64 | Converted: 22
  Pending: 31 | Objections: 4

TEAM PERFORMANCE TABLE:
  Each team member row:
    Avatar + Name
    Leads this week + amount collected
    Progress mini-bar
    Current slab badge (Starter/Growth/High/Superstar)
  "Best Performer: Arjun Singh — ₹62,400 🏆" highlighted card (amber border)

ESCALATION ALERTS:
  Red border card: cases needing TL attention
  "Resolve / Escalate to Admin" buttons

─────────────────────────────────
TL_Team — Team Management
─────────────────────────────────
List of all team members:
  Each card: avatar + name + exec ID + leads count + status
  Status: Active (teal) · Inactive (gray)
  
  Tap any member → Member Detail:
    Full KPI breakdown
    All their leads (read-only)
    Weekly collection history
    Slab progression chart (bar chart visual)
  
  "Assign Lead" button → lead picker → reassign to member
  
  Lead assignment: 
    Opens lead list → checkbox select → 
    "Assign to [Member]" clay CTA

─────────────────────────────────
TL_Leads — All Team Leads
─────────────────────────────────
All leads across the team (not just own)
Filter: By member · By status · By scheme · By date
Each lead card: same as SE but shows "Assigned to: [Name]"
Tap → Lead Detail (read + approve pre-verification)
  "Approve Pre-Verification" teal CTA
  "Request Correction" clay CTA → objection note
  "Escalate to Admin" red ghost CTA

─────────────────────────────────
TL_Profile
─────────────────────────────────
Same structure as SE_Profile
Amber "TEAM LEADER" role badge
Commission: Own incentive + team % breakdown
Settings same

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ROLE 4 — FRANCHISEE APP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Bottom nav (5 tabs): Home · Team · Applications · Finance · Profile

─────────────────────────────────
FR_Home — Franchisee Dashboard
─────────────────────────────────
Header:
  "Chennai Franchise — Suresh Iyer"
  Purple role badge: "FRANCHISEE"
  Franchise ID: FR-TN-0024

REVENUE OVERVIEW CARD (prominent, purple glow):
  "THIS MONTH REVENUE" mono
  ₹4,82,000 (countUp on mount)
  Commission earned: ₹28,920
  Pending payout: ₹14,400
  "Download Statement →" ghost button

4 KPI cards (2×2 grid):
  Total Leads: 186 | Approvals: 64
  Active Execs: 12 | Objections: 8

BRANCH PERFORMANCE section:
  Scheme-wise bar chart (visual bars, no library):
    MUDRA Tarun: 28 cases (tallest, clay)
    PM SVANidhi: 18 cases (teal)
    CGTMSE: 12 cases (amber)
    Others: 6 (gray)
  
  Bank-wise approval ratio:
    SBI: 78% (teal pill)
    Union Bank: 65% (amber pill)
    Canara: 55% (red pill)

MARKETING SECTION:
  "📣 Latest Campaign" card:
    Campaign name + dates + "Download Creative" clay button
  Scheme updates: 2 notification cards

─────────────────────────────────
FR_Team — Team Management
─────────────────────────────────
Tabs: Team Leaders (3) · Sales Execs (12)

Team Leader cards:
  Avatar + name + team size + this week's collection
  Tap → TL performance detail (all KPIs)

Sales Exec list (paginated):
  Same as TL view
  
"+ Invite Sales Executive" clay FAB (bottom-right):
  Form: Name + Mobile + Email + "Send Invite" CTA

─────────────────────────────────
FR_Applications — All Applications
─────────────────────────────────
Filter: All · Pending · Approved · Objection · Rejected
Each application card:
  Applicant name + scheme + amount + status chip
  Assigned to (exec name)
  Last updated timestamp
  Tap → Application Detail:
    Full checklist view (read-only)
    Document status
    "Pre-Check & Forward to Backend" clay CTA
    "Escalate to Admin" red ghost CTA
    "Mark Objection" amber CTA

─────────────────────────────────
FR_Finance — Commission & Revenue
─────────────────────────────────
Monthly revenue card (current month):
  Total collection + franchise % share + pending payout

Commission breakdown table:
  Row per case: Applicant name · Scheme · Amount ·
  Disbursed date · Commission % · Commission ₹ · Status

"Download Report" clay CTA (PDF icon)
"Pending Payouts" section:
  3 payout cards with expected date

─────────────────────────────────
FR_Profile
─────────────────────────────────
Franchise details card:
  Franchise ID + Region + Contract period
  Purple "FRANCHISEE" badge
  KYC status: Verified ✓
  Digital Agreement: Signed Mar 1, 2024 ✓
Commission structure (as configured by admin):
  % on disbursement · % on subsidy · Override % · Bonus targets
Settings + Log Out

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ROLE 5 — ADMINISTRATOR APP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Bottom nav (5 tabs): Home · Users · Applications · Schemes · Settings

─────────────────────────────────
AD_Home — Admin Command Center
─────────────────────────────────
Header:
  "Admin Panel — Loan Doctor"
  Blue role badge: "ADMINISTRATOR"
  Date + time

PLATFORM OVERVIEW (5 metric cards, horizontal scroll):
  Total Users: 2,841 (countUp)
  Active Applications: 486
  Approved This Month: 142
  Total Disbursed: ₹47Cr+
  Pending Objections: 23

SYSTEM HEALTH row:
  3 status indicators:
    API: Operational (teal dot + label)
    Rule Engine: Active (teal)
    Payments: Active (teal)

APPLICATIONS FUNNEL (visual funnel):
  Leads Created: 486
  Docs Verified: 312
  Sent to Bank: 198
  Approved: 142
  Disbursed: 118
  Each with number and drop-off %

OBJECTION QUEUE (red border):
  Top 3 pending objections with action buttons
  "View All 23 →"

RECENT ACTIVITY FEED:
  Timestamped list:
    "New franchisee onboarded — Chennai (FR-TN-0024)"
    "₹8L disbursed — MUDRA Tarun — Ravi Kumar"
    "Objection raised — CGTMSE — Arjun's lead"
    "New exec added under Priya Menon's team"

─────────────────────────────────
AD_Users — User Management
─────────────────────────────────
Tabs: Franchisees · Team Leaders · Sales Execs · Customers

Each tab: searchable list with role badge
User card: avatar + name + ID + status (Active/Inactive)
Tap → User Detail:
  Full profile + KPIs
  Role badge + join date
  Commission structure (for B2B roles)
  Action buttons:
    "Deactivate Account" (red ghost)
    "Reset PIN" (amber)
    "Edit Role" (clay)

"+ Create User" clay FAB
Form: Name · Mobile · Email · Role dropdown · Franchise assignment

─────────────────────────────────
AD_Applications — Full Application View
─────────────────────────────────
All applications across entire platform
Filters: Status · Scheme · Franchise · Date range · Bank

Application card: same as franchisee view
Tap → Full Application Detail:
  All 6 checklist sections (read + edit)
  Document viewer placeholders
  Timeline of all actions
  Admin actions:
    "Approve for Bank Submission" (teal CTA)
    "Mark Objection + note" (amber CTA)
    "Reject Application" (red ghost CTA)
    "Reassign to Executive" (clay ghost)

─────────────────────────────────
AD_Schemes — Scheme Master Data
─────────────────────────────────
List of all schemes (Central + State)
Each scheme card:
  Name + Ministry + Status (Active/Inactive toggle)
  Key stats: Amount · Rate · Tenure

Tap → Scheme Edit:
  Edit all fields: name · ministry · amount range ·
  interest rate · tenure · eligibility rules ·
  required documents · category · state applicability
  Subsidy percentage (editable ONLY by admin)
  "Save Changes" clay CTA
  "Deactivate Scheme" red ghost

"+ Add New Scheme" clay FAB

─────────────────────────────────
AD_Settings — System Configuration
─────────────────────────────────
Sections (accordion):

COMMISSION RULES:
  SE slab table (editable %): 
    Starter / Growth / High / Superstar thresholds + rates
  TL incentive %: currently 1% (editable)
  Franchisee % (editable per franchise)
  Bonus amounts (editable)
  "Save Commission Rules" clay CTA

ELIGIBILITY RULE ENGINE:
  Rule cards: each rule shows condition + action
  Toggle rules on/off
  "Edit Rule" → rule editor
  "Add New Rule" ghost CTA

WEEK CONFIGURATION:
  Week start day: Sunday (dropdown)

NOTIFICATION SETTINGS:
  Toggle: objection alerts · approval alerts · payout alerts

AUDIT LOG link:
  "View full audit trail →" → list of all system actions
  with timestamp + user + action + IP

BANK INTEGRATION:
  Connected banks list with status
  API key status (masked)

"Danger Zone" section (red border):
  "Reset Platform Data" (disabled in prototype)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NAVIGATION ARCHITECTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
App state:
  role: "customer" | "sales_exec" | "team_leader" | 
        "franchisee" | "admin"
  screen: string (current screen name)
  history: array (for back navigation)
  navTab: string (current bottom nav tab)
  hasPurchase: boolean (customer only)
  selectedScheme: object (scheme data passed to detail page)

go(screenName, data?) — push to history, navigate
back() — pop history
onNav(tabId) — switch tab, clear history

Role → Home routing:
  customer     → "s06" (Voice AI)
  sales_exec   → "se_home"
  team_leader  → "tl_home"
  franchisee   → "fr_home"
  admin        → "ad_home"

Each role renders its own bottom nav component.
Role badge always visible in home header.
"Switch Role" option in every Profile tab (for prototype demo).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
UI POLISH RULES (apply everywhere)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Every number on dashboards uses countUp animation on mount
- All progress bars animate from 0 to target on mount (800ms)
- Skeleton loading state (shimmer) shows briefly before data
- Every list has empty state design (no blank screens)
- Every form field has a filled/active state (teal border on focus)
- Status chips: APPROVED teal · PENDING amber · REJECTED red · 
  OBJECTION red · IN REVIEW amber · SUBMITTED blue
- All CTAs show loading spinner on tap before navigation
- Bottom sheets always have drag handle + backdrop blur
- Section headers always in Syne Mono caps with spacing
- Role color used consistently per role (borders, 
  badges, active nav items)
- key={screen+navTab} on render container for fadeUp on 
  every screen change
- Dynamic island always at top, z-index 999