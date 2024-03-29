import cookie from 'cookie'
import { API_URL } from '../../config/index'

export default async (req, res) => {
  if (req.method === 'GET') {
    if (!req.headers.cookie) {
      res.status(403).json({ message: 'No autorizado, Inicia sesión' })

      return
    }

    const { token } = cookie.parse(req.headers.cookie)

    const expressRes = await fetch(`${API_URL}/profile`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const user = await expressRes.json()

    if (expressRes.ok) {
      res.status(200).json({ user })
    } else {
      res.status(403).json({ message: 'User forbidden' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}
