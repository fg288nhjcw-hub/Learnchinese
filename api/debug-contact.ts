// 临时调试 endpoint — 删除之前不要 push
import { request as httpsRequest } from 'https'
import type { VercelRequest, VercelResponse } from '@vercel/node'

function postToWeb3Forms(
  payload: Record<string, string>
): Promise<{ ok: boolean; status: number; statusText: string; body: string }> {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(payload)
    const req = httpsRequest(
      {
        hostname: 'web3forms.com',
        port: 443,
        path: '/submit',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Content-Length': Buffer.byteLength(body).toString(),
          'User-Agent': 'LearnChinese-ContactForm-Debug/1.0',
        },
      },
      (res) => {
        let raw = ''
        res.on('data', (chunk) => (raw += chunk))
        res.on('end', () =>
          resolve({
            ok: (res.statusCode ?? 0) >= 200 && (res.statusCode ?? 0) < 300,
            status: res.statusCode ?? 0,
            statusText: res.statusMessage ?? '',
            body: raw.substring(0, 800),
          })
        )
      }
    )
    req.on('error', reject)
    req.write(body)
    req.end()
  })
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const accessKey = process.env.WEB3FORMS_KEY
  const result: any = {
    hasKey: !!accessKey,
    keyPrefix: accessKey ? accessKey.substring(0, 8) + '...' : null,
    nodeVersion: process.version,
  }

  if (!accessKey) {
    return res.status(200).json({ ...result, error: 'WEB3FORMS_KEY not set' })
  }

  try {
    const start = Date.now()
    const r = await postToWeb3Forms({
      access_key: accessKey,
      from_name: 'Debug',
      email: 'debug@example.com',
      subject: '[Debug] Connectivity test',
      message: 'test',
    })
    result.elapsedMs = Date.now() - start
    result.fetch = r
  } catch (err: any) {
    result.fetchError = {
      message: err?.message,
      name: err?.name,
      code: err?.code,
      cause: err?.cause?.message,
    }
  }

  return res.status(200).json(result)
}
