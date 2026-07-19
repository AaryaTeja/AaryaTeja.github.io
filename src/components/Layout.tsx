import { Suspense } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import LineSidebar from './LineSidebar'

const SIDEBAR_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'About', to: '/about' },
  { label: 'Work With Me', to: '/contact' },
]

function activeSidebarIndex(pathname: string): number | null {
  const index = SIDEBAR_ITEMS.findIndex((item) =>
    item.to === '/' ? pathname === '/' : pathname.startsWith(item.to),
  )
  return index === -1 ? null : index
}

function PageFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="h-2 w-2 rounded-full bg-white/40 animate-pulse" />
    </div>
  )
}

export default function Layout() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div>
      <Navbar />

      <div className="hidden lg:block fixed left-10 top-1/2 -translate-y-1/2 z-40">
        <LineSidebar
          items={SIDEBAR_ITEMS.map((item) => item.label)}
          activeIndex={activeSidebarIndex(location.pathname)}
          accentColor="#ffffff"
          textColor="rgba(255,255,255,0.45)"
          markerColor="rgba(255,255,255,0.2)"
          onItemClick={(index) => navigate(SIDEBAR_ITEMS[index].to)}
        />
      </div>

      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <Suspense fallback={<PageFallback />}>
              <Outlet />
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  )
}
