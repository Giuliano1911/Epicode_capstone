import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { URL } from '../../config/config'
import DietWeekResponse from '../../types/DietWeekResponse'
import FoodResponse from '../../types/FoodResponse'
import DashboardNav from '../DashboardNav'
import FetchLoading from '../FetchLoading'
import FetchError from '../FetchError'
import { Alert, Button, Col, Container, Row } from 'react-bootstrap'
import DietDay from './DietDay'
import NotFound from '../NotFound'

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
                  <h2>{dietWeek!.name}</h2>
                </Col>
              </Row>
              {isLoadingF && <FetchLoading />}
              {isErrorF && <FetchError />}
              {!isErrorF && !isLoadingF && (
                <Row>
                  {dietWeek!.dietDays.map((d) => {
                    return <DietDay foods={foods!} d={d} key={d.id} />
                  })}
                  <Col className=" col-12 mb-3">
                    {alert && (
                      <div className=" col-12 col-md-6 ms-2">
                        <Alert className="rounded-4 mt-2 text-start bg-white border-2 border-black">
                          Sei sicuro di volerla eliminare?
                        </Alert>
                        <button
                          className="rounded bg-white"
                          onClick={() => deleteDiet()}
                        >
                          Si
                        </button>
                        <button
                          className="ms-4 rounded bg-white"
                          onClick={() => setAlert(false)}
                        >
                          No
                        </button>
                      </div>
                    )}
                    <Button
                      className="rounded-pill bg-danger border text-black mt-2 text-uppercase ms-2"
                      onClick={() => setAlert(true)}
                    >
                      Elimina dieta
                    </Button>
                    <Button
                      className="rounded-pill bg-white border text-black mt-2 text-uppercase ms-2"
                      onClick={() => {
                        navigate(-1)
                      }}
                    >
                      <i className="fas fa-caret-left me-2"></i>Torna alla
                      schermata utente
                    </Button>
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

export default DietUpdate
