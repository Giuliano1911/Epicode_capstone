import { useLocation, useNavigate, useParams } from 'react-router'
import { useState, FormEvent, useEffect } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { URL } from '../../config/config'

import UserResponse from '../../types/UserResponse'

import DashboardNav from '../DashboardNav'
import FetchLoading from '../FetchLoading'
import FetchError from '../FetchError'
import NotFound from '../NotFound'

interface UpdateOrRegisterUserProps {
  setRestart: React.Dispatch<React.SetStateAction<boolean>>
}

interface RegisterUserForm {
  username: string
  password: string
  name: string
  surname: string
  dateOfBirth: string
  phoneNumber: string
}

const initialRegisterForm = {
  username: '',
  password: '',
  name: '',
  surname: '',
  dateOfBirth: '',
  phoneNumber: '',
}

function UpdateOrRegisterUser({ setRestart }: UpdateOrRegisterUserProps) {
  const params = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const role = localStorage.getItem('roles')
  const token = localStorage.getItem('token')
  const [register, setRegister] =
    useState<RegisterUserForm>(initialRegisterForm)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)
  const [user, setUser] = useState<UserResponse>()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      fetch(URL + 'customers/register', {
        method: 'POST',
        body: JSON.stringify(register),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token!,
        },
      }).then((response) => {
        if (response.ok) {
          setRestart(true)
          return response.json()
        } else {
          throw new Error('Registration error')
        }
      })
    } catch (error) {
      console.log('Error', error)
    }
    navigate(-1)
  }

  const handleSubmit1 = async (e: FormEvent) => {
    e.preventDefault()
    try {
      fetch(URL + 'customers/' + params.id, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token!,
        },
      }).then((response) => {
        if (response.ok) {
          //setRestart(true)
          return response.json()
        } else {
          throw new Error('Update error')
        }
      })
    } catch (error) {
      console.log('Error', error)
    }
    navigate(-1)
  }

  useEffect(() => {
    if (location.pathname === '/users/register') {
      console.log()
    } else {
      fetch(URL + 'customers/' + params.id, {
        headers: {
          Authorization: 'Bearer ' + token!,
        },
      })
        .then((response) => {
          console.log(response)
          if (response.ok) {
            return response.json()
          } else {
            throw new Error('Failed to retrieve data')
          }
        })
        .then((data: UserResponse) => {
          console.log(data)
          setUser(data)
          setIsLoading(false)
        })
        .catch((error) => {
          setIsLoading(false)
          setIsError(true)
          console.log('Error', error)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {role!.includes('CUSTOMER') && <NotFound />}
      {role!.includes('PERSONALTRAINER') && (
        <>
          <DashboardNav role={role!} />
          <Container fluid className="mt-5">
            <Row className=" justify-content-center">
              <Col className="mt-3 col-12 col-md-10 col-lg-8">
                {location.pathname == '/users/register' && (
                  <Form onSubmit={handleSubmit} className="mt-5">
                    <Form.Group className="mb-3" controlId="formBasicUsername">
                      <Form.Label className=" text-uppercase ms-2 fw-bold">
                        * Username
                      </Form.Label>
                      <Form.Control
                        className="py-3"
                        type="text"
                        required
                        value={register.username}
                        onChange={(e) =>
                          setRegister({ ...register, username: e.target.value })
                        }
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label className=" text-uppercase ms-2 fw-bold">
                        * Password
                      </Form.Label>
                      <Form.Control
                        className="py-3"
                        type="text"
                        required
                        value={register.password}
                        onChange={(e) =>
                          setRegister({ ...register, password: e.target.value })
                        }
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicName">
                      <Form.Label className=" text-uppercase ms-2 fw-bold">
                        * Nome
                      </Form.Label>
                      <Form.Control
                        className="py-3"
                        type="text"
                        required
                        value={register.name}
                        onChange={(e) =>
                          setRegister({ ...register, name: e.target.value })
                        }
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicSurname">
                      <Form.Label className=" text-uppercase ms-2 fw-bold">
                        * Cognome
                      </Form.Label>
                      <Form.Control
                        className="py-3"
                        type="text"
                        required
                        value={register.surname}
                        onChange={(e) =>
                          setRegister({ ...register, surname: e.target.value })
                        }
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPhone">
                      <Form.Label className=" text-uppercase ms-2 fw-bold">
                        * Numero di telefono
                      </Form.Label>
                      <Form.Control
                        className="py-3"
                        type="number"
                        maxLength={10}
                        minLength={10}
                        min={0}
                        required
                        value={register.phoneNumber}
                        onChange={(e) =>
                          setRegister({
                            ...register,
                            phoneNumber: e.target.value.toString(),
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicDate">
                      <Form.Label className=" text-uppercase ms-2 fw-bold">
                        * Data di nascita
                      </Form.Label>
                      <Form.Control
                        className="py-3"
                        type="date"
                        required
                        value={register.dateOfBirth}
                        onChange={(e) =>
                          setRegister({
                            ...register,
                            dateOfBirth: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Button
                      type="submit"
                      className="submit-button-bw rounded-pill bg-black border-0 greentext mb-3 mt-2 text-uppercase"
                    >
                      Registra
                    </Button>
                  </Form>
                )}
                {location.pathname !== '/users/register' && isLoading && (
                  <FetchLoading />
                )}
                {isError && <FetchError />}
                {!isError && !isLoading && (
                  <Form onSubmit={handleSubmit1} className="mt-5">
                    <Form.Group className="mb-3" controlId="formBasicName">
                      <Form.Label className=" text-uppercase ms-2 fw-bold">
                        * Nome
                      </Form.Label>
                      <Form.Control
                        className="py-3"
                        type="text"
                        required
                        value={user!.name}
                        onChange={(e) =>
                          setUser({ ...user!, name: e.target.value })
                        }
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicSurname">
                      <Form.Label className=" text-uppercase ms-2 fw-bold">
                        * Cognome
                      </Form.Label>
                      <Form.Control
                        className="py-3"
                        type="text"
                        required
                        value={user!.surname}
                        onChange={(e) =>
                          setUser({ ...user!, surname: e.target.value })
                        }
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPhone">
                      <Form.Label className=" text-uppercase ms-2 fw-bold">
                        * Numero di telefono
                      </Form.Label>
                      <Form.Control
                        className="py-3"
                        type="number"
                        maxLength={10}
                        minLength={10}
                        min={0}
                        required
                        value={user!.phoneNumber}
                        onChange={(e) =>
                          setUser({
                            ...user!,
                            phoneNumber: e.target.value.toString(),
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicDate">
                      <Form.Label className=" text-uppercase ms-2 fw-bold">
                        * Data di nascita
                      </Form.Label>
                      <Form.Control
                        className="py-3"
                        type="date"
                        required
                        value={user!.dateOfBirth}
                        onChange={(e) =>
                          setUser({ ...user!, dateOfBirth: e.target.value })
                        }
                      />
                    </Form.Group>
                    <Button
                      type="submit"
                      className="submit-button-bw rounded-pill bg-black border-0 greentext mb-3 mt-2 text-uppercase"
                    >
                      Modifica
                    </Button>
                  </Form>
                )}
                <Button onClick={() => navigate(-1)}>Torna indietro</Button>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  )
}

export default UpdateOrRegisterUser
