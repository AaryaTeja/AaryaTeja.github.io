import { motion } from 'framer-motion'
import GlassBlob from '../components/LazyGlassBlob'
import { ArrowUpRight, GitHubIcon, LinkedInIcon, MailIcon } from '../components/icons'
import { SITE, SOCIALS } from '../data/content'

const EASE = [0.16, 1, 0.3, 1] as const
const reveal = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
}

const SOCIAL_ICONS: Record<string, typeof GitHubIcon> = {
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
}

export default function WorkWithMe() {
  return (
    <div className="relative bg-black min-h-screen pt-40 pb-24 px-8 md:px-16 lg:pl-72 lg:pr-20">
      <div className="hidden sm:block absolute right-[0%] top-[8%] h-[360px] w-[360px] lg:h-[440px] lg:w-[440px] z-0">
        <GlassBlob tint="#C2A4FF" size={2.3} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div {...reveal} transition={{ duration: 0.7, ease: EASE }}>
          <div className="text-sm font-body text-white/60 mb-4">// Work with me</div>
          <span className="liquid-glass inline-flex items-center gap-2 rounded-full pl-1.5 pr-4 py-1.5 mb-8">
            <span className="bg-white text-black rounded-full px-2.5 py-0.5 text-xs font-medium font-body">
              Available
            </span>
            <span className="text-sm text-white/90 font-body">
              Open to internships &amp; 2026 summer roles
            </span>
          </span>
        </motion.div>

        <motion.h1
          {...reveal}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="font-heading italic text-6xl md:text-7xl lg:text-8xl leading-[0.88] tracking-[-3px] mb-8"
        >
          Let's build
          <br />
          something together
        </motion.h1>

        <motion.p
          {...reveal}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className="text-white/60 font-body font-light leading-relaxed text-lg max-w-xl mb-10"
        >
          Whether it's a robotics build, a research collaboration, or a web project that needs a
          bit of craft — I'd love to hear about it. I usually reply within a day or two.
        </motion.p>

        <motion.div
          {...reveal}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          className="flex flex-wrap gap-4 mb-20"
        >
          <a href={`mailto:${SITE.email}`} className="cta-pill group">
            Hire Me
            <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </a>
          <a href={SITE.github} target="_blank" rel="noreferrer" className="cta-ghost group">
            See My Code
            <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </a>
        </motion.div>

        <motion.div
          {...reveal}
          transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
          className="grid sm:grid-cols-2 gap-10 liquid-glass rounded-[1.5rem] p-8 sm:p-10"
        >
          <div>
            <p className="text-white/40 uppercase tracking-[0.2em] text-xs font-body mb-3">Email</p>
            <a
              href={`mailto:${SITE.email}`}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-200 font-body text-lg"
            >
              <MailIcon className="h-5 w-5" />
              {SITE.email}
            </a>
          </div>
          <div>
            <p className="text-white/40 uppercase tracking-[0.2em] text-xs font-body mb-3">Social</p>
            <div className="flex gap-6">
              {SOCIALS.map((s) => {
                const Icon = SOCIAL_ICONS[s.label]
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-200 font-body text-lg"
                  >
                    {Icon ? <Icon className="h-5 w-5" /> : null}
                    {s.label}
                  </a>
                )
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
