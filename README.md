# Frontend Technical Assessment: Omnistra

This repository contains the implementation of the frontend technical assessment, specifically replicating two distinct sections from given reference websites.

## Live Demo & Usage

1. **Install dependencies:**
   The project uses `pnpm`. If you don't have it, install it globally or use npm/yarn equivalents.
   ```bash
   pnpm install
   ```
2. **Run the development server:**
   ```bash
   pnpm dev
   ```
3. **Open the browser:**
   Navigate to [http://localhost:3000](http://localhost:3000).

---

## Features Implemented

### 1. Chargeflow.io Navbar
- **Design:** Floating pill/capsule shape with glassmorphism effects (transparent on top, frosted glass on scroll).
- **Responsive:** Fully responsive with a hamburger menu and slide-down overlay on mobile/tablet.
- **Interactions:** Hover dropdowns for main links, smooth scaling animations for CTA buttons.
- **Tech Used:** Next.js, Tailwind CSS v4, `motion` (Framer Motion).

### 2. Domu.ai Integrations Section
- **Design:** Soft blue gradient background with scattered, asymmetric floating integration cards.
- **Animations:** 
  - Continuous float/bob effect using slow CSS/Framer keyframes.
  - Hover states: Scale up and shadow depth changes.
  - Scroll Parallax: Cards gently shift vertically as you scroll down the page.
- **Responsive:** Falls back to a clean 3-to-4 column stacked grid on standard mobile and tablet breakpoints.
- **Tech Used:** Next.js, Tailwind CSS v4, `motion` (Framer Motion) scroll-linked hooks.

## Assumptions & Decisions
- **Framer Motion Setup:** Used the `motion` (recently renamed from `framer-motion`) package for robust animations and scroll parallax.
- **UI Libraries:** Implemented bespoke floating components instead of rigid component libraries to achieve pixel-perfect fidelity with the references while keeping the dependency tree small.
- **Fonts:** Implemented the `Inter` font natively through `next/font/google` to match the geometric sans-serif style used by the reference websites.

## Assessment Scope Completed
- ✅ Pixel-accurate UI replication
- ✅ Responsive behavior across breakpoints 
- ✅ Micro-interactions (hovers, dropdowns)
- ✅ Scroll behavior & parallax animations
- ✅ Production-ready Tailwind v4 structuring

Thank you for reviewing!
