import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const RATE_LIMIT = new Map<string, { count: number; resetAt: number }>()
const WINDOW_MS = 60 * 60 * 1000 // 1 hour
const MAX_PER_WINDOW = 5

function getClientIp(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for']
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim()
  }
  return req.socket?.remoteAddress || 'unknown'
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = RATE_LIMIT.get(ip)
  if (!record || now > record.resetAt) {
    RATE_LIMIT.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return true
  }
  if (record.count >= MAX_PER_WINDOW) {
    return false
  }
  record.count++
  return true
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const ip = getClientIp(req)
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ error: 'Too many requests, please try again later' })
  }

  const { name, email, subject, message } = req.body || {}

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required' })
  }

  if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
    return res.status(400).json({ error: 'Invalid input types' })
  }

  if (name.length > 100 || email.length > 200 || message.length > 5000) {
    return res.status(400).json({ error: 'Input too long' })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'Server not configured' })
  }

  const safeName = escapeHtml(name.trim())
  const safeEmail = escapeHtml(email.trim())
  const safeSubject = escapeHtml((subject || 'No subject').trim())
  const safeMessage = escapeHtml(message.trim())

  try {
    const { data, error } = await resend.emails.send({
      from: 'Learn Chinese Contact <onboarding@resend.dev>',
      to: 'amy15862341636@outlook.com',
      replyTo: email.trim(),
      subject: `[Learn Chinese] ${subject || 'New contact form submission'}`,
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Subject:</strong> ${safeSubject}</p>
        <hr />
        <h3>Message:</h3>
        <p style="white-space: pre-wrap;">${safeMessage}</p>
        <hr />
        <p style="color: #888; font-size: 12px;">Sent from Learn Chinese website contact form</p>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return res.status(500).json({ error: 'Failed to send email' })
    }

    return res.status(200).json({ success: true, id: data?.id })
  } catch (err) {
    console.error('Handler error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
