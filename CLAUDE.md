# Composable DAM Demo — CLAUDE.md

> This entire project was built collaboratively with **Claude by Anthropic** through a single conversational session. No boilerplate was copy-pasted; every feature was designed and implemented through back-and-forth dialogue.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 — App Router, TypeScript, React 18 |
| CMS | Contentful (headless, delivery + preview API) |
| Media platform | Cloudinary (delivery, transformations, AI, Admin API) |
| Styling | Tailwind CSS v3 + custom `primary` color scale |
| Font | Inter via `next/font/google` |
| Hosting | Vercel |

---

## Project Structure

```
app/
  page.tsx                  # Home — CMS-driven via Contentful
  [slug]/page.tsx           # Dynamic pages by Contentful slug (SSG)
  capabilities/page.tsx     # Cloudinary feature showcase (force-dynamic)
  contentful-gallery/       # Gallery combining Contentful + Cloudinary assets
  not-found.tsx             # 404 page
  api/
    revalidate/             # Contentful webhook → ISR cache invalidation
    contentful-debug/       # Debug: list all content types and entries
    contentful-entry/       # Fetch a single Contentful entry by ID
    test-tags/              # Trigger AI auto-tagging on a demo image

components/
  layout/                   # Header, Navigation, Footer
  sections/                 # One component per Contentful section type
  media/                    # CloudinaryImage, CloudinaryVideo, BeforeAfterSlider
  ui/                       # Button, Container, SectionWrapper

lib/
  contentful/               # Queries, type resolution, caching
  cloudinary/               # helpers, server SDK, transformation presets
types/
  contentful.ts             # Raw SDK types + resolved types
```

---

## Pages & Routes

### `/` — Home
- Fetches the `home` slug from Contentful and renders its sections via `SectionRenderer`.
- A hardcoded **"Built with Claude"** dark banner (near-black, amber accents) is injected between the hero section and the remaining Contentful sections.
- Hero section is intentionally compact (360–400 px min-height) to give the banner visual prominence.

### `/[slug]` — Dynamic CMS Pages
- Catch-all for any Contentful `page` entry (excluding `home`).
- Uses `generateStaticParams` for SSG and `generateMetadata` for SEO (title, description, OG image via Cloudinary URL).

### `/capabilities` — Cloudinary Capabilities Showcase
Standalone page, fully hardcoded with Cloudinary sample assets. Divided into four anchor-linked sections:

#### Header
- **Transformation Demo button** — pill-shaped, sits above the section nav links. Features an animated **rainbow conic-gradient border** (1 px, 5 s rotation via `@property --rainbow-angle`) and an AI double-star sparkle icon. Opens a full-screen modal.

#### #optimization — Image Optimization
- **Format & Quality comparison grid**: Auto (WebP/AVIF), JPEG q90, JPEG q10, WebP q5 — side-by-side to illustrate compression tradeoffs.
- **Responsive sizing demo**: actual pixel delivery at 400 px, 800 px, and 1200 px widths.

#### #transforms — Transformation Showcase
8-card grid of URL-parameter transformations on a portrait demo image:
Original · AI Background Replace (`e_gen_background_replace`) · Rounded Corners (`r_40`) · Circular Crop (`r_max`) · Grayscale (`e_grayscale`) · Sepia (`e_sepia:80`) · Blur (`e_blur:300`) · Art Filter (`e_art:audrey`)

#### Interactive Transformation Demo (Modal — `TransformationDemoModal`)
- **Width / Height inputs** with default 640 × 425 px and aspect-ratio lock toggle.
- **Crop mode toggle**: fill (exact dimensions, may crop) vs. scale (fit, preserves ratio).
- **Effects checkboxes**: Round image (`r_max`), Rotate 20° (`a_20`), Remove background (`e_background_removal`).
- **Generative background** text prompt with 2-second debounce (`e_gen_background_replace:prompt_…`).
- Live `CldImage` preview re-renders on every parameter change. Applied transformation string shown in a code block.

#### #video — Adaptive Video Streaming (`VideoPlayerDemo`)
- `CldVideoPlayer` loaded dynamically (no SSR).
- Quality selector: Auto, 1080p, 720p, 480p, 360p.
- Real-time resolution display from `videoWidth` / `videoHeight` DOM polling.
- Animated status indicator (yellow/loading → green/live).

#### #ai — AI-Powered Features

| Section | Cloudinary technique |
|---|---|
| Background Removal | `removeBackground` → `e_background_removal` |
| Generative Fill | `fillBackground` → `e_gen_fill` with `pad` crop for 4 aspect ratios |
| Content-Aware Crop | `gravity="auto"` — landscape, square, portrait, banner |
| Image Enhancer | `e_enhance` — Before/After slider comparing pre-enhanced public ID |
| AI Auto-Tagging | Server-side Admin API with multi-layer fallback (see below) |
| Generative Replace | `e_gen_replace:from_X;to_Y` — 4 variants on a cat image |

### `/contentful-gallery`
Fetches `cloudinaryMediaDisplay` and `featureItem` entries from Contentful, normalizes them into a unified list, and renders them in a 3-column responsive grid with image, title, description, Cloudinary public ID, and content-type badge.

---

## Key Technical Decisions

### Content & Caching
- Contentful queries use `unstable_cache` with cache tags (`contentful`, `pages`, `settings`) and a configurable revalidation interval.
- `/api/revalidate` webhook calls `revalidateTag()` per content type for fine-grained ISR.
- `/capabilities` is `force-dynamic` because it calls the Cloudinary Admin API at render time.

### Contentful ↔ Cloudinary Bridge
The Contentful Cloudinary App stores selected media as a JSON array inside a JSON Object field.

```ts
type CloudinaryField = CloudinaryAsset[]
```

Helper functions in `lib/cloudinary/helpers.ts` provide the abstraction:
- `getPublicId(field)` — first asset's public ID
- `getAllPublicIds(field)` — array of all public IDs
- `fieldIsVideo(field)` — detects video resource type
- `getAspectRatio(field)` — width/height ratio from metadata

### Type System
Two-layer approach:
- **Raw types** — Contentful SDK `EntrySkeletonType` + `EntryFieldTypes` in `types/contentful.ts`.
- **Resolved types** (`ResolvedPage`, `ResolvedSection`, …) — plain data objects safe to pass to React components, produced by `resolveSection()` in `lib/contentful/queries.ts`.

### Image Delivery
- All images use `CldImage` (next-cloudinary), wrapped in `CloudinaryImage` with defaults: `crop="fill"`, `gravity="auto"`, `quality="auto"`, `format="auto"`.
- OG images built as plain Cloudinary URL strings (`w_1200,h_630,c_fill,q_80,f_jpg`).
- Transformation presets centralized in `lib/cloudinary/transformations.ts`.

### Video Delivery
- `CloudinaryVideo` dynamically imports `CldVideoPlayer` with `{ ssr: false }`.
- Adaptive streaming passes `sourceTypes: ['hls', 'dash', 'mp4']` when enabled.

### AI Auto-Tagging Fallback Chain
```
cld_ai → google_tagging → aws_rek_tagging → imagga_tagging
→ manual tags → predominant colors → orientation/format metadata
```

---

## UI Components

### Layout
- **Header** — async Server Component, sticky, glass-morphism (`bg-white/90 backdrop-blur-md`). Fetches nav + site settings from Contentful.
- **Navigation** — Client Component, desktop horizontal + hamburger mobile menu.
- **Footer** — async Server Component, "Powered by Cloudinary / Contentful / Vercel / Claude" links.

### Primitives
- **Button** — 3 variants (primary, secondary, outline) × 3 sizes. Smart `<Link>` vs. `<a target="_blank">` based on URL.
- **Container** — narrow (max-w-4xl) / default (max-w-7xl) / wide (max-w-screen-2xl).
- **SectionWrapper** — `<section>` with `section-padding`, white/gray/dark background presets.

### Media
- **BeforeAfterSlider** — drag/touch interactive slider. Clips the "before" image with CSS `width %`. Supports `removeBackground`, `fillBackground`, `enhance`, `rawTransformations`, or a separate `afterPublicId`.
- **FeatureCard** — auto-detects single vs. multi-image Cloudinary field; renders full image or 2-column mini grid with hover scale transition.
- **MediaGallery** — `grid`, `masonry` (CSS columns), or `carousel` (snap-scroll) layout, driven by Contentful field.

### Design Tokens (`globals.css`)
```css
.heading-1   { text-4xl → text-6xl, font-bold }
.heading-2   { text-3xl → text-4xl, font-bold }
.heading-3   { text-2xl → text-3xl, font-semibold }
.body-large  { text-lg → text-xl, text-gray-600 }
.section-padding { py-12 md:py-16 }

.rainbow-border-btn  /* rotating conic-gradient border via @property */
```

---

## Section Types (Contentful → Component mapping)

| Contentful type | Component | Description |
|---|---|---|
| `sectionHero` | `HeroSection` | Full-width hero, image or video bg, configurable overlay, headline, subheadline, CTA |
| `sectionFeatureGrid` | `FeatureGrid` | 2/3/4-column card grid |
| `sectionMediaGallery` | `MediaGallery` | Grid / masonry / carousel gallery |
| `sectionVideo` | `VideoSection` | Dark-bg video player with optional HLS/DASH |
| `sectionAiDemo` | `AiDemoSection` | AI demo driven by `demoType` field, with optional Before/After slider |
| `sectionRichText` | `RichTextSection` | Full Contentful Rich Text with custom node renderers |
