# User Experience Portions

A collection of the 60 portions of the site that most affect the user experience, grouped by area with a brief note on why each matters.

---

## Navigation & Global

1. **Sticky header** (`travel.html:38`) — constant brand/nav access at every scroll depth.
2. **Desktop nav links** (`:530`) — primary wayfinding.
3. **Header CTA buttons** (LINE 諮詢 / 立即預約 / 會員登入) — top-of-page conversion path.
4. **Mobile hamburger + off-canvas drawer** (`:597-618`) — the only nav on phones.
5. **Drawer overlay + scroll lock** — prevents mis-taps and motion behind the open menu.

## Hero / First Impression

6. **Hero image** (local `images/hero.jpg`, right half with diagonal clip `:92-100`) — emotional hook; sets the tone.
7. **Hero headline + subcopy** (`:549-550`) — communicates the value promise within 5 seconds.
8. **Light-blue hero gradient** (`:87`) — keeps reading contrast behind dark text on the left.
9. **Floating booking widget** (`:109-155`) — the key conversion surface, overlapping the hero bottom.
10. **Widget field affordances** (carets, hover states) — signals these are inputs, not static text.

## Perception / Trust

11. **Sub-service pills bar** (✈→🚄→🏢) — instant scope of services at a glance.
12. **Section headers with subtitle** (`:181`) — scannable content structure.
13. **Pain-point cards** (`:204`) — empathy-driven; mirrors the user's own frustrations.
14. **Pain-card connector icons** (`:270`) — emotional anchors per frustration.

## Value / Process

15. **Process section gradient + road background** (`:221`) — visual narrative of the workflow.
16. **Process step pills** (預約→車型→接送) — sets expectations for how the service works.
17. **Service category cards** (`:302`) — main service discovery layer.
18. **Service card images** — recognizability of each category at a glance.
19. **Service tags** (適合：…) — qualification; reduces wrong clicks.
20. **"不適合對象" disclaimer** (`:336`) — honesty filter that prevents mismatched bookings.

## Proof / Credibility

21. **Customer review quote + stars** (`:371`) — social proof.
22. **Reviewer identity block** (name / location) — makes the review feel real.
23. **Carousel dots** (`:387`) — signals more reviews exist.
24. **Vehicle photo card** (main + thumbs + caption) — tangible "what you get".
25. **Case study card** (real route + specs) — a concrete example of the service.
26. **Service steps list** (1–4) — zero-load mental model of the flow.

## FAQ & Closing

27. **FAQ accordion** (`<details>`, `:421`) — objection handling without clutter.
28. **FAQ illustration + speech bubble** (`:449`) — a soft human touch at the decision point.
29. **CTA banner** (`:471`) — final conversion push.
30. **Floating badge** (假日/連續假期 rotation, `:485`) — urgency / limited-availability nudge.

## Meta & Platform Level

31. **Page `<title>`「安心接送 | 機場·高鐵·跨城專車」** (`:6`) — SEO plus tab recognition.
32. **`<meta charset>` and `<viewport>`** (`:4-5`) — correct mobile rendering.
33. **Web font stack** (-apple-system / PingFang TC) — fast, locale-correct typography.
34. **Color system via `:root` CSS variables** (`:23-35`) — consistent brand feel everywhere.

## Footer & Persistent Elements

35. **Footer logo + brand lockup** (`:806`) — end-of-page identity anchor.
36. **Footer nav links** (`:813`) — re-navigation after scrolling the full page.
37. **Footer contact CTA row** (LINE / WhatsApp / FaceBook) — last-shot conversion point.
38. **Footer social icons** (f / 📷) — social discovery.
39. **Footer copyright + year** — legitimacy signal.
40. **Square icon floating widget** (💬 / 🗨️ / 📞) — always-visible conversion lifeline.

## Interaction & Motion

41. **Card hover lift** (`box-shadow` + `translateY(-3px)`) — signals clickability.
42. **Button hover opacity + lift** (`:79`) — tactile feedback on CTAs.
43. **Select-box focus border change** — affordance that fields are live inputs.
44. **FAQ `summary` hover background + `+`→`✕` rotation** (`:429`) — clarity of expand/collapse state.
45. **Anchor scrolling pattern** (nav → section) — mental wayfinding rather than guessing.

## Content Hierarchy

46. **Step numbering** in the service steps (①預約→抵達) — procedural clarity.
47. **Bolded section keywords and pill-tags** — a 3-second scan path.
48. **Equal-height card grids** (`repeat(5, 1fr)`) — clean rhythm, reduced cognitive load.
49. **Whitespace and gutters** (`.container`, `padding: 72px 0`) — breathing room and premium feel.
50. **Compressed image params** (`w` / `q=80`) — Core Web Vitals-friendly (LCP / CLS).

## Responsive Behavior

51. **1024px breakpoint** (3-col cards, drawer nav) — tablet optimization.
52. **768px breakpoint** (stacked grids, full-width widget) — phone-first layout.
53. **480px breakpoint** (single column, slimmer CTAs) — small-phone fit.
54. **Booking widget wraparound on tablet** — no overflow / horizontal scroll risk.

## Trust & Safety

55. **Amber disclaimer box styling** (`:336`) — visibility, not buried in the footer.
56. **Consistent reassuring copy tone** (專業接送 / 安心抵達) — emotional reassurance.
57. **24-hour service mention in FAQ** — removes availability doubt.
58. **No dead-end sections** — every section funnels toward a next step / CTA.

## Micro-details

59. **Consistent emoji icon vocabulary** (✈ airport / 🚄 train / 🏢 hotel) — instant visual language.
60. **Reading order matches visual order** — improves accessibility and screen-reader flow.