import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const menuData = {
  ru: [
    { id: 1,  category: 'Закуски',  name: 'Тартар из ягнятины',   description: 'Крем из каймака, чипс из лаваша, зелёное масло',          price: 4200,  image: 'https://images.unsplash.com/photo-1611270629569-8b357cb88da9?w=600&q=80' },
    { id: 2,  category: 'Закуски',  name: 'Гребешок',             description: 'Масло из чёрного чеснока, икра судака, пена из фенхеля',   price: 5800,  image: 'https://images.unsplash.com/photo-1559742811-822873691df8?w=600&q=80' },
    { id: 3,  category: 'Закуски',  name: 'Крем-суп из лука',     description: 'Жареный лук, трюфельное масло, хрустящий лук',             price: 3600,  image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80' },
    { id: 4,  category: 'Закуски',  name: 'Карпаччо из говядины', description: 'Пармезан, руккола, каперсы, лимонная заправка',            price: 4800,  image: 'https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=600&q=80' },
    { id: 5,  category: 'Основные', name: 'Рёбра ягнёнка',        description: '48 часов, соус из красного вина, пюре из пастернака',      price: 9800,  image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80' },
    { id: 6,  category: 'Основные', name: 'Судак sous-vide',       description: 'Ризотто с шафраном, пена из фенхеля, икра',                price: 8400,  image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=80' },
    { id: 7,  category: 'Основные', name: 'Утиная грудка',         description: 'Соус из вишни, дикий рис, жареный корень сельдерея',       price: 10200, image: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=600&q=80' },
    { id: 8,  category: 'Основные', name: 'Говяжья вырезка',       description: 'Масло с травами, картофель дофинуа, соус демигляс',        price: 12500, image: 'https://images.unsplash.com/photo-1546964124-0cce460f38ef?w=600&q=80' },
    { id: 9,  category: 'Десерты',  name: 'Шоколадный фондан',    description: 'Мороженое из курта, карамельный соус, хрустящий декор',    price: 3200,  image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=80' },
    { id: 10, category: 'Десерты',  name: 'Тарт татен',           description: 'Яблоко, кардамон, ваниль, крем-фреш',                      price: 2800,  image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=600&q=80' },
    { id: 11, category: 'Десерты',  name: 'Паннакотта',           description: 'Ваниль Мадагаскар, ягодный кули, мята',                    price: 2600,  image: 'https://images.unsplash.com/photo-1488477304112-4944851de03d?w=600&q=80' },
    { id: 12, category: 'Напитки',  name: 'Авторский коктейль',   description: 'Сезонный состав от бармена',                               price: 3200,  image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600&q=80' },
    { id: 13, category: 'Напитки',  name: 'Безалкогольный пейринг', description: 'Подбор напитков к меню, 4 подачи',                       price: 1800,  image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80' },
    { id: 14, category: 'Напитки',  name: 'Вино (бокал)',          description: 'Сомелье подберёт под ваше блюдо',                          price: 3500,  image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80' },
  ],
  en: [
    { id: 1,  category: 'Starters', name: 'Lamb Tartare',          description: 'Kaymak cream, lavash crisp, green butter',                 price: 4200,  image: 'https://images.unsplash.com/photo-1611270629569-8b357cb88da9?w=600&q=80' },
    { id: 2,  category: 'Starters', name: 'Scallop',               description: 'Black garlic butter, pike perch caviar, fennel foam',      price: 5800,  image: 'https://images.unsplash.com/photo-1559742811-822873691df8?w=600&q=80' },
    { id: 3,  category: 'Starters', name: 'Onion Cream Soup',      description: 'Roasted onion, truffle oil, crispy onion',                 price: 3600,  image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80' },
    { id: 4,  category: 'Starters', name: 'Beef Carpaccio',        description: 'Parmesan, rocket, capers, lemon dressing',                 price: 4800,  image: 'https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=600&q=80' },
    { id: 5,  category: 'Mains',    name: 'Lamb Ribs',             description: '48 hours, red wine sauce, parsnip purée',                  price: 9800,  image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80' },
    { id: 6,  category: 'Mains',    name: 'Zander Sous-vide',      description: 'Saffron risotto, fennel foam, caviar',                     price: 8400,  image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=80' },
    { id: 7,  category: 'Mains',    name: 'Duck Breast',           description: 'Cherry sauce, wild rice, roasted celeriac',                price: 10200, image: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=600&q=80' },
    { id: 8,  category: 'Mains',    name: 'Beef Tenderloin',       description: 'Herb butter, gratin dauphinois, demi-glace',               price: 12500, image: 'https://images.unsplash.com/photo-1546964124-0cce460f38ef?w=600&q=80' },
    { id: 9,  category: 'Desserts', name: 'Chocolate Fondant',     description: 'Kurt ice cream, caramel sauce, crispy décor',              price: 3200,  image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=80' },
    { id: 10, category: 'Desserts', name: 'Tarte Tatin',           description: 'Apple, cardamom, vanilla, crème fraîche',                  price: 2800,  image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=600&q=80' },
    { id: 11, category: 'Desserts', name: 'Panna Cotta',           description: 'Madagascar vanilla, berry coulis, mint',                   price: 2600,  image: 'https://images.unsplash.com/photo-1488477304112-4944851de03d?w=600&q=80' },
    { id: 12, category: 'Drinks',   name: 'Signature Cocktail',    description: 'Seasonal blend by the bartender',                          price: 3200,  image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600&q=80' },
    { id: 13, category: 'Drinks',   name: 'Non-alcoholic Pairing', description: 'Curated drinks for the menu, 4 servings',                  price: 1800,  image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80' },
    { id: 14, category: 'Drinks',   name: 'Wine (glass)',          description: 'Sommelier will suggest the perfect match',                  price: 3500,  image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80' },
  ],
}

export default function Menu() {
  const { t, i18n } = useTranslation()
  const categories = t('menu.categories', { returnObjects: true })
  const [active, setActive] = useState(categories[0])
  const items = menuData[i18n.language] || menuData.ru

  const grouped = active === categories[0]
    ? categories.slice(1).map(cat => ({ category: cat, items: items.filter(item => item.category === cat) }))
    : [{ category: active, items: items.filter(item => item.category === active) }]

  return (
    <>
      {/* Hero */}
      <section style={{ position: 'relative', height: '45vh', minHeight: '340px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.25 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,10,10,0.4), #0a0a0a)' }} />
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.35em', color: 'var(--color-gold)', marginBottom: '1rem', fontWeight: '500' }}>{t('menu.label')}</p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: '700', letterSpacing: '0.15em', color: 'var(--color-text)', lineHeight: '1' }}>{t('menu.title')}</h1>
          <div style={{ width: '48px', height: '1px', background: 'var(--color-gold)', margin: '1.25rem auto 0' }} />
        </div>
      </section>

      {/* Фильтры */}
      <section style={{ background: 'var(--color-card)', borderBottom: '1px solid var(--color-border)', position: 'sticky', top: '72px', zIndex: 30 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem', display: 'flex', overflowX: 'auto' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActive(cat)}
              style={{
                background: 'none', border: 'none',
                borderBottom: active === cat ? '2px solid var(--color-gold)' : '2px solid transparent',
                padding: '1.25rem 1.75rem', fontSize: '0.72rem', fontWeight: '600', letterSpacing: '0.15em',
                color: active === cat ? 'var(--color-gold)' : 'var(--color-muted)',
                cursor: 'pointer', transition: 'color 0.2s, border-color 0.2s', whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => { if (active !== cat) e.currentTarget.style.color = 'var(--color-text)' }}
              onMouseLeave={e => { if (active !== cat) e.currentTarget.style.color = 'var(--color-muted)' }}>
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </section>

      {/* Список */}
      <section style={{ background: 'var(--color-bg)', padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          {grouped.map(({ category, items: catItems }) => (
            <div key={category} style={{ marginBottom: '5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '0.7rem', letterSpacing: '0.35em', color: 'var(--color-gold)', fontWeight: '600', whiteSpace: 'nowrap' }}>{category.toUpperCase()}</h2>
                <div style={{ flex: 1, height: '1px', background: 'var(--color-border)' }} />
              </div>
              <div className="menu-grid" style={{ gap: 0 }}>
                {catItems.map((item, index) => (
                  <MenuRow key={item.id} item={item}
                    isLastRow={index >= catItems.length - (catItems.length % 2 === 0 ? 2 : 1)}
                    isRight={index % 2 === 1} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--color-card)', borderTop: '1px solid var(--color-border)', padding: '5rem 2rem', textAlign: 'center' }}>
        <p style={{ fontSize: '0.7rem', letterSpacing: '0.35em', color: 'var(--color-gold)', marginBottom: '1rem', fontWeight: '500' }}>{t('menu.ctaLabel')}</p>
        <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: '700', letterSpacing: '0.05em', color: 'var(--color-text)', marginBottom: '2rem' }}>{t('menu.ctaTitle')}</h2>
        <Link to="/booking"
          style={{ display: 'inline-block', padding: '0.9rem 2.5rem', background: 'var(--color-gold)', color: 'var(--color-bg)', textDecoration: 'none', fontSize: '0.72rem', fontWeight: '700', letterSpacing: '0.2em', transition: 'opacity 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
          {t('menu.ctaButton')}
        </Link>
      </section>
    </>
  )
}

function MenuRow({ item, isLastRow, isRight }) {
  return (
    <div className="menu-row" style={{ display: 'grid', gridTemplateColumns: '90px 1fr auto', gap: '1.25rem', alignItems: 'center', padding: '1.5rem', borderBottom: isLastRow ? 'none' : '1px solid var(--color-border)', borderLeft: isRight ? '1px solid var(--color-border)' : 'none', transition: 'background 0.2s', cursor: 'default' }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'rgba(201,168,76,0.04)'
        const title = e.currentTarget.querySelector('.menu-title')
        if (title) title.style.color = 'var(--color-gold)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'transparent'
        const title = e.currentTarget.querySelector('.menu-title')
        if (title) title.style.color = 'var(--color-text)'
      }}>
      <div style={{ overflow: 'hidden', flexShrink: 0 }}>
        <img src={item.image} alt={item.name} style={{ width: '90px', height: '90px', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
      </div>
      <div>
        <h3 className="menu-title" style={{ fontSize: '0.95rem', fontWeight: '600', letterSpacing: '0.05em', color: 'var(--color-text)', marginBottom: '0.35rem', transition: 'color 0.2s' }}>{item.name}</h3>
        <p style={{ fontSize: '0.78rem', color: 'var(--color-muted)', lineHeight: '1.5' }}>{item.description}</p>
      </div>
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <span style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--color-gold)', letterSpacing: '0.03em' }}>{item.price.toLocaleString()} ₸</span>
      </div>
    </div>
  )
}