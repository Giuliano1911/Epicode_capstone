import { useEffect, useState } from 'react'
import { Button, Col, Container, Form, FormCheck, Row } from 'react-bootstrap'
import { Link } from 'react-router'
import { URL } from '../../config/config'

import ExerciseResponse from '../../types/ExerciseResponse'

import DashboardNav from '../DashboardNav'
import NotFound from '../NotFound'
import FetchLoading from '../FetchLoading'
import FetchError from '../FetchError'
import Exercise from './Exercise'

function Exercises() {
  const role = localStorage.getItem('roles')
  const token = localStorage.getItem('token')
  const [exercises, setExercises] = useState<ExerciseResponse[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')
  const [muscle, setMuscle] = useState<string>('')

  const getExercises = () => {
    fetch(URL + 'exercises', {
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
      .then((data: ExerciseResponse[]) => {
        console.log(data)
        setExercises(data)
        setIsLoading(false)
      })
      .catch((error) => {
        setIsError(true)
        setIsLoading(false)
        console.log('Error', error)
      })
  }

  useEffect(() => {
    getExercises()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {role!.includes('CUSTOMER') && <NotFound />}
      {role!.includes('PERSONALTRAINER') && (
        <>
          <DashboardNav role={role!} />
          {isLoading && <FetchLoading />}
          {isError && <FetchError />}
          {!isError && !isLoading && (
            <Container fluid className="mt-5 pt-5">
              <Row className="justify-content-around">
                <Col className="col-12 col-md-8 d-flex flex-column gap-3 mt-4 bg-body-tertiary rounded-3 py-3 h-100 gap-3">
                  <h2>Lista esercizi</h2>
                  {exercises
                    .filter((e) =>
                      e.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .filter((e) => e.muscleGroup.includes(muscle))
                    .map((e) => {
                      return <Exercise e={e} token={token!} key={e.id} />
                    })}
                </Col>
                <Col className="col-12 col-md-3 d-flex flex-column gap-3 mt-4 bg-body-tertiary rounded-3 py-3 gap-4 h-100">
                  <h2>Impostazioni</h2>
                  <Link
                    className="text-decoration-none text-black"
                    to={'/exercises/new'}
                  >
                    <Button className="submit-button-login rounded-pill border-0 px-4 fw-bold w-100">
                      Crea nuovo esercizio
                    </Button>
                  </Link>
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicUsername">
                      <Form.Label className="ms-2 fw-bold">
                        Cerca esercizio per nome
                      </Form.Label>
                      <Form.Control
                        className="py-3"
                        type="text"
                        required
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicExMuscles">
                      <Form.Label className="ms-2 fw-bold d-block">
                        Cerca esercizio per muscolo allenato
                      </Form.Label>
                      <FormCheck
                        label="Tutti"
                        name="group"
                        type="radio"
                        value={''}
                        onChange={(e) => setMuscle(e.target.value)}
                      />
                      <FormCheck
                        inline
                        label="Pettorali"
                        name="group"
                        type="radio"
                        value={'pettorali'}
                        onChange={(e) => setMuscle(e.target.value)}
                      />
                      <FormCheck
                        inline
                        label="Dorsali"
                        name="group"
                        type="radio"
                        value={'dorsali'}
                        onChange={(e) => setMuscle(e.target.value)}
                      />
                      <FormCheck
                        inline
                        label="Spalle"
                        name="group"
                        type="radio"
                        value={'bicipiti'}
                        onChange={(e) => setMuscle(e.target.value)}
                      />
                      <FormCheck
                        inline
                        label="Bicipiti"
                        name="group"
                        type="radio"
                        value={'bicipiti'}
                        onChange={(e) => setMuscle(e.target.value)}
                      />
                      <FormCheck
                        inline
                        label="Tricipiti"
                        name="group"
                        type="radio"
                        value={'tricipiti'}
                        onChange={(e) => setMuscle(e.target.value)}
                      />
                      <FormCheck
                        inline
                        label="Quadricipiti"
                        name="group"
                        type="radio"
                        value={'quadricipiti'}
                        onChange={(e) => setMuscle(e.target.value)}
                      />
                      <FormCheck
                        inline
                        label="Femorali"
                        name="group"
                        type="radio"
                        value={'femorali'}
                        onChange={(e) => setMuscle(e.target.value)}
                      />
                      <FormCheck
                        inline
                        label="Glutei"
                        name="group"
                        type="radio"
                        value={'glutei'}
                        onChange={(e) => setMuscle(e.target.value)}
                      />
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
            </Container>
          )}
        </>
      )}
    </>
  )
}

export default Exercises
