import 'dotenv/config'
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { authRoutes } from './routes/auth.js'
import { bookingRoutes } from './routes/bookings.js'

const app = new Hono()

// Middleware
app.use('*', logger())
app.use('*', cors({
  origin: ['http://localhost:5173', 'https://your-frontend.vercel.app'],
  allowMethods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}))

// Health check
app.get('/', (c) => c.json({ status: 'ok', service: 'ONYX API' }))

// Роуты
app.route('/api/auth',     authRoutes)
app.route('/api/bookings', bookingRoutes)

// 404
app.notFound((c) => c.json({ error: 'Not found' }, 404))

// Запуск
const PORT = Number(process.env.PORT) || 3000
serve({ fetch: app.fetch, port: PORT }, () => {
  console.log(`🍽️  ONYX API running on http://localhost:${PORT}`)
})

export default app