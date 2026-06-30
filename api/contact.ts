import { request as httpsRequest } from 'https'
import type { VercelRequest, VercelResponse } from '@vercel/node'

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

interface Web3FormsResponse {
  success?: boolean
  message?: string
  [key: string]: unknown
}

function postToWeb3Forms(
  payload: Record<string, string>
): Promise<{ ok: boolean; status: number; statusText: string; data: Web3FormsResponse }> {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(payload)
    const req = httpsRequest(
      {
        hostname: 'api.web3forms.com',
        port: 443,
        path: '/submit',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Content-Length': Buffer.byteLength(body).toString(),
          'User-Agent': 'LearnChinese-ContactForm/1.0',
        },
      },
      (res) => {
        let raw = ''
        res.on('data', (chunk) => (raw += chunk))
        res.on('end', () => {
          let data: Web3FormsResponse = {}
          try {
            data = raw ? (JSON.parse(raw) as Web3FormsResponse) : {}
          } catch {
            data = { message: raw.slice(0, 500) } as Web3FormsResponse
          }
          resolve({
            ok: (res.statusCode ?? 0) >= 200 && (res.statusCode ?? 0) < 300,
            status: res.statusCode ?? 0,
            statusText: res.statusMessage ?? '',
            data,
          })
        })
      }
    )
    req.on('error', reject)
    req.write(body)
    req.end()
  })
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

  const accessKey = process.env.WEB3FORMS_KEY
  if (!accessKey) {
    return res.status(500).json({ error: 'Server not configured' })
  }

  const safeName = escapeHtml(name.trim())
  const safeEmail = escapeHtml(email.trim())
  const safeSubject = escapeHtml((subject || 'No subject').trim())
  const safeMessage = escapeHtml(message.trim())

  try {
    const { ok, status, statusText, data } = await postToWeb3Forms({
      access_key: accessKey,
      from_name: safeName,
      email: email.trim(),
      subject: `[Learn Chinese] ${subject || 'New contact form submission'}`,
      message: `Name: ${safeName}\nEmail: ${safeEmail}\nSubject: ${safeSubject}\n\nMessage:\n${safeMessage}`,
    })

    if (!ok || !data.success) {
      console.error('[contact] Web3Forms error:', { status, statusText, body: data })
      return res.status(500).json({
        error: 'Failed to send email',
        detail:
          (data && (data.message as string)) ||
          statusText ||
          `HTTP ${status}`,
      })
    }

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('Handler error:', err)
    return res.status(500).json({
      error: 'Internal server error',
      detail: err instanceof Error ? err.message : String(err),
    })
  }
}
