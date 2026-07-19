import type { ComponentType, SVGProps } from 'react'
import { ImageIcon, MovieIcon, LightbulbIcon } from '../components/icons'

interface Capability {
  title: string
  Icon: ComponentType<SVGProps<SVGSVGElement>>
  tags: string[]
  body: string
}

const CARDS: Capability[] = [
  {
    title: 'Robotics & AI',
    Icon: ImageIcon,
    tags: ['Python', 'OpenCV', 'Arduino', 'Machine Learning'],
    body: 'I build autonomous machines that sense and react — sensor integration, motor control, and object detection — alongside small ML experiments applied to real engineering problems.',
  },
  {
    title: 'Full-Stack Web',
    Icon: MovieIcon,
    tags: ['React', 'Next.js', 'TypeScript', 'Three.js'],
    body: 'Modern, immersive web experiences built with React, TypeScript, and 3D through Three.js and React Three Fiber — clean code that reaches from embedded systems to the browser.',
  },
  {
    title: 'Always Learning',
    Icon: LightbulbIcon,
    tags: ['Research', 'Side Projects', 'Open Source', 'Experiments'],
    body: "I'm early in the journey and treat every project as a way to learn out loud — reading papers, breaking things, and rebuilding them better the next time.",
  },
]

export default function Capabilities() {
  return (
    <section id="work" className="relative bg-black">
      {/* Content */}
      <div className="px-8 md:px-16 lg:px-20 pt-24 pb-10 flex flex-col min-h-screen">
        {/* Header */}
        <div className="mb-auto">
          <div className="text-sm font-body text-white/80 mb-6">
            // What I do
          </div>
          <h2 className="font-heading italic text-6xl md:text-7xl lg:text-[6rem] leading-[0.9] tracking-[-3px] whitespace-pre-line">
            {'Building things,\nend to end'}
          </h2>
        </div>

        {/* Cards grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {CARDS.map(({ title, Icon, tags, body }) => (
            <div
              key={title}
              className="liquid-glass rounded-[1.25rem] p-6 min-h-[360px] flex flex-col"
            >
              {/* Top row: icon + tags */}
              <div className="flex items-start justify-between gap-3">
                <div className="liquid-glass h-11 w-11 rounded-[0.75rem] flex items-center justify-center shrink-0">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div className="flex flex-wrap gap-1.5 justify-end">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="liquid-glass rounded-full px-3 py-1 text-[11px] text-white/90 font-body whitespace-nowrap"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Spacer pushes the title/body to the bottom */}
              <div className="flex-1" />

              {/* Bottom: title + body */}
              <div>
                <h3 className="font-heading italic text-3xl md:text-4xl tracking-[-1px] leading-none">
                  {title}
                </h3>
                <p className="mt-3 text-sm text-white/90 font-body font-light leading-snug max-w-[32ch]">
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
