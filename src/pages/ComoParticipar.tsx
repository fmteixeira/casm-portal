import { ArrowRight } from '../components/icons'
import { ArrowLink, ButtonLink } from '../components/ui'
import { pages } from '../content'

const { badge, title, text, comingSoonLabel, comingSoon } = pages.comoParticipar

export default function ComoParticipar() {
  return (
    <>
      <div className="h-3.5 bg-[repeating-linear-gradient(-45deg,var(--color-accent)_0_14px,var(--color-bg)_14px_28px)]" />

      <div className="wrap [--wrap:860px]">
        <section className="flex flex-col gap-5 pt-14 pb-10 lg:pt-24">
          <span className="self-start bg-accent px-2.5 py-1.5 text-xs font-bold tracking-[0.16em] text-on-accent uppercase">{badge}</span>
          <h1 className="m-0 font-display text-[64px]/[0.9] font-extrabold uppercase lg:text-[96px]">{title}</h1>
          <p className="m-0 text-lg text-body lg:text-xl">{text}</p>
          <ButtonLink to="/contactos" className="mt-1 sm:self-start">
            Contacta-nos <ArrowRight />
          </ButtonLink>
        </section>

        <section className="flex flex-col gap-2.5 pt-2 pb-14 lg:pb-24">
          <div className="mb-1.5 text-[13px] font-semibold tracking-[0.18em] text-muted uppercase">{comingSoonLabel}</div>
          {comingSoon.map((item, i) => (
            <div key={item} className="flex items-center gap-3.5 border border-dashed border-line2 p-4">
              <span className="w-[34px] font-display text-[28px]/none font-extrabold text-accent">{String(i + 1).padStart(2, '0')}</span>
              <span className="font-display text-[21px]/[1.1] font-bold text-body uppercase">{item}</span>
            </div>
          ))}
          <div className="mt-2.5">
            <ArrowLink to="/sobre">Ler as regras em Sobre nós</ArrowLink>
          </div>
        </section>
      </div>
    </>
  )
}
