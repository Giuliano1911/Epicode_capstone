import { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
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
              <Row>
                <Col className="col-12 col-md-4 mt-4 d-flex flex-column gap-4">
                  <h2>Impostazioni</h2>
                  <Button className="submit-button-login rounded-pill border-0 px-4 fw-bold">
                    Visualizza pagamenti scaduti
                  </Button>
                  <Link
                    className="text-decoration-none text-black"
                    to={'/exercises/new'}
                  >
                    <Button className="submit-button-login rounded-pill border-0 px-4 fw-bold w-100">
                      Crea nuovo esercizio
                    </Button>
                  </Link>
                  <Button className="submit-button-login rounded-pill border-0 px-4 fw-bold">
                    NONLOSOO
                  </Button>
                </Col>
                <Col className="col-12 col-md-8 d-flex flex-column gap-3 mt-4 border-start border-2 border-black">
                  <h2>Lista esercizi</h2>
                  {exercises.map((e) => {
                    return <Exercise e={e} token={token!} key={e.id} />
                  })}
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
