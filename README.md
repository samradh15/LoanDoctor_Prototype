
# LOAN DOCTOR — MASTER PROTOTYPE PROMPT
### For Antigravity · Mobile App · Final Client Presentation Grade

Build a complete, high-fidelity, fully interactive mobile app prototype for **Loan Doctor** — an AI-powered, voice-first, vernacular loan advisory platform for Indian users. This is final client-presentation grade. Every screen, every interaction, every micro-detail must feel like a real shipped product. Think Airbnb, Groww, or Zepto quality. Not a wireframe. Not a concept. A real app.

---

## DESIGN SYSTEM — APPLY GLOBALLY

**Colors:**
- App background: `#111510` (deep warm near-black, green undertone)
- Card surface 1: `#1C2118`
- Card surface 2: `#242B20` (inputs, nested cards)
- Primary accent: `#C84B0C` (burnt saffron — CTAs, active nav, brand moments)
- Teal accent: `#4CC9A0` (success, AI active, uploaded, confirmed states)
- Amber: `#F5A623` (in-progress, warnings)
- Text primary: `#EDF0E8` (warm near-white)
- Text muted: `#7A8072`
- All card borders: `rgba(237,240,232,0.07)` — every card has a border, never borderless
- CTA button shadow: `0 4px 18px rgba(200,75,12,0.32)`

**Typography:**
- Headings/display: `Fraunces` serif, weight 700–900
- Body/UI: `Plus Jakarta Sans`, weight 400/500/600
- Metadata/chips/codes: `Syne Mono`
- Never use: Inter, Roboto, SF Pro, system fonts

**Spacing:** Base 4px. Card padding 14–16px. Screen sides 16px. CTA height 50px. Input height 48px.

**Radius:** Cards 14px main, 10px nested, buttons 13px, chips 5px (not pill), avatar circles 50%

**Transitions:** Screen nav = slide left. Back = slide right. Tab switch = crossfade. Bottom sheets = spring `cubic-bezier(0.16,1,0.3,1)`. Press = scale 0.97.

**Status bar:** Dynamic island placeholder. Syne Mono time. `rgba(237,240,232,0.45)` color.

---

## APP ARCHITECTURE

```
ONBOARDING (no bottom nav):
01 Splash → 02 Why Choose Us → 03 Select Language → 04 OTP Login

VOICE FLOW (no bottom nav):
05 Voice AI Welcome → 06 Voice + Live Chat Transcript

RECOMMENDATION FLOW (no bottom nav):
07 Top 3 AI Schemes → 08 Scheme Detail + Video

PAYMENT FLOW (no bottom nav):
09 Payment ₹1,999 → 10 Payment Success

MAIN APP (bottom nav always visible, 5 tabs):
11 Home · 12 Schemes · 13 Documentation · 14 Chat · 15 Profile
```

---

## SCREEN 01 — SPLASH

Full `#111510`. Content at 46% height. Radial glow behind logo: `radial-gradient(circle 180px at center, rgba(200,75,12,0.07), transparent)`.

Logo block (centered):
- Icon container 72×72px, `border-radius: 20px`, `#1E2419`, border `1px solid rgba(200,75,12,0.22)`, medical cross SVG `#C84B0C` inside
- `"Loan Doctor"` — Fraunces 700, 27px, `#EDF0E8`, letter-spacing -0.4px
- `"YOUR LOAN. OUR PRESCRIPTION."` — Syne Mono 10px, `rgba(237,240,232,0.32)`, letter-spacing 2.5px

Bottom dots (4, centered, 56px from bottom): active = `#C84B0C` 16px wide × 5px tall radius 3px. Inactive = `rgba(237,240,232,0.16)` 5×5px.

Animation: fade+slide-up 600ms. Auto-transition after 2.5s → Screen 02.

---

## SCREEN 02 — WHY CHOOSE US

**Illustration zone** (195px, `#1C2118`):
- Gradient: `linear-gradient(135deg, rgba(200,75,12,0.055), transparent 55%)`
- Tag top-left: `"TRUSTED BY 50,000+ USERS"` Syne Mono 9px, muted border card
- Center: Two concentric dashed circles (outer clay 0.25 opacity, inner teal 0.25 opacity) + cross SVG center `#C84B0C`

**Content:**
- Micro-label: `"WHY CHOOSE US"` Syne Mono 9px `#C84B0C` letter-spacing 2px
- H1: `"India's Smartest Loan Advisory"` Fraunces 700, 19px

**3 Value Cards** (gap 9px, bg `rgba(237,240,232,0.025)`, border, radius 10px, padding 10px 12px):
- Layout: 28×28px icon container left + text right (title 600 12px / sub 400 10px `#7A8072`)
- Card 1: Clay icon `rgba(200,75,12,0.11)` — **"AI Voice Matching"** / "Just speak — AI finds your best scheme instantly"
- Card 2: Teal icon `rgba(76,201,160,0.09)` — **"200+ Verified Schemes"** / "Government & private, all RBI verified"
- Card 3: Amber icon `rgba(245,166,35,0.09)` — **"6 Indian Languages"** / "Hindi, Tamil, Telugu, Marathi, Punjabi & more"

**CTA:** `"Get Started →"` full-width, clay button → Screen 03

---

## SCREEN 03 — SELECT LANGUAGE

Header (54px top): step tag `"Step 1 of 2"` Syne Mono + 12px line before · H1 `"Select Language"` Fraunces 700 22px · sub Plus Jakarta Sans 11px `#7A8072`

**6-tile grid** (2 cols, gap 7px, bg `#1C2118`, border 1.5px, radius 12px, padding 13px 11px):
Each: flag container 26×26px + name (600 13px) + native script (400 10px `#7A8072`)
Selected: border `1.5px solid #C84B0C`, bg `rgba(200,75,12,0.065)`, checkmark circle `#C84B0C` appears right

Languages:
1. 🇮🇳 हिंदी (pre-selected) · 2. 🇬🇧 English · 3. தமிழ் Tamil · 4. తెలుగు Telugu · 5. मराठी Marathi · 6. ਪੰਜਾਬੀ Punjabi

CTA updates to: `"Continue in हिंदी →"` → Screen 04

---

## SCREEN 04 — OTP LOGIN

Brand strip (border-bottom): logo mark 32px + `"Loan Doctor"` Fraunces 700 16px

Form (padding 22px 16px):
- H2 `"Welcome back"` Fraunces 700 21px · sub Plus Jakarta Sans 11px `#7A8072`
- Mobile field: label Syne Mono 9px `#7A8072` + input bg `#242B20` border radius 10px 48px height · phone icon + `"+91 98765 43210"` Plus Jakarta Sans 14px
- OTP: label + 4 boxes (flex-1, 50px height, Syne Mono 700 19px). 3 filled (teal border + teal digit), 1 empty
- Resend: `"OTP sent… Resend in 28s"` — resend in `#C84B0C`
- CTA `"Verify & Continue →"` → Screen 05
- Footer: `"New user? "` + `"Create account"` in `#4CC9A0`

---

## SCREEN 05 — VOICE AI WELCOME

Bg `#0E1210`. Ambient teal glow center.

Top (52px, centered): `"AI ADVISOR ACTIVE"` Syne Mono 9px `#4CC9A0` · `"नमस्ते, Rahul!"` Fraunces 600 20px

**AI Avatar + 3 Pulse Rings** (centered):
- Rings: 90/114/138px, border `1px solid rgba(76,201,160,0.18/0.12/0.06)`, delays 0/0.4/0.8s
- Animation: `scale(1.05) → scale(1)`, opacity 0.6→0.1, 2.4s infinite independent
- Avatar: 68px circle, `#1C2A23`, teal border 1.5px, cross SVG `#4CC9A0`

Speech bubble (radius `12px 12px 12px 3px`, bg `#1C2118`):
- `"LOAN DOCTOR AI"` Syne Mono 8px `#4CC9A0`
- `"नमस्ते Rahul! आप किस तरह का loan लेना चाहते हैं? Amount और purpose बताइए।"` Plus Jakarta Sans 12px `#EDF0E8`

Sound bars (8 bars, 3px wide, `#4CC9A0`, heights 11/21/28/20/30/17/24/13px, scaleY pulse animation staggered 0.08s, 0.9s infinite)

Status label: `"AI SPEAKING…"` Syne Mono 8px `#7A8072`

Mic button: 50px `#C84B0C`, mic SVG, shadow `0 5px 22px rgba(200,75,12,0.4)`
Hint below: `"Tap to respond"` Syne Mono 8px `#7A8072`

---

## SCREEN 06 — LIVE VOICE + CHAT TRANSCRIPT

Header: AI avatar 30px + `"Loan Doctor AI"` / `"● Live Consultation"` `#4CC9A0`

Recording pill (bg `rgba(76,201,160,0.065)`, border teal, radius 20px): mini 4-bar animation + `"Voice recording — transcribed live"`

Chat area (AI bubbles left radius `3px 12px 12px 12px` bg `#242B20` · User bubbles right radius `12px 12px 3px 12px` bg `rgba(200,75,12,0.10)` · System italic teal):

Messages:
1. AI: `"Business कितने साल पुराना है, और monthly turnover?"`
2. User: `"3 साल का कपड़े का business। Monthly 40,000 कमाता हूँ।"`
3. AI: `"Aadhaar, PAN, 6 months bank statement available है?"`
4. User: `"हाँ, सब available है।"`
5. System italic teal: `"Analysing profile · Matching top schemes…"` + 3-dot loading

Bottom: text field `#1C2118` radius 20px + mic button 32px `#C84B0C`

---

## SCREEN 07 — TOP 3 RECOMMENDATIONS

Header: blinking-dot badge `"AI MATCHED · 3 SCHEMES"` teal · H1 `"Best Schemes for Your Profile"` Fraunces 700 18px · sub `#7A8072`

**Card 1 — BEST MATCH:**
Border `rgba(200,75,12,0.32)`, bg `rgba(200,75,12,0.035)`, radius 14px
Top ribbon tag: pos absolute top-1px right-12px, bg `#C84B0C`, `"BEST MATCH"` Syne Mono 7px white, radius `0 0 5px 5px`
Icon 30px (clay SVG) + `"MUDRA Tarun Loan"` / `"Pradhan Mantri Mudra Yojana"`
Description: "Collateral-free for established businesses. Quick disbursal, flexible tenure."
Chips: `"Up to ₹10L"` clay · `"8.5% p.a."` teal · `"5–7 Days"` gray

**Card 2:** `"CGTMSE Scheme"` · Up to ₹5L · 9.2% p.a.
**Card 3:** `"PM SVANidhi"` · Up to ₹5L · 7% p.a.

Tap any card → Screen 08

---

## SCREEN 08 — SCHEME DETAIL + VIDEO

Nav: back circle 26px + scheme name

Video thumbnail (margin 10px 13px, radius 12px, 118px height, dark gradient + subtle red tint):
- Play button: 40px white circle, play triangle inside
- Caption strip: red dot + `"How MUDRA Tarun Loan Works — Loan Doctor"` 9px

4-stat grid (2×2, bg `#1C2118`, border, radius 10px):
1. LOAN AMOUNT / `"₹10L"` `#C84B0C`
2. INTEREST RATE / `"8.5%"` `#4CC9A0`
3. PROCESSING / `"5–7 Days"` `#4CC9A0`
4. COLLATERAL / `"None"` `#4CC9A0`

Suggested Reply:
- `"✓ Confirm Plan"` (teal outline, teal text) → Screen 09
- `"Not Interested"` (muted) → back to 07

---

## SCREEN 09 — PAYMENT

Header: `"Confirm Plan"` Fraunces 700 22px + sub

Amount card (bg `#1C2118`, border, radius 15px, padding 19px):
- `"TOKEN AMOUNT"` Syne Mono 9px `#7A8072` / `"MUDRA Tarun Loan"` `#4CC9A0`
- `"₹1,999"` Fraunces 900, 42px (₹ as superscript)
- Divider
- Two teal-check inclusion rows: "Dedicated agent assigned" + "Full scheme processing"

3-tile payment grid: 📱 GPay/UPI (selected = clay border) · 💳 Card · 🏦 Net Banking

CTA: `"Pay ₹1,999 Securely"` (lock icon SVG left) → loading → Screen 10
Security: lock SVG + `"256-bit SSL · Razorpay"` Syne Mono 9px `#7A8072`

---

## SCREEN 10 — PAYMENT SUCCESS

Bg `#0B100D`, ambient teal glow.
Pulsing ping ring → check circle 76px teal (draws in animated) → `"Payment Confirmed"` Fraunces 700 21px → sub centered.

2 confirmation cards:
1. WhatsApp — checkmark teal icon — `"Invoice on WhatsApp"` / `"Sent to +91 98765 43210"`
2. Agent — person `#C84B0C` icon — `"Agent Assigned"` / `"Ramesh K. will call within 2 hours"`

CTA: `"Open Loan Doctor App →"` → Screen 11 (main app)

---

## BOTTOM NAV — GLOBAL SPEC

Fixed bottom, 62px, bg `rgba(17,21,16,0.96)`, `backdrop-filter: blur(18px)`, border-top `rgba(237,240,232,0.07)`.

5 tabs equal width:
1. **Home** — house SVG
2. **Schemes** — list SVG
3. **Documentation** — folder/upload SVG
4. **Chat** — message bubble SVG
5. **Profile** — person circle SVG

Each: icon container 34×26px radius 9px + Syne Mono 8px label `#7A8072`
Active: icon bg `rgba(200,75,12,0.11)`, icon stroke `#C84B0C`, label `#C84B0C`. Pill scales in on switch (200ms spring).

---

## SCREEN 11 — HOME

Header (50px top, 14px sides):
- `"Good morning ☀️"` Plus Jakarta Sans 10px `#7A8072` / `"Rahul Kumar"` Fraunces 700 20px
- Bell icon 32px (bg `#1C2118`) with notification dot 7px `#C84B0C` (tiny pulse animation)

**Active Loan Card** (margin 0 13px, bg `#1C2118`, border, radius 15px, padding 16px):
- Decorative radial glow top-right `rgba(200,75,12,0.07)`
- `"ACTIVE APPLICATION"` Syne Mono 9px `#7A8072` / `"IN REVIEW"` badge (amber: bg `rgba(245,166,35,0.09)`, border `rgba(245,166,35,0.18)`, Syne Mono 8px `#F5A623`, radius 4px)
- `"MUDRA Tarun Loan"` Fraunces 700 15px
- Progress bar: 3px, fill `linear-gradient(90deg, #C84B0C, #F5A623)` at 35% — **animates from 0 on load**
- `"Applied"` left / `"35% Complete"` right — Plus Jakarta Sans 9px `#7A8072`

**Progress Timeline** (inside `#1C2118` card, padding 14px 16px, radius 12px, margin 12px 13px — this is critical design):
4 steps horizontal: `"Applied"` → `"Docs"` → `"Review"` → `"Approved"`
- Each step: 18px circle above connecting line + Syne Mono 8px label below
- Completed (1+2): circle filled `#C84B0C`, white checkmark inside, connecting line `#C84B0C`
- Current (3 "Review"): circle outlined `#C84B0C`, inner pulsing dot `#C84B0C`, label `#C84B0C`
- Future (4): circle `rgba(237,240,232,0.15)`, connecting line `rgba(237,240,232,0.15)`, label `#7A8072`
- Gradient line between step 2→3: clay → transparent

**Recent Updates** (margin-top 18px):
Title row: `"Recent Updates"` 600 12px `#EDF0E8` / `"View all"` 10px `#C84B0C` (padding 0 13px)
2 cards (padding 0 13px, gap 7px, bg `#1C2118`, border, radius 11px, padding 11px 13px):
- Icon 32px circle + title/sub + timestamp Syne Mono 9px far right
1. Agent icon → `"Ramesh K. called"` / `"Confirmed document list sent"` · 2h ago
2. Doc icon → `"Bank Statement needed"` / `"Upload in Documentation tab"` · 4h ago — **border `rgba(200,75,12,0.18)` action-required cue**

**Explore Schemes** (horizontal scroll, min-width 94px cards): MUDRA Tarun 8.5% · CGTMSE 9.2% · Kisan Credit 4%

**Floating AI Mic FAB** (position absolute, bottom 72px, right 13px):
- 48px circle `#C84B0C`, mic SVG white
- Shadow: `0 5px 22px rgba(200,75,12,0.48), 0 0 0 5px rgba(200,75,12,0.09)`
- Second outer ring pulses constantly at 0.8x opacity
- Tooltip beside it: `"Consult AI anytime"` — bg `#1C2118`, border, radius 8px, arrow pointing to FAB
- Tap → Screen 06 as full-screen modal overlay

---

## SCREEN 12 — SCHEMES

Header: `"Schemes"` Fraunces 700 22px

Search bar: bg `#1C2118`, radius 12px, search SVG + placeholder Plus Jakarta Sans 12px `#7A8072`

**Location + Filter Row:**
- Location pill: bg `rgba(200,75,12,0.065)`, border `rgba(200,75,12,0.18)`, radius 20px — pin SVG `#C84B0C` + `"Tamil Nadu, Chennai"` Plus Jakarta Sans 500 11px `#C84B0C` + chevron-down — tap → location bottom sheet
- Filter button: bg `#1C2118`, border, radius 8px — filter SVG + `"Filter"` `#7A8072`

**Location Required Banner** (State tab only, no location set):
bg `rgba(245,166,35,0.065)`, border amber, radius 10px — warning icon + `"Your location is needed to show state-specific schemes"` — tap → location sheet

**Central/State Toggle:**
Container bg `#1C2118`, radius 10px, padding 3px. Two equal pills.
Active: bg `#C84B0C`, Plus Jakarta Sans 600 12px white, radius 8px. Inactive: transparent `#7A8072`.
**Toggle pill slides horizontally** — not just color change.

**Central Schemes** (default):
Sub-label: `"Applicable across all of India"` Plus Jakarta Sans 10px `#7A8072`
5 cards (bg `#1C2118`, border, radius 13px, padding 13px):
Each: icon 30px + name/ministry + `"Eligible"` teal badge right + description 2 lines + chips row

1. MUDRA Shishu — Up to ₹50K · Low interest · Micro-enterprise
2. MUDRA Kishore — Up to ₹5L · 8.2% p.a. · Growing business
3. MUDRA Tarun — **highlight: active application** — Up to ₹10L · 8.5% p.a.
4. CGTMSE — Up to ₹5L · 9.2% p.a. · No collateral
5. PM SVANidhi — Up to ₹5L · 7% p.a. · Small traders

**State Schemes** (after location set — Tamil Nadu):
Header: `"State Schemes — Tamil Nadu"` Fraunces 600 16px
4 schemes: TNSCB Loan · NABARD Rural · MSME Tamil Nadu · Kalaignar Startup Scheme

**Location Bottom Sheet** (380px, top radius 24px, handle bar):
- `"Select Location"` Fraunces 700 18px
- State dropdown (styled, bg `#242B20`) + City dropdown
- `"Use Current Location"` teal outline button with GPS icon
- `"Confirm Location"` clay CTA

---

## SCREEN 13 — DOCUMENTATION

Header (50px top, 13px sides, border-bottom):
- `"Documentation"` Fraunces 700 20px / `"MUDRA TARUN"` scheme badge `#C84B0C` Syne Mono 9px
- Progress: track (flex-1, 3px, fill 40% clay→amber) + `"2 / 5 uploaded"` Syne Mono 9px — **animates on load**

Section label: `"REQUIRED DOCUMENTS"` Syne Mono 9px `#7A8072` letter-spacing 1.5px

**Document Cards:**

**Uploaded state** (Aadhaar, PAN):
Border `1.5px solid rgba(76,201,160,0.22)`, radius 12px
Row: icon 30px bg `rgba(76,201,160,0.09)` document SVG `#4CC9A0` + name/filename + `"✓ DONE"` Syne Mono 8px `#4CC9A0`

**Required not-uploaded** (Bank Statement, Business Proof):
Border `1.5px solid rgba(200,75,12,0.18)`, radius 12px
Row: icon 30px bg `rgba(200,75,12,0.07)` dashed-doc SVG `#C84B0C` + name/sub + `"Upload"` button (clay outline, Plus Jakarta Sans 600 9px `#C84B0C`)
Note strip inside card: info SVG + helper text
- Bank Statement note: `"All 6 months must be from same bank account"`

Documents (MUDRA Tarun scheme):
1. ✅ Aadhaar Card (aadhaar.pdf · 482 KB)
2. ✅ PAN Card (pan.jpg · 218 KB)
3. ⬆ Bank Statement — Last 6 months — REQUIRED
4. ⬆ Business Proof (GST / Udyam / Registration) — REQUIRED

Section label: `"OPTIONAL — Speeds Up Approval"` Syne Mono 9px `#7A8072`
5. ITR / Form 16 — `"Add"` (gray outline button)

**Upload interaction:** Tap `"Upload"` → bottom sheet (2 options: 📷 Camera / 📁 Browse Files) → after pick: card border transitions clay→teal (300ms), checkmark appears, status becomes `"✓ DONE"`

Info notice (before submit): `"All documents are end-to-end encrypted and shared only with lenders"` Plus Jakarta Sans 10px `#7A8072`, inside bordered card

**Submit button:**
- Disabled state (gray, 40% opacity) when required docs missing
- Active state (clay) when all required docs uploaded — transitions between states
- `"Submit Documents"` with upload arrow SVG

---

## SCREEN 14 — CHAT

Header (50px top, 13px sides, border-bottom):
Agent row: avatar 32px (bg `#242B20`, border `rgba(200,75,12,0.22)`, person SVG `#C84B0C`) with online dot (7px `#4CC9A0`, border `1.5px solid #111510`) + `"Ramesh K."` / `"Loan Advisor · MUDRA Tarun"` + call + video icon buttons right

Case strip (bg `rgba(200,75,12,0.055)`, border `rgba(200,75,12,0.14)`, radius 7px):
`"Case Reference"` `#7A8072` / `"LD-2024-038"` Syne Mono `#C84B0C`

Chat messages:
- AI/Agent left: bg `#242B20`, radius `3px 12px 12px 12px`
- User right: bg `rgba(200,75,12,0.10)`, radius `12px 12px 3px 12px`
- Success/milestone: bg `rgba(76,201,160,0.07)`, border teal
- All timestamps: Syne Mono 9px `#7A8072`

Conversation:
1. [Success] `"✓ Payment confirmed. Case registered as LD-2024-038. Welcome!"` — 10:00
2. [Agent] `"Please upload Bank Statement (6 months) and Business Proof in Documentation tab."` — 10:05
3. [User] `"Documents uploaded ✓"` — 10:12
4. [Success] `"Received! Reviewing documents. Disbursal expected 5–7 working days."` — 10:14

Bottom: text field radius 20px bg `#1C2118` + mic button 30px `#C84B0C`

---

## SCREEN 15 — PROFILE

Header: `"Profile"` Fraunces 700 22px

User card (bg `#1C2118`, border, radius 16px, padding 18px):
- Avatar 48px: bg `#242B20`, initials `"RK"` Fraunces 700 18px `#C84B0C`
- `"Rahul Kumar"` Fraunces 700 16px / `"+91 98765 43210"` Plus Jakarta Sans 11px `#7A8072`
- `"Edit"` pill right: border `rgba(237,240,232,0.07)`, text `#7A8072`, radius 20px

Active application mini-card (scheme name + status + mini progress bar)

Settings groups (each group label: Syne Mono 9px `#7A8072` letter-spacing 1.5px):
Items: bg `#1C2118`, border, grouped with dividers, padding 13px 14px, flex space-between

`"ACCOUNT"`: Language Preference (हिंदी, chevron) · Notifications (toggle ON, clay) · Linked Mobile (pencil icon)
`"SUPPORT"`: Contact Agent (green call SVG) · Help & FAQ · Report an Issue
`"LEGAL"`: Privacy Policy · Terms of Service

Logout: border `rgba(237,240,232,0.12)`, bg transparent, text `rgba(237,240,232,0.5)`, Plus Jakarta Sans 600 13px, radius 12px, full width

---

## COMPLETE INTERACTION MAP

```
01 (auto 2.5s) → 02
02 "Get Started" → 03
03 "Continue in हिंदी" → 04
04 "Verify & Continue" → 05
05 Mic tap → 06
06 [AI analysis ends] → 07
07 Scheme card tap → 08
08 "Confirm Plan" → 09
08 "Not Interested" → 07 (back)
09 "Pay ₹1,999" → [loading] → 10
10 "Open App" → 11 (main app)
11 Nav: Schemes → 12
11 Nav: Documentation → 13
11 Nav: Chat → 14
11 Nav: Profile → 15
11 Mic FAB → 06 (modal overlay)
12 Location pill → Location bottom sheet
12 State toggle → State schemes view
12 Scheme card → Scheme detail
13 Upload button → File picker sheet → uploaded state
14 Mic → Voice input mode
All back buttons → previous screen
All nav tabs → respective screens
```

---

## MICROINTERACTIONS — ALL REQUIRED

- OTP box fill: scale 1.04 + teal border glow pulse
- Language tile select: checkmark slides in from right (spring bounce)
- Voice rings: each pulses independently (never in sync with others)
- AI 3-dot loading: sequential scale up 0.15s staggered → all scale down together
- Scheme card press: scale 0.97 → spring release
- Bottom sheet: spring `cubic-bezier(0.16,1,0.3,1)`
- Progress bars: animate 0 → target on screen load (800ms)
- Timeline steps: checks animate in sequentially on Home load
- FAB: constant outer ring pulse at 0.8x opacity
- Chat messages: slide in from below 200ms
- Payment success check: stroke draw animation → circle scales
- Document uploaded: border clay→teal 300ms + check icon appears
- Toggle: pill slides horizontally (not color-only)
- Notification dot: tiny scale-pulse loop
- Bottom nav active: pill background scales 0→1 (200ms)
- Submit button: disabled gray → active clay transition when docs complete

---

## 15 NON-NEGOTIABLE DESIGN RULES

1. No gradients on text — solid colors only
2. No purple/blue anywhere — palette is clay + teal + forest green only
3. No neumorphism — clean flat cards with hairline borders
4. No white backgrounds — always warm dark `#111510` tones
5. Every single card has a `1px border rgba(237,240,232,0.07)` — borderless = cheap
6. Asymmetric bubble radius (`3px` at tail) — not uniform radius on chat bubbles
7. Fraunces for all headings — no sans-serif display text
8. Syne Mono for all metadata/labels/chips — never Plus Jakarta Sans for functional tags
9. Clay `#C84B0C` = unique identity — only CTA + active nav + brand moments
10. Teal `#4CC9A0` = success/AI/confirmed ONLY — not decorative
11. Amber `#F5A623` = in-progress/warning ONLY — semantic meaning maintained
12. Real Hindi text in voice/chat screens — no Lorem Ipsum or placeholder equivalents
13. Progress timelines animate — not static
14. All CTAs have their specific box-shadow — never flat buttons
15. Icon SVGs are custom line-based, stroke 1.2–1.5px, consistent across all screens

---

## FINAL REQUIREMENT

15 fully connected interactive screens. All interactions per the map above. All animations implemented. All 5 nav tabs functional. Location sheet on Schemes. Document upload flow complete. Voice rings animated. Progress timeline animated. Payment end-to-end. The prototype must be indistinguishable from a real shipped mobile app.

---

This prompt covers every pixel, every interaction, every state, and every micro-animation. The design system is locked. The flow is complete. Paste this directly into Antigravity and it should give you a production-grade prototype on first run.

Two things to double-check in Antigravity specifically:
1. Make sure Fraunces font is loaded (it's a Google Font — should work)
2. The voice ring animations and sound bar animations need to be set to `loop: true` in Antigravity's animation settings
3. The location bottom sheet on Screen 12 — set it as a "sheet" component type, not a page, so it slides up over the Schemes screen