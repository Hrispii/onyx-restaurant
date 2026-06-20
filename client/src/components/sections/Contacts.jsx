import { Link } from 'react-router-dom'
import { MapPin, Phone, Clock, Mail } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function Contacts() {
  const { t } = useTranslation()

  const info = [
    { icon: MapPin, label: t('contacts.address'), value: t('contacts.addressValue'), sub: t('contacts.addressSub') },
    { icon: Clock,  label: t('contacts.hours'),   value: t('contacts.hoursValue'),   sub: t('contacts.hoursSub')   },
    { icon: Phone,  label: t('contacts.phone'),   value: '+7 700 000 00 00', href: 'tel:+77000000000' },
    { icon: Mail,   label: t('contacts.email'),   value: 'hello@onyx-astana.kz', href: 'mailto:hello@onyx-astana.kz' },
  ]

  return (
    <section style={{ background: 'var(--color-bg)', padding: '8rem 2rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.35em', color: 'var(--color-gold)', marginBottom: '1rem', fontWeight: '500' }}>{t('contacts.label')}</p>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '700', letterSpacing: '0.05em', color: 'var(--color-text)', lineHeight: '1.1' }}>{t('contacts.title')}</h2>
          <div style={{ width: '48px', height: '1px', background: 'var(--color-gold)', margin: '1.5rem auto 0' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }} className="grid-cols-1 md:grid-cols-2">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            {info.map(({ icon: Icon, label, value, sub, href }) => (
              <div key={label}
                style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)', padding: '1.75rem', transition: 'border-color 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--color-gold)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-border)'}>
                <div style={{ width: '40px', height: '40px', border: '1px solid var(--color-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', color: 'var(--color-gold)' }}>
                  <Icon size={16} />
                </div>
                <p style={{ fontSize: '0.62rem', letterSpacing: '0.2em', color: 'var(--color-gold)', marginBottom: '0.6rem', fontWeight: '600' }}>{label}</p>
                {href ? (
                  <a href={href} style={{ fontSize: '0.85rem', color: 'var(--color-text)', textDecoration: 'none', display: 'block', lineHeight: '1.5', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--color-gold)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text)'}>{value}</a>
                ) : (
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text)', lineHeight: '1.5' }}>{value}</p>
                )}
                {sub && <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)', marginTop: '0.25rem' }}>{sub}</p>}
              </div>
            ))}
          </div>

          <div style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)', padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.5rem', minHeight: '320px' }}>
            <p style={{ fontSize: '0.7rem', letterSpacing: '0.3em', color: 'var(--color-gold)', fontWeight: '500' }}>{t('contacts.ctaLabel')}</p>
            <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: '700', letterSpacing: '0.05em', color: 'var(--color-text)', lineHeight: '1.2' }}>{t('contacts.ctaTitle')}</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-muted)', lineHeight: '1.8' }}>{t('contacts.ctaText')}</p>
            <div style={{ height: '1px', background: 'var(--color-border)' }} />
            <Link to="/booking"
              style={{ display: 'inline-block', alignSelf: 'flex-start', padding: '0.9rem 2.5rem', background: 'var(--color-gold)', color: 'var(--color-bg)', textDecoration: 'none', fontSize: '0.72rem', fontWeight: '700', letterSpacing: '0.2em', transition: 'opacity 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
              {t('contacts.ctaButton')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}