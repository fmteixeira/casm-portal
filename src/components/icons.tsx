import type { ReactNode, SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

function stroke(paths: ReactNode, defaultWidth = 2) {
  return function Icon({ size = 20, strokeWidth = defaultWidth, ...rest }: IconProps) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        aria-hidden="true"
        {...rest}
      >
        {paths}
      </svg>
    )
  }
}

export const ArrowRight = stroke(<path d="M5 12h14M13 6l6 6-6 6" />, 2.2)
export const ChevronRight = stroke(<path d="M9 6l6 6-6 6" />)
export const ChevronLeft = stroke(<path d="M15 6l-6 6 6 6" />)
export const Pin = stroke(
  <>
    <path d="M12 21s-7-6.5-7-12a7 7 0 0 1 14 0c0 5.5-7 12-7 12z" />
    <circle cx="12" cy="9" r="2.5" />
  </>,
)
export const Clock = stroke(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </>,
)
export const Mail = stroke(
  <>
    <rect x="3" y="5" width="18" height="14" />
    <path d="M3 6l9 7 9-7" />
  </>,
)
export const Phone = stroke(
  <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
)
export const Chat = stroke(<path d="M4 4h16v12H8l-4 4z" />)
export const Check = stroke(<path d="M5 12l5 5 9-10" />, 2.2)
export const Menu = stroke(<path d="M4 7h16M4 12h16M4 17h10" />)
export const Close = stroke(<path d="M6 6l12 12M18 6L6 18" />)
export const Instagram = stroke(
  <>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" />
  </>,
  1.8,
)
export const Facebook = stroke(<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z" />, 1.8)
export const Youtube = stroke(
  <>
    <rect x="2" y="5" width="20" height="14" rx="4" />
    <path d="M10 9l5 3-5 3z" />
  </>,
  1.8,
)

export function Play({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}
