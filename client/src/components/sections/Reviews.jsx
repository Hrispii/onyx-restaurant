import { Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const reviewsData = {
  ru: [
    { id: 1, name: 'Айгерим С.', city: 'Астана',  text: 'Лучший ужин за последние годы. Ягнятина просто растворялась во рту. Сервис на высшем уровне — ненавязчивый, но внимательный.', rating: 5, date: 'Март 2024' },
    { id: 2, name: 'Тимур А.',   city: 'Алматы',  text: 'Интерьер, сервис, еда — всё на уровне лучших европейских ресторанов. Наконец-то в Астане есть место для особых вечеров.', rating: 5, date: 'Февраль 2024' },
    { id: 3, name: 'Анна К.',    city: 'Астана',  text: 'Взяла тарт татен наугад — теперь заказываю каждый раз. Шеф — настоящий гений. Меню меняется сезонно.', rating: 5, date: 'Январь 2024' },
    { id: 4, name: 'Марат Д.',   city: 'Астана',  text: 'Гребешок с маслом из чёрного чеснока — это что-то невероятное. Атмосфера камерная. Идеальное место для особого вечера.', rating: 5, date: 'Апрель 2024' },
  ],
  en: [
    { id: 1, name: 'Aigerim S.', city: 'Astana',  text: 'Best dinner in years. The lamb simply melted in your mouth. Service was impeccable — attentive without being intrusive.', rating: 5, date: 'March 2024' },
    { id: 2, name: 'Timur A.',   city: 'Almaty',  text: 'Interior, service, food — all at the level of the best European restaurants. Finally a place in Astana for special evenings.', rating: 5, date: 'February 2024' },
    { id: 3, name: 'Anna K.',    city: 'Astana',  text: 'I ordered the tarte tatin on a whim — now I get it every time. The chef is a true genius. Seasonal menu keeps it fresh.', rating: 5, date: 'January 2024' },
    { id: 4, name: 'Marat D.',   city: 'Astana',  text: 'The scallop with black garlic butter was incredible. Intimate atmosphere, great music. Perfect for a special evening.', rating: 5, date: 'April 2024' },
  ],
}

function StarRating({ count }) {
  return (
    <div style={{ display: 'flex', gap: '3px' }}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={13} style={{ fill: 'var(--color-gold)', color: 'var(--color-gold)' }} />
      ))}
    </div>
  )
}

export default function Reviews() {
  const { t, i18n } = useTranslation()
  const reviews = reviewsData[i18n.language] || reviewsData.ru

  return (
    <section style={{ background: 'var(--color-card)', padding: '8rem 2rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.35em', color: 'var(--color-gold)', marginBottom: '1rem', fontWeight: '500' }}>{t('reviews.label')}</p>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '700', letterSpacing: '0.05em', color: 'var(--color-text)', lineHeight: '1.1' }}>{t('reviews.title')}</h2>
          <div style={{ width: '48px', height: '1px', background: 'var(--color-gold)', margin: '1.5rem auto 0' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {reviews.map(review => (
            <div key={review.id}
              style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', transition: 'border-color 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--color-gold)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-border)'}>
              <StarRating count={review.rating} />
              <p style={{ fontSize: '0.88rem', color: 'var(--color-muted)', lineHeight: '1.8', flexGrow: 1, fontStyle: 'italic' }}>«{review.text}»</p>
              <div style={{ height: '1px', background: 'var(--color-border)' }} />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--color-text)', letterSpacing: '0.05em' }}>{review.name}</p>
                  <p style={{ fontSize: '0.72rem', color: 'var(--color-muted)', marginTop: '0.2rem' }}>{review.city}</p>
                </div>
                <p style={{ fontSize: '0.7rem', color: 'var(--color-muted)' }}>{review.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}