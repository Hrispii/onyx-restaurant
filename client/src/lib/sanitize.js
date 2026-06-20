import DOMPurify from 'dompurify'

// Очищает от XSS и HTML
export const sanitize = (str) =>
  DOMPurify.sanitize(str, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] }).trim()

// Валидация email
export const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

// Валидация телефона
export const isValidPhone = (phone) =>
  /^\+?[\d\s\-()]{10,20}$/.test(phone)

