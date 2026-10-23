import { useState, type FormEvent, type ReactNode } from 'react'
import { Chat, Check, Mail, Phone, Pin } from '../components/icons'
import { ButtonLink, PageHero } from '../components/ui'
import { pages, site } from '../content'

const { hero, intro, subjects } = pages.contactos

const label = 'text-[13px]/none font-semibold tracking-[0.14em] text-muted uppercase'
const field =
  'box-border w-full rounded-none border border-line2 bg-alt px-3.5 font-sans text-base text-text focus:outline-2 focus:-outline-offset-1 focus:outline-accent'
const input = `${field} h-[52px]`
const tile =
  'cut flex h-[84px] flex-col items-center justify-center gap-1.5 font-display text-lg/none font-bold tracking-[0.08em] uppercase no-underline'
const tel = `tel:${site.phone.replace(/[^\d+]/g, '')}`

export default function Contactos() {
  const [sent, setSent] = useState(false)

  // No backend: the form opens the visitor's email app with the message filled in.
  function send(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const subject = `[Site] ${data.get('assunto')} · ${data.get('nome')}`
    const body = `${data.get('mensagem')}\n\n${data.get('nome')} <${data.get('email')}>`
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <>
      <PageHero {...hero} />

      <div className="wrap grid grid-cols-1 lg:grid-cols-2 lg:gap-x-16 lg:py-16">
        <div>
          <section className="flex flex-col gap-5 pt-9 pb-2 lg:pt-0">
            <p className="m-0 text-lg text-body">{intro}</p>
            <div className="grid grid-cols-2 gap-2">
              <a href={`mailto:${site.email}`} className={`${tile} bg-accent text-on-accent hover:bg-accent-hover hover:text-on-accent`}>
                <Mail size={24} />
                Email
              </a>
              <a href={tel} className={`${tile} border-[1.5px] border-accent text-accent`}>
                <Phone size={24} />
                Ligar
              </a>
            </div>
          </section>

          <section className="flex flex-col py-7">
            <InfoRow icon={<Mail size={22} />} label="Email">
              {site.email}
            </InfoRow>
            <InfoRow icon={<Phone size={22} />} label="Telefone">
              {site.phone}
            </InfoRow>
            <InfoRow icon={<Pin size={22} />} label="Campo">
              {site.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </InfoRow>
            <InfoRow icon={<Chat size={22} />} label="Dados do clube" last>
              <span className="block">{site.name}</span>
              <span className="block">NIF: {site.nif}</span>
            </InfoRow>
          </section>

          <section className="pb-7">
            <div className="ph relative flex h-60 items-center justify-center border border-line">
              <span className="phl absolute top-3 left-3">[Mapa do campo]</span>
              <svg width="44" height="44" viewBox="0 0 24 24" fill="var(--color-accent)" stroke="var(--color-bg)" strokeWidth="1.2" aria-hidden="true">
                <path d="M12 22s-7.5-6.8-7.5-12.5a7.5 7.5 0 0 1 15 0C19.5 15.2 12 22 12 22z" />
                <circle cx="12" cy="9.5" r="2.6" fill="var(--color-bg)" />
              </svg>
            </div>
            <ButtonLink to={site.mapsUrl} variant="outline" className="mt-2">
              Abrir no Google Maps
            </ButtonLink>
          </section>
        </div>

        <section className="-mx-5 flex flex-col gap-[18px] border-t border-line bg-alt px-5 pt-10 pb-14 lg:mx-0 lg:self-start lg:border lg:p-10">
          <h2 className="m-0 font-display text-[40px]/[0.95] font-extrabold uppercase">Envia uma mensagem</h2>
          {sent ? (
            <div role="status" className="flex items-start gap-3 border-[1.5px] border-accent p-5">
              <Check size={24} className="shrink-0 text-accent" />
              <div>
                <div className="font-display text-xl/[1.1] font-bold uppercase">Mensagem pronta a enviar</div>
                <div className="mt-1 text-muted">Abrimos o teu programa de email com a mensagem. Respondemos assim que possível.</div>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-2.5 min-h-11 cursor-pointer border-0 bg-transparent p-0 font-display text-base font-bold tracking-[0.08em] text-accent uppercase"
                >
                  Enviar outra
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={send} className="m-0 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="c-nome" className={label}>
                  Nome
                </label>
                <input id="c-nome" name="nome" className={input} type="text" autoComplete="name" required />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="c-email" className={label}>
                  Email
                </label>
                <input id="c-email" name="email" className={input} type="email" autoComplete="email" required />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="c-assunto" className={label}>
                  Assunto
                </label>
                <select id="c-assunto" name="assunto" className={input}>
                  {subjects.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="c-msg" className={label}>
                  Mensagem
                </label>
                <textarea id="c-msg" name="mensagem" rows={5} required className={`${field} h-[140px] resize-y py-3`} />
              </div>
              <button
                type="submit"
                className="cut h-14 cursor-pointer border-0 bg-accent font-display text-[19px] font-bold tracking-[0.08em] text-on-accent uppercase hover:bg-accent-hover"
              >
                Enviar mensagem
              </button>
            </form>
          )}
        </section>
      </div>
    </>
  )
}

function InfoRow({ icon, label: title, last = false, children }: { icon: ReactNode; label: string; last?: boolean; children: ReactNode }) {
  return (
    <div className={`flex gap-3.5 border-t border-line py-[18px] ${last ? 'border-b' : ''}`}>
      <span className="mt-0.5 shrink-0 text-accent">{icon}</span>
      <div className="flex flex-col gap-0.5">
        <span className={label}>{title}</span>
        <span>{children}</span>
      </div>
    </div>
  )
}
