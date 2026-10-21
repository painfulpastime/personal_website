# Simon Mwaura — personal website

Static Astro website for Simon's engineering work, learning, notes, and creative
practice. The application lives at the repository root.

## Local development

Requires Node.js 22.22+ and npm (verified with Node 24).

```powershell
npm.cmd ci
$env:ASTRO_TELEMETRY_DISABLED = '1'
npm.cmd run dev
```

Open the printed localhost URL under `/personal_website/`. Use `npm` instead of
`npm.cmd` outside Windows PowerShell.

## Build and check

```powershell
$env:ASTRO_TELEMETRY_DISABLED = '1'
npm.cmd run build
npm.cmd run check:build
npm.cmd run preview
```

The default site origin is `https://painfulpastime.github.io` and the base path
is `/personal_website/`, matching this repository's GitHub remote. This configures
generated URLs; it does not enable or verify a live deployment. Preview at
`http://127.0.0.1:4321/personal_website/` (or the port printed by Astro).

The build checker verifies generated pages, internal links/assets, anchors, and
draft exclusion. To check a different hosting path, set `BASE_PATH` for both the
build and check; set `SITE_URL` to override the origin:

```powershell
$env:SITE_URL = 'https://example.com'
$env:BASE_PATH = '/'
npm.cmd run build
npm.cmd run check:build
```

## Editing

- Public project text: `src/content/projects/*.md`.
- Notes: `src/content/notes/*.md`. Drafts default to true and are excluded from
  the index and generated routes. `first-note.md` is an unpublished template.
- Profile, learning, and contact data: `src/data/profile.ts`.
- About and HTML CV: `src/pages/about.astro` and `src/pages/cv.astro`.
- Styles: `src/styles/global.css`; selected images: `src/assets/`.
- Public files copied directly into the build: `public/`.

To publish a note, copy the template, write its content, set its date in
`YYYY-MM-DD` format, and explicitly set `draft: false`. Preview before publishing.

Only public website source and selected assets belong in this repository. Keep
private briefs, raw research/CV files, archives, recovery media, and mockups
outside it. Dependencies, Astro caches, and generated output are ignored.

## Migration and release

The Astro application was imported from the sibling `academic_website/web`
folder onto the existing `migrate-to-astro` branch. The Jekyll implementation
was removed from the working tree; its history remains in Git. No history was
rewritten. The source folder, private briefs, and external archives were not
modified or imported.

`.github/workflows/pages.yml` contains the root-level GitHub Pages workflow.
It runs only through a manual `workflow_dispatch` trigger, installs the locked
dependencies with Node 24, builds for `/personal_website/`, runs
`npm run check:build`, and uploads only `dist/`. Deployment depends on a
successful build and check. Pushes and pull requests do not trigger it.

When deployment is authorized, configure the repository's Pages source as
GitHub Actions and run the workflow manually. GitHub requires this workflow
to exist on the default branch before its manual Run workflow control appears.
Do not run it until the migration and public content are approved.

Website copy still needs Simon's editorial review before release, including the
contact email, the tentative thesis case study (saved simulation results, not a
rerun), and the dated October 2026 learning snapshot. Kokoro's repository remains
private; its waveform is illustrative artwork. The CV is HTML only, and Notes
has no published entries yet.

## Attribution

Selected portrait and portfolio imagery: Simon Mwaura, recovered from his former
Wix site. Research plot: Simon's thesis revision. The check pattern, bead details,
ink texture, and waveform are code assets from the migrated site.

The legacy MIT notice is retained in `LICENSE`. Self-hosted fonts use the SIL
Open Font License; full notices ship in `public/licenses/` and built output.
See `THIRD_PARTY_NOTICES.md` for details.
