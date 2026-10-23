import { Link } from 'react-router'
import { site } from '../content'
import { navLinks } from './Header'
import { Mail, Phone, Pin } from './icons'
import { Logo, SocialLinks } from './ui'

const heading = 'font-display text-lg/none font-bold tracking-[0.1em] text-accent uppercase'

export function Footer() {
  return (
    <footer className="bg-footer text-[15px] text-text">
      <div className="stripe [--stripe-bg:var(--color-footer)]" />
      <div className="wrap grid grid-cols-1 gap-8 pt-11 pb-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10 lg:pt-16 lg:pb-8">
        <div className="flex flex-col gap-3.5">
          <div className="flex items-center gap-3">
            <Logo className="h-12 w-10" />
            <span className="font-stencil text-[34px]/none tracking-[0.06em] lg:text-[40px]">{site.shortName}</span>
          </div>
          <p className="m-0 text-muted">{site.description}</p>
        </div>

        <div className="flex flex-col gap-3">
          <div className={heading}>Contactos</div>
          <a href={`mailto:${site.email}`} className="flex min-h-8 items-center gap-2.5 text-text no-underline">
            <Mail size={18} className="shrink-0 text-muted" />
            {site.email}
          </a>
          <a href={`tel:${site.phone.replace(/[^\d+]/g, '')}`} className="flex min-h-8 items-center gap-2.5 text-text no-underline">
            <Phone size={18} className="shrink-0 text-muted" />
            {site.phone}
          </a>
          <span className="flex min-h-8 items-center gap-2.5">
            <Pin size={18} className="shrink-0 text-muted" />
            {site.location}, São Miguel, Açores
          </span>
        </div>

        <nav aria-label="Rodapé" className="flex flex-col gap-3">
          <div className={`${heading} hidden lg:block`}>Páginas</div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 lg:grid-cols-1">
            {navLinks.map((l) => (
              <Link key={l.to} to={l.to} className="py-2 text-body no-underline hover:text-accent lg:py-1">
                {l.label}
              </Link>
            ))}
          </div>
        </nav>

        <div className="flex flex-col gap-3.5">
          <div className={`${heading} hidden lg:block`}>Redes</div>
          <SocialLinks />
        </div>
      </div>
      <div className="wrap">
        <div className="border-t border-line3 pt-5 pb-7 text-[13px] text-faint">
          © {new Date().getFullYear()} {site.shortName} · {site.name}
        </div>
      </div>
    </footer>
  )
}
