import { useLocation, useNavigate, useParams } from 'react-router'
import { Col, Container, Row, Form, Button } from 'react-bootstrap'
import { FormEvent, useEffect, useState } from 'react'
import { URL } from '../../config/config'

import FoodResponse from '../../types/FoodResponse'

import NotFound from '../NotFound'
import DashboardNav from '../DashboardNav'
import FetchLoading from '../FetchLoading'
import FetchError from '../FetchError'

interface RegisterFood {
  name: string
  calories: number | string
}

const initialRegister = {
  name: '',
  calories: '',
}

function UpdateOrCreatFood() {
  const params = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const role = localStorage.getItem('roles')
  const token = localStorage.getItem('token')
  const [register, setRegister] = useState<RegisterFood>(initialRegister)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)
  const [food, setFood] = useState<FoodResponse>()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    console.log(register)
    try {
      fetch(URL + 'foods', {
        method: 'POST',
        body: JSON.stringify(register),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token!,
        },
      }).then((response) => {
        if (response.ok) {
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
    console.log(food)
    try {
      fetch(URL + 'foods/' + params.id, {
        method: 'PUT',
        body: JSON.stringify(food),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token!,
        },
      }).then((response) => {
        if (response.ok) {
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

  useEffect(() => {
    if (location.pathname === '/aliment/new') {
      console.log()
    } else {
      fetch(URL + 'foods/' + params.id, {
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
        .then((data: FoodResponse) => {
          console.log(data)
          setFood(data)
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
                {location.pathname === '/aliment/new' && (
                  <Form onSubmit={handleSubmit} className="mt-5">
                    <Form.Group className="mb-3" controlId="formBasicFoodName">
                      <Form.Label className=" text-uppercase ms-2 fw-bold">
                        * Nome alimento
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
                    <Form.Group className="mb-3" controlId="formBasicCalories">
                      <Form.Label className=" text-uppercase ms-2 fw-bold">
                        * Calorie per 100 grammi
                      </Form.Label>
                      <Form.Control
                        className="py-3"
                        type="text"
                        min={1}
                        max={900}
                        required
                        value={register.calories || ''}
                        onChange={(e) =>
                          setRegister({
                            ...register,
                            calories: Number.isFinite(+e.target.value)
                              ? +e.target.value
                              : register.calories,
                          })
                        }
                      />
                    </Form.Group>
                    <Button
                      type="submit"
                      className="submit-button-bw rounded-pill bg-black border-0 greentext mt-2 text-uppercase"
                    >
                      Aggiungi
                    </Button>
                  </Form>
                )}
                {location.pathname !== '/aliment/new' && isLoading && (
                  <FetchLoading />
                )}
                {isError && <FetchError />}
                {!isError && !isLoading && (
                  <Form onSubmit={handleSubmit1} className="mt-5">
                    <Form.Group className="mb-3" controlId="formBasicFoodName">
                      <Form.Label className=" text-uppercase ms-2 fw-bold">
                        * Nome alimento
                      </Form.Label>
                      <Form.Control
                        className="py-3"
                        type="text"
                        required
                        value={food!.name}
                        onChange={(e) =>
                          setFood({ ...food!, name: e.target.value })
                        }
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCalories">
                      <Form.Label className=" text-uppercase ms-2 fw-bold">
                        * Calorie per 100 grammi
                      </Form.Label>
                      <Form.Control
                        className="py-3"
                        type="text"
                        min={1}
                        max={900}
                        required
                        value={food!.calories || ''}
                        onChange={(e) =>
                          setFood({
                            ...food!,
                            calories: Number.isFinite(+e.target.value)
                              ? +e.target.value
                              : food!.calories,
                          })
                        }
                      />
                    </Form.Group>
                    <Button
                      type="submit"
                      className="submit-button-bw rounded-pill bg-black border-0 greentext mt-2 text-uppercase"
                    >
                      Modifica
                    </Button>
                  </Form>
                )}
                <Button
                  className="rounded-pill bg-white border text-black my-3 text-uppercase"
                  onClick={() => {
                    navigate(-1)
                  }}
                >
                  <i className="fas fa-caret-left me-2"></i>Torna indietro
                </Button>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  )
}

export default UpdateOrCreatFood
