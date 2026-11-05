# Filo public website

Prepared 5 November 2026 (Asia/Manila). Standalone public website, separate from `../filo-app/`. The homepage uses Astro, TypeScript, React/Motion reveal islands and plain CSS. It introduces the project; it does not connect to app accounts, classes or Supabase.

## Local development

Use Node.js 22.12 or newer (subject to installed Astro engine requirements). From `filo-website/`:

```powershell
npm install
npm run dev
```

Open the local URL printed by Astro. For a phone on the same trusted Wi-Fi, use `npm run dev -- --host 0.0.0.0` and the network URL printed by Astro; Windows firewall may require a private-network exception. The development server is not a public deployment.

Owner production checks: `npm run build`, then `npm run preview`. No tests, builds or browser checks were run by the agent, per the workspace policy.

Initial dependency installation completed with a lockfile. npm reported an optional Rolldown WASI-folder cleanup warning (EPERM) but exited successfully; runtime impact has not been checked. If local startup fails, share the exact error before removing any files.

## Homepage and publishing

The availability section links to `https://github.com/rogiie234/filo-app` as Explore Filo on GitHub, with APK release coming soon. The app repository README now explains the future Releases/Assets/APK path. Neither link implies a published APK; change availability wording only after an owner-accepted release actually exists. No GitHub edit/push/release or APK build was performed for this update.

The homepage includes navigation, a mascot-led welcome, three feature introductions, study illustration, project story, six-member team, native FAQ and truthful public-release status. Names and roles are owner-supplied; middle initials are omitted and supplied given names retained. The team is Christian Orlan Motas (System Analyst), Rogelyn Nepa (Project Manager), Kent Aian Tabuelog (Frontend Developer), Rose Jean Tupaz (Backend Developer), Jhondel Cabugsa (Quality Assurance), and Zaira Jane Estrada (Technical Writer). Team profiles use open portrait areas, names, roles and draft role-based descriptions, without enclosing cards. Portraits are explicitly pending; no personal photos or biographies have been fabricated. It has no forms, tracking, external embeds, invented biographies, sample student data or fake download buttons. Optional biographies/photos, real approved app screenshots, official download URL, contact channel and any required policy content still need owner input before a final launch. No screenshot preview was fabricated.

`HeroArtwork.tsx` retains the mascot greeting. `Reveal.tsx` uses the already installed Motion for React (formerly Framer Motion) for viewport-triggered fade/rise entrances across hero copy, features, study, About Us, team, FAQ and availability. Each reveal runs once per page load; feature cards and team profiles have short bounded stagger delays. React wrappers server-render Astro content with `initial={false}` so content is not hidden pending JavaScript/hydration. Layout rules accommodate Astro slots/islands. MotionConfig follows the user's reduced-motion preference, disabling transform effects while allowing gentle opacity changes. Navigation and FAQ use native links/details and work without JavaScript. Original PNGs retain their backgrounds; the ordinary page uses waving and lazy-loaded reading, while the entrance also requests cheerful and curious only when it plays. No new animation dependency is added.

For a future Cloudflare Pages Git integration, use this folder as the project root, build command `npm run build`, and output directory `dist`. No runtime adapter, server, database or environment secrets are needed. A dedicated GitHub repository and Cloudflare project have not been created. Add the real canonical URL/social sharing image when a domain is chosen; no placeholder domain is published.

## Team portraits and copy

The portrait gallery now alternates mint, warm yellow and peach backdrops with theme-specific darker equivalents, decorative profile numbers and matching role accents. These colors live only in the image areas/section; profiles still have no enclosing cards. Actual portraits and draft role descriptions still need owner review.

The team is an open two-column portrait layout on desktop and one column at <=700px. Each profile has a 4:5 chest-to-head image area with top-centered cover cropping, followed by its role, name and short draft description. There are no enclosing card surfaces, borders or rounded frames. Labeled silhouettes are only layout placeholders, not representations of the members.

When photos are ready, place them in `public/assets/team/` and set each member's `photo` field in `src/pages/index.astro`, for example `/assets/team/christian-orlan-motas.webp`. Use the corresponding member's name for the other filenames. Use well-framed chest-to-head portraits (suggested 640x800 or larger at the same ratio); check the actual crop before acceptance. Transparent cutouts can use the subtle existing portrait backdrop. Images load lazily, and meaningful portrait alt text is generated from the member's name. Until a path is set, the labeled placeholder is shown without a broken image request. If a configured photo URL is wrong, the browser can show its portrait alt text; fix the file/path and reload. Replace the draft role descriptions with your preferred personal introductions when supplied.

## Website appearance

The header has an icon-only sun/moon switch with a sliding thumb for the entire website. Light is the initial default; an explicit choice is saved as `filo:theme` in local storage and restored by a small head script before styling. No automatic system-theme selection or app-account sync is added. The native button exposes role=switch, the stable Dark mode accessible name, aria-checked and an action tooltip; there are no visible Dark mode/On-Off labels. Its target is 84x48px and remains in the mobile header; thumb motion is disabled for reduced motion. With JavaScript disabled it is hidden and the site uses its light fallback; with storage denied switching works for the current page but cannot survive reload.

`TextReveal.tsx` adds once-per-load viewport line reveals to section headings, feature titles and team names: 28px rise/opacity keyframes, 700ms easing and 120ms line stagger. Below-fold headings hydrate on visibility. Full heading names/levels remain accessible, while visual line spans are decorative to screen readers. Server-rendered text is visible without hydration; reduced motion suppresses translation. Paragraphs retain existing section fades. No text splitting into individual letters, custom scroll listener or dependency was added.

Dark colors follow the app's existing dark tokens (#0F1A17 background, #E8F1EB text, #5CBF9B primary). The original dark logo export is copied unchanged from `../filo-app/frontend/assets/brand/logo-mark-dark.png`, paired with the existing light export. No image recoloring is applied: hero/intro mascot cutouts use theme-aware circles; the separate reading illustration retains its baked-in pale background. Accent text/button pairs have explicit foreground tokens. The intro keeps fixed green/cream colors and the existing replay/reduced-motion/deep-link rules. `npm test` includes maintained theme-state/storage-failure checks; they have not been run.

## Entrance sequence

Owner reference: [Nothin'](https://www.noth.in/). Public markup and its linked [motion bundle](https://nothinv1.netlify.app/main.js) were inspected for staged lettering, changing illustrations, curtain exit and hero handoff. No live rendered reference observation was available. This is a Filo adaptation, not a reproduction of the reference's artwork, code or exact timing.

`Entrance.tsx` wraps the hero and uses the existing Motion package: the complete live Nunito `filo` word rises into view; a space to its right expands for the original waving, cheerful and curious PNGs, keeping all four letters together. The space contracts and a deep-green curtain retracts upward, followed by a small hero rise. The finite sequence lasts about 3.1 seconds. There is no loading percentage or fake progress. The green/cream entrance retains fixed brand colors in both website themes. The intro requests three original poses only when it plays; the normal hero reuses waving and the study section lazy-loads reading.

The entrance is created only after hydration and never server-renders a blocking cover. It can briefly appear after the static page on a slow hydration connection; this is the tradeoff for a readable no-JavaScript fallback. It plays on each page load/refresh, including restored scroll positions, without reading or writing session storage. Reduced motion and fragment destinations still bypass it. There is no Skip intro button; a keypress, pointer interaction or scrolling can still dismiss it. Preference changes dismiss it. A 3.6-second timer/CSS fallback clears the cover; no body scroll lock or hidden page content is used. Slow or missing decorative PNGs do not hold the sequence open.

To replay for owner review, refresh a URL without a `#fragment`, with reduced motion off. No console commands or storage clearing are needed. Refreshing a direct section link (for example `/#team`) intentionally preserves that destination without the intro. The maintained policy test is available via `npm test`; it was updated, not run. All browser, animation and production checks remain owner-performed.

## Design source and usage

The app's actual `frontend/lib/core/theme/app_theme.dart`, `filo_design_tokens.dart`, `animation_constants.dart`, `core/widgets/filo_widgets.dart` and onboarding intro source were inspected alongside its design brief, brand guide, asset register and Filo-specific UI guidance. Source inspection is not runtime or visual acceptance. Graphify currently reports stale structural/document semantics.

- `src/pages/index.astro` imports `src/styles/brand.css` and `home.css`. The former provides self-hosted variable Nunito, the app's light/dark palettes, spacing/radius tokens, base typography and keyboard focus. No external font service is required. Public URLs assume deployment at the domain root.
- Preserve cream background, deep green text, mint surfaces, lime accents and rounded tactile controls. Use the decorative border for panels and the stronger control border for essential input boundaries. Do not use pale accent colors as body text.
- App body text is 16/24, secondary text 14/20, section titles 22/28 and titles 32/40 or 36/44. Adapt website headings responsively when layout is designed; do not cap browser zoom or copy the app's text-scale limit. Use 24px-equivalent mobile side margins and at least 48px-equivalent interactive targets; primary buttons are 56px-equivalent.
- The logo is `/assets/brand/logo-mark-light.png`. Match the app's lockup with a 36px contained mark, 8px gap and live lowercase `filo` text in Nunito 900 at 32px, allowing responsive scaling. Give decorative logo images empty alt text when adjacent text already identifies Filo. Preserve the artwork, proportions and transparent canvas. Owner website appearance review remains pending.

## Asset provenance

Files are unchanged local copies, not links into the Android app. Updating app assets does not automatically update these copies. All source paths below are relative to `../filo-app/frontend/assets/`.

| Website location | Source | Notes |
| --- | --- | --- |
| `public/assets/brand/logo-mark-light.png` | `brand/logo-mark-light.png` | Existing app light-theme export; no redraw |
| `public/assets/fonts/Nunito.ttf` | `fonts/Nunito.ttf` | Variable weight 200-1000; app commonly uses 400-900 |
| `public/assets/fonts/OFL.txt` | `fonts/OFL.txt` | Preserve SIL Open Font License and copyright notice |
| `public/assets/mascots/*.png` | Corresponding `mascots/*.png` | Twelve existing poses, unchanged; original provenance and some pose approvals remain pending in the app register |
| `public/assets/mascots/entry/*.png` | Corresponding `mascots/entry/*.png` | Existing transparent waving/cheerful/curious cutouts, unchanged; hero/intro use themed mint circles like the app's EntryMascot |

Mascot poses: `waving`, `curious`, `cheerful`, `sleepy`, `thinking`, `confused`, `confused_notepad`, `cheerful_note`, `waiting`, `clock`, `folder`, `reading`.

Use waving for the welcome, curious/thinking for explanations and reading/folder for relevant feature illustrations. These are decorative companions to meaningful text. The original waving asset includes its illustrated circular backdrop and pale outer background; it is not an isolated character cutout. Preserve that treatment rather than assuming every PNG has a transparent background. Hero/intro now reuse unchanged app entry cutouts in public/assets/mascots/entry over themed mint circles, matching EntryMascot. Source extraction fidelity remains pending owner review; no new extraction or generated art was made.

Only load poses used on a page; do not preload the collection. Set intrinsic image dimensions when implementing pages and lazy-load below-the-fold artwork. Do not publish private app data or capture real class/student information in screenshots. No Google sign-in mark, icon font, screenshots or account assets were copied for this task.

## Motion direction

The owner requests website animation and permits additional mascot expressions if needed. Existing poses cover the current website concept, so no generation was necessary. Motion for React animates the existing hero image's position and rotation; arm/eye articulation needs separate artwork. This website direction does not change the app's animation rules.

The app's restrained timing informed the short button feedback and 250ms mascot hover; the hero greeting lasts 1.4 seconds and does not repeat. CSS and Motion honor `prefers-reduced-motion`; server-rendered content remains visible without JavaScript. No continuous ambient loop is used.

## Review status

No tests, analyzer, build, browser run or deployment performed. Owner visual review is pending. Canonical scope, Done when and remaining checks: `../qa/WEBSITE-ACCEPTANCE.md`. No Git repository was created and no app files were changed. Dependencies/build artifacts are locally ignored; no disposable screenshots or testing scripts were created.
