import { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import { Form, Button, Card, Alert, FormGroup } from 'react-bootstrap'
import AuthContext from '../../context/authContext'
import Layout from '../../components/Layout'

export default function register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const { register } = useContext(AuthContext)

  const handleSubmit = (e) => {
    e.preventDefault()

    register({ email, password })
  }

  return (
    <Layout>
      <Card>
        <Card.Header>
          <h2 className="text-center text-danger">Sign Up</h2>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <FormGroup className="py-2">
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="py-2">
              <Form.Label htmlFor="password">Contraseña</Form.Label>
              <Form.Control
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="py-2">
              <Form.Label htmlFor="password confirm">
                Confirma contraseña
              </Form.Label>
              <Form.Control
                type="password"
                id="passwordConfirm"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </FormGroup>
            <Button type="submit" value="Registrate" className="w-100 mt-4">
              Sign Up
            </Button>
          </Form>
          <div className="text-small mt-3 d-block">
            <Link href="/account/login">Ya tienes cuenta?</Link>
          </div>
        </Card.Body>
      </Card>
    </Layout>
  )
}
