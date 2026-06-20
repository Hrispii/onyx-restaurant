import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const dishesData = {
  ru: [
    { id: 1, name: 'ТАРТАР ИЗ ЯГНЯТИНЫ', description: 'Крем из каймака, чипс из лаваша, зелёное масло', price: '4 200 ₸', category: 'ЗАКУСКА', image: 'https://images.unsplash.com/photo-1611270629569-8b357cb88da9?w=600&q=80' },
    { id: 2, name: 'РЁБРА ЯГНЁНКА',      description: '48 часов, соус из красного вина, пюре из пастернака', price: '9 800 ₸', category: 'ОСНОВНОЕ', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80' },
    { id: 3, name: 'ГРЕБЕШОК',           description: 'Масло из чёрного чеснока, икра судака, пена из фенхеля', price: '5 800 ₸', category: 'ЗАКУСКА', image: 'https://images.unsplash.com/photo-1559742811-822873691df8?w=600&q=80' },
    { id: 4, name: 'ШОКОЛАДНЫЙ ФОНДАН',  description: 'Мороженое из курта, карамельный соус, хрустящий декор', price: '3 200 ₸', category: 'ДЕСЕРТ', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=80' },
  ],
  en: [
    { id: 1, name: 'LAMB TARTARE',       description: 'Kaymak cream, lavash crisp, green butter', price: '4 200 ₸', category: 'STARTER', image: 'https://images.unsplash.com/photo-1611270629569-8b357cb88da9?w=600&q=80' },
    { id: 2, name: 'LAMB RIBS',          description: '48 hours, red wine sauce, parsnip purée', price: '9 800 ₸', category: 'MAIN', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80' },
    { id: 3, name: 'SCALLOP',            description: 'Black garlic butter, pike perch caviar, fennel foam', price: '5 800 ₸', category: 'STARTER', image: 'https://images.unsplash.com/photo-1559742811-822873691df8?w=600&q=80' },
    { id: 4, name: 'CHOCOLATE FONDANT',  description: 'Kurt ice cream, caramel sauce, crispy décor', price: '3 200 ₸', category: 'DESSERT', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=80' },
  ],
}

export default function FeaturedDishes() {
  const { t, i18n } = useTranslation()
  const dishes = dishesData[i18n.language] || dishesData.ru

  return (
    <section style={{ background: 'var(--color-card)', padding: '8rem 2rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '4rem', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <p style={{ fontSize: '0.7rem', letterSpacing: '0.35em', color: 'var(--color-gold)', marginBottom: '1rem', fontWeight: '500' }}>{t('featured.label')}</p>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '700', letterSpacing: '0.05em', color: 'var(--color-text)', lineHeight: '1.1', whiteSpace: 'pre-line' }}>{t('featured.title')}</h2>
          </div>
          <Link to="/menu"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.72rem', letterSpacing: '0.15em', color: 'var(--color-gold)', textDecoration: 'none', fontWeight: '600', paddingBottom: '2px', borderBottom: '1px solid var(--color-gold)', transition: 'opacity 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
            {t('featured.fullMenu')}
            <ArrowRight size={14} />
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5px' }}>
          {dishes.map(dish => <DishCard key={dish.id} dish={dish} />)}
        </div>
      </div>
    </section>
  )
}

function DishCard({ dish }) {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', cursor: 'default' }}
      onMouseEnter={e => {
        const img = e.currentTarget.querySelector('.dish-img')
        const ov  = e.currentTarget.querySelector('.dish-overlay')
        const cnt = e.currentTarget.querySelector('.dish-content')
        if (img) img.style.transform = 'scale(1.06)'
        if (ov)  ov.style.opacity = '1'
        if (cnt) cnt.style.transform = 'translateY(0)'
      }}
      onMouseLeave={e => {
        const img = e.currentTarget.querySelector('.dish-img')
        const ov  = e.currentTarget.querySelector('.dish-overlay')
        const cnt = e.currentTarget.querySelector('.dish-content')
        if (img) img.style.transform = 'scale(1)'
        if (ov)  ov.style.opacity = '0'
        if (cnt) cnt.style.transform = 'translateY(8px)'
      }}>
      <img className="dish-img" src={dish.image} alt={dish.name} style={{ width: '100%', height: '380px', objectFit: 'cover', display: 'block', transition: 'transform 0.6s ease' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.2) 50%, transparent 100%)' }} />
      <div className="dish-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(201,168,76,0.1)', transition: 'opacity 0.4s ease', opacity: 0 }} />
      <div style={{ position: 'absolute', top: '1.25rem', left: '1.25rem', background: 'var(--color-gold)', color: 'var(--color-bg)', padding: '0.25rem 0.75rem', fontSize: '0.6rem', fontWeight: '700', letterSpacing: '0.15em' }}>
        {dish.category}
      </div>
      <div className="dish-content" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem', transform: 'translateY(8px)', transition: 'transform 0.4s ease' }}>
        <h3 style={{ fontSize: '0.95rem', fontWeight: '700', letterSpacing: '0.1em', color: 'var(--color-text)', marginBottom: '0.4rem' }}>{dish.name}</h3>
        <p style={{ fontSize: '0.78rem', color: 'var(--color-muted)', marginBottom: '0.75rem', lineHeight: '1.5' }}>{dish.description}</p>
        <p style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--color-gold)', letterSpacing: '0.05em' }}>{dish.price}</p>
      </div>
    </div>
  )
}