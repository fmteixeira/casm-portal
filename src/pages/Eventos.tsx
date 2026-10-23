import { Link } from 'react-router'
import { EventMeta } from '../components/events'
import { ArrowRight, ChevronRight } from '../components/icons'
import { DateBadge, PageHero } from '../components/ui'
import { dayMonth, pages, pastEvents, upcomingEvents } from '../content'

const { hero, empty } = pages.eventos

export default function Eventos() {
  const upcoming = upcomingEvents()
  const past = pastEvents()

  return (
    <>
      <PageHero {...hero} />

      <section className="wrap flex flex-col gap-5 pt-7 pb-4 lg:pt-16">
        <div className="flex items-baseline justify-between">
          <h2 className="m-0 font-display text-[30px]/none font-extrabold uppercase lg:text-5xl">Próximos</h2>
          <span className="text-sm text-muted">
            {upcoming.length} {upcoming.length === 1 ? 'evento' : 'eventos'}
          </span>
        </div>
        {upcoming.length === 0 && (
          <div className="border border-dashed border-line2 px-5 py-7 text-center text-muted">{empty}</div>
        )}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((ev) => {
            const { day, month } = dayMonth(ev.date)
            return (
              <Link
                key={ev.slug}
                to={`/eventos/${ev.slug}`}
                className="group block border border-line bg-card text-text no-underline hover:border-accent hover:text-text"
              >
                <div className="ph relative h-[190px] lg:h-[220px]">
                  <img src={ev.cover} alt="" loading="lazy" className="absolute inset-0 size-full object-cover" />
                  <DateBadge day={day} month={month} />
                </div>
                <div className="flex flex-col gap-2 px-[18px] pt-[18px] pb-5">
                  <h3 className="m-0 font-display text-[28px]/none font-extrabold uppercase">{ev.title}</h3>
                  <EventMeta event={ev} stacked />
                  <span className="mt-1.5 flex items-center gap-2 font-display text-[17px]/none font-bold tracking-[0.08em] text-accent uppercase group-hover:text-accent-hover">
                    Ler mais <ArrowRight size={18} />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {past.length > 0 && (
        <section className="wrap flex flex-col gap-1 pt-8 pb-14 lg:pt-16 lg:pb-24">
          <h2 className="m-0 mb-3 font-display text-[30px]/none font-extrabold uppercase lg:text-5xl">Anteriores</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10">
            {past.map((ev) => {
              const { day, month } = dayMonth(ev.date)
              return (
                <Link
                  key={ev.slug}
                  to={`/eventos/${ev.slug}`}
                  className="flex items-center gap-3.5 border-t border-line py-3 text-text no-underline hover:text-accent"
                >
                  <img src={ev.cover} alt="" loading="lazy" className="ph size-[72px] shrink-0 object-cover" />
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="text-xs font-semibold tracking-[0.12em] text-muted uppercase">
                      {day} {month} · {ev.location}
                    </span>
                    <span className="font-display text-xl/[1.1] font-bold uppercase">{ev.title}</span>
                  </div>
                  <ChevronRight size={22} className="shrink-0 text-muted" />
                </Link>
              )
            })}
          </div>
        </section>
      )}
    </>
  )
}
