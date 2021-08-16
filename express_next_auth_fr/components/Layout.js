import React from 'react'
import { Container } from 'react-bootstrap'
import Link from 'next/link'

function Layout({ children }) {
  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center position-relative"
      style={{ minHeight: '100vh', backgroundColor: '#1e588b' }}
    >
      <div className="home-link">
        <Link href="/">
          <p className="white-link"> {'<---'} Inicio</p>
        </Link>
      </div>

      <div className="w-100" style={{ maxWidth: '600px' }}>
        {children}
      </div>
    </Container>
  )
}

export default Layout
