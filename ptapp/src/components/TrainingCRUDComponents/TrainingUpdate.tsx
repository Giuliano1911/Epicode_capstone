import { Col, Container, Row } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { URL } from '../../config/config'

import TraininWeekResponse from '../../types/TrainingWeeksResponse'

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
        console.log('Error', error)
      })
  }

  useEffect(() => {
    getTraining()
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
                <Col className=" text-center mt-3">
                  <h2>{trainingWeek!.name}</h2>
                </Col>
              </Row>
              <Row>
                {trainingWeek!.trainingDays.map((t) => {
                  return <TrainingDay t={t} key={t.id} />
                })}
              </Row>
            </Container>
          )}
        </>
      )}
    </>
  )
}

export default TrainingUpdate
