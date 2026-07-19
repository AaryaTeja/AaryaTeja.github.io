import { SITE, SOCIALS } from '../data/content'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-10 px-8 md:px-16 lg:px-20 py-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/40 font-body">
      <span>Designed &amp; built by {SITE.name}</span>
      <div className="flex items-center gap-6">
        {SOCIALS.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors duration-200"
          >
            {s.label}
          </a>
        ))}
        <span>© {year}</span>
      </div>
    </footer>
  )
}
