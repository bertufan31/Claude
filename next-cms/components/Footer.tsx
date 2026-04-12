import Link from 'next/link'

export default function Footer() {
  return (
    <footer
      className="border-t flex justify-between items-center px-site py-10"
      style={{ borderColor: 'rgba(240,237,230,0.1)' }}
    >
      <div
        className="text-muted text-[12px]"
        style={{ fontFamily: 'var(--font-dm-mono)' }}
      >
        Studio3<span className="text-accent">.design</span>
      </div>

      <ul className="flex gap-8 list-none">
        {[
          { href: '/works',   label: 'Works'     },
          { href: '/about',   label: 'About'     },
          { href: '/blog',    label: 'Journal'   },
          { href: '/contact', label: 'Contact'   },
          { href: '#',        label: 'Instagram' },
        ].map(({ href, label }) => (
          <li key={label}>
            <Link
              href={href}
              className="text-muted hover:text-accent transition-colors duration-300 text-[10px] tracking-[0.1em] uppercase"
              style={{ fontFamily: 'var(--font-dm-mono)' }}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <span
        className="text-muted text-[10px] tracking-[0.1em]"
        style={{ fontFamily: 'var(--font-dm-mono)' }}
      >
        © {new Date().getFullYear()} Studio3.design
      </span>
    </footer>
  )
}
