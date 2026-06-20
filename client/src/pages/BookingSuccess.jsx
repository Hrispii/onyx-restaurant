import { useLocation, Link } from 'react-router-dom'
import { CheckCircle, Calendar, Clock, Users, ArrowLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function BookingSuccess() {
  const { state } = useLocation()
  const { t, i18n } = useTranslation()

  const name   = state?.name   || ''
  const date   = state?.date   || '—'
  const time   = state?.time   || '—'
  const guests = state?.guests || 2

  const formatDate = (d) => {
    if (!d || d === '—') return d
    const dt = new Date(d)
    return dt.toLocaleDateString(i18n.language === 'ru' ? 'ru-RU' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  return (
    <section style={{ minHeight: '100vh', background: 'var(--color-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 2rem' }}>
      <div style={{ maxWidth: '560px', width: '100%', textAlign: 'center' }}>
        <div style={{ width: '72px', height: '72px', border: '1px solid var(--color-gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', color: 'var(--color-gold)' }}>
          <CheckCircle size={32} />
        </div>
        <p style={{ fontSize: '0.7rem', letterSpacing: '0.35em', color: 'var(--color-gold)', marginBottom: '1rem', fontWeight: '500' }}>{t('success.badge')}</p>
        <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: '700', letterSpacing: '0.08em', color: 'var(--color-text)', marginBottom: '1rem', lineHeight: '1.2' }}>
          {t('success.title')}{name ? `, ${name.toUpperCase()}!` : '!'}
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-muted)', lineHeight: '1.8', marginBottom: '3rem' }}>{t('success.text')}</p>

        <div style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)', padding: '2rem', marginBottom: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.25em', color: 'var(--color-gold)', fontWeight: '600', marginBottom: '0.25rem' }}>{t('success.details')}</p>
          {[
            { icon: Calendar, label: t('success.date'),   value: formatDate(date) },
            { icon: Clock,    label: t('success.time'),   value: time             },
            { icon: Users,    label: t('success.guests'), value: guests           },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--color-muted)', fontSize: '0.85rem' }}>
                <Icon size={15} style={{ color: 'var(--color-gold)' }} />
                {label}
              </div>
              <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--color-text)' }}>{value}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 2rem', background: 'var(--color-gold)', color: 'var(--color-bg)', textDecoration: 'none', fontSize: '0.72rem', fontWeight: '700', letterSpacing: '0.15em', transition: 'opacity 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
            <ArrowLeft size={14} />
            {t('success.toHome')}
          </Link>
          <Link to="/menu"
            style={{ display: 'inline-block', padding: '0.85rem 2rem', background: 'transparent', color: 'var(--color-text)', textDecoration: 'none', fontSize: '0.72rem', fontWeight: '600', letterSpacing: '0.15em', border: '1px solid var(--color-border)', transition: 'border-color 0.2s, color 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-gold)'; e.currentTarget.style.color = 'var(--color-gold)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-text)' }}>
            {t('success.toMenu')}
          </Link>
        </div>
      </div>
    </section>
  )
}