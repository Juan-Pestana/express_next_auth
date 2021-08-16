import { useRouter } from 'next/router'
import jwt from 'jsonwebtoken'
import { parseCookie } from '../../helpers/index'
import { useContext } from 'react'
import AuthContext from '../../context/authContext'

import Layout from '../../components/Layout'
import { Card, Button } from 'react-bootstrap'

export default function DashboardPage({ token, id, email }) {
  const { user, logout } = useContext(AuthContext)

  return (
    <Layout>
      <Card>
        <Card.Header>
          <h1 className="text-center text-primary">Dashboard</h1>
        </Card.Header>
        <Card.Body>
          <h3>Desde Props:</h3>
          <label className="text-muted">Email</label>
          <p>{email}</p>
          <label className="text-muted">ID</label>
          <p>{id}</p>
          <label className="text-muted">Token</label>
          <p>{token}</p>
          <br></br>
          <Button className="w-100" onClick={logout}>
            Logout
          </Button>
        </Card.Body>
      </Card>

      {/* {user && (
        <>
          <p>{user.email}</p>
          <p>{user._id}</p>
        </> */}
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  if (!req.headers.cookie) {
    return {
      redirect: {
        permanent: false,
        destination: '/account/login',
      },
      props: {},
    }
  }

  const { token } = parseCookie(req)

  console.log('este es el token', token)

  const decoded = await jwt.verify(token, 'top_secret')

  console.log(decoded)

  return {
    props: {
      email: decoded.user.email,
      id: decoded.user._id,
      token,
    },
  }
}
