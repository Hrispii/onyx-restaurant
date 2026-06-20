# ONYX — Restaurant Booking System

!
You can cheak this site by yourself, just go to
https://onyx-restaurant-rosy.vercel.app
and touch it!
You can also cheak /admin
!

A full-stack restaurant website with an online reservation system and an admin dashboard for managing bookings.

> **Demo credentials for the admin panel:** `admin@onyx.kz` / `admin123`

---

## Features

- **Public site** — Home, Menu, and Booking pages with smooth animations
- **Reservation form** — Date/time picker, guest count, real-time validation
- **Email notifications** — Guests receive confirmation, approval, and cancellation emails
- **Admin dashboard** — Table and calendar views, status management, booking statistics
- **Bilingual** — Russian and English (i18n)
- **Optimistic UI** — Status changes apply instantly without a loading spinner
- **Error boundary** — Graceful crash screen instead of a blank page

---

## Tech Stack

| Layer     | Technology                              |
|-----------|-----------------------------------------|
| Frontend  | React 19, Vite, TypeScript, Tailwind CSS|
| Routing   | React Router v7                         |
| Animation | Framer Motion                           |
| Backend   | Hono, Node.js, TypeScript               |
| Database  | PostgreSQL via Neon (serverless)        |
| ORM       | Drizzle ORM                             |
| Auth      | JWT (7-day tokens)                      |
| Email     | Resend                                  |
| Validation| Zod (client + server)                   |

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Neon](https://neon.tech) (or any PostgreSQL) database
- A [Resend](https://resend.com) account for transactional emails

### 1. Clone the repository

```bash
git clone https://github.com/your-username/onyx-restaurant.git
cd onyx-restaurant
```

### 2. Set up environment variables

```bash
cp server/.env.example server/.env
```

Open `server/.env` and fill in your values:

| Variable         | Description                                      |
|------------------|--------------------------------------------------|
| `DATABASE_URL`   | PostgreSQL connection string                     |
| `JWT_SECRET`     | Long random string for signing tokens            |
| `ADMIN_EMAIL`    | Email used to log in to the admin panel          |
| `ADMIN_PASSWORD` | Password for the admin panel                     |
| `RESEND_API_KEY` | API key from resend.com                          |
| `PORT`           | Port the backend listens on (default: `3000`)    |

To generate a secure `JWT_SECRET`:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 3. Install dependencies

```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### 4. Run database migrations

```bash
cd server
npm run db:migrate
```

### 5. Start the development servers

In one terminal (backend):
```bash
cd server
npm run dev
```

In another terminal (frontend):
```bash
cd client
npm run dev
```

The app will be available at `http://localhost:5173`.  
The API runs on `http://localhost:3000`.

---

## Project Structure

```
onyx-restaurant/
├── client/                 # React frontend
│   └── src/
│       ├── components/     # Reusable UI components
│       ├── pages/          # Route-level page components
│       ├── lib/            # API client, sanitization helpers
│       └── i18n/           # Russian / English translations
│
└── server/                 # Hono backend
    └── src/
        ├── routes/         # API route handlers (bookings, auth)
        ├── db/             # Drizzle schema and database client
        └── lib/            # Email templates
```

---

## Admin Panel

Navigate to `/admin/login`. The admin dashboard lets you:

- View all bookings in a **table** or **calendar** view
- Filter by status (Pending / Confirmed / Cancelled)
- Confirm or cancel bookings (sends an email to the guest automatically)
- See summary statistics at a glance

---

## Available Scripts

### Backend (`server/`)

| Script             | Description                        |
|--------------------|------------------------------------|
| `npm run dev`      | Start server with hot reload       |
| `npm run build`    | Compile TypeScript                 |
| `npm run start`    | Run compiled production build      |
| `npm run db:migrate` | Apply database migrations        |
| `npm run db:studio`  | Open Drizzle visual DB browser   |

### Frontend (`client/`)

| Script          | Description                          |
|-----------------|--------------------------------------|
| `npm run dev`   | Start Vite dev server                |
| `npm run build` | Type-check and build for production  |
| `npm run lint`  | Run ESLint                           |

---

## License

[MIT](LICENSE)
