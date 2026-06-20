const BASE = import.meta.env.onyx-restaurant-production.up.railway.app || '/api'

const headers = (withAuth = false) => ({
  'Content-Type': 'application/json',
  ...(withAuth && {
    'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
  })
})

const handleResponse = async (r) => {
  if (!r.ok) {
    if (r.status === 401) {
      localStorage.removeItem('admin_token')
    }
    throw new Error(`${r.status}`)
  }
  return r.json()
}

export const createBooking = (data) =>
  fetch(`${BASE}/bookings`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(data),
  })
    .then(handleResponse)
    .catch(err => ({ error: err.message }))

export const getBookings = () =>
  fetch(`${BASE}/bookings`, {
    headers: headers(true),
  })
    .then(handleResponse)
    .catch(err => ({ error: err.message, bookings: [] }))

export const updateBookingStatus = (id, status) =>
  fetch(`${BASE}/bookings/${id}`, {
    method: 'PATCH',
    headers: headers(true),
    body: JSON.stringify({ status }),
  })
    .then(handleResponse)
    .catch(err => ({ error: err.message }))

export const login = (email, password) =>
  fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ email, password }),
  })
    .then(handleResponse)
    .catch(err => ({ error: err.message }))
