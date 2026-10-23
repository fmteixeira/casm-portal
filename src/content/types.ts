// Shapes of the post.json files under /content. Media fields hold resolved URLs.

export type Site = {
  name: string
  shortName: string
  tagline: string
  description: string
  email: string
  phone: string
  location: string
  address: string[]
  nif: string
  mapsUrl: string
  videoUrl: string
  social: { instagramHandle: string; instagram: string; facebook: string; youtube: string }
}

export type Hero = { kicker: string; title: string; image: string; alt: string }

export type InicioPage = {
  hero: Hero & { text: string; imageWide: string }
  about: { title: string; paragraphs: string[]; image: string; alt: string }
  activities: { kicker: string; title: string; to: string; image: string; alt: string }[]
  instagram: { title: string; text: string }
}

export type SobreSection = {
  kicker: string
  title: string
  text: string
  images?: { src: string; alt: string }[]
  stats?: { value: string; label: string }[]
  tags?: string[]
  checklist?: string[]
  cta?: { label: string; to: string }
}

export type SobrePage = { hero: Hero; intro: string; sections: SobreSection[]; strip: string[] }

export type EventosPage = { hero: Hero; empty: string }

export type GaleriaPage = { kicker: string; title: string; text: string }

export type ComoParticiparPage = {
  badge: string
  title: string
  text: string
  comingSoonLabel: string
  comingSoon: string[]
}

export type ContactosPage = { hero: Hero; intro: string; subjects: string[] }

export type EventItem = {
  slug: string
  title: string
  /** YYYY-MM-DD */
  date: string
  /** YYYY-MM-DD, for events spanning several days */
  endDate?: string
  time?: string
  location: string
  type: string
  cover: string
  summary?: string
  body?: string[]
}

export type GalleryItem = {
  album: string
  id: string
  src: string
  poster: string
  alt: string
  kind: 'foto' | 'video'
}

export type Album = { slug: string; title: string; date?: string; items: GalleryItem[] }

export type Partner = { name: string; url?: string; logo?: string; order?: number }
