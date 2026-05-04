# Trailside Handyman and Remodeling — Website Design Spec

**Version:** Redesign (May 2026)
**Business:** Trailside Handyman and Remodeling (a service of Morod Corporation)
**Owner:** Michael Rodriguez
**Location:** Thornton, CO (serves Denver Metro)
**Phone:** (720) 954-1963
**Email:** michael@trailsidehandyman.com
**Live URL:** https://www.trailsidehandyman.com/

---

## 1. Brand Identity

### Color Palette
| Role | Color |
|------|-------|
| Primary Accent | Teal / Cyan (~`#2DD4C4` or similar) |
| CTA / Button | Warm Gold / Amber (~`#F5A623` or similar) |
| Background (hero, footer) | Deep Navy/Charcoal (~`#1A2332`) |
| Background (content sections) | Light Gray (~`#F5F5F5`) |
| Text (primary) | Near-black (~`#1A1A1A`) |
| Text (on dark backgrounds) | White |
| Text (accent/eyebrow) | Teal |

### Typography
- **Logo:** Script/cursive hand-lettered wordmark "Trailside"
- **Headings:** Bold, large sans-serif (possibly Inter or similar modern font)
- **Body:** Clean, readable sans-serif
- **Eyebrow Labels:** All-caps, letter-spaced, teal color

### Logo
- Cursive script wordmark: "Trailside"
- Used in white on dark backgrounds, dark on light backgrounds
- Appears in header (top-left) and footer

---

## 2. Site Architecture (Navigation)

### Top Navigation Bar
- **Top utility bar:** "Welcome to Trailside Handyman and Remodeling" | Email | Phone CTA
- **Main nav links:** Home | About Us | Portfolio | Services | Schedule
- **CTA Button:** "Online Quote" (gold/amber filled button, top-right)
- **Mobile:** Hamburger toggle menu

### Footer Navigation
- **Contact column:** Thornton, CO | (720) 954-1963 | michael@trailsidehandyman.com
- **Explore column:** About Us | Services | Portfolio | Get a Quote
- **Social icons:** Facebook, Instagram, YouTube, TikTok
- **Footer tagline:** "Trailside Handyman and Remodeling is a service of Morod Corporation. Repairs, installs and full remodels across the Denver metro — done right, start to finish."
- **Legal:** © 2026 Morod Corporation dba Trailside Handyman. All rights reserved. | Privacy Policy | Terms & Conditions

---

## 3. Page Specs

### 3.1 Home Page (`/`)

#### Section 1: Hero
- **Layout:** Full-width hero with dark overlay on background photo (Michael installing a light fixture)
- **Eyebrow text:** "DENVER METRO · FAMILY-OWNED" (teal, all-caps)
- **H1:** "Denver Metro's Trusted Handyman & Remodeling Team"
- **Subheading:** "Repairs, installs and full remodels — done right, start to finish."
- **CTAs:**
  - Primary: "Get a Free Quote" (gold filled button) → links to Google Form quote
  - Secondary: "See Our Work" (teal outline button) → links to `/portfoliohandyman/`

#### Section 2: Why Trailside (Value Props)
- **Layout:** White/light gray background, centered content
- **Eyebrow:** "WHY TRAILSIDE"
- **H2:** "One team for the whole job"
- **Description:** "From a single faucet swap to a full basement build-out, Mike and the Trailside crew bring carpentry, tile, drywall, electrical and plumbing skill to every project."
- **Three feature blocks (icon + title + description):**
  1. **Repairs & Installs** — "Doors, faucets, fixtures, fans, lights, drywall patches, fences — the small stuff that makes your home feel finished."
  2. **Full Remodels** — "Bathrooms, basements, kitchens. Design, demo, build and final punch list under one trusted contractor."
  3. **Trusted Locally** — "10+ years serving Denver metro homeowners. Licensed, insured, and obsessed with doing it right the first time."
- Each block has a teal left-border accent bar

#### Section 3: CTA Band
- **Layout:** Dark navy full-width band
- **H2:** "Ready to get started?"
- **Subtext:** "Tell us about your project and we'll send a free quote within 24 hours."
- **CTA Button:** "Get a Free Quote" (gold filled) → Google Form
- **Top edge accent:** Teal horizontal line/border

---

### 3.2 About Us Page (`/about-us/`)

#### Section 1: Page Header
- **Banner:** "We do Repairs, Installs and Remodels" (teal, full-width banner, dark bg)
- **Breadcrumb:** Home / About Us
- **Page H1:** "About Us"

#### Section 2: Meet the Owner
- **Layout:** Two-column — left: headshot photo of Michael, right: bio text
- **Eyebrow:** "MEET THE OWNER"
- **Headline:** "Michael and his team have comprehensive expertise in all facets of residential construction including carpentry, tile, drywall, woodworking, electrical, and plumbing."
  - Words "facets" and "residential" are visually emphasized (larger, bolder)
- **Owner photo:** Professional headshot, Michael Rodriguez in denim jacket, arms crossed

#### Section 3: We Take Care of Your Problems
- **Layout:** Left: text column, Right: action photo
- **Eyebrow:** "NEW INSTALLATION AND REPAIRS"
- **H2:** "We Take Care Of Your Problems"
- **Body:** "Michael Rodriguez, the owner of Trailside Handyman, is a seasoned professional with comprehensive experience in home renovation and repair."
- **CTA Link:** "We're Excited To Help You!" → Google Form booking
- **CTA Button:** "Book Now" → Google Form booking

---

### 3.3 Portfolio Page (`/portfoliohandyman/`)

#### Section 1: Page Header
- **Banner:** "We do Repairs, Installs and Remodels"
- **Page H1:** "Portfolio Jobs"
- **Breadcrumb:** Home / Portfolio Jobs

#### Section 2: Portfolio Grid
- **Intro heading:** "Take a look at our portfolio below of over 10 years of client work."
- **Description:** Intro copy about service range, clickable category buttons
- **Portfolio Categories (image tiles with icon overlays):**
  - Handyman Projects
  - Remodel Work
  - Door Projects
  - Plumbing & Fixtures
  - Electrical & EV
  - (Additional categories below fold)
- **Layout:** 3-column image grid, each tile has icon badge + category label overlay on photo
- **Background:** Dark navy

---

### 3.4 Services Page (`/our-services/`)

#### Section 1: Page Header
- **Banner:** "We do Repairs, Installs and Remodels"
- **Page H1:** "Our Services"
- **Breadcrumb:** Home / Our Services

#### Section 2: Service Photo Grid
- **Layout:** 3-column photo grid showcasing different service areas
- **Service categories visible:**
  - Handyman Projects
  - Remodel Work
  - Door Projects
  - Plumbing & Fixtures
  - Electrical & EV
  - Drywall / Framing (additional)
- **Background:** Dark navy, matching portfolio page style

---

### 3.5 Schedule / Online Quote
- **Nav link "Schedule"** → External Google Calendar booking link
- **"Online Quote" / "Get a Free Quote"** buttons → Google Forms (https://forms.gle/YLrJo9E2oqyDCwY69)

---

## 4. Components & UI Patterns

### Buttons
- **Primary CTA:** Gold/amber fill, dark text, rounded corners — used for "Get a Free Quote", "Book Now", "Online Quote"
- **Secondary CTA:** Teal outline, teal text, rounded corners — used for "See Our Work"

### Section Eyebrow Labels
- All-caps, letter-spaced, teal color
- Appear above section headings to label content type

### Feature Cards (Value Props)
- White background
- Teal left-border accent bar
- Icon (optional) + Bold heading + Body paragraph

### Page Banner Header
- Full-width dark navy background
- Teal headline text: "We do Repairs, Installs and Remodels"
- White centered H1 page title below
- Breadcrumb navigation

### Portfolio/Service Tiles
- Square/tall image with dark overlay
- Icon badge (circular, teal) + category name label in lower-left

### Footer
- 3-column layout: Brand+social | Contact | Explore links
- Dark navy background
- Teal accent color for headings and links
- Thin teal top-border accent line

---

## 5. Content & Copy

### Business Details
- **Business name:** Trailside Handyman and Remodeling
- **Legal entity:** Morod Corporation dba Trailside Handyman
- **Owner:** Michael Rodriguez
- **Phone:** (720) 954-1963
- **Email:** michael@trailsidehandyman.com
- **Address:** Thornton, CO
- **Service area:** Denver Metro

### Key Messaging
- "Denver Metro's Trusted Handyman & Remodeling Team"
- "Repairs, installs and full remodels — done right, start to finish."
- "One team for the whole job"
- "10+ years serving Denver metro homeowners"
- "Licensed, insured, and obsessed with doing it right the first time"
- "Design, demo, build and final punch list under one trusted contractor"

### Services Offered
- Repairs & Installs: doors, faucets, fixtures, fans, lights, drywall patches, fences
- Full Remodels: bathrooms, basements, kitchens
- Carpentry & woodworking
- Tile work
- Drywall
- Electrical & EV charger installation
- Plumbing & fixtures
- Door installation & repair

---

## 6. External Integrations

| Integration | Purpose | URL/Link |
|-------------|---------|----------|
| Google Forms | Quote requests & booking | https://forms.gle/YLrJo9E2oqyDCwY69 |
| Google Calendar | Appointment scheduling | https://calendar.google.com/... |
| Facebook | Social media | https://www.facebook.com/MichaelHandymanMaker |
| Instagram | Social media | https://www.instagram.com/michael_mrod_rodriguez/ |
| YouTube | Content/Video | https://www.youtube.com/@MRod-ConstructionMoney |
| TikTok | Social media | https://www.tiktok.com/@michael_mrod_rodriguez |

---

## 7. Design Notes & Recommendations (Redesign Improvements)

The redesigned version (visible in new screenshots vs. old live site) reflects the following key upgrades:

1. **Color scheme modernized:** Shifted from old red/blue WordPress theme to clean teal + gold palette
2. **Navigation simplified:** Cleaner nav bar with clear hierarchy; "Online Quote" CTA button prominent in header
3. **Hero section:** New hero with real photo of Michael at work (authentic, trust-building)
4. **Cleaner typography:** More whitespace, readable body copy, consistent heading hierarchy
5. **Contact info in header:** Phone + email visible at top of every page
6. **Social proof emphasized:** "10+ years", "Licensed, insured" messaging moved to prominent positions
7. **CTA band:** Dark CTA section with 24-hour quote promise adds urgency
8. **Footer improved:** Organized 3-column footer vs. cluttered old footer
9. **Brand voice:** Tightened, confident copy — "done right, start to finish"

---

*Spec generated: May 3, 2026*
*Source: trailsidehandyman.com (live site) + redesign screenshots*
