# Webimic — UI Analysis SaaS Platform

Crawl any public website, capture screenshots across viewports, extract full design systems, and generate image-rich PDF specs (Doc A + Doc B) for LLM-powered rebuilding.

---

## Quick Start

```bash
# Frontend
cd client
npm install
npm run dev          # → http://localhost:5173

# Backend (separate terminal)
cd server
npm install
cp .env.example .env
npm start            # → http://localhost:4000
npm run worker       # Worker process (another terminal)
```

**Prerequisites:** Node.js 18+, MongoDB, Redis

---

## Folder Structure

```
webimic/
│
├── client/                               # FRONTEND — Vite + React 18 + Tailwind CSS v4
│   ├── public/
│   │   └── webimic.svg                   # Favicon
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx            # Full mega-menu nav (Products, Learn, Company dropdowns)
│   │   │   │   ├── Footer.jsx            # 4-column footer with newsletter + social + status
│   │   │   │   ├── MainLayout.jsx        # Marketing layout wrapper (Navbar + Outlet + Footer)
│   │   │   │   └── DashboardLayout.jsx   # Sidebar + topbar layout for /dashboard/*
│   │   │   ├── sections/
│   │   │   │   ├── HeroSection.jsx       # Tabbed hero with visual area
│   │   │   │   ├── LogoTicker.jsx        # Dual-row infinite-scroll logo marquee
│   │   │   │   ├── FeatureTabs.jsx       # 4-tab platform features (Analyzer/Tokens/Docs/Redesign)
│   │   │   │   ├── FrameworkCards.jsx     # 3-card tools grid
│   │   │   │   ├── CustomerStories.jsx   # Horizontal-scroll customer cards carousel
│   │   │   │   ├── StatsSection.jsx      # Trust metrics + chart visual
│   │   │   │   ├── FAQSection.jsx        # Expandable accordion
│   │   │   │   └── BottomCTA.jsx         # Dual-button call to action banner
│   │   │   └── ui/
│   │   │       ├── Button.jsx            # primary/secondary/ghost/accent variants
│   │   │       ├── Card.jsx              # Glass-effect card with hover
│   │   │       ├── Container.jsx         # Max-width + padding wrapper
│   │   │       ├── Section.jsx           # Padded section with dark/light toggle
│   │   │       ├── Badge.jsx             # Label/tag pill
│   │   │       ├── Logo.jsx              # SVG logo + LogoFull (logo + wordmark)
│   │   │       └── ScrollReveal.jsx      # IntersectionObserver fade-in animation
│   │   ├── pages/
│   │   │   ├── HomePage.jsx              # / — 8 sections composing the marketing landing
│   │   │   ├── ProductPlatformPage.jsx   # /product/platform — full product page
│   │   │   ├── ProductSubPage.jsx        # /product/:slug — 7 dynamic product pages
│   │   │   ├── PricingPage.jsx           # /pricing — 3 tiers + feature comparison table
│   │   │   ├── AboutPage.jsx             # /company/about — mission, story, principles, investors
│   │   │   ├── CareersPage.jsx           # /company/careers — job listings, awards
│   │   │   ├── GenericPage.jsx           # Data-driven template for 12 more pages
│   │   │   ├── SignInPage.jsx            # /signin — standalone auth
│   │   │   ├── SignUpPage.jsx            # /signup — standalone auth
│   │   │   └── dashboard/
│   │   │       ├── DashboardHome.jsx     # /dashboard — stats grid, recent jobs, quick actions
│   │   │       ├── NewAnalysis.jsx       # /dashboard/new — job submission form
│   │   │       ├── JobsList.jsx          # /dashboard/jobs — searchable/filterable table
│   │   │       ├── JobDetail.jsx         # /dashboard/jobs/:id — tokens, screenshots, downloads
│   │   │       └── SettingsPage.jsx      # /dashboard/settings — profile, API keys, billing
│   │   ├── hooks/
│   │   │   └── useScrollReveal.js        # IntersectionObserver + scroll position hooks
│   │   ├── utils/
│   │   │   └── navData.js                # Navigation structure, footer links, logo list
│   │   ├── index.css                     # Tailwind theme + custom animations + design tokens
│   │   ├── main.jsx                      # React entry point
│   │   └── App.jsx                       # BrowserRouter with all routes
│   ├── index.html                        # HTML shell with Webimic meta tags
│   ├── vite.config.js
│   ├── package.json
│   └── eslint.config.js
│
├── server/                               # BACKEND — Node.js + Express + MongoDB + Redis
│   ├── models/
│   │   ├── Job.js                        # Mongoose schema: status, config, documents, timestamps
│   │   └── Page.js                       # Mongoose schema: screenshots, colors, typography, animations
│   ├── routes/
│   │   └── jobs.js                       # POST /api/jobs, GET /api/jobs, GET /api/jobs/:id
│   ├── workers/
│   │   └── worker.js                     # BullMQ worker stub (simulates crawl pipeline)
│   ├── index.js                          # Express entry with CORS + MongoDB connect
│   ├── package.json
│   └── .env.example
│
├── .gitignore
└── README.md
```

---

## All Routes (27 total)

### Marketing (16 routes — MainLayout with Navbar + Footer)

| Route | Component | Content |
|---|---|---|
| `/` | HomePage | Hero, logo ticker, feature tabs, customer stories, stats, FAQ, CTA |
| `/product/platform` | ProductPlatformPage | Full product page (4 features, sample report card, integrations, FAQ) |
| `/product/analyzer` | ProductSubPage | Site Analyzer — crawling details |
| `/product/tokens` | ProductSubPage | Design Tokens — extraction details |
| `/product/docs` | ProductSubPage | Doc Generator — PDF generation details |
| `/product/redesign` | ProductSubPage | Redesign Engine — Doc B details |
| `/product/screenshots` | ProductSubPage | Screenshot Capture details |
| `/product/components` | ProductSubPage | Component Library details |
| `/product/animations` | ProductSubPage | Animation Inspector details |
| `/pricing` | PricingPage | 3 plan cards + feature comparison table + FAQ |
| `/company/about` | AboutPage | Mission, story, principles, investors, hiring CTA |
| `/company/careers` | CareersPage | Job listings, team photo, awards |
| `/company/partners` | GenericPage | Partner network with integration/agency categories |
| `/company/events` | GenericPage | Event listing with Unsplash images + filters |
| `/blog` | GenericPage | Blog listing with category filters + 6 article cards |
| `/customers` | GenericPage | Customer stories with filter tabs + 4 case study cards |
| `/resources` | GenericPage | Guides listing with filter tabs |
| `/community` | GenericPage | Community hub — Discord, GitHub, meetups |
| `/docs` | GenericPage | Documentation overview — Getting Started + API Reference |
| `/startups` | GenericPage | Startup program — what you get |
| `/showcase` | GenericPage | Showcase gallery with filter tabs |
| `/contact` | GenericPage | Contact form (name, email, company, message) |
| `/privacy` | GenericPage | Privacy policy — data collection, retention, deletion |
| `/terms` | GenericPage | Terms of service — acceptable use, service terms |

### Auth (2 routes — standalone, no Navbar/Footer)

| Route | Component |
|---|---|
| `/signin` | SignInPage — GitHub/Google SSO + email/password form |
| `/signup` | SignUpPage — GitHub/Google SSO + name/email/password form |

### Dashboard (5 routes — DashboardLayout with sidebar)

| Route | Component |
|---|---|
| `/dashboard` | DashboardHome — stats grid, 5 recent jobs, quick actions |
| `/dashboard/new` | NewAnalysis — URL input, depth/pages, device toggles, options |
| `/dashboard/jobs` | JobsList — searchable table with status filters |
| `/dashboard/jobs/:id` | JobDetail — color swatches, type samples, spacing, animations, PDF downloads |
| `/dashboard/settings` | SettingsPage — profile, API keys, notifications, billing, danger zone |

### Catch-all

| Route | Component |
|---|---|
| `*` | GenericPage → 404 fallback |

---

## API Endpoints

```
GET  /api/health       Health check
POST /api/jobs         Create analysis job → MongoDB + Redis queue
GET  /api/jobs         List jobs (?page, ?limit, ?status)
GET  /api/jobs/:id     Full job detail
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Build | Vite |
| Frontend | React 18, JSX, react-router-dom v7 |
| Styling | Tailwind CSS v4 (JIT) |
| Icons | Lucide React |
| Animations | CSS keyframes + IntersectionObserver + Framer Motion (installed) |
| API | Express |
| Database | MongoDB via Mongoose |
| Queue | Redis + BullMQ |
| Worker | Node.js stub (Crawlee + Puppeteer planned) |
#   w e b i m i c - v 1  
 