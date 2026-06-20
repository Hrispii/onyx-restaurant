import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary]', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          background: 'var(--color-bg)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.5rem',
        }}>
          <p style={{
            fontSize: '0.65rem',
            letterSpacing: '0.3em',
            color: '#e05252',
            fontWeight: '600',
          }}>
            ОШИБКА
          </p>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: '700',
            letterSpacing: '0.15em',
            color: 'var(--color-text)',
          }}>
            ЧТО-ТО ПОШЛО НЕ ТАК
          </h1>
          <p style={{
            fontSize: '0.82rem',
            color: 'var(--color-muted)',
            maxWidth: '420px',
            textAlign: 'center',
            lineHeight: '1.6',
          }}>
            {this.state.error?.message || 'Произошла непредвиденная ошибка'}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '0.5rem',
              padding: '0.75rem 2.5rem',
              background: 'none',
              border: '1px solid var(--color-gold)',
              color: 'var(--color-gold)',
              fontSize: '0.72rem',
              letterSpacing: '0.2em',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--color-gold)'
              e.currentTarget.style.color = 'var(--color-bg)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'none'
              e.currentTarget.style.color = 'var(--color-gold)'
            }}
          >
            ПЕРЕЗАГРУЗИТЬ
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
