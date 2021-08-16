import cookie from 'cookie'
import { API_URL } from '../../config/index'

export default async (req, res) => {
  if (req.method === 'POST') {
    const { email, password } = req.body

    const expressRes = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })

    const data = await expressRes.json()

    if (expressRes.ok) {
      // set the http cookie
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', data.token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          maxAge: 60 * 60 * 24, // 1 day
          sameSite: 'strict',
          path: '/',
        })
      )
      res.status(200).json({ user: data.user })
    } else {
      res.status(400).json({ message: data.error })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}
