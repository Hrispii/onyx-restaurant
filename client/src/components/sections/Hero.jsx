import { Link } from 'react-router-dom'
import { ArrowDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function Hero() {
  const { t } = useTranslation()

  return (
    <section style={{
      position: 'relative', height: '100vh', minHeight: '600px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden', background: '#0a0a0a',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1920&q=80)',
        backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.35,
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.5) 60%, #0a0a0a 100%)',
      }} />
      <div style={{
        position: 'absolute', left: '2.5rem', top: '50%',
        transform: 'translateY(-50%)', width: '1px', height: '120px',
        background: 'linear-gradient(to bottom, transparent, var(--color-gold), transparent)',
      }} />
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 1.5rem', maxWidth: '900px' }}>
        <p style={{ fontSize: '0.7rem', letterSpacing: '0.4em', color: 'var(--color-gold)', marginBottom: '1.5rem', fontWeight: '500' }}>
          {t('hero.since')}
        </p>
        <h1 style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)', fontWeight: '700', letterSpacing: '0.15em', lineHeight: '1', color: 'var(--color-text)', marginBottom: '1.5rem' }}>
          ONYX
        </h1>
        <div style={{ width: '60px', height: '1px', background: 'var(--color-gold)', margin: '0 auto 1.5rem' }} />
        <p style={{ fontSize: 'clamp(0.8rem, 2vw, 1rem)', letterSpacing: '0.2em', color: 'var(--color-muted)', marginBottom: '3rem', textTransform: 'uppercase' }}>
          {t('hero.subtitle')}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <Link to="/booking" style={{ display: 'inline-block', padding: '0.9rem 2.5rem', background: 'var(--color-gold)', color: 'var(--color-bg)', textDecoration: 'none', fontSize: '0.72rem', fontWeight: '700', letterSpacing: '0.2em', transition: 'opacity 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
            {t('hero.book')}
          </Link>
          <Link to="/menu" style={{ display: 'inline-block', padding: '0.9rem 2.5rem', background: 'transparent', color: 'var(--color-text)', textDecoration: 'none', fontSize: '0.72rem', fontWeight: '600', letterSpacing: '0.2em', border: '1px solid rgba(245,240,232,0.3)', transition: 'border-color 0.2s, color 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-gold)'; e.currentTarget.style.color = 'var(--color-gold)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(245,240,232,0.3)'; e.currentTarget.style.color = 'var(--color-text)' }}>
            {t('hero.viewMenu')}
          </Link>
        </div>
      </div>
      <button onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', zIndex: 10, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-muted)', transition: 'color 0.2s', animation: 'bounce 2s infinite' }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--color-gold)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--color-muted)'}>
        <ArrowDown size={20} />
      </button>
      <style>{`@keyframes bounce { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(8px)} }`}</style>
    </section>
  )
}