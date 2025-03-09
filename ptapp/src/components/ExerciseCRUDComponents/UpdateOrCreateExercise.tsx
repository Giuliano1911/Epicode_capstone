import { FormEvent, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'

import ExerciseResponse from '../../types/ExerciseResponse'

import NotFound from '../NotFound'
import { Button, Col, Container, Form, FormCheck, Row } from 'react-bootstrap'
import DashboardNav from '../DashboardNav'
import FetchLoading from '../FetchLoading'
import FetchError from '../FetchError'

interface UpdateOrRegisterExerciseProps {
  URL: string
  setRestart: React.Dispatch<React.SetStateAction<boolean>>
}

interface RegisterExercise {
  name: string
  description: string
  muscleGroup: string
}

const initialRegister = {
  name: '',
  description: '',
  muscleGroup: '',
}

function UpdateOrCreateExercise({
  URL,
  setRestart,
}: UpdateOrRegisterExerciseProps) {
  const params = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const role = localStorage.getItem('roles')
  const token = localStorage.getItem('token')
  const [register, setRegister] = useState<RegisterExercise>(initialRegister)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)
  const [exercise, setExercise] = useState<ExerciseResponse>()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    console.log(register)
    try {
      fetch(URL + 'exercises', {
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
    console.log(exercise)
    try {
      fetch(URL + 'exercises/' + params.id, {
        method: 'PUT',
        body: JSON.stringify(exercise),
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
    //navigate(-1)
  }

  useEffect(() => {
    if (location.pathname === '/exercises/new') {
      console.log()
    } else {
      fetch(URL + 'exercises/' + params.id, {
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
        .then((data: ExerciseResponse) => {
          console.log(data)
          setExercise(data)
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
                {location.pathname === '/exercises/new' && (
                  <Form onSubmit={handleSubmit} className="mt-5">
                    <Form.Group className="mb-3" controlId="formBasicExName">
                      <Form.Label className=" text-uppercase ms-2 fw-bold">
                        * Nome esercizio
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
                    <Form.Group
                      className="mb-3"
                      controlId="formBasicExDescription"
                    >
                      <Form.Label className=" text-uppercase ms-2 fw-bold">
                        * Descrizione esercizio
                      </Form.Label>
                      <Form.Control
                        className="py-3"
                        type="text"
                        required
                        value={register.description}
                        onChange={(e) =>
                          setRegister({
                            ...register,
                            description: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicExMuscles">
                      <Form.Label className=" text-uppercase ms-2 fw-bold d-block">
                        * Muscoli allenati
                      </Form.Label>
                      <FormCheck
                        inline
                        label="Pettorali"
                        name="group"
                        type="radio"
                        value={'pettorali'}
                        onChange={(e) =>
                          setRegister({
                            ...register,
                            muscleGroup: e.target.value,
                          })
                        }
                      />
                      <FormCheck
                        inline
                        label="Dorsali"
                        name="group"
                        type="radio"
                        value={'dorsali'}
                        onChange={(e) =>
                          setRegister({
                            ...register,
                            muscleGroup: e.target.value,
                          })
                        }
                      />
                      <FormCheck
                        inline
                        label="Spalle"
                        name="group"
                        type="radio"
                        value={'bicipiti'}
                        onChange={(e) =>
                          setRegister({
                            ...register,
                            muscleGroup: e.target.value,
                          })
                        }
                      />
                      <FormCheck
                        inline
                        label="Bicipiti"
                        name="group"
                        type="radio"
                        value={'bicipiti'}
                        onChange={(e) =>
                          setRegister({
                            ...register,
                            muscleGroup: e.target.value,
                          })
                        }
                      />
                      <FormCheck
                        inline
                        label="Tricipiti"
                        name="group"
                        type="radio"
                        value={'tricipiti'}
                        onChange={(e) =>
                          setRegister({
                            ...register,
                            muscleGroup: e.target.value,
                          })
                        }
                      />
                      <FormCheck
                        inline
                        label="Quadricipiti"
                        name="group"
                        type="radio"
                        value={'quadricipiti'}
                        onChange={(e) =>
                          setRegister({
                            ...register,
                            muscleGroup: e.target.value,
                          })
                        }
                      />
                      <FormCheck
                        inline
                        label="Femorali"
                        name="group"
                        type="radio"
                        value={'femorali'}
                        onChange={(e) =>
                          setRegister({
                            ...register,
                            muscleGroup: e.target.value,
                          })
                        }
                      />
                      <FormCheck
                        inline
                        label="Glutei"
                        name="group"
                        type="radio"
                        value={'glutei'}
                        onChange={(e) =>
                          setRegister({
                            ...register,
                            muscleGroup: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Button
                      type="submit"
                      className="submit-button-bw rounded-pill bg-black border-0 greentext mb-5 mt-2 text-uppercase"
                    >
                      Registra
                    </Button>
                  </Form>
                )}
                {location.pathname !== '/exercises/new' && isLoading && (
                  <FetchLoading />
                )}
                {isError && <FetchError />}
                {!isError && !isLoading && (
                  <Form onSubmit={handleSubmit1} className="mt-5">
                    <Form.Group className="mb-3" controlId="formBasicExName">
                      <Form.Label className=" text-uppercase ms-2 fw-bold">
                        * Nome esercizio
                      </Form.Label>
                      <Form.Control
                        className="py-3"
                        type="text"
                        required
                        value={exercise!.name}
                        onChange={(e) =>
                          setExercise({ ...exercise!, name: e.target.value })
                        }
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="formBasicExDescription"
                    >
                      <Form.Label className=" text-uppercase ms-2 fw-bold">
                        * Descrizione esercizio
                      </Form.Label>
                      <Form.Control
                        className="py-3"
                        type="text"
                        required
                        value={exercise!.description}
                        onChange={(e) =>
                          setExercise({
                            ...exercise!,
                            description: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicExMuscles">
                      <Form.Label className=" text-uppercase ms-2 fw-bold d-block">
                        * Muscoli allenati
                      </Form.Label>
                      <FormCheck
                        inline
                        label="Pettorali"
                        name="group"
                        type="radio"
                        value={'pettorali'}
                        checked={exercise!.muscleGroup === 'pettorali'}
                        onChange={(e) =>
                          setExercise({
                            ...exercise!,
                            muscleGroup: e.target.value,
                          })
                        }
                      />
                      <FormCheck
                        inline
                        label="Dorsali"
                        name="group"
                        type="radio"
                        value={'dorsali'}
                        checked={exercise!.muscleGroup === 'dorsali'}
                        onChange={(e) =>
                          setExercise({
                            ...exercise!,
                            muscleGroup: e.target.value,
                          })
                        }
                      />
                      <FormCheck
                        inline
                        label="Spalle"
                        name="group"
                        type="radio"
                        value={'spalle'}
                        checked={exercise!.muscleGroup === 'spalle'}
                        onChange={(e) =>
                          setExercise({
                            ...exercise!,
                            muscleGroup: e.target.value,
                          })
                        }
                      />
                      <FormCheck
                        inline
                        label="Bicipiti"
                        name="group"
                        type="radio"
                        value={'bicipiti'}
                        checked={exercise!.muscleGroup === 'bicipiti'}
                        onChange={(e) =>
                          setExercise({
                            ...exercise!,
                            muscleGroup: e.target.value,
                          })
                        }
                      />
                      <FormCheck
                        inline
                        label="Tricipiti"
                        name="group"
                        type="radio"
                        value={'tricipiti'}
                        checked={exercise!.muscleGroup === 'tricipiti'}
                        onChange={(e) =>
                          setExercise({
                            ...exercise!,
                            muscleGroup: e.target.value,
                          })
                        }
                      />
                      <FormCheck
                        inline
                        label="Quadricipiti"
                        name="group"
                        type="radio"
                        value={'quadricipiti'}
                        checked={exercise!.muscleGroup === 'quadricipiti'}
                        onChange={(e) =>
                          setExercise({
                            ...exercise!,
                            muscleGroup: e.target.value,
                          })
                        }
                      />
                      <FormCheck
                        inline
                        label="Femorali"
                        name="group"
                        type="radio"
                        value={'femorali'}
                        checked={exercise!.muscleGroup === 'femorali'}
                        onChange={(e) =>
                          setExercise({
                            ...exercise!,
                            muscleGroup: e.target.value,
                          })
                        }
                      />
                      <FormCheck
                        inline
                        label="Glutei"
                        name="group"
                        type="radio"
                        value={'glutei'}
                        checked={exercise!.muscleGroup === 'glutei'}
                        onChange={(e) =>
                          setExercise({
                            ...exercise!,
                            muscleGroup: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Button
                      type="submit"
                      className="submit-button-bw rounded-pill bg-black border-0 greentext mb-5 mt-2 text-uppercase"
                    >
                      Modifica
                    </Button>
                  </Form>
                )}
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  )
}

export default UpdateOrCreateExercise
