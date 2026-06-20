import { Link } from 'react-router-dom'
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()

  const footerLinks = [
    { label: t('nav.home'),    path: '/'        },
    { label: t('nav.menu'),    path: '/menu'     },
    { label: t('nav.booking'), path: '/booking'  },
  ]

  const contacts = [
    { icon: MapPin, text: t('contacts.addressValue') + ', ' + t('contacts.addressSub') },
    { icon: Phone,  text: '+7 700 000 00 00', href: 'tel:+77000000000' },
    { icon: Clock,  text: t('contacts.hoursValue') },
  ]

  return (
    <footer style={{ background: 'var(--color-card)', borderTop: '1px solid var(--color-border)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '3rem' }}>
        <div>
          <Link to="/" style={{ fontSize: '1.75rem', fontWeight: '700', letterSpacing: '0.3em', color: 'var(--color-gold)', textDecoration: 'none', display: 'block', marginBottom: '1rem' }}>
            ONYX
          </Link>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', lineHeight: '1.7', maxWidth: '260px' }}>
            {t('footer.description')}
          </p>
          <a href="https://instagram.com" target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 mt-6 text-muted hover:text-gold text-xs tracking-widest no-underline transition-colors duration-200">
            <ExternalLink size={16} />
            @onyx_astana
          </a>
        </div>

        <div>
          <h4 style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--color-gold)', marginBottom: '1.5rem', fontWeight: '600' }}>
            {t('footer.nav')}
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {footerLinks.map(({ label, path }) => (
              <li key={path}>
                <Link to={path} className="text-muted hover:text-white text-sm tracking-wide no-underline transition-colors duration-200">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--color-gold)', marginBottom: '1.5rem', fontWeight: '600' }}>
            {t('footer.contacts')}
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {contacts.map(({ icon: Icon, text, href }) => (
              <li key={text} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: 'var(--color-muted)', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--color-gold)', marginTop: '1px', flexShrink: 0 }}><Icon size={15} /></span>
                {href ? (
                  <a href={href} className="text-muted hover:text-white no-underline transition-colors duration-200">{text}</a>
                ) : (
                  <span>{text}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--color-border)', padding: '1.25rem 2rem', maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)', letterSpacing: '0.05em' }}>
          {t('footer.rights')}
        </p>
        <Link to="/admin/login" style={{ fontSize: '0.7rem', color: 'var(--color-border)', textDecoration: 'none', letterSpacing: '0.1em', transition: 'color 0.2s' }}
          onMouseEnter={e => e.target.style.color = 'var(--color-muted)'}
          onMouseLeave={e => e.target.style.color = 'var(--color-border)'}>
          ADMIN
        </Link>
      </div>
    </footer>
  )
}