import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from '../components/icons'

const EASE = [0.16, 1, 0.3, 1] as const

export default function CtaBand() {
  return (
    <section className="relative bg-black px-8 md:px-16 lg:px-20 py-28 text-center">
      <div className="max-w-2xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="font-heading italic text-4xl md:text-5xl tracking-[-1px] mb-10"
        >
          Want to know more, or want to work together?
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link to="/contact" className="cta-pill group">
            Work With Me
            <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </Link>
          <Link to="/about" className="cta-ghost group">
            More About Me
            <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
