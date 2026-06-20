import { Hono } from 'hono'
import { eq } from 'drizzle-orm'
import { db } from '../db/index.js'
import { bookings } from '../db/schema.js'
import { authMiddleware } from '../middleware/auth.js'
import { createBookingSchema, updateStatusSchema } from '../validators/booking.js'
import {
  sendBookingReceived,
  sendBookingConfirmed,
  sendBookingCancelled,
} from '../lib/email.js'

export const bookingRoutes = new Hono()

// POST /api/bookings — создать бронь (публичный)
bookingRoutes.post('/', async (c) => {
  const body = await c.req.json()
  console.log('BODY:', JSON.stringify(body))

  const result = createBookingSchema.safeParse(body)
  if (!result.success) {
    return c.json({ error: 'Validation error', issues: result.error.issues }, 400)
  }

  const data = result.data

  try {
    const [booking] = await db
      .insert(bookings)
      .values(data)
      .returning()

    // Отправляем email гостю
    await sendBookingReceived(data.email, {
      name:   data.name,
      date:   data.date,
      time:   data.time,
      guests: data.guests,
    })

    return c.json({ success: true, booking }, 201)
  } catch (err) {
    console.error('Create booking error:', err)
    return c.json({ error: 'Ошибка сервера' }, 500)
  }
})

// GET /api/bookings — список броней (только для админа)
bookingRoutes.get('/', authMiddleware, async (c) => {
  try {
    const all = await db
      .select()
      .from(bookings)
      .orderBy(bookings.createdAt)

    return c.json({ bookings: all })
  } catch (err) {
    console.error('Get bookings error:', err)
    return c.json({ error: 'Ошибка сервера' }, 500)
  }
})

// PATCH /api/bookings/:id — изменить статус (только для админа)
bookingRoutes.patch('/:id', authMiddleware, async (c) => {
  const id   = Number(c.req.param('id'))
  const body = await c.req.json()

  if (isNaN(id)) return c.json({ error: 'Неверный ID' }, 400)

  const result = updateStatusSchema.safeParse(body)
  if (!result.success) {
    return c.json({ error: 'Неверный статус' }, 400)
  }

  const { status } = result.data

  try {
    const [updated] = await db
      .update(bookings)
      .set({ status })
      .where(eq(bookings.id, id))
      .returning()

    if (!updated) return c.json({ error: 'Бронь не найдена' }, 404)

    // Отправляем email при смене статуса
    if (status === 'confirmed') {
      await sendBookingConfirmed(updated.email, {
        name:   updated.name,
        date:   updated.date,
        time:   updated.time,
        guests: updated.guests,
      })
    }

    if (status === 'cancelled') {
      await sendBookingCancelled(updated.email, {
        name: updated.name,
        date: updated.date,
        time: updated.time,
      })
    }

    return c.json({ success: true, booking: updated })
  } catch (err) {
    console.error('Update booking error:', err)
    return c.json({ error: 'Ошибка сервера' }, 500)
  }
})