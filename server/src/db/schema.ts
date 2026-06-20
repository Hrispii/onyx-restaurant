import { pgTable, serial, varchar, integer, timestamp, text } from 'drizzle-orm/pg-core'

export const bookings = pgTable('bookings', {
  id:        serial('id').primaryKey(),
  name:      varchar('name',  { length: 100 }).notNull(),
  email:     varchar('email', { length: 100 }).notNull(),
  phone:     varchar('phone', { length: 20  }).notNull(),
  date:      varchar('date',  { length: 10  }).notNull(), // YYYY-MM-DD
  time:      varchar('time',  { length: 5   }).notNull(), // HH:MM
  guests:    integer('guests').notNull().default(2),
  comment:   text('comment').default(''),
  status:    varchar('status', { length: 20 }).notNull().default('pending'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export type Booking    = typeof bookings.$inferSelect
export type NewBooking = typeof bookings.$inferInsert