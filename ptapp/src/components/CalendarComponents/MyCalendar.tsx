import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { FormEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { URL } from '../../config/config'

import Calendar from 'react-calendar'
import ReservationResponse from '../../types/ReservationResponse'

import DashboardNav from '../DashboardNav'
import FetchLoading from '../FetchLoading'
import FetchError from '../FetchError'

interface reservationForm {
  customerId: number
  date: string
  time: string
  description: string
}

function MyCalendar() {
  const params = useParams()
  const initialReservationForm = {
    customerId: Number(params.id),
    date: '',
    time: '',
    description: '',
  }
  const navigate = useNavigate()
  const role = localStorage.getItem('roles')
  const token = localStorage.getItem('token')
  const [chosenDate, setChosenDate] = useState<Date>(new Date())
  const [isReservation, setIsReservation] = useState<boolean>(false)
  const [userReservation, setUserReservation] = useState<ReservationResponse>()
  const [isReserved, setIsReserved] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)
  const [resForm, setResForm] = useState<reservationForm>(
    initialReservationForm
  )
  const [alert, setAlert] = useState<boolean>(false)
  const [isForm, setIsForm] = useState<boolean>(false)
  const [isLoadingR, setIsLoadingR] = useState<boolean>(false)
  const [isErrorR, setIsErrorR] = useState<boolean>(false)
  const [dateReservations, setDateReservations] = useState<
    ReservationResponse[]
  >([])
  const appointments = ['10:00', '10:30', '17:00', '17:30', '18:00', '18:30']

  const isDateInRange = (dateToCheck: Date) => {
    const today = new Date()
    return (
      dateToCheck >= today &&
      dateToCheck <= new Date().setDate(today.getDate() + 60)
    )
  }

  const getAllCustomerReservation = async () => {
    fetch(URL + 'reservations/customer/' + params.id, {
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
      .then((data: ReservationResponse[]) => {
        console.log(data)
        if (data[0]) {
          if (data.filter((d) => isDateInRange(new Date(d.date)))) {
            setIsReserved(true)
            setUserReservation(
              data[data.findIndex((d) => isDateInRange(new Date(d.date)))]
            )
          }
        }
        setIsLoading(false)
      })
      .catch((error) => {
        setIsError(true)
        setIsLoading(false)
        console.log('Error', error)
      })
  }

  const handleDayClick = async (e: Date) => {
    setIsForm(false)
    setIsLoadingR(true)
    setChosenDate(e)
    const urlDate = e.toISOString().split('T')[0]
    setResForm({ ...resForm, date: urlDate })
    console.log(e)
    fetch(URL + 'reservations/date/' + urlDate, {
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
      .then((data: ReservationResponse[]) => {
        console.log(data)
        setDateReservations(data)
        setIsLoadingR(false)
      })
      .catch((error) => {
        setIsErrorR(true)
        setIsLoadingR(false)
        console.log('Error', error)
      })
    setIsReservation(true)
  }

  useEffect(() => {
    getAllCustomerReservation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const tileDisabled = ({ date }: { date: Date }) => {
    const day = date.getDay()
    return day === 0 || day === 6
  }

  const allDisabled = ({ date }: { date: Date }) => {
    const day = date.getDay()
    return day != 7
  }

  const handleClick = (e) => {
    setIsForm(true)
    setResForm({ ...resForm, time: e.target.value })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    console.log(resForm)
    try {
      fetch(URL + 'reservations', {
        method: 'POST',
        body: JSON.stringify(resForm),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token!,
        },
      }).then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Post error')
        }
      })
    } catch (error) {
      console.log('Error', error)
    }
    navigate(0)
  }

  const deleteRes = async (id: number) => {
    try {
      fetch(URL + 'reservations/' + id, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + token!,
        },
      }).then((response) => {
        if (response.ok) {
          return null
        } else {
          throw new Error('Cannot delete')
        }
      })
    } catch (error) {
      console.log('Error', error)
    }
    navigate(0)
  }

  return (
    <>
      <DashboardNav role={role!} />
      {isLoading && <FetchLoading />}
      {isError && <FetchError />}
      {!isError && !isLoading && (
        <Container fluid className="mt-5 pt-5">
          <Row>
            <Col className="col-12 mt-4">
              {role!.includes('CUSTOMER') && (
                <>
                  <Calendar
                    minDate={
                      new Date(new Date().setDate(new Date().getDate() + 7))
                    }
                    maxDate={
                      new Date(new Date().setDate(new Date().getDate() + 30))
                    }
                    onClickDay={(e) => handleDayClick(e)}
                    tileDisabled={isReserved ? allDisabled : tileDisabled}
                  />
                </>
              )}
              {role!.includes('PERSONALTRAINER') && (
                <Calendar onClickDay={(e) => handleDayClick(e)} />
              )}
            </Col>
          </Row>
          <Row>
            <Col className="mt-4">
              {isReserved && role!.includes('CUSTOMER') && (
                <>
                  <h3>Hai una prenotazione:</h3>
                  <Card className="rounded-4">
                    <Card.Body>
                      <Card.Title className="d-flex justify-content-between">
                        <div>
                          {userReservation!.date} alle {userReservation!.time}
                        </div>
                        <button
                          className=" border-0 bg-white ms-4"
                          onClick={() => setAlert(true)}
                        >
                          <i className="fas fa-trash-alt text-black h-100"></i>
                        </button>
                      </Card.Title>
                      {alert && (
                        <div>
                          <Alert variant="danger" className="rounded-4 mt-2">
                            Sei sicuro di volerla eliminare?
                          </Alert>
                          <button
                            className="rounded bg-white"
                            onClick={() => deleteRes(userReservation!.id)}
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
                    </Card.Body>
                  </Card>
                </>
              )}
              {isLoadingR && <FetchLoading />}
              {isErrorR && <FetchError />}
              {!isError && !isLoading && isReservation && (
                <>
                  <h2>{chosenDate.toLocaleDateString()}</h2>
                  <h4>Orari disponibili:</h4>
                  {appointments
                    .filter(
                      (a) => !dateReservations.map((d) => d.time).includes(a)
                    )
                    .map((a) => {
                      return (
                        <Button
                          className="submit-button-bw rounded-pill bg-black border-0 greentext text-uppercase me-3"
                          value={a}
                          key={a}
                          onClick={(e) => handleClick(e)}
                        >
                          {a}
                        </Button>
                      )
                    })}
                  {isForm && (
                    <>
                      <h3 className="mt-5">{resForm.time}</h3>
                      <Form onSubmit={(e) => handleSubmit(e)}>
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicMessage"
                        >
                          <Form.Label className="fw-bold">
                            Descrizione appuntamento (facoltativa)
                          </Form.Label>
                          <Form.Control
                            className="py-3"
                            type="text"
                            value={resForm.description}
                            onChange={(e) =>
                              setResForm({
                                ...resForm,
                                description: e.target.value,
                              })
                            }
                          />
                        </Form.Group>
                        <Button
                          type="submit"
                          className="submit-button-bw rounded-pill bg-black border-0 greentext mb-3 mt-2 text-uppercase d-block"
                        >
                          Crea Appuntamento
                        </Button>
                      </Form>
                    </>
                  )}
                  {role!.includes('PERSONALTRAINER') && dateReservations[0] && (
                    <>
                      <h3 className="mt-4">Appuntamenti di oggi:</h3>
                      {dateReservations.map((d) => {
                        return (
                          <Card key={d.id} className="rounded-4 mb-3 ">
                            <Card.Body>
                              <Card.Title className="d-flex justify-content-between">
                                <div>
                                  {d.customerResponse.name}{' '}
                                  {d.customerResponse.surname}
                                </div>
                                <button
                                  className=" border-0 bg-white ms-4"
                                  onClick={() => deleteRes(d.id)}
                                >
                                  <i className="fas fa-trash-alt text-black h-100"></i>
                                </button>
                              </Card.Title>
                              <Card.Title className="">
                                <div>
                                  {d!.date} alle {d!.time}
                                </div>
                                <div>{d.description}</div>
                              </Card.Title>
                            </Card.Body>
                          </Card>
                        )
                      })}
                    </>
                  )}
                </>
              )}
              <Button
                type="button"
                className="rounded-pill bg-white border text-black mb-3 text-uppercase d-block mt-4"
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
  )
}

export default MyCalendar
