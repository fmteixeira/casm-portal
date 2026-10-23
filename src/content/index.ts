// Loads everything under /content at build time.
// Layout: content/<category>/<post>/post.json, with the post's media beside it.
// Media paths inside a post.json are relative to that post's folder
// (e.g. "cover.jpg" or "../../galeria/jogo-na-mata/briefing.jpg").

import siteJson from '../../content/site.json'
import type {
  Album,
  ContactosPage,
  ComoParticiparPage,
  EventItem,
  EventosPage,
  GaleriaPage,
  GalleryItem,
  InicioPage,
  Partner,
  SobrePage,
  Site,
} from './types'

export type * from './types'

const posts = import.meta.glob<Record<string, unknown>>('/content/*/*/post.json', {
  eager: true,
  import: 'default',
})

const media = import.meta.glob<string>('/content/**/*.{jpg,jpeg,png,webp,gif,svg,mp4,webm}', {
  eager: true,
  query: '?url',
  import: 'default',
})

type Raw = { category: string; slug: string; dir: string; data: Record<string, unknown> }

const rawPosts: Raw[] = Object.entries(posts).map(([file, data]) => {
  const [, , category, slug] = file.split('/')
  return { category, slug, dir: `/content/${category}/${slug}`, data }
})

function normalize(path: string): string {
  const out: string[] = []
  for (const part of path.split('/')) {
    if (part === '..') out.pop()
    else if (part && part !== '.') out.push(part)
  }
  return '/' + out.join('/')
}

/** Resolves a media reference from a post.json to a served URL. */
function resolveMedia(dir: string, ref: unknown): string {
  if (typeof ref !== 'string' || ref === '') return ''
  if (/^https?:\/\//.test(ref)) return ref
  const url = media[normalize(`${dir}/${ref}`)]
  if (!url) console.warn(`[content] media not found: ${ref} (from ${dir}/post.json)`)
  return url ?? ''
}

function postsOf(category: string): Raw[] {
  return rawPosts.filter((p) => p.category === category)
}

/** Resolves every string field named in `keys`, at any depth, against the post's folder. */
function withMedia<T>(raw: Raw, keys: string[]): T {
  const walk = (value: unknown): unknown => {
    if (Array.isArray(value)) return value.map(walk)
    if (value && typeof value === 'object') {
      return Object.fromEntries(
        Object.entries(value).map(([k, v]) => [
          k,
          keys.includes(k)
            ? Array.isArray(v)
              ? v.map((x) => resolveMedia(raw.dir, x))
              : resolveMedia(raw.dir, v)
            : walk(v),
        ]),
      )
    }
    return value
  }
  return walk(raw.data) as T
}

function page<T>(slug: string): T {
  const raw = postsOf('paginas').find((p) => p.slug === slug)
  if (!raw) throw new Error(`[content] missing content/paginas/${slug}/post.json`)
  return withMedia<T>(raw, ['image', 'imageWide', 'src', 'strip'])
}

export const site = siteJson as Site

export const pages = {
  inicio: page<InicioPage>('inicio'),
  sobre: page<SobrePage>('sobre'),
  eventos: page<EventosPage>('eventos'),
  galeria: page<GaleriaPage>('galeria'),
  comoParticipar: page<ComoParticiparPage>('como-participar'),
  contactos: page<ContactosPage>('contactos'),
}

export const events: EventItem[] = postsOf('eventos')
  .map((raw) => ({ ...withMedia<Omit<EventItem, 'slug'>>(raw, ['cover']), slug: raw.slug }))
  .sort((a, b) => a.date.localeCompare(b.date))

function today(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function upcomingEvents(): EventItem[] {
  const t = today()
  return events.filter((e) => (e.endDate ?? e.date) >= t)
}

export function pastEvents(): EventItem[] {
  const t = today()
  return events.filter((e) => (e.endDate ?? e.date) < t).reverse()
}

export const albums: Album[] = postsOf('galeria')
  .map((raw) => {
    const data = raw.data as { title: string; date?: string; items: { file: string; alt?: string; type?: string; poster?: string }[] }
    const items: GalleryItem[] = data.items.map((it) => ({
      album: raw.slug,
      id: it.file.replace(/\.[^.]+$/, ''),
      src: resolveMedia(raw.dir, it.file),
      poster: resolveMedia(raw.dir, it.poster),
      alt: it.alt ?? '',
      kind: it.type === 'video' || /\.(mp4|webm)$/i.test(it.file) ? 'video' : 'foto',
    }))
    return { slug: raw.slug, title: data.title, date: data.date, items }
  })
  .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? '') || a.slug.localeCompare(b.slug))

export const galleryItems: GalleryItem[] = albums.flatMap((a) => a.items)

export const partners: Partner[] = postsOf('parceiros')
  .map((raw) => withMedia<Partner>(raw, ['logo']))
  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

const MONTHS = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ']

export function dayMonth(date: string): { day: string; month: string } {
  const [, m, d] = date.split('-')
  return { day: d, month: MONTHS[Number(m) - 1] ?? '' }
}
