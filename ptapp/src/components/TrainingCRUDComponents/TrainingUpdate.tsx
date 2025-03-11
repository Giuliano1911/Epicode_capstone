import { Button, Col, Container, Row } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { URL } from '../../config/config'

import TraininWeekResponse from '../../types/TrainingWeeksResponse'
import ExerciseResponse from '../../types/ExerciseResponse'

import DashboardNav from '../DashboardNav'
import FetchError from '../FetchError'
import FetchLoading from '../FetchLoading'
import NotFound from '../NotFound'
import TrainingDay from './TrainingDay'

function TrainingUpdate() {
  const role = localStorage.getItem('roles')
  const token = localStorage.getItem('token')
  const params = useParams()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)
  const [trainingWeek, setTrainingWeek] = useState<TraininWeekResponse>()
  const [exercises, setExercises] = useState<ExerciseResponse[]>([])
  const [isLoadingE, setIsLoadingE] = useState<boolean>(false)
  const [isErrorE, setIsErrorE] = useState<boolean>(false)

  const getTraining = async () => {
    fetch(URL + 'trainingWeek/' + params.id, {
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
      .then((data: TraininWeekResponse) => {
        console.log(data)
        setTrainingWeek(data)
        setIsLoading(false)
      })
      .catch((error) => {
        setIsError(true)
        setIsLoading(false)
        console.log('Error', error)
      })
  }

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
        setIsLoadingE(false)
      })
      .catch((error) => {
        setIsErrorE(true)
        setIsLoadingE(false)
        console.log('Error', error)
      })
  }

  useEffect(() => {
    getTraining()
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
              <Row className=" justify-content-center">
                <Col className=" col-12 text-center mt-3">
                  <h2>{trainingWeek!.name}</h2>
                </Col>
                <Col className=" col-12 d-flex gap-2 mb-3 flex-wrap">
                  <button className="pettorali rounded-pill border-0 px-2 py-1">
                    Pettorali
                  </button>
                  <button className="dorsali rounded-pill border-0 px-2 py-1">
                    Dorsali
                  </button>
                  <button className="spalle rounded-pill border-0 px-2 py-1">
                    Spalle
                  </button>
                  <button className="bicipiti rounded-pill border-0 px-2 py-1">
                    Bicipiti
                  </button>
                  <button className="tricipiti rounded-pill border-0 px-2 py-1">
                    Tricipiti
                  </button>
                  <button className="quadricipiti rounded-pill border-0 px-2 py-1">
                    Quadricipiti
                  </button>
                  <button className="femorali rounded-pill border-0 px-2 py-1">
                    Femorali
                  </button>
                  <button className="glutei rounded-pill border-0 px-2 py-1">
                    Glutei
                  </button>
                </Col>
              </Row>
              {isLoadingE && <FetchLoading />}
              {isErrorE && <FetchError />}
              {!isErrorE && !isLoadingE && (
                <Row>
                  {trainingWeek!.trainingDays.map((t) => {
                    return (
                      <TrainingDay exercises={exercises!} t={t} key={t.id} />
                    )
                  })}
                  <Col className=" col-12">
                    <Button></Button>
                  </Col>
                </Row>
              )}
            </Container>
          )}
        </>
      )}
    </>
  )
}

export default TrainingUpdate
