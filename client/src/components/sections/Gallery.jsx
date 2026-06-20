const images = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    alt: 'Интерьер ресторана',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
    alt: 'Подача блюда',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
    alt: 'Авторское блюдо',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
    alt: 'Бар',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    alt: 'Зал ресторана',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&q=80',
    alt: 'Блюдо шефа',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=800&q=80',
    alt: 'Десерт',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80',
    alt: 'Кухня',
  },
]

export default function Gallery() {
  return (
    <section style={{ background: 'var(--color-bg)', padding: '8rem 2rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Шапка */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.35em',
              color: 'var(--color-gold)',
              marginBottom: '1rem',
              fontWeight: '500',
            }}
          >
            АТМОСФЕРА
          </p>
          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '700',
              letterSpacing: '0.05em',
              color: 'var(--color-text)',
              lineHeight: '1.1',
            }}
          >
            ГАЛЕРЕЯ
          </h2>
          <div
            style={{
              width: '48px',
              height: '1px',
              background: 'var(--color-gold)',
              margin: '1.5rem auto 0',
            }}
          />
        </div>

        {/* Ряд 1: маленькое + большое + маленькое */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr 1fr',
            gap: '4px',
            marginBottom: '4px',
          }}
        >
          {images.slice(0, 3).map((img) => (
            <GalleryItem key={img.id} image={img} height="320px" />
          ))}
        </div>

        {/* Ряд 2: большое + маленькое + большое */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 2fr',
            gap: '4px',
            marginBottom: '4px',
          }}
        >
          {images.slice(3, 6).map((img) => (
            <GalleryItem key={img.id} image={img} height="320px" />
          ))}
        </div>

        {/* Ряд 3: два поровну */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4px',
          }}
        >
          {images.slice(6, 8).map((img) => (
            <GalleryItem key={img.id} image={img} height="260px" />
          ))}
        </div>

      </div>
    </section>
  )
}

function GalleryItem({ image, height }) {
  return (
    <div
      style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
      onMouseEnter={e => {
        const img = e.currentTarget.querySelector('.g-img')
        const ov  = e.currentTarget.querySelector('.g-ov')
        if (img) img.style.transform = 'scale(1.07)'
        if (ov)  ov.style.opacity    = '1'
      }}
      onMouseLeave={e => {
        const img = e.currentTarget.querySelector('.g-img')
        const ov  = e.currentTarget.querySelector('.g-ov')
        if (img) img.style.transform = 'scale(1)'
        if (ov)  ov.style.opacity    = '0'
      }}
    >
      <img
        className="g-img"
        src={image.src}
        alt={image.alt}
        style={{
          width: '100%',
          height: height,
          objectFit: 'cover',
          display: 'block',
          transition: 'transform 0.6s ease',
        }}
      />
      <div
        className="g-ov"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(201,168,76,0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0,
          transition: 'opacity 0.4s ease',
        }}
      >
        <div
          style={{
            width: '44px',
            height: '44px',
            border: '1px solid var(--color-gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-gold)',
            fontSize: '1.5rem',
          }}
        >
          +
        </div>
      </div>
    </div>
  )
}