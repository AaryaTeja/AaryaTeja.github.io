import { motion } from 'framer-motion'
import Background3D from '../components/Background3D'
import BlurText from '../components/BlurText'
import { ArrowUpRight, Play, ClockIcon, GlobeIcon } from '../components/icons'

const NAV_LINKS = ['Work', 'About', 'Skills', 'Journal', 'Contact']

const EMAIL = 'mailto:hello@aaryateja.dev'
const GITHUB = 'https://github.com/AaryaTeja'

// Shared blur-in reveal used by every on-load element.
const reveal = {
  initial: { filter: 'blur(10px)', opacity: 0, y: 20 },
  animate: { filter: 'blur(0px)', opacity: 1, y: 0 },
}
const ease = 'easeOut'

export default function Hero() {
  return (
    <section className="relative h-screen overflow-hidden bg-black">
      {/* Minimalist 3D wireframe backdrop */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(circle at 50% 42%, rgba(255,255,255,0.06), rgba(0,0,0,0) 60%)',
        }}
      />
      <Background3D
        className="absolute inset-0 z-0"
        shape="icosahedron"
        radius={0.4}
        speed={1}
        opacity={0.5}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Navbar */}
        <nav className="fixed top-4 left-0 right-0 z-50 flex items-center justify-between px-8 lg:px-16">
          {/* Left: logo */}
          <a
            href="#top"
            className="liquid-glass h-12 w-12 rounded-full flex items-center justify-center"
          >
            <span className="font-heading italic text-2xl leading-none text-white">
              a
            </span>
          </a>

          {/* Center: nav pill */}
          <div className="hidden md:flex items-center liquid-glass rounded-full px-1.5 py-1.5">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={
                  link === 'Contact'
                    ? EMAIL
                    : link === 'Work'
                      ? '#work'
                      : '#'
                }
                className="px-3 py-2 text-sm font-medium text-white/90 font-body"
              >
                {link}
              </a>
            ))}
            <a
              href={EMAIL}
              className="ml-1 flex items-center gap-1 bg-white text-black rounded-full px-4 py-2 text-sm font-medium font-body"
            >
              Let's Talk
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          {/* Right: spacer to balance the logo */}
          <div className="h-12 w-12" />
        </nav>

        {/* Main content */}
        <div
          id="top"
          className="flex-1 flex flex-col items-center justify-center pt-24 px-4 text-center"
        >
          {/* Badge */}
          <motion.div
            {...reveal}
            transition={{ duration: 0.8, ease, delay: 0.4 }}
            className="liquid-glass rounded-full flex items-center gap-2 pl-1.5 pr-4 py-1.5"
          >
            <span className="bg-white text-black rounded-full px-2.5 py-0.5 text-xs font-medium font-body">
              New
            </span>
            <span className="text-sm text-white/90 font-body">
              Open to internships &amp; 2026 summer roles — limited availability
            </span>
          </motion.div>

          {/* Headline */}
          <div className="mt-6 max-w-3xl">
            <BlurText
              text="Building Intelligent Machines and Thoughtful Software"
              className="text-6xl md:text-7xl lg:text-[5.5rem] font-heading italic text-white leading-[0.8] tracking-[-4px]"
            />
          </div>

          {/* Subtext */}
          <motion.p
            {...reveal}
            transition={{ duration: 0.8, ease, delay: 0.8 }}
            className="mt-4 text-sm md:text-base text-white max-w-2xl font-body font-light leading-tight"
          >
            I'm Aarya — a student engineer exploring robotics, AI, and full-stack
            development. I build autonomous machines and modern web experiences,
            and I love the hands-on part where hardware meets code.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            {...reveal}
            transition={{ duration: 0.8, ease, delay: 1.1 }}
            className="mt-6 flex items-center gap-6"
          >
            <a
              href={GITHUB}
              target="_blank"
              rel="noreferrer"
              className="liquid-glass-strong rounded-full px-5 py-2.5 flex items-center gap-2 text-sm font-medium font-body text-white"
            >
              View My Work
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href={EMAIL}
              className="flex items-center gap-2 text-sm font-medium font-body text-white"
            >
              <Play className="h-4 w-4" />
              Get in Touch
            </a>
          </motion.div>

          {/* Stats cards */}
          <motion.div
            {...reveal}
            transition={{ duration: 0.8, ease, delay: 1.3 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <div className="liquid-glass p-5 w-[220px] rounded-[1.25rem] text-left">
              <ClockIcon className="h-6 w-6 text-white" />
              <div className="text-4xl font-heading italic tracking-[-1px] leading-none mt-4">
                6+ Years
              </div>
              <div className="mt-2 text-sm text-white/80 font-body font-light leading-tight">
                Tinkering across hardware, code, and everything between
              </div>
            </div>
            <div className="liquid-glass p-5 w-[220px] rounded-[1.25rem] text-left">
              <GlobeIcon className="h-6 w-6 text-white" />
              <div className="text-4xl font-heading italic tracking-[-1px] leading-none mt-4">
                12+
              </div>
              <div className="mt-2 text-sm text-white/80 font-body font-light leading-tight">
                Personal projects spanning robotics, AI, and the web
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom trust bar */}
        <motion.div
          {...reveal}
          transition={{ duration: 0.8, ease, delay: 1.4 }}
          className="flex flex-col items-center gap-4 pb-8"
        >
          <div className="liquid-glass rounded-full px-5 py-2 text-sm text-white/80 font-body">
            Built with the tools I reach for most
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {['React', 'Python', 'TypeScript', 'OpenCV', 'Arduino'].map(
              (name) => (
                <span
                  key={name}
                  className="font-heading italic text-2xl md:text-3xl tracking-tight text-white/90"
                >
                  {name}
                </span>
              ),
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
