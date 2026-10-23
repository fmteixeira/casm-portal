import type { EventItem } from '../content'
import { Clock, Pin } from './icons'

/** Location and time lines. Wide layouts put them side by side unless `stacked`. */
export function EventMeta({ event, stacked = false }: { event: EventItem; stacked?: boolean }) {
  return (
    <div className={`flex flex-col gap-1.5 text-[15px] text-muted ${stacked ? '' : 'lg:flex-row lg:flex-wrap lg:gap-x-7 lg:gap-y-2 lg:text-base'}`}>
      <span className="flex items-center gap-2">
        <Pin size={18} className="shrink-0 text-accent" />
        {event.location}
      </span>
      {event.time && (
        <span className="flex items-center gap-2">
          <Clock size={18} className="shrink-0 text-accent" />
          {event.time}
        </span>
      )}
    </div>
  )
}
