import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { FormEvent, useState } from 'react'
import { URL } from '../config/config'

import PostLoginResponse from '../types/PostLoginResponse'
import MyNav from './HomepageComponents/MyNav'

interface LoginForm {
  username: string
  password: string
}

const initialLoginForm = {
  username: '',
  password: '',
}

function Login() {
  const navigate = useNavigate()

  const [loginForm, setLoginForm] = useState<LoginForm>(initialLoginForm)
  const [visibility, setVisibility] = useState<boolean>(false)
  const [wrong, setWrong] = useState<boolean>(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      fetch(URL + 'customers/login', {
        method: 'POST',
        body: JSON.stringify(loginForm),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (response.ok) {
            setWrong(false)
            return response.json()
          } else {
            setWrong(true)
            setLoginForm(initialLoginForm)
            throw new Error('Login non riuscito')
          }
        })
        .then((data: PostLoginResponse) => {
          setLoginForm(initialLoginForm)
          localStorage.setItem('token', data.token)
          localStorage.setItem('roles', data.roles[0])
          if (data.roles[0].includes('CUSTOMER')) {
            navigate('/dashboard/' + data.id)
          } else {
            navigate('/users')
          }
        })
    } catch (error) {
      console.log('Error', error)
    }
  }

  return (
    <Container fluid>
      <Row>
        <Col className="px-0 col-12 mb-5">
          <MyNav />
        </Col>
      </Row>
      <Row className=" justify-content-center mt-5">
        <Col className=" col-10">
          <Form className=" mt-5" onSubmit={handleSubmit}>
            <h2 className="fw-bold mb-4 ms-2">Effettua il Login</h2>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label className=" text-uppercase ms-2 fw-bold">
                <i className="fas fa-user"></i> Username
              </Form.Label>
              <Form.Control
                className="py-3"
                type="text"
                required
                value={loginForm.username}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, username: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className=" text-uppercase ms-2 fw-bold">
                <i className="fas fa-lock"></i> Password
              </Form.Label>
              <Form.Control
                className="py-3"
                type={visibility ? 'text' : 'password'}
                required
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, password: e.target.value })
                }
              />
            </Form.Group>
            <div className="d-flex">
              <button
                type="button"
                onClick={() => setVisibility(false)}
                className={
                  visibility
                    ? 'bg-white border border-0 d-block'
                    : 'bg-white border border-0 d-none'
                }
              >
                <i className="fas fa-eye"></i>
                Nascondi Password
              </button>
              <button
                type="button"
                onClick={() => setVisibility(true)}
                className={
                  visibility
                    ? 'bg-white border border-0 d-none'
                    : 'bg-white border border-0 d-block'
                }
              >
                <i className="fas fa-eye-slash"></i>
                Mostra Password
              </button>
              <Button
                type="submit"
                className="submit-button-login rounded-pill border-0 ms-3 px-4 fw-bold"
              >
                EFFETTUA L'ACCESSO
              </Button>
            </div>
            {wrong && (
              <div>
                <Alert variant="danger" className="mt-4">
                  Username o Password errati, ritenta
                </Alert>
                <Button
                  className="border-black bg-white text-black"
                  onClick={() => setWrong(false)}
                >
                  Ok
                </Button>
              </div>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
