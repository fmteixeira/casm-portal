import { Link, useParams } from 'react-router'
import { EventMeta } from '../components/events'
import { ChevronLeft } from '../components/icons'
import { ButtonLink, DateBadge } from '../components/ui'
import { dayMonth, events } from '../content'
import NotFound from './NotFound'

export default function EventoDetalhe() {
  const { slug } = useParams()
  const event = events.find((e) => e.slug === slug)
  if (!event) return <NotFound />

  const { day, month } = dayMonth(event.date)

  return (
    <>
      <section className="ph relative h-[300px] overflow-hidden lg:h-[480px]">
        <img src={event.cover} alt="" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-b from-scrim/0 from-40% to-scrim/80" />
        <DateBadge day={day} month={month} large />
      </section>

      <article className="wrap flex flex-col [--wrap:860px] gap-5 pt-8 pb-14 lg:pt-14 lg:pb-24">
        <Link to="/eventos" className="flex min-h-11 items-center gap-1 self-start text-sm font-semibold tracking-[0.12em] uppercase no-underline">
          <ChevronLeft size={18} /> Eventos
        </Link>
        <div className="kicker">{event.type}</div>
        <h1 className="m-0 font-display text-5xl/[0.95] font-extrabold uppercase lg:text-7xl/[0.92]">{event.title}</h1>
        <EventMeta event={event} />
        {event.summary && <p className="m-0 text-lg text-text lg:text-xl">{event.summary}</p>}
        {event.body?.map((p) => (
          <p key={p} className="m-0 text-body">
            {p}
          </p>
        ))}
        <ButtonLink to="/contactos" className="mt-4 sm:self-start">
          Inscrever / Perguntar
        </ButtonLink>
      </article>
    </>
  )
}
