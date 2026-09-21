# Reference: Adding a Standalone Intro Video Card (Portfolio)

> Portfolio repo `Company_Site` · deploys to **personal-ten-sandy.vercel.app** via Vercel (auto-build on push to `main`, remote `github.com/bstfsfx/personal.git`).

Use this as the recipe each time another intro/workflow video is added to the page.

---

## 1. Where it goes

A standalone full-width `<section class="card glass">`, placed **between** the **Company Overview**
card (`data-i18n="professional-summary"`) and the **Our Services** card (`data-i18n="core-expertise"`).

Do **not** put it inside the case-studies `.projects-grid` — the grid is a fixed set of 6 project
cards (`project-card`); the video is an intro, not a case-study thumbnail.

## 2. HTML block (drop into `index.html`)

```html
<section class="card glass">
    <h2 data-i18n="project-video-title">Business Workflow Introduction</h2>
    <p data-i18n="project-video-desc">Overview of our intelligent workflow automation approach — …</p>
    <div class="video-wrap">
        <video class="intro-video" src="static/images/explain.mp4"
               autoplay muted loop playsinline controls
               data-i18n-alt="workflow-video-alt"></video>
    </div>
    <div class="video-links">
        <a href="static/images/explain.mp4" target="_blank"
           class="btn-demo" data-i18n="watch-video">Watch Intro Video</a>
    </div>
</section>
```

Rules:
- Both `src` and the button `href` point at a file **committed under `static/images/`**.
  Never hotlink an external/unknown URL (Vercel returns 403 to direct hotlinks; the page card is the entry point).
- **`muted` is mandatory** for autoplay — browsers block unmuted autoplay.

## 3. i18n (static/js/i18n.js)

Reusable keys (already present in **en / zh-TW / ja** — no JS edit needed to reuse):

| Key | data-i18n-… | Notes |
|-----|-------------|-------|
| `project-video-title` | data-i18n | h2 heading |
| `project-video-desc`  | data-i18n | descriptive paragraph |
| `watch-video`         | data-i18n | "Watch Intro Video" button |
| `workflow-video-alt`  | data-i18n-alt | video alt (harmless; runtime ignores `-alt`) |

If a new video needs different wording, add the matching key to the `en`, `zh-TW`, and `ja`
objects in i18n.js, then point `data-i18n` at it. Commit i18n.js together with index.html.

## 4. Responsive CSS (static/css/style.css) — REQUIRED

Without this the `<video>` renders at intrinsic size and overflows on mobile. Copy verbatim
(rename the selectors if you rename the classes):

```css
.video-wrap   { width:100%; overflow:hidden; border-radius:16px; margin:0 }
.intro-video  { display:block; width:100%; aspect-ratio:16/9;
                object-fit:cover; background:#000 }
.video-links  { display:flex; flex-wrap:wrap; gap:.75rem; align-items:center; margin-top:.5rem }
```

- `.video-wrap` clips anything wider than the card.
- `aspect-ratio:16/9` + `object-fit:cover` keeps the video a letterboxed, never-bulging box.
- `.video-links` wraps the button instead of overflowing on tiny widths.

## 5. Deploy workflow

```bash
git add index.html static/css/style.css static/images/<file>.mp4   # commit the ASSET too
git commit -m "Add <name> intro video card"
git push                                   # Vercel auto-rebuilds + redeploys
```

Trap that cost us time before: an **uncommitted / untracked asset** never gets deployed
(untracked `explain.mp4` → 404; fixes were: add file, add card block, commit, push).

## 6. Verify live (personal-ten-sandy.vercel.app)

1. Card present between Company Overview and Our Services (not inside case-studies grid).
2. `curl -sI …/static/images/<file>.mp4` → **200/206 video/mp4**.
   (206 = normal; Vercel range-serves large video/chunks mid-playback. Don't chase a literal 200.)
3. Narrow the browser to ~320px: video stays inside the card, button wraps, no horizontal scroll.

## 7. Two card flavors — don't mix

| Flavor | Class                      | Purpose                        |
|--------|----------------------------|--------------------------------|
| Grid   | `.project-card` (in `.projects-grid`) | case-study thumbnail card |
| Intro  | `.card glass` + `.video-wrap`/`.intro-video` | standalone full-width video |

The intro video lives in the `.card glass` flavor. `.project-card` is only for grid thumbnails.
