import { useTranslation } from 'react-i18next'

export default function About() {
  const { t } = useTranslation()

  return (
    <section style={{ background: 'var(--color-bg)', padding: '8rem 2rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }} className="grid-cols-1 md:grid-cols-2">
        <div style={{ position: 'relative' }}>
          <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80" alt="ONYX" style={{ width: '100%', height: '580px', objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', bottom: '-1.5rem', right: '-1.5rem', width: '100%', height: '100%', border: '1px solid var(--color-gold)', opacity: 0.3, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: '2rem', left: '-2rem', background: 'var(--color-gold)', color: 'var(--color-bg)', padding: '1.25rem 1.5rem', textAlign: 'center' }}>
            <p style={{ fontSize: '2rem', fontWeight: '700', lineHeight: '1', letterSpacing: '0.05em' }}>2021</p>
            <p style={{ fontSize: '0.6rem', letterSpacing: '0.15em', marginTop: '0.25rem', fontWeight: '600' }}>{t('about.founded')}</p>
          </div>
        </div>

        <div>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.35em', color: 'var(--color-gold)', marginBottom: '1.25rem', fontWeight: '500' }}>{t('about.label')}</p>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '700', letterSpacing: '0.05em', lineHeight: '1.15', color: 'var(--color-text)', marginBottom: '2rem', whiteSpace: 'pre-line' }}>
            {t('about.title')}
          </h2>
          <div style={{ width: '48px', height: '1px', background: 'var(--color-gold)', marginBottom: '2rem' }} />
          <p style={{ fontSize: '0.95rem', color: 'var(--color-muted)', lineHeight: '1.9', marginBottom: '1.25rem' }}>{t('about.text1')}</p>
          <p style={{ fontSize: '0.95rem', color: 'var(--color-muted)', lineHeight: '1.9', marginBottom: '3rem' }}>{t('about.text2')}</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--color-border)' }}>
            {[
              { value: '48',   key: 'seats'   },
              { value: '4',    key: 'seasons' },
              { value: '100%', key: 'local'   },
            ].map(({ value, key }) => (
              <div key={key}>
                <p style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--color-gold)', letterSpacing: '0.05em', lineHeight: '1', marginBottom: '0.4rem' }}>{value}</p>
                <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--color-muted)', fontWeight: '500' }}>{t(`about.${key}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}