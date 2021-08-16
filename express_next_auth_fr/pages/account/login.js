import { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import { Form, Button, Card, Alert, FormGroup } from 'react-bootstrap'
import Layout from '../../components/Layout'
import AuthContext from '../../context/authContext'

export default function login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { login } = useContext(AuthContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    login({ email, password })
  }

  return (
    <Layout>
      <Card className="w-100">
        <Card.Header>
          <h2 className="text-danger text-center">Login</h2>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>

            <Button type="submit" value="Login" className="w-100 mt-4">
              Login
            </Button>
          </Form>
          <div className="text-small mt-3 d-block">
            <Link href="/account/register">Aun no tienes cuenta?</Link>
          </div>
        </Card.Body>
      </Card>
    </Layout>
  )
}
