import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, Clock, Users, User, Phone, Mail, MessageSquare } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { createBooking } from '../lib/api.js'
import { sanitize, isValidEmail, isValidPhone } from '../lib/sanitize.js'

const timeSlots = ['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00']
const guestOptions = [1, 2, 3, 4, 5, 6, 7, 8]

const initialForm = { name: '', phone: '', email: '', date: '', time: '', guests: 2, comment: '' }

export default function Booking() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [form, setForm]             = useState(initialForm)
  const [errors, setErrors]         = useState({})
  const [loading, setLoading]       = useState(false)
  const [serverError, setServerError] = useState('')

  const set = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
    if (serverError) setServerError('')
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim())         e.name  = t('booking.errorName')
    if (!isValidPhone(form.phone)) e.phone = t('booking.errorPhone')
    if (!isValidEmail(form.email)) e.email = t('booking.errorEmail')
    if (!form.date) {
      e.date = t('booking.errorDate')
    } else {
      const selected = new Date(form.date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (selected <= today) e.date = t('booking.errorDatePast')
    }
    if (!form.time)                e.time  = t('booking.errorTime')
    return e
  }

  const handleSubmit = async () => {
    const e = validate()
    if (Object.keys(e).length > 0) { setErrors(e); return }
    setLoading(true)
    const cleanForm = {
      name:    sanitize(form.name),
      phone:   sanitize(form.phone),
      email:   sanitize(form.email),
      date:    form.date,
      time:    form.time,
      guests:  form.guests,
      comment: sanitize(form.comment),
    }
    const result = await createBooking(cleanForm)
    if (!result.success) {
      setServerError(t('booking.serverError'))
      setLoading(false)
      return
    }
    setLoading(false)
    navigate('/booking/success', { state: { name: form.name, date: form.date, time: form.time, guests: form.guests } })
  }

  const minDate = new Date()
  minDate.setDate(minDate.getDate() + 1)
  const minDateStr = minDate.toISOString().split('T')[0]

  const infoItems = [
    { label: t('booking.infoAddress'), value: t('booking.infoAddressValue'), sub: t('booking.infoAddressSub') },
    { label: t('booking.infoHours'),   value: t('booking.infoHoursValue'),   sub: t('booking.infoHoursSub') },
    { label: t('booking.infoPhone'),   value: t('booking.infoPhoneValue') },
    { label: t('booking.infoPrice'),   value: t('booking.infoPriceValue'),   sub: t('booking.infoPriceSub') },
  ]

  return (
    <>
      {/* Hero */}
      <section style={{ position: 'relative', height: '40vh', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.2 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,10,10,0.4), #0a0a0a)' }} />
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.35em', color: 'var(--color-gold)', marginBottom: '1rem', fontWeight: '500' }}>{t('booking.label')}</p>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: '700', letterSpacing: '0.15em', color: 'var(--color-text)', lineHeight: '1' }}>{t('booking.title')}</h1>
          <div style={{ width: '48px', height: '1px', background: 'var(--color-gold)', margin: '1.25rem auto 0' }} />
        </div>
      </section>

      {/* Форма */}
      <section style={{ background: 'var(--color-bg)', padding: '6rem 2rem 8rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }} className="booking-layout">

          <div>
            <p style={{ fontSize: '0.7rem', letterSpacing: '0.3em', color: 'var(--color-gold)', marginBottom: '0.75rem', fontWeight: '500' }}>{t('booking.formLabel')}</p>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: '700', letterSpacing: '0.05em', color: 'var(--color-text)', marginBottom: '3rem' }}>{t('booking.formTitle')}</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="booking-2col">
                <Field icon={User}  label={t('booking.name')}  placeholder={t('booking.namePh')}  value={form.name}  onChange={v => set('name', v)}  error={errors.name} />
                <Field icon={Phone} label={t('booking.phone')} placeholder={t('booking.phonePh')} value={form.phone} onChange={v => set('phone', v)} error={errors.phone} type="tel" />
              </div>
              <Field icon={Mail} label={t('booking.email')} placeholder="your@email.com" value={form.email} onChange={v => set('email', v)} error={errors.email} type="email" />

              <div className="booking-2col">
                <Field icon={Calendar} label={t('booking.date')} value={form.date} onChange={v => set('date', v)} error={errors.date} type="date" min={minDateStr} />
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--color-gold)', marginBottom: '0.6rem', fontWeight: '600' }}>
                    <Clock size={13} />{t('booking.time')}
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {timeSlots.map(slot => (
                      <button key={slot} onClick={() => set('time', slot)}
                        style={{ padding: '0.45rem 0.75rem', fontSize: '0.78rem', fontWeight: '500', letterSpacing: '0.05em', border: form.time === slot ? '1px solid var(--color-gold)' : '1px solid var(--color-border)', background: form.time === slot ? 'var(--color-gold)' : 'transparent', color: form.time === slot ? 'var(--color-bg)' : 'var(--color-muted)', cursor: 'pointer', transition: 'all 0.2s' }}
                        onMouseEnter={e => { if (form.time !== slot) { e.currentTarget.style.borderColor = 'var(--color-gold)'; e.currentTarget.style.color = 'var(--color-text)' } }}
                        onMouseLeave={e => { if (form.time !== slot) { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-muted)' } }}>
                        {slot}
                      </button>
                    ))}
                  </div>
                  {errors.time && <p style={{ fontSize: '0.72rem', color: '#e05252', marginTop: '0.4rem' }}>{errors.time}</p>}
                </div>
              </div>

              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--color-gold)', marginBottom: '0.6rem', fontWeight: '600' }}>
                  <Users size={13} />{t('booking.guests')}
                </label>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {guestOptions.map(n => (
                    <button key={n} onClick={() => set('guests', n)}
                      style={{ width: '44px', height: '44px', fontSize: '0.88rem', fontWeight: '600', border: form.guests === n ? '1px solid var(--color-gold)' : '1px solid var(--color-border)', background: form.guests === n ? 'var(--color-gold)' : 'transparent', color: form.guests === n ? 'var(--color-bg)' : 'var(--color-muted)', cursor: 'pointer', transition: 'all 0.2s' }}
                      onMouseEnter={e => { if (form.guests !== n) { e.currentTarget.style.borderColor = 'var(--color-gold)'; e.currentTarget.style.color = 'var(--color-text)' } }}
                      onMouseLeave={e => { if (form.guests !== n) { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-muted)' } }}>
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--color-gold)', marginBottom: '0.6rem', fontWeight: '600' }}>
                  <MessageSquare size={13} />{t('booking.comment')}
                </label>
                <textarea placeholder={t('booking.commentPh')} value={form.comment} onChange={e => set('comment', e.target.value)} rows={3}
                  style={{ width: '100%', background: 'var(--color-card)', border: '1px solid var(--color-border)', color: 'var(--color-text)', padding: '0.85rem 1rem', fontSize: '0.88rem', outline: 'none', resize: 'vertical', fontFamily: 'inherit', transition: 'border-color 0.2s' }}
                  onFocus={e => e.target.style.borderColor = 'var(--color-gold)'}
                  onBlur={e => e.target.style.borderColor = 'var(--color-border)'} />
              </div>

              {serverError && <p style={{ fontSize: '0.82rem', color: '#e05252' }}>{serverError}</p>}

              <button onClick={handleSubmit} disabled={loading}
                style={{ padding: '1rem 3rem', background: loading ? 'var(--color-muted)' : 'var(--color-gold)', color: 'var(--color-bg)', border: 'none', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.2em', cursor: loading ? 'not-allowed' : 'pointer', transition: 'opacity 0.2s', alignSelf: 'flex-start', marginTop: '0.5rem' }}
                onMouseEnter={e => { if (!loading) e.currentTarget.style.opacity = '0.85' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}>
                {loading ? t('booking.submitting') : t('booking.submit')}
              </button>
            </div>
          </div>

          <div className="booking-sidebar">
            {infoItems.map(({ label, value, sub }) => (
              <div key={label} style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)', padding: '1.5rem' }}>
                <p style={{ fontSize: '0.62rem', letterSpacing: '0.2em', color: 'var(--color-gold)', marginBottom: '0.5rem', fontWeight: '600' }}>{label}</p>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text)', fontWeight: '500' }}>{value}</p>
                {sub && <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)', marginTop: '0.2rem' }}>{sub}</p>}
              </div>
            ))}
            <div style={{ background: 'transparent', border: '1px solid var(--color-border)', padding: '1.5rem', marginTop: '0.5rem' }}>
              <p style={{ fontSize: '0.78rem', color: 'var(--color-muted)', lineHeight: '1.7' }}>{t('booking.note')}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function Field({ icon: Icon, label, placeholder, value, onChange, error, type = 'text', min }) {
  return (
    <div>
      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--color-gold)', marginBottom: '0.6rem', fontWeight: '600' }}>
        <Icon size={13} />{label}
      </label>
      <input type={type} placeholder={placeholder} value={value} min={min} onChange={e => onChange(e.target.value)}
        style={{ width: '100%', background: 'var(--color-card)', border: error ? '1px solid #e05252' : '1px solid var(--color-border)', color: 'var(--color-text)', padding: '0.85rem 1rem', fontSize: '0.88rem', outline: 'none', fontFamily: 'inherit', transition: 'border-color 0.2s', colorScheme: 'dark' }}
        onFocus={e => { if (!error) e.target.style.borderColor = 'var(--color-gold)' }}
        onBlur={e => { if (!error) e.target.style.borderColor = 'var(--color-border)' }} />
      {error && <p style={{ fontSize: '0.72rem', color: '#e05252', marginTop: '0.4rem' }}>{error}</p>}
    </div>
  )
}