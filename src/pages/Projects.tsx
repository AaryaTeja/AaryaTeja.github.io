import { motion } from 'framer-motion'
import GlassBlob from '../components/LazyGlassBlob'
import TiltCard from '../components/TiltCard'
import { ArrowUpRight } from '../components/icons'
import { PROJECTS, SITE } from '../data/content'

const EASE = [0.16, 1, 0.3, 1] as const

export default function Projects() {
  return (
    <div className="relative bg-black min-h-screen pt-40 pb-24 px-8 md:px-16 lg:pl-72 lg:pr-20 overflow-hidden">
      <div className="hidden sm:block absolute right-[-4%] top-[2%] h-[360px] w-[360px] lg:h-[440px] lg:w-[440px] z-0 opacity-90">
        <GlassBlob tint="#C2A4FF" size={2.2} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
          <div className="text-sm font-body text-white/60 mb-4">// Projects</div>
          <h1 className="font-heading italic text-6xl md:text-7xl leading-[0.9] tracking-[-3px] mb-6">
            Things I've Built
          </h1>
          <p className="text-white/60 font-body max-w-xl mb-16">
            A mix of robotics, research, and web experiments — the projects below are the ones
            I'm proudest to talk about.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.num}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
            >
              <TiltCard className="h-full">
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group liquid-glass rounded-[1.5rem] p-8 h-full flex flex-col min-h-[320px]"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-white/25 font-heading italic text-4xl">{project.num}</span>
                    <ArrowUpRight className="h-6 w-6 text-white/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                  </div>
                  <div className="flex-1" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/40 font-body mb-2">
                      {project.category}
                    </p>
                    <h2 className="font-heading italic text-3xl md:text-4xl tracking-tight mb-3">
                      {project.name}
                    </h2>
                    <p className="text-white/60 font-body font-light leading-snug mb-5 max-w-[42ch]">
                      {project.description}
                    </p>
                    <p className="text-xs text-white/40 font-body">{project.tools.join(' · ')}</p>
                  </div>
                </a>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-16 text-center"
        >
          <p className="text-white/50 font-body mb-6">Want to see more of my code?</p>
          <a href={SITE.github} target="_blank" rel="noreferrer" className="cta-ghost group">
            Explore my GitHub
            <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </a>
        </motion.div>
      </div>
    </div>
  )
}
