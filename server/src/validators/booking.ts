import { z } from 'zod'

export const createBookingSchema = z.object({
  name:    z.string().min(2,  'Имя слишком короткое'),
  email:   z.email('Неверный email'),
  phone:   z.string().min(10, 'Неверный телефон'),
  date:    z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Неверный формат даты'),
  time:    z.string().regex(/^\d{2}:\d{2}$/, 'Неверный формат времени'),
  guests:  z.number().int().min(1).max(20),
  comment: z.string().max(500).optional().default(''),
})

export const updateStatusSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'cancelled']),
})

export const loginSchema = z.object({
  email:    z.email(),
  password: z.string().min(1),
})

export type CreateBookingInput = z.infer<typeof createBookingSchema>