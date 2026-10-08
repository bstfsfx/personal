# UI/UX Special Behaviors & Effects

---

## Executive Summary of Web Effects

* **Hover Zoom:** Images smoothly enlarge on cursor touch to signal interactivity.
* **Sticky Header:** The logo remains pinned at the top for persistent site navigation.
* **Scroll Reveal:** Text animates in sequentially as you scroll to guide reading attention.
* **Crossfade Carousel:** Images smoothly fade between each other for an elegant visual transition.
* **Synchronized Captions:** Text and image animations trigger together using shared index tracking.
* **Ambient Glow:** Floating blurred circles add subtle background depth and motion.
* **Lazy Loading:** Images load only when scrolled near, improving initial page speed.
* **Fixed Floating Widgets:** Social and booking buttons remain pinned to the side for quick contact.
* **Smooth Page Scroll:** Clicking anchor links like "PAGE TOP" triggers a smooth gliding navigation.
* **Responsive Drawer Menu:** Navigation transforms into a collapsible slide-out drawer on smaller mobile screens.

---

## Detailed Technical Breakdown

### 1. Hover Zoom (Image Scale on Hover)
* **CSS Selector:** `.text.para`, `.gl`, `.info-wrap img`
* **Implementation:** `transform: scale(1.05)` coupled with `transition: transform 0.3s ease`.
* **Container:** Parent container utilizes `overflow: hidden` to clip image scaling within layout bounds.
* **UX Purpose:** Provides visual feedback and invites user engagement.

### 2. Sticky Header Positioning
* **CSS Selector:** `header`, `.logo`, `img[src*="logo.svg"]`
* **Implementation:** `position: fixed` or `position: sticky; top: 0;` paired with `z-index: 999`.
* **UX Purpose:** Ensures brand identity and top-level navigation remain accessible across all scroll depths.

### 3. Scroll-Triggered Reveal Animation
* **CSS / JS Target:** `.info-wrap`, `.info_name`
* **Implementation:** JavaScript `IntersectionObserver` or GSAP scroll triggers updating inline styles (`transform: translate(...)`, `opacity: 1`). Staggered delays (`transition-delay: 0.1s * n`) create the line-by-line reveal effect.
* **UX Purpose:** Enhances storytelling flow and maintains reader engagement.

### 4. Crossfade Photo Carousel
* **CSS / JS Target:** `.carousel`, `img[src*="UP3.jpg"]`
* **Implementation:** Stacking slides with `position: absolute` and toggling `opacity: 0` to `opacity: 1` using smooth transitions.
* **UX Purpose:** Delivers an elegant slide transition without disruptive horizontal movement.

### 5. Synchronized Captions & Slide State
* **Implementation:** Centralized JavaScript active index tracking (`activeIndex`). Slide transitions simultaneously fire callback triggers for the corresponding text container's animation.
* **UX Purpose:** Keeps image visuals directly tied to relevant text narrative.

### 6. Ambient Glow (Floating Color Orbs)
* **HTML Markup:** `<div class="bg1"><div class="colorBall"></div><div class="colorBall"></div></div>`
* **Implementation:** `border-radius: 50%`, heavy Gaussian blur (`filter: blur(40px)`), and `@keyframes` continuous drift routines.
* **UX Purpose:** Adds visual depth and soft ambient color without overloading content contrast.

### 7. Native Lazy Loading & Async Decoding
* **HTML Attributes:** `loading="lazy" decoding="async"` on `<img>` elements.
* **Implementation:** Browser defers image network requests until elements approach the viewport edge.
* **UX Purpose:** Reduces bandwidth overhead, accelerating initial page render and improving Core Web Vitals.

### 8. Fixed Floating Social & Booking Widgets
* **CSS Target:** `.floating-widgets`, `.side-buttons`
* **Implementation:** Pinned viewport layout via `position: fixed; right: 20px; top: 50%; transform: translateY(-50%);`.
* **UX Purpose:** Keeps key conversion paths (LINE, Instagram, Booking) visible at all times.

### 9. Smooth Anchor Scrolling
* **HTML / CSS Target:** `a[href="#top"]`, `html { scroll-behavior: smooth; }`
* **Implementation:** Smooth interpolation when clicking jump links such as `PAGE TOP`.
* **UX Purpose:** Prevents abrupt visual jumps during page section navigation.

### 10. Responsive Slide-out Drawer Menu
* **CSS Target:** `@media (max-width: 768px)` nav header drawer
* **Implementation:** Transforms horizontal header menu into a off-canvas mobile drawer menu triggered by a hamburger button toggle.
* **UX Purpose:** Optimizes screen real estate on mobile viewports.