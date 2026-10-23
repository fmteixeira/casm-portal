import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router'
import { ChevronLeft, ChevronRight, Close, Play } from '../components/icons'
import { albums, galleryItems, pages, type GalleryItem } from '../content'

const { kicker, title, text } = pages.galeria

const PAGE_SIZE = 12

const filters = [
  { id: 'tudo', label: 'Tudo' },
  { id: 'fotos', label: 'Fotos' },
  { id: 'videos', label: 'Vídeos' },
] as const

type FilterId = (typeof filters)[number]['id']

const itemPath = (it: GalleryItem) => `/galeria/${it.album}/${it.id}`

export default function Galeria() {
  const { album, item } = useParams()
  const [searchParams] = useSearchParams()
  const kind = (filters.find((f) => f.id === searchParams.get('tipo'))?.id ?? 'tudo') as FilterId
  const [shown, setShown] = useState(PAGE_SIZE)

  const items = galleryItems.filter((it) => kind === 'tudo' || (kind === 'videos' ? it.kind === 'video' : it.kind === 'foto'))
  const query = kind === 'tudo' ? '' : `?tipo=${kind}`
  const openIndex = items.findIndex((it) => it.album === album && it.id === item)

  return (
    <>
      <section className="wrap flex flex-col gap-2.5 pt-10 pb-2 lg:pt-16">
        <div className="kicker">{kicker}</div>
        <h1 className="m-0 font-display text-[64px]/[0.9] font-extrabold uppercase lg:text-[96px]">{title}</h1>
        <p className="m-0 text-muted">{text}</p>
      </section>

      <div role="group" aria-label="Filtrar galeria" className="wrap flex gap-2 overflow-x-auto pt-4 pb-5">
        {filters.map((f) => {
          const on = f.id === kind
          return (
            <Link
              key={f.id}
              to={f.id === 'tudo' ? '/galeria' : `/galeria?tipo=${f.id}`}
              aria-current={on ? 'page' : undefined}
              onClick={() => setShown(PAGE_SIZE)}
              className={`flex h-11 shrink-0 items-center border-[1.5px] px-4 font-display text-base/none font-bold tracking-[0.08em] whitespace-nowrap uppercase no-underline ${
                on ? 'border-accent bg-accent text-on-accent hover:text-on-accent' : 'border-line2 text-text hover:border-accent hover:text-text'
              }`}
            >
              {f.label}
            </Link>
          )
        })}
      </div>

      <section className="mx-auto w-full max-w-[1240px] px-2 pb-12 lg:px-8">
        {items.length === 0 ? (
          <div className="mx-3 border border-dashed border-line2 px-5 py-7 text-center text-muted lg:mx-0">Ainda não há nada aqui.</div>
        ) : (
          <div className="columns-2 gap-1.5 md:columns-3 lg:columns-4">
            {items.slice(0, shown).map((it) => (
              <Link
                key={itemPath(it)}
                to={itemPath(it) + query}
                aria-label={it.kind === 'video' ? `Ver vídeo: ${it.alt}` : `Ver foto: ${it.alt}`}
                className="ph group relative mb-1.5 block break-inside-avoid overflow-hidden"
              >
                {it.kind === 'foto' ? (
                  <img src={it.src} alt="" loading="lazy" className="block w-full transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <>
                    {it.poster ? <img src={it.poster} alt="" loading="lazy" className="block w-full" /> : <div className="aspect-video" />}
                    <span className="absolute top-1/2 left-1/2 -mt-6 -ml-6 flex size-12 items-center justify-center rounded-full bg-accent text-on-accent">
                      <Play size={20} />
                    </span>
                  </>
                )}
              </Link>
            ))}
          </div>
        )}
      </section>

      {shown < items.length && (
        <div className="wrap pb-14">
          <button
            type="button"
            onClick={() => setShown(shown + PAGE_SIZE)}
            className="h-[54px] w-full cursor-pointer border-[1.5px] border-accent bg-transparent font-display text-base/none font-bold tracking-[0.08em] text-accent uppercase hover:text-accent-hover lg:mx-auto lg:block lg:w-auto lg:px-10"
          >
            Carregar mais
          </button>
        </div>
      )}

      {openIndex >= 0 && <Lightbox items={items} index={openIndex} query={query} />}
    </>
  )
}

function Lightbox({ items, index, query }: { items: GalleryItem[]; index: number; query: string }) {
  const navigate = useNavigate()
  const closeRef = useRef<HTMLButtonElement>(null)
  const it = items[index]
  const prev = items[(index - 1 + items.length) % items.length]
  const next = items[(index + 1) % items.length]
  const albumTitle = albums.find((a) => a.slug === it.album)?.title

  const go = (target: GalleryItem) => navigate(itemPath(target) + query, { replace: true })
  const close = () => navigate('/galeria' + query)

  useEffect(() => {
    closeRef.current?.focus()
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = overflow
    }
  }, [])

  const navButton =
    'absolute top-1/2 z-10 flex size-12 -translate-y-1/2 cursor-pointer items-center justify-center border border-line bg-scrim/80 text-text hover:border-accent hover:text-accent'

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={it.alt || 'Galeria'}
      tabIndex={-1}
      className="fixed inset-0 z-50 flex flex-col bg-scrim/97"
      onKeyDown={(e) => {
        if (e.key === 'Escape') close()
        if (e.key === 'ArrowLeft') go(prev)
        if (e.key === 'ArrowRight') go(next)
      }}
    >
      <div className="flex items-center justify-between gap-4 py-2 pr-2 pl-5">
        <span className="min-w-0 truncate text-sm text-muted">
          <span className="font-semibold tracking-[0.12em] text-accent uppercase">
            {index + 1} / {items.length}
          </span>
          {albumTitle && <> · {albumTitle}</>}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={close}
          aria-label="Fechar"
          className="flex size-12 cursor-pointer items-center justify-center border border-line bg-transparent text-text hover:border-accent hover:text-accent"
        >
          <Close size={24} />
        </button>
      </div>

      <figure className="relative m-0 flex min-h-0 flex-1 flex-col items-center justify-center px-2 pb-4 lg:px-20">
        {it.kind === 'foto' ? (
          <img key={it.src} src={it.src} alt={it.alt} className="max-h-full max-w-full object-contain" />
        ) : (
          <video key={it.src} src={it.src} poster={it.poster || undefined} controls autoPlay className="max-h-full max-w-full" />
        )}
        {it.alt && <figcaption className="mt-3 text-center text-sm text-body">{it.alt}</figcaption>}
        {items.length > 1 && (
          <>
            <button type="button" onClick={() => go(prev)} aria-label="Anterior" className={`${navButton} left-2 lg:left-5`}>
              <ChevronLeft size={24} />
            </button>
            <button type="button" onClick={() => go(next)} aria-label="Seguinte" className={`${navButton} right-2 lg:right-5`}>
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </figure>
    </div>
  )
}
