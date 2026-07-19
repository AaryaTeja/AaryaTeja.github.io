import { motion } from 'framer-motion'
import GlassBlob from '../components/LazyGlassBlob'
import { ABOUT_TEXT, EXPERTISE, TIMELINE } from '../data/content'

const EASE = [0.16, 1, 0.3, 1] as const
const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
}

export default function About() {
  return (
    <div className="relative bg-black min-h-screen overflow-hidden">
      {/* Header */}
      <section className="relative px-8 md:px-16 lg:pl-72 lg:pr-20 pt-40 pb-20 overflow-hidden">
        <div className="hidden sm:block absolute right-[-2%] top-[6%] h-[340px] w-[340px] lg:h-[420px] lg:w-[420px] z-0 opacity-90">
          <GlassBlob tint="#C2A4FF" size={2.1} />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative z-10 max-w-2xl"
        >
          <div className="text-sm font-body text-white/60 mb-4">// About</div>
          <h1 className="font-heading italic text-6xl md:text-7xl leading-[0.9] tracking-[-3px] mb-6">
            Hi, I'm Aarya
          </h1>
          <p className="text-white/70 font-body font-light leading-relaxed text-lg">{ABOUT_TEXT}</p>
        </motion.div>
      </section>

      {/* Expertise */}
      <section className="relative px-8 md:px-16 lg:pl-72 lg:pr-20 py-16">
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {EXPERTISE.map((card, i) => (
            <motion.div
              key={card.title}
              {...reveal}
              transition={{ duration: 0.7, delay: i * 0.12, ease: EASE }}
              className="liquid-glass rounded-[1.5rem] p-8 sm:p-10"
            >
              <h2 className="font-heading italic text-4xl tracking-tight mb-2">{card.title}</h2>
              <p className="text-white/80 font-body font-medium mb-5">{card.subtitle}</p>
              <p className="text-white/60 font-body font-light leading-relaxed mb-8">
                {card.description}
              </p>
              <p className="text-white/40 text-xs uppercase tracking-[0.2em] font-body mb-3">
                Skillset &amp; tools
              </p>
              <p className="text-white/50 font-body text-sm leading-relaxed">
                {card.skills.join(' · ')}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="relative px-8 md:px-16 lg:pl-72 lg:pr-20 py-16 pb-28">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            {...reveal}
            transition={{ duration: 0.7, ease: EASE }}
            className="font-heading italic text-5xl md:text-6xl leading-[0.95] tracking-[-2px] mb-16"
          >
            My career &amp; experience
          </motion.h2>

          <div className="relative pl-8 sm:pl-14">
            <div
              aria-hidden="true"
              className="absolute left-0 sm:left-1 top-2 bottom-2 w-px bg-gradient-to-b from-white/30 via-white/15 to-transparent"
            />
            <div className="flex flex-col gap-14 sm:gap-16">
              {TIMELINE.map((item, i) => (
                <motion.div
                  key={item.year + item.role}
                  {...reveal}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                  className="relative"
                >
                  <span
                    aria-hidden="true"
                    className="absolute -left-8 sm:-left-[3.28rem] top-2 w-[9px] h-[9px] rounded-full bg-white"
                  />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 mb-3">
                    <div>
                      <h3 className="font-heading italic text-2xl sm:text-3xl tracking-tight">
                        {item.role}
                      </h3>
                      <p className="text-white/50 font-body font-medium mt-1">{item.org}</p>
                    </div>
                    <span
                      className={`font-heading italic text-xl sm:text-2xl ${
                        item.year === 'NOW' ? 'text-white' : 'text-white/30'
                      }`}
                    >
                      {item.year}
                    </span>
                  </div>
                  <p className="text-white/55 font-body font-light leading-relaxed max-w-2xl">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
