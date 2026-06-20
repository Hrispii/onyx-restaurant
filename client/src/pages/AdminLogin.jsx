import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, Mail, Eye, EyeOff } from 'lucide-react'
import { login } from '../lib/api.js'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState('')

  const set = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
    if (serverError) setServerError('')
  }

  const validate = () => {
    const e = {}
    if (!form.email.trim()) e.email = 'Введите email'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Некорректный email'
    if (!form.password.trim()) e.password = 'Введите пароль'
    return e
  }

  const handleSubmit = async () => {
    const e = validate()
    if (Object.keys(e).length > 0) { setErrors(e); return }
    setLoading(true)
    // API
    const result = await login(form.email, form.password)
    if (result.token) {
      localStorage.setItem('admin_token', result.token)
      navigate('/admin')
    } else {
      setServerError(result.error || 'Неверный email или пароль')
    }
    setLoading(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--color-bg)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
    }}>

      {/* Логотип */}
      <a
        href="/"
        style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          letterSpacing: '0.3em',
          color: 'var(--color-gold)',
          textDecoration: 'none',
          marginBottom: '3rem',
        }}
      >
        ONYX
      </a>

      {/* Карточка */}
      <div style={{
        width: '100%',
        maxWidth: '420px',
        background: 'var(--color-card)',
        border: '1px solid var(--color-border)',
        padding: '2.5rem',
      }}>

        {/* Шапка */}
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '1px solid var(--color-gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem',
            color: 'var(--color-gold)',
          }}>
            <Lock size={20} />
          </div>
          <p style={{
            fontSize: '0.65rem',
            letterSpacing: '0.25em',
            color: 'var(--color-gold)',
            fontWeight: '600',
            marginBottom: '0.5rem',
          }}>
            АДМИНИСТРАТИВНАЯ ПАНЕЛЬ
          </p>
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            letterSpacing: '0.1em',
            color: 'var(--color-text)',
          }}>
            ВХОД
          </h1>
        </div>

        {/* Ошибка сервера */}
        {serverError && (
          <div style={{
            background: 'rgba(224,82,82,0.1)',
            border: '1px solid rgba(224,82,82,0.3)',
            padding: '0.75rem 1rem',
            marginBottom: '1.5rem',
            fontSize: '0.82rem',
            color: '#e05252',
            textAlign: 'center',
          }}>
            {serverError}
          </div>
        )}

        {/* Email */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.62rem',
            letterSpacing: '0.2em',
            color: 'var(--color-gold)',
            marginBottom: '0.6rem',
            fontWeight: '600',
          }}>
            <Mail size={12} />
            EMAIL
          </label>
          <input
            type="email"
            placeholder="admin@onyx.kz"
            value={form.email}
            onChange={e => set('email', e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              width: '100%',
              background: 'var(--color-bg)',
              border: errors.email
                ? '1px solid #e05252'
                : '1px solid var(--color-border)',
              color: 'var(--color-text)',
              padding: '0.85rem 1rem',
              fontSize: '0.88rem',
              outline: 'none',
              fontFamily: 'inherit',
              transition: 'border-color 0.2s',
            }}
            onFocus={e => { if (!errors.email) e.target.style.borderColor = 'var(--color-gold)' }}
            onBlur={e => { if (!errors.email) e.target.style.borderColor = 'var(--color-border)' }}
          />
          {errors.email && (
            <p style={{ fontSize: '0.72rem', color: '#e05252', marginTop: '0.35rem' }}>
              {errors.email}
            </p>
          )}
        </div>

        {/* Пароль */}
        <div style={{ marginBottom: '2rem' }}>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.62rem',
            letterSpacing: '0.2em',
            color: 'var(--color-gold)',
            marginBottom: '0.6rem',
            fontWeight: '600',
          }}>
            <Lock size={12} />
            ПАРОЛЬ
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={form.password}
              onChange={e => set('password', e.target.value)}
              onKeyDown={handleKeyDown}
              style={{
                width: '100%',
                background: 'var(--color-bg)',
                border: errors.password
                  ? '1px solid #e05252'
                  : '1px solid var(--color-border)',
                color: 'var(--color-text)',
                padding: '0.85rem 3rem 0.85rem 1rem',
                fontSize: '0.88rem',
                outline: 'none',
                fontFamily: 'inherit',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => { if (!errors.password) e.target.style.borderColor = 'var(--color-gold)' }}
              onBlur={e => { if (!errors.password) e.target.style.borderColor = 'var(--color-border)' }}
            />
            <button
              onClick={() => setShowPassword(p => !p)}
              style={{
                position: 'absolute',
                right: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-muted)',
                display: 'flex',
                alignItems: 'center',
                padding: 0,
              }}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && (
            <p style={{ fontSize: '0.72rem', color: '#e05252', marginTop: '0.35rem' }}>
              {errors.password}
            </p>
          )}
        </div>

        {/* Кнопка */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: '100%',
            padding: '0.95rem',
            background: loading ? 'var(--color-muted)' : 'var(--color-gold)',
            color: 'var(--color-bg)',
            border: 'none',
            fontSize: '0.75rem',
            fontWeight: '700',
            letterSpacing: '0.2em',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => { if (!loading) e.currentTarget.style.opacity = '0.85' }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
        >
          {loading ? 'ВХОД...' : 'ВОЙТИ'}
        </button>

        {/* Демо подсказка */}
        <p style={{
          fontSize: '0.72rem',
          color: 'var(--color-muted)',
          textAlign: 'center',
          marginTop: '1.5rem',
          lineHeight: '1.6',
        }}>
          Demo: admin@onyx.kz / admin123
        </p>
      </div>
    </div>
  )
}