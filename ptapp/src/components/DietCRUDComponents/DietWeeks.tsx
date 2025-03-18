import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { FormEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { URL } from '../../config/config'

import DietWeekResponse from '../../types/DietWeekResponse'

import NotFound from '../NotFound'
import DashboardNav from '../DashboardNav'
import FetchLoading from '../FetchLoading'
import FetchError from '../FetchError'
import Diet from './Diet'

function DietWeeks() {
  const role = localStorage.getItem('roles')
  const token = localStorage.getItem('token')
  const params = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)
  const [dietName, setDietName] = useState<string>('')
  const [isNew, setIsNew] = useState<boolean>(false)
  const [dietWeeks, setDietWeeks] = useState<DietWeekResponse[]>([])

  const getDietWeeks = async () => {
    fetch(URL + 'dietWeeks/customer/' + params.id, {
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
      .then((data: DietWeekResponse[]) => {
        console.log(data)
        setDietWeeks(data)
        setIsLoading(false)
      })
      .catch((error) => {
        setIsError(true)
        setIsLoading(false)
        console.log('Error', error)
      })
  }

  useEffect(() => {
    getDietWeeks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsNew(false)
    try {
      fetch(URL + 'dietWeeks/' + params.id, {
        method: 'POST',
        body: JSON.stringify(dietName),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token!,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json()
          } else {
            throw new Error('Creation error')
          }
        })
        .then((response: DietWeekResponse) => {
          console.log(response)
        })
    } catch (error) {
      console.log('Error', error)
    }
    navigate(0)
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
              <Row className="justify-content-around">
                <Col className="col-12 col-md-8 d-flex flex-column gap-3 mt-4 bg-body-tertiary rounded-3 py-3 h-100 gap-3">
                  {dietWeeks[0] ? (
                    <h2>Diete di {dietWeeks[0].customerResponse.name}</h2>
                  ) : (
                    <h2>Ancora non ci sono diete</h2>
                  )}
                  {dietWeeks.map((d) => {
                    return <Diet d={d} key={d.id} />
                  })}
                </Col>
                <Col className="col-12 col-md-3 d-flex flex-column gap-3 mt-4 bg-body-tertiary rounded-3 py-3 gap-4 h-100">
                  <h2>Impostazioni</h2>
                  <Button
                    className="submit-button-login rounded-pill border-0 px-4 fw-bold w-100"
                    onClick={() => setIsNew(true)}
                  >
                    Crea nuova dieta
                  </Button>
                  {isNew && (
                    <Form onSubmit={(e) => handleSubmit(e)}>
                      <Form.Group className="mb-3" controlId="formBasicTrname">
                        <Form.Label className="ms-2 fw-bold">
                          Nome della nuova dieta
                        </Form.Label>
                        <Form.Control
                          className="py-3"
                          type="text"
                          required
                          value={dietName}
                          onChange={(e) => setDietName(e.target.value)}
                        />
                      </Form.Group>
                      <Button
                        type="submit"
                        className="submit-button-bw rounded-pill bg-black border-0 greentext mb-3 mt-2 text-uppercase"
                      >
                        Crea
                      </Button>
                    </Form>
                  )}
                  <Button
                    className="rounded-pill bg-white border text-black text-uppercase"
                    onClick={() => {
                      navigate(-1)
                    }}
                  >
                    <i className="fas fa-caret-left me-2"></i>Torna indietro
                  </Button>
                </Col>
              </Row>
            </Container>
          )}
        </>
      )}
    </>
  )
}

export default DietWeeks
