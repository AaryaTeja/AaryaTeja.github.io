import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, CloseIcon, MenuIcon } from './icons'
import { SITE } from '../data/content'

const NAV_LINKS = [
  { label: 'Projects', to: '/projects' },
  { label: 'About', to: '/about' },
]

const MOBILE_LINKS = [
  { label: 'Home', to: '/' },
  ...NAV_LINKS,
  { label: 'Work With Me', to: '/contact' },
]

const EASE = [0.16, 1, 0.3, 1] as const

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <>
      <nav className="fixed top-4 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-16">
        <Link
          to="/"
          className="liquid-glass h-12 w-12 rounded-full flex items-center justify-center"
          aria-label="Home"
        >
          <span className="font-heading italic text-2xl leading-none text-white">a</span>
        </Link>

        {/* Center: nav pill (desktop) */}
        <div className="hidden md:flex items-center liquid-glass rounded-full px-1.5 py-1.5">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `px-3 py-2 text-sm font-medium font-body transition-colors duration-200 ${
                  isActive ? 'text-white' : 'text-white/60 hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            className="ml-1 flex items-center gap-1 bg-white text-black rounded-full px-4 py-2 text-sm font-medium font-body transition-transform duration-200 hover:scale-[1.03]"
          >
            Let's Talk
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden liquid-glass h-11 w-11 rounded-full flex items-center justify-center text-white"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="md:hidden fixed inset-0 z-40 flex flex-col justify-center gap-8 px-10 bg-black/95 backdrop-blur-xl"
          >
            {MOBILE_LINKS.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.05, duration: 0.5, ease: EASE }}
              >
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `block text-4xl font-heading italic tracking-tight ${isActive ? 'text-white' : 'text-white/50'}`
                  }
                >
                  {link.label}
                </NavLink>
              </motion.div>
            ))}
            <motion.a
              href={`mailto:${SITE.email}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + MOBILE_LINKS.length * 0.05, duration: 0.5, ease: EASE }}
              className="text-white/50 text-base font-body"
            >
              {SITE.email}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
