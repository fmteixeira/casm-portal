import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { site } from '../content'
import logo from '../assets/casm-logo.png'
import { ArrowRight, Facebook, Instagram, Youtube } from './icons'

const buttonBase =
  'cut flex h-[54px] items-center justify-center gap-2.5 px-7 font-display text-[19px]/none font-bold tracking-[0.08em] uppercase no-underline lg:h-[58px] lg:px-[34px] lg:text-xl'

const buttonVariants = {
  solid: 'bg-accent text-on-accent hover:bg-accent-hover hover:text-on-accent',
  outline: 'border-[1.5px] border-text text-text hover:border-accent hover:text-accent',
  accent: 'border-[1.5px] border-accent text-accent hover:text-accent-hover',
}

type ButtonProps = {
  to: string
  variant?: keyof typeof buttonVariants
  className?: string
  children: ReactNode
}

/** Clipped-corner call to action. External URLs and mailto/tel open as plain links. */
export function ButtonLink({ to, variant = 'solid', className = '', children }: ButtonProps) {
  const cls = `${buttonBase} ${buttonVariants[variant]} ${className}`
  if (/^(https?:|mailto:|tel:)/.test(to)) {
    return (
      <a href={to} className={cls} target={to.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
        {children}
      </a>
    )
  }
  return (
    <Link to={to} className={cls}>
      {children}
    </Link>
  )
}

/** Uppercase text link with a trailing arrow. */
export function ArrowLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="flex min-h-11 items-center gap-2 self-start font-display text-[17px]/none font-bold tracking-[0.08em] uppercase no-underline lg:text-lg"
    >
      {children} <ArrowRight size={18} />
    </Link>
  )
}

/** Full-bleed image with a dark gradient and the page title at the bottom. */
export function PageHero({ kicker, title, image, alt }: { kicker: string; title: string; image: string; alt: string }) {
  return (
    <section className="ph relative flex h-[300px] flex-col justify-end overflow-hidden pb-7 lg:h-[420px] lg:pb-14">
      {image && <img src={image} alt={alt} className="absolute inset-0 size-full object-cover" />}
      <div className="absolute inset-0 bg-linear-to-b from-scrim/0 from-15% to-scrim/96 to-95%" />
      <div className="wrap text-legible relative flex flex-col gap-2.5">
        <div className="kicker">{kicker}</div>
        <h1 className="m-0 font-display text-[64px]/[0.9] font-extrabold uppercase lg:text-[96px]">{title}</h1>
      </div>
    </section>
  )
}

export function Logo({ className = '' }: { className?: string }) {
  return <img src={logo} alt="" className={`block shrink-0 object-contain grayscale-[0.55] ${className}`} />
}

const iconBox =
  'flex size-12 items-center justify-center border border-line text-text hover:border-accent hover:text-accent'

export function SocialLinks() {
  return (
    <div className="flex gap-2">
      <a href={site.social.instagram} aria-label="Instagram" className={iconBox} target="_blank" rel="noreferrer">
        <Instagram size={22} />
      </a>
      <a href={site.social.facebook} aria-label="Facebook" className={iconBox} target="_blank" rel="noreferrer">
        <Facebook size={22} />
      </a>
      <a href={site.social.youtube} aria-label="YouTube" className={iconBox} target="_blank" rel="noreferrer">
        <Youtube size={22} />
      </a>
    </div>
  )
}

/** Accent date badge pinned to the top-left of an event image. */
export function DateBadge({ day, month, large = false }: { day: string; month: string; large?: boolean }) {
  return (
    <div
      className={`absolute top-0 left-0 flex flex-col items-center bg-accent font-display leading-none text-on-accent ${
        large ? 'w-[76px] py-3 lg:w-24 lg:py-4' : 'w-[72px] py-[11px]'
      }`}
    >
      <span className={`font-extrabold ${large ? 'text-[38px] lg:text-5xl' : 'text-[34px]'}`}>{day}</span>
      <span className={`mt-1 font-bold tracking-[0.1em] uppercase ${large ? 'text-sm lg:text-base' : 'text-[13px]'}`}>
        {month}
      </span>
    </div>
  )
}
