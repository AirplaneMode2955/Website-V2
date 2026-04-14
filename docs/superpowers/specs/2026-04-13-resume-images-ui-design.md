# Design Spec: Resume Expansion, Image Distribution & UI Enhancements
**Date:** 2026-04-13

---

## Overview

Five coordinated changes across the site:
1. Resume page — full content rebuild matching the PDF resume
2. New images distributed across the site
3. Page banners made more engaging without images
4. Contact cards redesigned to be more engaging
5. Home page About teaser updated to highlight professional credentials

---

## 1. Resume Page — Full Content Rebuild

Keep the exact same visual style and layout patterns. Add/update content only.

### Education
- School: Utah State University, **Jon M. Huntsman School of Business**
- Degree: **Bachelor of Science, Major: Marketing**
- Period: Fall 2024 – December 2026 (Expected)
- Add credential bullets below the school line (same bullet style as experience):
  - GPA: 3.74 while working 25 hours per week
  - Academic Scholarship recipient
  - Member of ProSales, Jon M. Huntsman School of Business
  - Google Ads Certification · Meta Business Suite Certification
  - Proficiency in SQL, Marketing, and Finance
  - Completed Advanced Excel coursework

### Work Experience — The Insurance Center
Rewrite bullets in elevated website voice, incorporating real metrics:
- Took ownership of the full marketing function — from strategy to execution — building the agency's digital presence from the ground up
- Grew brand exposure by over 50% through targeted social media campaigns
- Drove sales velocity to 16.8%, surpassing the industry average (12.7%) and the top-quartile benchmark (15.8%)
- Maintained organic growth at 10.7%, in line with the industry median, while scaling new business velocity significantly above it
- Manage 100+ client accounts, ensuring prompt policy renewals and proactive coverage guidance
- Conducts ongoing market research to identify emerging trends and adjust the agency's offerings accordingly

### Work Experience — UYSA (new role)
- Role: Certified Youth Soccer Official
- Company: UYSA
- Location: Ogden, UT
- Period: Feb 2018 – Present
- Bullets (elevated voice):
  - Officiated competitive youth matches across Northern Utah, making high-stakes decisions in fast-paced, high-pressure environments
  - Mediated disputes between players, coaches, and officials — developing communication and conflict-resolution skills that translate directly to client and team relationships
  - Coordinated with fellow officials and coaching staff to maintain fair, consistent gameplay across large tournaments

### New Section — "Service & Leadership"
Placed after Work Experience, before Skills.

**ProSales — Jon M. Huntsman School of Business**
- Role: Club Member / Account Manager
- Location: Logan, UT
- Period: Jan 2025 – Present
- Bullets:
  - Manages the account relationship with a corporate partner on behalf of the club — communicating updates and identifying annual recruitment needs
  - Builds and maintains long-term professional relationships that bridge the university and the business community

**The Church of Jesus Christ of Latter-day Saints**
- Role: Full-time Volunteer
- Location: Porto Alegre, Brazil
- Period: Jul 2022 – Jun 2024
- Bullets:
  - Led a team of 10–20 volunteers — coaching performance, setting goals, and developing the people around me as much as the mission itself
  - Developed and executed outreach strategies that measurably expanded community reach in the Porto Alegre mission area
  - Delivered presentations and training sessions in Portuguese to large groups — now fluent in the language

### Skills
Update categories:
- **Marketing:** SEO, GEO, Content Strategy, Local SEO, AI Search Optimization, Analytics, Social Media
- **Technical:** React, Python, OpenAI API, Automation, Data Visualization, SQL
- **Tools:** Google Analytics, Google Ads, Meta Business Suite, Canva, WordPress, CRM Integration
- **Languages:** English (native), Portuguese (fluent)

Add a new "Interests" row below skills (not a tag grid — a simple inline text line):
Golf · Skiing · Fishing

---

## 2. New Image Placements

### About page — Timeline entries
- `IMG_9184.JPEG` → "Engaged" timeline entry (April 2025) — couple at sunset on golf course balcony

### About page — Life Photos Grid
Expand from 6 photos to 9. Add:
- `IMG_0089.JPEG` — skiing selfie (couple on mountain)
- `IMG_4027.JPEG` — fishing on the river with a kid
- `IMG_9226.JPEG` — wife at dinner (restaurant)
- `IMG_0478.jpeg` — Jett on cliff overlook above a river
- `IMG_3219.jpeg` — Jett holding fish at sunset
- `123_1 3.JPEG` — mountain lake with rainbow (landscape, full bleed)

Grid layout: keep `grid-cols-2 md:grid-cols-3` — the 9th photo can span 2 cols on mobile or just flow naturally.

Note: `IMG_0478.jpeg` and `IMG_3219.jpeg` have sideways EXIF orientation. Next.js Image with `object-cover` should display them correctly via browser EXIF handling — verify on render.

---

## 3. Page Banners — More Engaging Without Images

**Applies to:** Projects, Content, Contact pages (About already has an image banner).

**Treatment:** Add a large oversized decorative watermark behind the headline — the page category label (e.g. "PROJECTS", "WRITING", "HELLO") rendered in the headline font at a very large size (~15–20rem), absolutely positioned, clipped to the section, at ~4% opacity. Combined with a subtle radial gradient glow centered on the headline text.

Each page gets its own watermark word:
- Projects: `"Projects"` 
- Content: `"Content"`
- Contact: `"Contact"`

The rest of the banner layout (label, h1, description) stays exactly the same.

---

## 4. Contact Cards — More Engaging

Expand each card to feel more substantial:
- Increase card padding (p-8 → p-10)
- Larger icon circle (w-12 h-12 → w-16 h-16) with a more prominent rounded treatment
- Icon size increases to text-2xl
- Add a clear CTA button inside each card below the description:
  - LinkedIn: "Connect on LinkedIn →"
  - Email: "Send an Email →"
  - GitHub: "View GitHub →"
  - Instagram: "Follow on Instagram →"
- Button style: ghost/outlined, small, uppercase label font — matches site system
- Add a subtle colored top-border accent (1px) on hover that matches the card context (primary color)
- Expand description copy for more personality:
  - LinkedIn: "The best place to follow what I'm thinking and building."
  - Email: "Best for direct inquiries, project conversations, and anything serious."
  - GitHub: "Where the experiments live — automation tools, AI scripts, and work in progress."
  - Instagram: "The non-professional side. Outdoors, skiing, and whatever's happening."

---

## 5. Home Page — About Teaser Section

Update the "About" teaser section on the home page.

**New headline:** `"Marketing student. AI-driven."`

**New paragraph:**
"Studying Marketing at Utah State University's Huntsman School of Business — graduating December 2026 with a 3.74 GPA while working full time. Head of Marketing at The Insurance Center of Utah, where I lead SEO, GEO, and AI innovation across the company's entire marketing operation."

Keep the "My Story →" link.

The right-side image (snowmobile photo) stays as-is.

---

## Files to Modify

1. `src/app/resume/page.tsx` — content data + new Service/Leadership section + Skills/Interests
2. `src/app/about/page.tsx` — add `IMG_9184` to Engaged timeline entry, expand lifePhotos array (+ image corrections for rotated files)
3. `src/app/projects/page.tsx` — banner watermark treatment
4. `src/app/content/page.tsx` — banner watermark treatment
5. `src/app/contact/page.tsx` — banner watermark treatment + card redesign
6. `src/app/page.tsx` — About teaser section copy update

---

## Out of Scope

- No changes to navigation, footer, or other components
- No new pages
- No changes to the hero section (HeroSection.tsx)
- No changes to the projects data
