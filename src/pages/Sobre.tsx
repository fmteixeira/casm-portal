import { Check } from '../components/icons'
import { ArrowLink, ButtonLink } from '../components/ui'
import { pages, type SobreSection } from '../content'

const { hero, intro, sections, strip } = pages.sobre

export default function Sobre() {
  return (
    <>
      <section className="ph relative flex h-[360px] items-end overflow-hidden pb-8 lg:h-[480px] lg:pb-14">
        <img src={hero.image} alt={hero.alt} className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-b from-scrim/0 from-20% to-scrim/96 to-95%" />
        <div className="wrap relative flex flex-col gap-2.5">
          <div className="kicker">{hero.kicker}</div>
          <h1 className="m-0 font-display text-[64px]/[0.9] font-extrabold uppercase lg:text-[96px]">{hero.title}</h1>
        </div>
      </section>

      <div className="wrap [--wrap:860px]">
        <p className="m-0 pt-10 pb-2 text-[19px]/normal text-text lg:pt-16 lg:text-2xl/normal">{intro}</p>

        <section className="relative pt-10 pb-6 lg:pt-14">
          <div className="absolute top-[50px] bottom-[60px] left-[11px] w-0.5 bg-line lg:top-[66px]" />
          {sections.map((s, i) => (
            <TimelineItem key={s.kicker} section={s} index={i} last={i === sections.length - 1} />
          ))}
        </section>
      </div>

      <section className="mt-8 border-t border-line">
        <div className="wrap flex flex-col gap-4 pt-10 pb-14 lg:pt-16 lg:pb-20">
          <h2 className="m-0 font-display text-4xl/[0.95] font-extrabold uppercase lg:text-5xl">Vê-nos em ação</h2>
          <div className="grid grid-cols-3 gap-1 lg:grid-cols-6">
            {strip.map((src) => (
              <img key={src} src={src} alt="" loading="lazy" className="ph block aspect-square w-full object-cover" />
            ))}
          </div>
          <ArrowLink to="/galeria">Abrir galeria</ArrowLink>
        </div>
      </section>
    </>
  )
}

function TimelineItem({ section: s, index, last }: { section: SobreSection; index: number; last: boolean }) {
  const images = s.images ?? []
  return (
    <div className={`relative flex flex-col gap-3 pl-[52px] ${last ? '' : 'pb-[52px] lg:pb-16'}`}>
      <span
        className={`absolute top-0.5 left-1 size-4 rotate-45 border-2 border-accent ${last ? 'bg-accent' : 'bg-bg'}`}
        aria-hidden="true"
      />
      <span className="kicker pt-1">
        {String(index + 1).padStart(2, '0')} · {s.kicker}
      </span>
      <h2 className="m-0 font-display text-[32px]/none font-extrabold uppercase lg:text-[44px]">{s.title}</h2>
      <p className="m-0 text-body">{s.text}</p>

      {s.checklist && (
        <ul className="m-0 flex list-none flex-col gap-2 p-0">
          {s.checklist.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <Check size={20} className="mt-0.5 shrink-0 text-accent" />
              <span className="text-body">{item}</span>
            </li>
          ))}
        </ul>
      )}

      {s.tags && (
        <div className="mt-1 flex flex-wrap gap-1.5">
          {s.tags.map((t) => (
            <span key={t} className="border border-accent px-2.5 py-1.5 text-[13px] font-semibold tracking-[0.08em] text-accent uppercase">
              {t}
            </span>
          ))}
        </div>
      )}

      {images.length === 1 && (
        <div className="ph relative mt-1.5 h-[190px] lg:h-[340px]">
          <img src={images[0].src} alt={images[0].alt} loading="lazy" className="absolute inset-0 size-full object-cover" />
        </div>
      )}
      {images.length > 1 && (
        <div className="mt-1.5 grid grid-cols-2 gap-1.5">
          {images.map((img) => (
            <div key={img.src} className="ph relative h-[130px] lg:h-[240px]">
              <img src={img.src} alt={img.alt} loading="lazy" className="absolute inset-0 size-full object-cover" />
            </div>
          ))}
        </div>
      )}

      {s.stats && (
        <div className="mt-1 grid grid-cols-3 gap-1.5">
          {s.stats.map((st) => (
            <div key={st.label} className="flex flex-col gap-0.5 border border-line px-2 py-2.5 lg:px-4 lg:py-4">
              <span className="font-display text-[22px]/none font-extrabold lg:text-[32px]">{st.value}</span>
              <span className="text-xs text-muted lg:text-sm">{st.label}</span>
            </div>
          ))}
        </div>
      )}

      {s.cta && (
        <ButtonLink to={s.cta.to} className="mt-2 lg:self-start">
          {s.cta.label}
        </ButtonLink>
      )}
    </div>
  )
}
