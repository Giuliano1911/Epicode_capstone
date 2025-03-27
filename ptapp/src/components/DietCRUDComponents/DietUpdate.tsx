import { Alert, Button, Col, Container, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { URL } from '../../config/config'

import DietWeekResponse from '../../types/DietWeekResponse'
import FoodResponse from '../../types/FoodResponse'

import DashboardNav from '../DashboardNav'
import FetchLoading from '../FetchLoading'
import FetchError from '../FetchError'
import DietDay from './DietDay'

function DietUpdate() {
  const role = localStorage.getItem('roles')
  const token = localStorage.getItem('token')
  const params = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)
  const [dietWeek, setDietWeek] = useState<DietWeekResponse>()
  const [foods, setFoods] = useState<FoodResponse[]>([])
  const [isLoadingF, setIsLoadingF] = useState<boolean>(false)
  const [isErrorF, setIsErrorF] = useState<boolean>(false)
  const [alert, setAlert] = useState<boolean>(false)

  const getDiet = async () => {
    fetch(URL + 'dietWeeks/' + params.id, {
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
      .then((data: DietWeekResponse) => {
        console.log(data)
        setDietWeek(data)
        setIsLoading(false)
      })
      .catch((error) => {
        setIsError(true)
        setIsLoading(false)
        console.log('Error', error)
      })
  }

  const getFoods = () => {
    fetch(URL + 'foods', {
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
      .then((data: FoodResponse[]) => {
        console.log(data)
        setFoods(data)
        setIsLoadingF(false)
      })
      .catch((error) => {
        setIsErrorF(true)
        setIsLoadingF(false)
        console.log('Error', error)
      })
  }

  useEffect(() => {
    getDiet()
    getFoods()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const deleteDiet = async () => {
    try {
      fetch(URL + 'dietWeeks/' + params.id, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + token!,
        },
      }).then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Cannot delete')
        }
      })
    } catch (error) {
      console.log('Error', error)
    }
    navigate(-1)
  }

  return (
    <>
      <DashboardNav role={role!} />
      {isLoading && <FetchLoading />}
      {isError && <FetchError />}
      {!isError && !isLoading && (
        <Container fluid className="mt-5 pt-5">
          <Row className=" justify-content-center">
            <Col className=" col-12 text-center py-5 bg-body-tertiary">
              <h2 className="fs-1 text-uppercase ">{dietWeek!.name}</h2>
            </Col>
          </Row>
          {isLoadingF && <FetchLoading />}
          {isErrorF && <FetchError />}
          {!isErrorF && !isLoadingF && (
            <Row className="mt-3">
              {dietWeek!.dietDays.map((d) => {
                return <DietDay foods={foods!} d={d} key={d.id} />
              })}
              <Col className=" col-12 mb-3">
                {alert && (
                  <Alert className="rounded-4 mt-2 d-flex flex-column bg-body-tertiary border-dark-subtle text-black fw-bold">
                    Sei sicuro di volerlo eliminare?
                    <div className="mt-2">
                      <Button
                        className="rounded submit-button-login button-width border-0 rounded-pill py-1 fw-bold"
                        onClick={() => deleteDiet()}
                      >
                        Si
                      </Button>
                      <Button
                        className="ms-4 rounded submit-button-login button-width border-0 rounded-pill py-1 fw-bold"
                        onClick={() => setAlert(false)}
                      >
                        No
                      </Button>
                    </div>
                  </Alert>
                )}
                {role!.includes('PERSONALTRAINER') && (
                  <Button
                    className="rounded-pill submit-button-bw bg-black greentext text-black mt-2 text-uppercase ms-2"
                    onClick={() => setAlert((prev) => !prev)}
                  >
                    Elimina dieta
                  </Button>
                )}
                <Button
                  className="rounded-pill bg-white border text-black mt-2 text-uppercase ms-2"
                  onClick={() => {
                    navigate(-1)
                  }}
                >
                  <i className="fas fa-caret-left me-2"></i>Torna alla schermata
                  utente
                </Button>
              </Col>
            </Row>
          )}
        </Container>
      )}
    </>
  )
}

export default DietUpdate
