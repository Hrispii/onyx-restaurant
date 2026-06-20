import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const NAV_PATHS = ['/', '/menu', '/booking']

export default function Navbar() {
  const { t, i18n } = useTranslation()

  const [scrolled,   setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [indicator,  setIndicator]  = useState({ left: 0, width: 0, opacity: 0 })

  const location = useLocation()
  const navigate = useNavigate()
  const innerRef  = useRef(null)
  const liRefs    = useRef([])

  const navLinks = [
    { label: t('nav.home'),    path: '/'        },
    { label: t('nav.menu'),    path: '/menu'     },
    { label: t('nav.booking'), path: '/booking'  },
  ]

  const toggleLang = () => {
    const next = i18n.language === 'ru' ? 'en' : 'ru'
    i18n.changeLanguage(next)
    localStorage.setItem('lang', next)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!NAV_PATHS.includes(location.pathname)) {
        setIndicator(prev => ({ ...prev, opacity: 0 }))
        return
      }
      const index = NAV_PATHS.indexOf(location.pathname)
      const liEl  = liRefs.current[index]
      if (liEl && innerRef.current) {
        const containerRect = innerRef.current.getBoundingClientRect()
        const liRect        = liEl.getBoundingClientRect()
        setIndicator({
          left:    liRect.left - containerRect.left,
          width:   liRect.width,
          opacity: 1,
        })
      }
    }, 50)
    return () => clearTimeout(timer)
  }, [location.pathname, i18n.language])

  const handleLogo = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      navigate('/')
    }
  }

  return (
    <>
      <header style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 50,
        transition: 'background 0.4s ease',
        background: 'none', 
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
      }}>
        <nav style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 2rem',
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
        }}>

          {/* Логотип */}
          <button onClick={handleLogo} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: '1.75rem', fontWeight: '700', letterSpacing: '0.3em',
            color: 'var(--color-gold)', padding: 0, fontFamily: 'inherit',
          }}>
            ONYX
          </button>

          {/* Десктоп навигация */}
          <div className="hidden md:flex">
            <div ref={innerRef} style={{ position: 'relative' }}>
              <ul style={{ display: 'flex', alignItems: 'center', listStyle: 'none', margin: 0, padding: 0 }}>
                {navLinks.map(({ label, path }, index) => (
                  <li
                    key={path}
                    ref={el => liRefs.current[index] = el}
                  >
                    <Link
                      to={path}
                      style={{
                        display: 'block',
                        fontSize: '0.75rem',
                        letterSpacing: '0.15em',
                        fontWeight: '500',
                        textDecoration: 'none',
                        color: location.pathname === path ? 'var(--color-gold)' : 'var(--color-text)',
                        opacity: location.pathname === path ? 1 : 0.75,
                        transition: 'color 0.2s, opacity 0.2s',
                        padding: '0.5rem 1.25rem',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.color = 'var(--color-gold)'
                        e.currentTarget.style.opacity = '1'
                      }}
                      onMouseLeave={e => {
                        if (location.pathname !== path) {
                          e.currentTarget.style.color = 'var(--color-text)'
                          e.currentTarget.style.opacity = '0.75'
                        }
                      }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Индикатор */}
              <div style={{
                position: 'absolute',
                bottom: '0',
                height: '2px',
                background: 'var(--color-gold)',
                left: indicator.left,
                width: indicator.width,
                opacity: indicator.opacity,
                transition: 'left 0.35s cubic-bezier(0.4,0,0.2,1), width 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.2s',
                pointerEvents: 'none',
              }} />
            </div>
          </div>

          {/* Правая часть */}
          <div className="hidden md:flex" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={toggleLang} style={{
              background: 'none',
              border: '1px solid var(--color-border)',
              color: 'var(--color-muted)',
              padding: '0.35rem 0.75rem',
              fontSize: '0.65rem',
              fontWeight: '700',
              letterSpacing: '0.15em',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontFamily: 'inherit',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-gold)'; e.currentTarget.style.color = 'var(--color-gold)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-muted)' }}
            >
              {i18n.language === 'ru' ? 'EN' : 'RU'}
            </button>

            <Link to="/booking" style={{
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
              fontWeight: '600',
              textDecoration: 'none',
              color: 'var(--color-bg)',
              background: 'var(--color-gold)',
              padding: '0.6rem 1.5rem',
              transition: 'opacity 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              {t('nav.book')}
            </Link>
          </div>

          {/* Бургер */}
          <button className="md:hidden" onClick={() => setMobileOpen(prev => !prev)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--color-text)', display: 'flex', alignItems: 'center',
          }}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* Мобильное меню */}
      <div style={{
        position: 'fixed',
        top: '72px', left: 0, right: 0, bottom: 0,
        zIndex: 40,
        background: 'var(--color-bg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2.5rem',
        transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.35s ease',
      }} className="md:hidden">
        {navLinks.map(({ label, path }) => (
          <Link key={path} to={path} style={{
            fontSize: '1.5rem',
            letterSpacing: '0.2em',
            fontWeight: '600',
            textDecoration: 'none',
            color: location.pathname === path ? 'var(--color-gold)' : 'var(--color-text)',
          }}>
            {label}
          </Link>
        ))}
        <button onClick={toggleLang} style={{
          background: 'none',
          border: '1px solid var(--color-border)',
          color: 'var(--color-muted)',
          padding: '0.5rem 1.5rem',
          fontSize: '0.75rem',
          fontWeight: '700',
          letterSpacing: '0.15em',
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}>
          {i18n.language === 'ru' ? 'EN' : 'RU'}
        </button>
        <Link to="/booking" style={{
          fontSize: '0.8rem',
          letterSpacing: '0.15em',
          fontWeight: '600',
          textDecoration: 'none',
          color: 'var(--color-bg)',
          background: 'var(--color-gold)',
          padding: '0.8rem 2.5rem',
        }}>
          {t('nav.book')}
        </Link>
      </div>
    </>
  )
}
