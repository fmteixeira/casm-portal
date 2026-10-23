import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { site } from '../content'
import { Close, Menu } from './icons'
import { Logo, SocialLinks } from './ui'

export const navLinks = [
  { to: '/', label: 'Início' },
  { to: '/sobre', label: 'Sobre nós' },
  { to: '/eventos', label: 'Eventos' },
  { to: '/como-participar', label: 'Como participar', wip: true },
  { to: '/galeria', label: 'Galeria' },
  { to: '/contactos', label: 'Contactos' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])

  return (
    <header className="border-b border-line bg-bg">
      <div className="wrap flex min-h-16 items-center justify-between gap-x-8 gap-y-3 lg:min-h-[84px] lg:py-2.5">
        <Link to="/" aria-label={`${site.shortName}, página inicial`} className="flex items-center gap-2.5 text-text no-underline hover:text-text lg:gap-3">
          <Logo className="h-8 w-[27px] lg:h-9 lg:w-[30px]" />
          <span className="flex flex-col leading-none">
            <span className="font-stencil text-[26px] tracking-[0.06em] lg:text-[30px]">{site.shortName}</span>
            <span className="mt-[3px] text-[9px] font-semibold tracking-[0.2em] text-muted uppercase lg:mt-1 lg:text-[10px]">
              {site.tagline}
            </span>
          </span>
        </Link>

        <nav aria-label="Menu principal" className="hidden flex-wrap items-center gap-x-7 gap-y-1 lg:flex">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `border-b-2 py-3 font-display text-[17px]/none font-bold tracking-[0.08em] uppercase no-underline ${
                  isActive ? 'border-accent text-accent' : 'border-transparent text-text hover:text-accent'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          aria-controls="menu-movel"
          className="flex size-12 cursor-pointer items-center justify-center border border-line bg-transparent p-0 text-text lg:hidden"
        >
          {open ? <Close size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav id="menu-movel" aria-label="Menu principal" className="flex flex-col border-t border-line px-5 pt-2 pb-7 lg:hidden">
          {navLinks.map((l, i) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className="flex items-baseline gap-3.5 border-b border-line3 py-3.5 text-text no-underline hover:text-text"
            >
              {({ isActive }) => (
                <>
                  <span className="w-[22px] text-xs font-semibold tracking-[0.1em] text-accent">0{i + 1}</span>
                  <span className={`font-display text-[30px]/none font-extrabold uppercase ${isActive ? 'text-accent' : ''}`}>
                    {l.label}
                  </span>
                  {l.wip && (
                    <span className="self-center bg-accent px-1.5 py-[3px] text-[10px] font-bold tracking-[0.14em] text-on-accent uppercase">
                      Em breve
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
          <div className="mt-[22px]">
            <SocialLinks />
          </div>
        </nav>
      )}
    </header>
  )
}
