import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from '../components/icons'
import { PROJECTS } from '../data/content'

const EASE = [0.16, 1, 0.3, 1] as const

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
}

export default function FeaturedWork() {
  return (
    <section className="relative overflow-hidden bg-black px-8 md:px-16 lg:px-20 py-24">
      <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
        <motion.div {...reveal} transition={{ duration: 0.7, ease: EASE }}>
          <div className="text-sm font-body text-white/60 mb-4">// Selected work</div>
          <h2 className="font-heading italic text-5xl md:text-6xl leading-[0.9] tracking-[-2px]">
            Featured Projects
          </h2>
        </motion.div>
        <motion.div {...reveal} transition={{ duration: 0.7, delay: 0.1, ease: EASE }}>
          <Link to="/projects" className="cta-ghost group">
            See all projects
            <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PROJECTS.map((project, i) => (
          <motion.a
            key={project.num}
            href={project.href}
            target="_blank"
            rel="noreferrer"
            {...reveal}
            transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
            className="group liquid-glass rounded-[1.25rem] p-6 flex flex-col min-h-[260px]"
          >
            <div className="flex items-start justify-between">
              <span className="text-white/25 font-heading italic text-3xl">{project.num}</span>
              <ArrowUpRight className="h-5 w-5 text-white/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
            </div>
            <div className="flex-1" />
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/40 font-body mb-2">
                {project.category}
              </p>
              <h3 className="font-heading italic text-2xl md:text-[1.7rem] tracking-tight mb-3">
                {project.name}
              </h3>
              <p className="text-[11px] text-white/50 font-body">
                {project.tools.slice(0, 3).join(' · ')}
              </p>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}
