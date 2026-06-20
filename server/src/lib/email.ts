import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY!)
const FROM   = 'ONYX Restaurant <noreply@onyx-astana.kz>'

function formatDate(date: string) {
  const dt = new Date(date)
  return dt.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
}

// Письмо гостю — заявка получена
export async function sendBookingReceived(to: string, data: {
  name: string
  date: string
  time: string
  guests: number
}) {
  return resend.emails.send({
    from:    FROM,
    to,
    subject: 'ONYX — Ваша заявка получена',
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;color:#1a1a1a">
        <div style="background:#0a0a0a;padding:2rem;text-align:center">
          <h1 style="color:#c9a84c;letter-spacing:0.3em;margin:0;font-size:1.5rem">ONYX</h1>
        </div>
        <div style="padding:2rem;background:#f9f9f9">
          <h2 style="margin-top:0">Заявка получена, ${data.name}!</h2>
          <p style="color:#555;line-height:1.7">
            Мы получили вашу заявку на бронирование. Ожидайте подтверждения — мы свяжемся с вами в ближайшее время.
          </p>
          <div style="background:#fff;border:1px solid #e5e5e5;padding:1.25rem;margin:1.5rem 0;border-radius:2px">
            <p style="margin:0 0 0.5rem"><strong>Дата:</strong> ${formatDate(data.date)}</p>
            <p style="margin:0 0 0.5rem"><strong>Время:</strong> ${data.time}</p>
            <p style="margin:0"><strong>Гостей:</strong> ${data.guests}</p>
          </div>
          <p style="color:#888;font-size:0.85rem">
            Если у вас есть вопросы, свяжитесь с нами: +7 700 000 00 00
          </p>
        </div>
        <div style="background:#0a0a0a;padding:1rem;text-align:center">
          <p style="color:#555;font-size:0.75rem;margin:0">пр. Кабанбай батыра, 11 · Астана · Вт–Вс 18:00–23:00</p>
        </div>
      </div>
    `,
  })
}

// Письмо гостю — бронь подтверждена
export async function sendBookingConfirmed(to: string, data: {
  name: string
  date: string
  time: string
  guests: number
}) {
  return resend.emails.send({
    from:    FROM,
    to,
    subject: 'ONYX — Бронирование подтверждено ✓',
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;color:#1a1a1a">
        <div style="background:#0a0a0a;padding:2rem;text-align:center">
          <h1 style="color:#c9a84c;letter-spacing:0.3em;margin:0;font-size:1.5rem">ONYX</h1>
        </div>
        <div style="padding:2rem;background:#f9f9f9">
          <h2 style="margin-top:0;color:#2e7d52">✓ Бронирование подтверждено!</h2>
          <p style="color:#555;line-height:1.7">
            Здравствуйте, ${data.name}! Ваше бронирование подтверждено. Ждём вас!
          </p>
          <div style="background:#fff;border:1px solid #e5e5e5;padding:1.25rem;margin:1.5rem 0;border-radius:2px">
            <p style="margin:0 0 0.5rem"><strong>Дата:</strong> ${formatDate(data.date)}</p>
            <p style="margin:0 0 0.5rem"><strong>Время:</strong> ${data.time}</p>
            <p style="margin:0"><strong>Гостей:</strong> ${data.guests}</p>
          </div>
          <p style="color:#888;font-size:0.85rem">
            Если планы изменились, позвоните нам: +7 700 000 00 00
          </p>
        </div>
        <div style="background:#0a0a0a;padding:1rem;text-align:center">
          <p style="color:#555;font-size:0.75rem;margin:0">пр. Кабанбай батыра, 11 · Астана · Вт–Вс 18:00–23:00</p>
        </div>
      </div>
    `,
  })
}

// Письмо гостю — бронь отменена
export async function sendBookingCancelled(to: string, data: {
  name: string
  date: string
  time: string
}) {
  return resend.emails.send({
    from:    FROM,
    to,
    subject: 'ONYX — Бронирование отменено',
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;color:#1a1a1a">
        <div style="background:#0a0a0a;padding:2rem;text-align:center">
          <h1 style="color:#c9a84c;letter-spacing:0.3em;margin:0;font-size:1.5rem">ONYX</h1>
        </div>
        <div style="padding:2rem;background:#f9f9f9">
          <h2 style="margin-top:0;color:#c0392b">Бронирование отменено</h2>
          <p style="color:#555;line-height:1.7">
            Здравствуйте, ${data.name}. К сожалению, ваше бронирование на ${formatDate(data.date)} в ${data.time} было отменено.
          </p>
          <p style="color:#555;line-height:1.7">
            Если это ошибка или вы хотите перенести бронь, пожалуйста, свяжитесь с нами.
          </p>
          <p style="color:#888;font-size:0.85rem">
            Телефон: +7 700 000 00 00
          </p>
        </div>
        <div style="background:#0a0a0a;padding:1rem;text-align:center">
          <p style="color:#555;font-size:0.75rem;margin:0">пр. Кабанбай батыра, 11 · Астана · Вт–Вс 18:00–23:00</p>
        </div>
      </div>
    `,
  })
}