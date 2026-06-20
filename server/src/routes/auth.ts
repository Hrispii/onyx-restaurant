import { Hono } from 'hono'
import jwt from 'jsonwebtoken'
import { loginSchema } from '../validators/booking.js'

export const authRoutes = new Hono()

authRoutes.post('/login', async (c) => {
  const body = await c.req.json()

  // Валидация
  const result = loginSchema.safeParse(body)
  if (!result.success) {
    return c.json({ error: 'Неверные данные' }, 400)
  }

  const { email, password } = result.data

  // Проверка против .env
  if (
    email    !== process.env.ADMIN_EMAIL ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return c.json({ error: 'Неверный email или пароль' }, 401)
  }

  // Генерируем JWT
  const token = jwt.sign(
    { email, role: 'admin' },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  )

  return c.json({ token })
})