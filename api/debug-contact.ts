// 临时调试 endpoint — 删除之前不要 push
import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const accessKey = process.env.WEB3FORMS_KEY
  const result: any = {
    hasKey: !!accessKey,
    keyPrefix: accessKey ? accessKey.substring(0, 8) + '...' : null,
    nodeVersion: process.version,
  }

  // Test outbound fetch to web3forms
  try {
    const start = Date.now()
    const r = await fetch('https://web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        from_name: 'Debug',
        email: 'debug@example.com',
        subject: '[Debug] Connectivity test',
        message: 'test',
      }),
    })
    const elapsed = Date.now() - start
    const text = await r.text()
    result.fetch = {
      ok: r.ok,
      status: r.status,
      statusText: r.statusText,
      elapsedMs: elapsed,
      body: text.substring(0, 500),
    }
  } catch (err: any) {
    result.fetchError = {
      message: err?.message,
      name: err?.name,
      cause: err?.cause?.message,
    }
  }

  return res.status(200).json(result)
}
