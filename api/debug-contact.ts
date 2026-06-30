// 临时批量测试 endpoint — 找正确的 Web3Forms URL
import { request as httpsRequest } from 'https'
import type { VercelRequest, VercelResponse } from '@vercel/node'

interface ProbeResult {
  url: string
  status: number
  statusText: string
  elapsedMs: number
  bodyPreview: string
  error?: string
}

function probe(
  hostname: string,
  path: string,
  payload: Record<string, string>
): Promise<ProbeResult> {
  return new Promise((resolve) => {
    const body = JSON.stringify(payload)
    const start = Date.now()
    const req = httpsRequest(
      {
        hostname,
        port: 443,
        path,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Content-Length': Buffer.byteLength(body).toString(),
          'User-Agent': 'LearnChinese-Debug/1.0',
        },
      },
      (res) => {
        let raw = ''
        res.on('data', (chunk) => (raw += chunk))
        res.on('end', () =>
          resolve({
            url: `https://${hostname}${path}`,
            status: res.statusCode ?? 0,
            statusText: res.statusMessage ?? '',
            elapsedMs: Date.now() - start,
            bodyPreview: raw.substring(0, 300),
          })
        )
      }
    )
    req.on('error', (err) =>
      resolve({
        url: `https://${hostname}${path}`,
        status: 0,
        statusText: 'ERROR',
        elapsedMs: Date.now() - start,
        bodyPreview: '',
        error: err.message,
      })
    )
    req.write(body)
    req.end()
  })
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const accessKey = process.env.WEB3FORMS_KEY
  if (!accessKey) {
    return res.status(200).json({ error: 'No key' })
  }

  const payload = {
    access_key: accessKey,
    from_name: 'Debug',
    email: 'debug@example.com',
    subject: '[Debug] Probe',
    message: 'test',
  }

  const candidates = [
    { hostname: 'api.web3forms.com', path: '/submit' },
    { hostname: 'web3forms.com', path: '/submit' },
    { hostname: 'web3forms.com', path: '/api/submit' },
    { hostname: 'api.web3forms.com', path: '/api/submit' },
  ]

  const results: ProbeResult[] = []
  for (const c of candidates) {
    const r = await probe(c.hostname, c.path, payload)
    results.push(r)
    // 如果找到了 200，立刻返回
    if (r.status >= 200 && r.status < 300) break
  }

  return res.status(200).json({
    hasKey: true,
    keyPrefix: accessKey.substring(0, 8) + '...',
    results,
  })
}
