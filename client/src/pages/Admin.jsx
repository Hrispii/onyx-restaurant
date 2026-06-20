import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LogOut, Calendar, Users, Clock, CheckCircle,
  XCircle, AlertCircle, ChevronLeft, ChevronRight, LayoutList,
} from 'lucide-react'
import { getBookings, updateBookingStatus } from '../lib/api.js'

const statusConfig = {
  pending:   { label: 'Ожидает',     color: '#c9a84c', bg: 'rgba(201,168,76,0.1)',  icon: AlertCircle },
  confirmed: { label: 'Подтверждён', color: '#4caf7c', bg: 'rgba(76,175,124,0.1)', icon: CheckCircle },
  cancelled: { label: 'Отменён',     color: '#e05252', bg: 'rgba(224,82,82,0.1)',   icon: XCircle     },
}

const filterOptions = ['Все', 'Ожидает', 'Подтверждён', 'Отменён']

// ─── Skeleton ────────────────────────────────────────────────────────────────

function StatsSkeleton() {
  return (
    <div className="admin-stats">
      {[...Array(4)].map((_, i) => (
        <div key={i} style={{
          background: 'var(--color-card)',
          padding: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}>
          <div className="skeleton" style={{ width: 40, height: 40, flexShrink: 0 }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <div className="skeleton" style={{ height: 22, width: 36, borderRadius: 2 }} />
            <div className="skeleton" style={{ height: 10, width: 72, borderRadius: 2 }} />
          </div>
        </div>
      ))}
    </div>
  )
}

function TableSkeleton() {
  return (
    <div style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
      <div className="admin-table-header">
        {['ГОСТЬ', 'ДАТА / ВРЕМЯ', 'ГОСТЕЙ', 'СТАТУС', ''].map((h, i) => (
          <span key={i} style={{ fontSize: '0.62rem', letterSpacing: '0.15em', color: 'var(--color-muted)', fontWeight: '600' }}>
            {h}
          </span>
        ))}
      </div>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="admin-table-row">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <div className="skeleton" style={{ height: 13, width: '55%', borderRadius: 2 }} />
            <div className="skeleton" style={{ height: 11, width: '38%', borderRadius: 2 }} />
          </div>
          <div className="admin-row-meta">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <div className="skeleton" style={{ height: 13, width: 80, borderRadius: 2 }} />
              <div className="skeleton" style={{ height: 11, width: 48, borderRadius: 2 }} />
            </div>
            <div className="skeleton" style={{ height: 13, width: 28, borderRadius: 2 }} />
            <div className="skeleton" style={{ height: 22, width: 90, borderRadius: 2 }} />
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              <div className="skeleton" style={{ height: 28, width: 36, borderRadius: 2 }} />
              <div className="skeleton" style={{ height: 28, width: 36, borderRadius: 2 }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Action buttons (shared between table and calendar) ──────────────────────

function ActionButtons({ booking, onUpdateStatus }) {
  return (
    <div style={{ display: 'flex', gap: '0.4rem' }}>
      {booking.status !== 'confirmed' && (
        <button
          onClick={() => onUpdateStatus(booking.id, 'confirmed')}
          style={{
            padding: '0.4rem 0.75rem',
            background: 'rgba(76,175,124,0.1)',
            border: '1px solid rgba(76,175,124,0.3)',
            color: '#4caf7c',
            fontSize: '0.65rem',
            fontWeight: '600',
            letterSpacing: '0.08em',
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(76,175,124,0.22)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(76,175,124,0.1)'}
        >
          ✓
        </button>
      )}
      {booking.status !== 'cancelled' && (
        <button
          onClick={() => onUpdateStatus(booking.id, 'cancelled')}
          style={{
            padding: '0.4rem 0.75rem',
            background: 'rgba(224,82,82,0.1)',
            border: '1px solid rgba(224,82,82,0.3)',
            color: '#e05252',
            fontSize: '0.65rem',
            fontWeight: '600',
            letterSpacing: '0.08em',
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(224,82,82,0.22)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(224,82,82,0.1)'}
        >
          ✕
        </button>
      )}
    </div>
  )
}

// ─── Calendar View ───────────────────────────────────────────────────────────

const MONTH_NAMES = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
]
const DAY_NAMES = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']

function CalendarView({ bookings, onUpdateStatus }) {
  const [cursor, setCursor] = useState(() => {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), 1)
  })
  const [selectedKey, setSelectedKey] = useState(null)

  const year = cursor.getFullYear()
  const month = cursor.getMonth()

  // Group by YYYY-MM-DD key
  const byDate = {}
  bookings.forEach(b => {
    if (!byDate[b.date]) byDate[b.date] = []
    byDate[b.date].push(b)
  })

  const toKey = (d) =>
    `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`

  // Monday-based grid
  const firstDow = (new Date(year, month, 1).getDay() + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const totalCells = Math.ceil((firstDow + daysInMonth) / 7) * 7
  const cells = Array.from({ length: totalCells }, (_, i) => {
    const d = i - firstDow + 1
    return d >= 1 && d <= daysInMonth ? d : null
  })

  const todayStr = (() => {
    const t = new Date()
    return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`
  })()

  const prevMonth = () => { setCursor(new Date(year, month - 1, 1)); setSelectedKey(null) }
  const nextMonth = () => { setCursor(new Date(year, month + 1, 1)); setSelectedKey(null) }

  const selectedBookings = selectedKey ? (byDate[selectedKey] || []) : []

  return (
    <div>
      {/* Month navigation */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1px',
        padding: '0.85rem 1.25rem',
        background: 'var(--color-card)',
        border: '1px solid var(--color-border)',
        borderBottom: 'none',
      }}>
        <button
          onClick={prevMonth}
          style={{
            background: 'none',
            border: '1px solid var(--color-border)',
            color: 'var(--color-muted)',
            padding: '0.35rem 0.6rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            transition: 'border-color 0.2s, color 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-gold)'; e.currentTarget.style.color = 'var(--color-gold)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-muted)' }}
        >
          <ChevronLeft size={14} />
        </button>
        <span style={{ fontSize: '0.78rem', fontWeight: '700', letterSpacing: '0.2em', color: 'var(--color-text)' }}>
          {MONTH_NAMES[month].toUpperCase()} {year}
        </span>
        <button
          onClick={nextMonth}
          style={{
            background: 'none',
            border: '1px solid var(--color-border)',
            color: 'var(--color-muted)',
            padding: '0.35rem 0.6rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            transition: 'border-color 0.2s, color 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-gold)'; e.currentTarget.style.color = 'var(--color-gold)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-muted)' }}
        >
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Day-of-week headers */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '1px',
        background: 'var(--color-border)',
        marginBottom: '1px',
      }}>
        {DAY_NAMES.map(d => (
          <div key={d} style={{
            background: 'var(--color-bg)',
            padding: '0.5rem 0.6rem',
            fontSize: '0.58rem',
            letterSpacing: '0.15em',
            color: 'var(--color-muted)',
            fontWeight: '600',
            textAlign: 'center',
          }}>
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '1px',
        background: 'var(--color-border)',
      }}>
        {cells.map((d, i) => {
          if (!d) return (
            <div key={`empty-${i}`} style={{ background: 'var(--color-bg)', minHeight: 80 }} />
          )
          const key = toKey(d)
          const dayBookings = byDate[key] || []
          const pending   = dayBookings.filter(b => b.status === 'pending').length
          const confirmed = dayBookings.filter(b => b.status === 'confirmed').length
          const cancelled = dayBookings.filter(b => b.status === 'cancelled').length
          const isSelected = selectedKey === key
          const isToday = key === todayStr
          const hasBookings = dayBookings.length > 0

          return (
            <div
              key={key}
              onClick={() => hasBookings && setSelectedKey(isSelected ? null : key)}
              style={{
                background: isSelected ? 'rgba(201,168,76,0.07)' : 'var(--color-card)',
                minHeight: 80,
                padding: '0.55rem 0.6rem',
                cursor: hasBookings ? 'pointer' : 'default',
                outline: isSelected ? '1px solid rgba(201,168,76,0.5)' : '1px solid transparent',
                outlineOffset: '-1px',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => { if (hasBookings && !isSelected) e.currentTarget.style.background = 'rgba(255,255,255,0.025)' }}
              onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = 'var(--color-card)' }}
            >
              <span style={{
                display: 'block',
                fontSize: '0.75rem',
                fontWeight: isToday ? '700' : '400',
                color: isToday ? 'var(--color-gold)' : 'var(--color-muted)',
                marginBottom: hasBookings ? '0.35rem' : 0,
              }}>
                {d}
              </span>
              {pending > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.58rem', color: '#c9a84c', marginBottom: 2 }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#c9a84c', flexShrink: 0 }} />
                  {pending}
                </div>
              )}
              {confirmed > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.58rem', color: '#4caf7c', marginBottom: 2 }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#4caf7c', flexShrink: 0 }} />
                  {confirmed}
                </div>
              )}
              {cancelled > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.58rem', color: '#e05252' }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#e05252', flexShrink: 0 }} />
                  {cancelled}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Selected day detail panel */}
      {selectedKey && (
        <div style={{
          marginTop: '1.5rem',
          background: 'var(--color-card)',
          border: '1px solid var(--color-border)',
          overflow: 'hidden',
        }}>
          <div style={{
            padding: '0.85rem 1.5rem',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--color-bg)',
          }}>
            <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--color-gold)', fontWeight: '600' }}>
              {new Date(selectedKey + 'T00:00:00').toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase()}
            </span>
            <span style={{ fontSize: '0.72rem', color: 'var(--color-muted)' }}>
              {selectedBookings.length} {selectedBookings.length === 1 ? 'бронирование' : 'бронирований'}
            </span>
          </div>

          {selectedBookings.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-muted)', fontSize: '0.85rem' }}>
              Нет бронирований
            </div>
          ) : (
            selectedBookings
              .slice()
              .sort((a, b) => a.time.localeCompare(b.time))
              .map((b, i) => {
                const s = statusConfig[b.status]
                const Icon = s.icon
                return (
                  <div
                    key={b.id}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '60px 1.5fr 70px 110px 160px',
                      padding: '1rem 1.5rem',
                      borderBottom: i < selectedBookings.length - 1 ? '1px solid var(--color-border)' : 'none',
                      alignItems: 'center',
                      gap: '1rem',
                    }}
                  >
                    <span style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--color-gold)', letterSpacing: '0.05em' }}>
                      {b.time}
                    </span>
                    <div>
                      <p style={{ fontSize: '0.88rem', fontWeight: '600', color: 'var(--color-text)', marginBottom: '0.15rem' }}>
                        {b.name}
                      </p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>{b.phone}</p>
                      {b.comment && (
                        <p style={{ fontSize: '0.72rem', color: 'var(--color-muted)', fontStyle: 'italic', marginTop: '0.15rem' }}>
                          {b.comment}
                        </p>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-muted)', fontSize: '0.88rem' }}>
                      <Users size={13} />
                      {b.guests}
                    </div>
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                      padding: '0.3rem 0.7rem', background: s.bg, color: s.color,
                      fontSize: '0.68rem', fontWeight: '600', letterSpacing: '0.08em', width: 'fit-content',
                    }}>
                      <Icon size={11} />
                      {s.label}
                    </div>
                    <ActionButtons booking={b} onUpdateStatus={onUpdateStatus} />
                  </div>
                )
              })
          )}
        </div>
      )}
    </div>
  )
}

// ─── Main Admin ───────────────────────────────────────────────────────────────

const formatDate = (d) =>
  new Date(d + 'T00:00:00').toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })

export default function Admin() {
  const navigate = useNavigate()
  const [bookings, setBookings]   = useState([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState('')
  const [filter, setFilter]       = useState('Все')
  const [view, setView]           = useState('table') // 'table' | 'calendar'

  useEffect(() => {
    getBookings()
      .then(data => {
        if (data.error) setError(data.error)
        else setBookings(data.bookings || [])
      })
      .finally(() => setLoading(false))
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    navigate('/admin/login')
  }

  const updateStatus = async (id, status) => {
    const previous = bookings.find(b => b.id === id)
    // Optimistic: flip immediately
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b))

    const result = await updateBookingStatus(id, status)
    if (result.error) {
      // Revert on failure
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: previous.status } : b))
      setError(result.error)
    }
  }

  const filtered = filter === 'Все'
    ? bookings
    : bookings.filter(b => statusConfig[b.status].label === filter)

  const stats = {
    total:     bookings.length,
    pending:   bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
  }

  const viewBtnStyle = (active) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    padding: '0.45rem 1rem',
    background: active ? 'rgba(201,168,76,0.12)' : 'none',
    border: active ? '1px solid rgba(201,168,76,0.4)' : '1px solid var(--color-border)',
    color: active ? 'var(--color-gold)' : 'var(--color-muted)',
    fontSize: '0.65rem',
    fontWeight: '600',
    letterSpacing: '0.1em',
    cursor: 'pointer',
    transition: 'all 0.2s',
  })

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>

      {/* Header */}
      <header style={{
        background: 'var(--color-card)',
        borderBottom: '1px solid var(--color-border)',
        padding: '0 2rem',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '1.25rem', fontWeight: '700', letterSpacing: '0.3em', color: 'var(--color-gold)' }}>
            ONYX
          </span>
          <span style={{
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            color: 'var(--color-muted)',
            borderLeft: '1px solid var(--color-border)',
            paddingLeft: '1rem',
          }}>
            ADMIN
          </span>
        </div>

        {/* View toggle */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setView('table')}
            style={viewBtnStyle(view === 'table')}
          >
            <LayoutList size={13} />
            СПИСОК
          </button>
          <button
            onClick={() => setView('calendar')}
            style={viewBtnStyle(view === 'calendar')}
          >
            <Calendar size={13} />
            КАЛЕНДАРЬ
          </button>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'none',
            border: '1px solid var(--color-border)',
            color: 'var(--color-muted)',
            padding: '0.5rem 1rem',
            fontSize: '0.72rem',
            letterSpacing: '0.1em',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#e05252'; e.currentTarget.style.color = '#e05252' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-muted)' }}
        >
          <LogOut size={14} />
          ВЫЙТИ
        </button>
      </header>

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '2.5rem 2rem' }}>

        {/* Title */}
        <div style={{ marginBottom: '2rem' }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.25em', color: 'var(--color-gold)', fontWeight: '600', marginBottom: '0.4rem' }}>
            УПРАВЛЕНИЕ
          </p>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '700', letterSpacing: '0.08em', color: 'var(--color-text)' }}>
            БРОНИРОВАНИЯ
          </h1>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: 'rgba(224,82,82,0.1)',
            border: '1px solid rgba(224,82,82,0.3)',
            padding: '0.75rem 1rem',
            marginBottom: '1.5rem',
            fontSize: '0.82rem',
            color: '#e05252',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            {error}
            <button
              onClick={() => setError('')}
              style={{ background: 'none', border: 'none', color: '#e05252', cursor: 'pointer', fontSize: '1rem', lineHeight: 1 }}
            >
              ×
            </button>
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <>
            <StatsSkeleton />
            <TableSkeleton />
          </>
        ) : (
          <>
            {/* Stats cards */}
            <div className="admin-stats">
              {[
                { label: 'ВСЕГО',        value: stats.total,     icon: Calendar,     color: undefined    },
                { label: 'ОЖИДАЕТ',      value: stats.pending,   icon: Clock,        color: '#c9a84c'    },
                { label: 'ПОДТВЕРЖДЕНО', value: stats.confirmed, icon: CheckCircle,  color: '#4caf7c'    },
                { label: 'ОТМЕНЕНО',     value: stats.cancelled, icon: XCircle,      color: '#e05252'    },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} style={{ background: 'var(--color-card)', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: 40, height: 40,
                    border: `1px solid ${color || 'var(--color-border)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: color || 'var(--color-muted)', flexShrink: 0,
                  }}>
                    <Icon size={16} />
                  </div>
                  <div>
                    <p style={{ fontSize: '1.5rem', fontWeight: '700', color: color || 'var(--color-text)', lineHeight: 1, marginBottom: '0.2rem' }}>
                      {value}
                    </p>
                    <p style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: 'var(--color-muted)', fontWeight: '600' }}>
                      {label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Table view */}
            {view === 'table' && (
              <>
                {/* Filters */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                  {filterOptions.map(opt => (
                    <button
                      key={opt}
                      onClick={() => setFilter(opt)}
                      style={{
                        padding: '0.5rem 1.25rem',
                        fontSize: '0.7rem',
                        fontWeight: '600',
                        letterSpacing: '0.1em',
                        border: filter === opt ? '1px solid var(--color-gold)' : '1px solid var(--color-border)',
                        background: filter === opt ? 'var(--color-gold)' : 'transparent',
                        color: filter === opt ? 'var(--color-bg)' : 'var(--color-muted)',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      {opt.toUpperCase()}
                    </button>
                  ))}
                  <span style={{ marginLeft: 'auto', fontSize: '0.78rem', color: 'var(--color-muted)', alignSelf: 'center' }}>
                    {filtered.length} записей
                  </span>
                </div>

                {/* Table */}
                <div style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
                  <div className="admin-table-header">
                    {['ГОСТЬ', 'ДАТА / ВРЕМЯ', 'ГОСТЕЙ', 'СТАТУС', ''].map((h, i) => (
                      <span key={i} style={{ fontSize: '0.62rem', letterSpacing: '0.15em', color: 'var(--color-muted)', fontWeight: '600' }}>
                        {h}
                      </span>
                    ))}
                  </div>

                  {filtered.length === 0 ? (
                    <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-muted)', fontSize: '0.88rem' }}>
                      Нет записей
                    </div>
                  ) : (
                    filtered.map((booking) => {
                      const s = statusConfig[booking.status]
                      const Icon = s.icon
                      return (
                        <div
                          key={booking.id}
                          className="admin-table-row"
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                          {/* Guest */}
                          <div>
                            <p style={{ fontSize: '0.88rem', fontWeight: '600', color: 'var(--color-text)', marginBottom: '0.15rem' }}>
                              {booking.name}
                            </p>
                            <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>{booking.phone}</p>
                            {booking.comment && (
                              <p style={{ fontSize: '0.72rem', color: 'var(--color-muted)', fontStyle: 'italic', marginTop: '0.15rem' }}>
                                {booking.comment}
                              </p>
                            )}
                          </div>

                          {/* Meta: date/time + guests + status + actions — stacked on mobile, grid cols on desktop */}
                          <div className="admin-row-meta">
                            {/* Date / Time */}
                            <div>
                              <p style={{ fontSize: '0.88rem', color: 'var(--color-text)', marginBottom: '0.15rem' }}>
                                {formatDate(booking.date)}
                              </p>
                              <p style={{ fontSize: '0.78rem', color: 'var(--color-muted)' }}>{booking.time}</p>
                            </div>

                            {/* Guests */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-muted)', fontSize: '0.88rem' }}>
                              <Users size={13} />
                              {booking.guests}
                            </div>

                            {/* Status */}
                            <div style={{
                              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                              padding: '0.3rem 0.7rem', background: s.bg, color: s.color,
                              fontSize: '0.68rem', fontWeight: '600', letterSpacing: '0.08em', width: 'fit-content',
                            }}>
                              <Icon size={11} />
                              {s.label}
                            </div>

                            {/* Actions */}
                            <ActionButtons booking={booking} onUpdateStatus={updateStatus} />
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>
              </>
            )}

            {/* Calendar view */}
            {view === 'calendar' && (
              <CalendarView bookings={bookings} onUpdateStatus={updateStatus} />
            )}
          </>
        )}
      </main>
    </div>
  )
}
