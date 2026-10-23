import { useEffect, useState, type CSSProperties } from 'react'
import { Link } from 'react-router'
import { EventMeta } from '../components/events'
import { ArrowRight, ChevronRight, Instagram, Play } from '../components/icons'
import { ArrowLink, ButtonLink, DateBadge, Logo } from '../components/ui'
import { dayMonth, pages, partners, site, upcomingEvents, type EventItem } from '../content'

const { hero, about, activities, instagram } = pages.inicio

export default function Inicio() {
  const upcoming = upcomingEvents()
  const next = upcoming[0]

  return (
    <>
      <section className="ph relative flex h-[640px] items-end overflow-hidden lg:h-auto lg:min-h-[720px]">
        <HeroSlides />
        <div className="absolute inset-0 bg-linear-to-b from-scrim/0 from-25% to-scrim/96 to-92% lg:hidden" />
        <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgb(15_17_14/0.95)_0%,rgb(15_17_14/0.6)_45%,rgb(15_17_14/0)_75%)] lg:block" />
        <div className="wrap relative flex flex-col gap-[18px] pb-10 lg:gap-6 lg:pb-20">
          <Logo className="hidden h-[150px] w-[126px] lg:block" />
          <div className="kicker flex items-center gap-2.5 lg:gap-3">
            <span className="h-0.5 w-7 bg-accent lg:w-9" />
            {hero.kicker}
          </div>
          <h1 className="m-0 max-w-[820px] font-display text-[56px]/[0.92] font-extrabold tracking-[0.005em] uppercase lg:text-[clamp(52px,8vw,112px)]/[0.88]">
            {hero.title}
          </h1>
          <p className="m-0 max-w-[330px] text-[17px] text-body lg:max-w-[520px] lg:text-xl">{hero.text}</p>
          <div className="mt-1.5 flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:mt-2 lg:gap-3.5">
            <ButtonLink to="/eventos">
              Ver eventos <ArrowRight />
            </ButtonLink>
            <ButtonLink to="/como-participar" variant="outline">
              Como participar
            </ButtonLink>
          </div>
        </div>
      </section>
      <div className="stripe" />

      {next && <NextEvent event={next} />}

      <section className="border-t border-line">
        <div className="wrap flex flex-col gap-5 py-12 lg:flex-row lg:flex-wrap lg:items-center lg:gap-14 lg:py-24">
          <div className="flex flex-col gap-5 lg:flex-[1_1_380px]">
            <div className="kicker">// 01 — Quem somos</div>
            <h2 className="h-section">{about.title}</h2>
            {about.paragraphs.map((p) => (
              <p key={p} className="m-0 text-body">
                {p}
              </p>
            ))}
            <ArrowLink to="/sobre">Saber mais</ArrowLink>
          </div>
          <AboutMedia />
        </div>
      </section>

      <section className="border-t border-line pt-12 pb-2 lg:pt-24 lg:pb-0">
        <div className="wrap mb-5 flex flex-col gap-3.5 lg:mb-10 lg:gap-4">
          <div className="kicker">// 02 — Atividade</div>
          <h2 className="h-section">O que fazemos</h2>
        </div>
        <div className="grid grid-cols-1 gap-1 lg:grid-cols-3">
          {activities.map((a) => (
            <Link
              key={a.to}
              to={a.to}
              className="ph group relative flex h-[260px] flex-col justify-end overflow-hidden px-5 py-[22px] text-text no-underline hover:text-text lg:h-[480px] lg:p-8"
            >
              <img src={a.image} alt={a.alt} loading="lazy" className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-linear-to-b from-scrim/0 from-20% to-scrim/92 lg:from-30%" />
              <span className="relative text-sm font-semibold tracking-[0.16em] text-accent uppercase lg:mb-2 lg:text-[13px]/none lg:tracking-[0.18em]">{a.kicker}</span>
              <span className="relative flex items-center justify-between font-display text-[46px]/none font-extrabold uppercase lg:text-[56px]">
                {a.title}
                <ArrowRight size={32} strokeWidth={2} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="wrap flex flex-col gap-5 py-12 lg:gap-10 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div className="flex flex-col gap-3.5 lg:gap-4">
            <div className="kicker">// 03 — Agenda</div>
            <h2 className="h-section">Próximos eventos</h2>
          </div>
          <div className="hidden lg:block">
            <ButtonLink to="/eventos" variant="accent">
              Todos os eventos
            </ButtonLink>
          </div>
        </div>
        {upcoming.length === 0 && (
          <div className="border border-dashed border-line2 px-5 py-7 text-center text-muted">{pages.eventos.empty}</div>
        )}
        <div className="flex flex-col border-t border-line lg:hidden">
          {upcoming.slice(0, 3).map((ev) => (
            <EventRow key={ev.slug} event={ev} />
          ))}
        </div>
        <div className="hidden grid-cols-3 gap-5 lg:grid">
          {upcoming.slice(0, 3).map((ev) => (
            <EventCard key={ev.slug} event={ev} />
          ))}
        </div>
        <div className="lg:hidden">
          <ButtonLink to="/eventos" variant="accent">
            Todos os eventos
          </ButtonLink>
        </div>
      </section>

      {partners.length > 0 && (
        <section className="border-y border-line bg-alt">
          <div className="wrap flex flex-col gap-5 py-12 lg:gap-8 lg:py-[72px]">
            <div className="flex flex-col gap-3.5 lg:gap-4">
              <div className="kicker">// 04 — Apoios</div>
              <h2 className="h-section">Parceiros</h2>
            </div>
            <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-[repeat(auto-fit,minmax(180px,1fr))] lg:gap-3">
              {partners.map((p) => {
                const inner = p.logo ? (
                  <img src={p.logo} alt={p.name} className="max-h-[60%] max-w-[75%] object-contain" />
                ) : (
                  <span className="phl">{p.name}</span>
                )
                const cls = 'flex h-24 items-center justify-center border border-line lg:h-[120px]'
                return p.url ? (
                  <a key={p.name} href={p.url} target="_blank" rel="noreferrer" className={`${cls} hover:border-accent`}>
                    {inner}
                  </a>
                ) : (
                  <div key={p.name} className={cls}>
                    {inner}
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      <section className="wrap flex flex-col items-start gap-4 py-14 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between lg:gap-7 lg:py-[88px]">
        <div className="flex flex-col items-start gap-4 lg:flex-[1_1_480px] lg:flex-row lg:items-center lg:gap-6">
          <Instagram size={40} strokeWidth={1.8} className="shrink-0 text-accent lg:size-16" />
          <div className="flex flex-col gap-4 lg:gap-2">
            <h2 className="m-0 font-display text-[40px]/[0.95] font-extrabold uppercase lg:text-[clamp(34px,4vw,52px)]/[0.92]">{instagram.title}</h2>
            <p className="m-0 text-muted">{instagram.text}</p>
          </div>
        </div>
        <ButtonLink to={site.social.instagram} className="w-full lg:w-auto">
          @{site.social.instagramHandle}
        </ButtonLink>
      </section>
    </>
  )
}

const FADE_SECONDS = 1.5

/**
 * Hero images that crossfade every `slideSeconds` while slowly panning left.
 * The pan runs through the fade-out too, so the outgoing image never stops moving.
 */
function HeroSlides() {
  const { slides, slideSeconds = 6 } = hero
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (slides.length < 2) return
    const id = setInterval(() => setStep((s) => s + 1), slideSeconds * 1000)
    return () => clearInterval(id)
  }, [slides.length, slideSeconds])

  const current = step % slides.length
  const previous = step > 0 ? (step - 1) % slides.length : -1
  const panStyle = { '--pan-duration': `${slideSeconds + FADE_SECONDS}s` } as CSSProperties

  return slides.map((slide, i) => {
    const visible = i === current
    // Three identical keyframes take turns so the pan restarts whenever a slide comes back,
    // even with only two slides (where the incoming one was the outgoing one a moment ago).
    const pan = visible ? `hero-pan-${step % 3}` : i === previous ? `hero-pan-${(step - 1) % 3}` : ''
    return (
      <picture key={slide.image}>
        {slide.imageWide && <source media="(min-width: 1024px)" srcSet={slide.imageWide} />}
        <img
          src={slide.image}
          alt={visible ? slide.alt : ''}
          aria-hidden={!visible}
          fetchPriority={i === 0 ? 'high' : 'low'}
          style={panStyle}
          className={`absolute inset-0 size-full object-cover transition-opacity duration-1500 ease-in-out ${visible ? 'opacity-100' : 'opacity-0'} ${pan}`}
        />
      </picture>
    )
  })
}

function AboutMedia() {
  const img = <img src={about.image} alt={about.alt} loading="lazy" className="absolute inset-0 size-full object-cover" />
  const cls = 'ph relative flex aspect-video w-full items-center justify-center border border-line p-0 lg:flex-[1.3_1_480px]'
  if (!site.videoUrl) return <div className={cls}>{img}</div>
  return (
    <a href={site.videoUrl} target="_blank" rel="noreferrer" aria-label="Reproduzir vídeo de apresentação" className={`${cls} group`}>
      {img}
      <span className="relative flex size-[68px] items-center justify-center rounded-full bg-accent text-on-accent transition-transform group-hover:scale-110 lg:size-[84px]">
        <Play />
      </span>
    </a>
  )
}

function NextEvent({ event }: { event: EventItem }) {
  const { day, month } = dayMonth(event.date)
  return (
    <section className="wrap flex flex-col gap-5 pt-14 pb-12 lg:py-24">
      <div className="kicker lg:hidden">Próximo jogo</div>
      <Link
        to={`/eventos/${event.slug}`}
        className="group flex flex-col border border-line bg-card text-text no-underline hover:text-text lg:flex-row lg:flex-wrap"
      >
        <div className="ph relative h-[220px] overflow-hidden lg:min-h-[380px] lg:flex-[1_1_420px]">
          <img src={event.cover} alt="" className="absolute inset-0 size-full object-cover" />
          <DateBadge day={day} month={month} large />
        </div>
        <div className="flex flex-col justify-center gap-2.5 p-5 lg:flex-[1_1_420px] lg:gap-4 lg:p-12">
          <span className="kicker hidden lg:block">Próximo jogo</span>
          <h2 className="m-0 font-display text-[32px]/none font-extrabold uppercase lg:text-[clamp(40px,5vw,64px)]/[0.92]">
            {event.title}
          </h2>
          {event.summary && <p className="m-0 hidden text-body lg:block">{event.summary}</p>}
          <EventMeta event={event} />
          <span className="mt-1.5 flex items-center gap-2 font-display text-[17px]/none font-bold tracking-[0.08em] text-accent uppercase group-hover:text-accent-hover lg:mt-2 lg:min-h-11 lg:text-lg">
            Ver detalhes <ArrowRight size={18} />
          </span>
        </div>
      </Link>
    </section>
  )
}

function EventRow({ event }: { event: EventItem }) {
  const { day, month } = dayMonth(event.date)
  return (
    <Link to={`/eventos/${event.slug}`} className="flex items-center gap-4 border-b border-line py-4 text-text no-underline hover:text-text">
      <div className="flex h-16 w-[60px] shrink-0 flex-col items-center justify-center border-[1.5px] border-accent font-display leading-none">
        <span className="text-[26px] font-extrabold">{day}</span>
        <span className="mt-[3px] text-xs font-bold tracking-[0.1em] text-accent">{month}</span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="font-display text-[21px]/[1.1] font-bold uppercase">{event.title}</span>
        <span className="text-sm text-muted">{event.location}</span>
      </div>
      <ChevronRight size={22} className="shrink-0 text-muted" />
    </Link>
  )
}

function EventCard({ event }: { event: EventItem }) {
  const { day, month } = dayMonth(event.date)
  return (
    <Link to={`/eventos/${event.slug}`} className="block border border-line bg-card text-text no-underline hover:border-accent hover:text-text">
      <div className="ph relative h-[220px]">
        <img src={event.cover} alt="" loading="lazy" className="absolute inset-0 size-full object-cover" />
        <DateBadge day={day} month={month} large />
      </div>
      <div className="flex flex-col gap-2 p-[22px]">
        <h3 className="m-0 font-display text-[28px]/none font-extrabold uppercase">{event.title}</h3>
        <span className="text-[15px] text-muted">{event.location}</span>
      </div>
    </Link>
  )
}
