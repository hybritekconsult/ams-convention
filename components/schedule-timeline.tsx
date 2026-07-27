export interface ScheduleSession {
  startTime: string;
  endTime: string;
  title: string;
  description?: string;
}

export interface ScheduleTimelineProps {
  sessions: ScheduleSession[];
  date?: string;
}

/**
 * ScheduleTimeline — Server Component
 *
 * Displays the daily programme as an accessible ordered list with
 * a gold vertical-bar accent for each session block.
 *
 * Anchored at id="schedule" so the Hero "View Schedule" CTA can
 * deep-link directly to this section (Requirement 5.5).
 */
export function ScheduleTimeline({ sessions, date }: ScheduleTimelineProps) {
  return (
    <section id="schedule" className="py-20 bg-brand-cream">
      <div className="px-4">
        {/* Section heading — Requirements 5.3, 5.4: burgundy, heading font, uppercase */}
        <h2 className="font-heading text-brand-burgundy uppercase text-4xl font-bold text-center mb-12">
          Daily Programme
        </h2>

        {/* Optional date sub-label */}
        {date && (
          <p className="font-body text-brand-navy text-sm mb-8 tracking-wide uppercase text-center">
            {date}
          </p>
        )}

        {/* Accessible ordered list — Requirement 5.4 */}
        <ol role="list" className="max-w-2xl mx-auto flex flex-col gap-8">
          {sessions.map((session, index) => (
            <li key={index} role="listitem" className="flex gap-6 items-start">
              {/* Gold vertical bar — Requirement 5.3 */}
              <div
                className="w-1 bg-brand-gold rounded-full self-stretch shrink-0"
                aria-hidden="true"
              />
              <div>
                {/* Time range — gold, bold heading font — Requirement 5.3 */}
                <p className="font-heading text-brand-gold font-bold text-xl mb-1">
                  {session.startTime}–{session.endTime}
                </p>

                {/* Session title — burgundy, uppercase heading */}
                <h3 className="font-heading uppercase text-brand-burgundy text-2xl font-bold">
                  {session.title}
                </h3>

                {/* Optional description */}
                {session.description && (
                  <p className="text-gray-600 text-sm mt-1">
                    {session.description}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// Hard-coded default sessions per task specification (Requirements 5.1, 5.2)
export const DEFAULT_SESSIONS: ScheduleSession[] = [
  {
    startTime: "12:00",
    endTime: "18:00",
    title: "Daily Consultation",
  },
  {
    startTime: "18:00",
    endTime: "22:00",
    title: "Holy Mass & Adoration",
  },
];
