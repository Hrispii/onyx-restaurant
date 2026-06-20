import { createBrowserRouter, Navigate, Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from '../components/layout/Navbar.jsx'
import Footer from '../components/layout/Footer.jsx'
import Home from '../pages/Home.jsx'
import Menu from '../pages/Menu.jsx'
import Booking from '../pages/Booking.jsx'
import BookingSuccess from '../pages/BookingSuccess.jsx'
import AdminLogin from '../pages/AdminLogin.jsx'
import Admin from '../pages/Admin.jsx'

const Layout = () => {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>
      <Navbar />
      <main key={location.pathname} className="page-transition">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

const isTokenValid = () => {
  const token = localStorage.getItem('admin_token')
  if (!token) return false
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.exp * 1000 > Date.now()
  } catch { return false }
}

const ProtectedRoute = ({ children }) => {
  if (!isTokenValid()) return <Navigate to="/admin/login" replace />
  return children
}

const NotFound = () => (
  <div style={{
    minHeight: '100vh',
    background: 'var(--color-bg)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1.5rem',
  }}>
    <p style={{ fontSize: '0.65rem', letterSpacing: '0.3em', color: 'var(--color-gold)', fontWeight: '600' }}>
      404
    </p>
    <h1 style={{ fontSize: '2rem', fontWeight: '700', letterSpacing: '0.15em', color: 'var(--color-text)' }}>
      СТРАНИЦА НЕ НАЙДЕНА
    </h1>
    <a href="/" style={{ fontSize: '0.75rem', letterSpacing: '0.15em', color: 'var(--color-gold)', textDecoration: 'none' }}>
      НА ГЛАВНУЮ
    </a>
  </div>
)

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/',                element: <Home />           },
      { path: '/menu',            element: <Menu />           },
      { path: '/booking',         element: <Booking />        },
      { path: '/booking/success', element: <BookingSuccess /> },
    ],
  },
  { path: '/admin/login', element: <AdminLogin /> },
  { path: '/admin',       element: <ProtectedRoute><Admin /></ProtectedRoute> },
  { path: '*',            element: <NotFound /> },
])
