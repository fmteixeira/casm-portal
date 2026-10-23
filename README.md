# CASM · Clube de Airsoft de São Miguel

Single-page site built with Vite, React, TypeScript, Tailwind CSS v4 and React Router.

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # static site in dist/
```

## Routes

| URL | Page |
| --- | --- |
| `/` | Início |
| `/sobre` | Sobre nós |
| `/eventos`, `/eventos/<post>` | Event list, event detail |
| `/como-participar` | Como participar |
| `/galeria?tipo=fotos\|videos` | Gallery (the filter lives in the query string) |
| `/galeria/<album>/<file>` | Gallery with that photo open in the viewer |
| `/contactos` | Contactos |

The site uses browser-history URLs, so the host must serve `index.html` for unknown paths
(SPA fallback).

## Hosting (Netlify)

`netlify.toml` holds the whole setup: build command, `dist` output, Node 24, the SPA fallback,
and long-lived caching for hashed files in `/assets`. In Netlify, choose
**Add new project → Import an existing project**, pick this GitHub repo, and keep the detected settings.
Every push to `main` redeploys the site.

## Content

All content lives in `content/` and is bundled at build time. No backend is needed.

```
content/
  site.json                     contacts, social links, club details
  <category>/<post>/post.json   one folder per post
  <category>/<post>/*.jpg       that post's media
```

Media paths in a `post.json` are relative to its folder. A post can point to another post's file
(`"../../galeria/jogos-2026/briefing.jpg"`) instead of copying it. A missing file logs a
`[content] media not found` warning in the browser console.

| Category | Post fields |
| --- | --- |
| `eventos` | `title`, `date` (YYYY-MM-DD), `endDate?`, `time?`, `location`, `type`, `cover`, `summary?`, `body?` (paragraphs). An event counts as upcoming until its date (or `endDate`) has passed. |
| `galeria` | `title`, `date?`, `items: [{ file, alt, type?: "video", poster? }]`. Albums are sorted newest `date` first. `.mp4`/`.webm` files are treated as videos. |
| `parceiros` | `name`, `url?`, `logo?`, `order?`. A partner without a logo shows its name. |
| `paginas` | Copy and images for each page (`inicio`, `sobre`, `eventos`, `galeria`, `como-participar`, `contactos`). The shapes are in `src/content/types.ts`. |

To add an event, create `content/eventos/2027-01-10-jogo/post.json`, add its photo, and rebuild.

Text in `[brackets]` is placeholder copy from the design and still needs real values.

## Notes

- The contact form has no server. It opens the visitor's email app with the message filled in, addressed to `site.json` → `email`.
- The play button on the home page "O que é o CASM?" image only appears when `site.json` → `videoUrl` is set.
- `public/brand/casm-logo.png` is the original logo. The UI uses a resized copy at `src/assets/casm-logo.png`.
