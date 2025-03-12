import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router'
import { FormEvent, useEffect, useState } from 'react'
import { URL } from '../../config/config'

import DietWeekResponse from '../../types/DietWeekResponse'
import TraininWeekResponse from '../../types/TrainingWeeksResponse'
import UserResponse from '../../types/UserResponse'

import DashboardNav from '../DashboardNav'
import NotFound from '../NotFound'
import FetchLoading from '../FetchLoading'
import FetchError from '../FetchError'
import TrainingUserList from './TrainingUserList'
import DietUserList from './DietUserList'

interface ChangePassword {
  oldPassword: string
  password: string
}

const initialchangePasswordState = {
  oldPassword: '',
  password: '',
}

function Dashboard() {
  const role = localStorage.getItem('roles')
  const token = localStorage.getItem('token')
  const params = useParams()
  const navigate = useNavigate()
  const [trainingWeeks, setTrainingWeeks] = useState<TraininWeekResponse[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)
  const [dietWeeks, setDietWeeks] = useState<DietWeekResponse[]>([])
  const [isLoadingD, setIsLoadingD] = useState<boolean>(true)
  const [isErrorD, setIsErrorD] = useState<boolean>(false)
  const [user, setUser] = useState<UserResponse>()
  const [isLoadingU, setIsLoadingU] = useState<boolean>(true)
  const [isErrorU, setIsErrorU] = useState<boolean>(false)
  const [isPassword, setIsPassword] = useState<boolean>(false)
  const [newPassword, setNewPassword] = useState<ChangePassword>(
    initialchangePasswordState
  )
  const [visibility, setVisibility] = useState<boolean>(false)
  const [wrong, setWrong] = useState<boolean>(false)
  const [same, setSame] = useState<boolean>(false)

  const getTrainings = async () => {
    fetch(URL + 'trainingWeek/customer/' + params.id, {
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
      .then((data: TraininWeekResponse[]) => {
        console.log(data)
        setTrainingWeeks(data)
        setIsLoading(false)
      })
      .catch((error) => {
        setIsError(true)
        setIsLoading(false)
        console.log('Error', error)
      })
  }

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
        setIsLoadingD(false)
      })
      .catch((error) => {
        setIsErrorD(true)
        setIsLoadingD(false)
        console.log('Error', error)
      })
  }

  const getUser = async () => {
    fetch(URL + 'customers/' + params.id, {
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
      .then((data: UserResponse) => {
        console.log(data)
        setUser(data)
        setIsLoadingU(false)
      })
      .catch((error) => {
        setIsErrorU(true)
        setIsErrorU(false)
        console.log('Error', error)
      })
  }

  useEffect(() => {
    getTrainings()
    getDietWeeks()
    getUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleBack = () => {
    setNewPassword(initialchangePasswordState)
    setVisibility(false)
    setIsPassword(false)
  }

  const handleSame = () => {
    setNewPassword(initialchangePasswordState)
    setVisibility(false)
    setSame(false)
  }

  const handleWrong = () => {
    setNewPassword(initialchangePasswordState)
    setVisibility(false)
    setWrong(false)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (newPassword.oldPassword === newPassword.password) {
      setSame(true)
      setIsPassword(false)
    } else {
      try {
        fetch(URL + 'customers/password/' + params.id, {
          method: 'PUT',
          body: JSON.stringify(newPassword),
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token!,
          },
        }).then((response) => {
          if (response.ok) {
            setNewPassword(initialchangePasswordState)
            setIsPassword(false)
            return response.json()
          } else {
            setWrong(true)
            setIsPassword(false)
            throw new Error('Registration error')
          }
        })
      } catch (error) {
        console.log('Error', error)
      }
    }
  }

  return (
    <>
      {role!.includes('PERSONALTRAINER') && <NotFound />}
      {role!.includes('CUSTOMER') && (
        <>
          <DashboardNav role={role!} />
          <Container fluid className="mt-5 pt-5">
            <Row>
              {isLoadingU && <FetchLoading />}
              {isErrorU && <FetchError />}
              {!isErrorU && !isLoadingU && (
                <Row>
                  <Col className="col-12 mt-4">
                    <h2 className="fs-1">Benvenuto {user!.name}</h2>
                  </Col>
                </Row>
              )}
              <Col className="col-12 col-md-4 mt-4 d-flex flex-column gap-4">
                <h2>Impostazioni</h2>
                <Button
                  className="submit-button-login rounded-pill border-0 px-4 fw-bold w-100"
                  onClick={() => setIsPassword(true)}
                >
                  Cambia password
                </Button>
                <Button
                  className="submit-button-login rounded-pill border-0 px-4 fw-bold w-100"
                  onClick={() => navigate('')}
                >
                  Cambia immagine profilo
                </Button>
                {same && (
                  <>
                    <div>
                      <Alert variant="danger">
                        La vecchia password non può essere uguale a quella nuova
                      </Alert>
                      <Button
                        className="border-black bg-white text-black"
                        onClick={() => handleSame()}
                      >
                        Ok
                      </Button>
                    </div>
                  </>
                )}
                {wrong && (
                  <>
                    <div>
                      <Alert variant="danger">
                        La vecchia password non è corretta, assicurati di non
                        avere CAPS LOCK attivo
                      </Alert>
                      <Button
                        className="border-black bg-white text-black"
                        onClick={() => handleWrong()}
                      >
                        Ok
                      </Button>
                    </div>
                  </>
                )}
                {isPassword && (
                  <Form onSubmit={(e) => handleSubmit(e)}>
                    <Form.Group
                      className="mb-3"
                      controlId="formBasicOldPassword"
                    >
                      <Form.Label className="ms-2 fw-bold">
                        Vecchia password
                      </Form.Label>
                      <Form.Control
                        className="py-3"
                        type={visibility ? 'text' : 'password'}
                        required
                        value={newPassword.oldPassword}
                        onChange={(e) =>
                          setNewPassword({
                            ...newPassword,
                            oldPassword: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label className="ms-2 fw-bold">
                        Nuova password
                      </Form.Label>
                      <Form.Control
                        className="py-3"
                        type={visibility ? 'text' : 'password'}
                        required
                        value={newPassword.password}
                        onChange={(e) =>
                          setNewPassword({
                            ...newPassword,
                            password: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <div className="d-flex">
                      <button
                        type="button"
                        onClick={() => setVisibility(false)}
                        className={
                          visibility
                            ? 'bg-white border border-0 d-block'
                            : 'bg-white border border-0 d-none'
                        }
                      >
                        <i className="fas fa-eye"></i>
                        Nascondi le Password
                      </button>
                      <button
                        type="button"
                        onClick={() => setVisibility(true)}
                        className={
                          visibility
                            ? 'bg-white border border-0 d-none'
                            : 'bg-white border border-0 d-block'
                        }
                      >
                        <i className="fas fa-eye-slash"></i>
                        Mostra le Password
                      </button>
                    </div>
                    <Button
                      type="submit"
                      className="submit-button-bw rounded-pill mt-3 me-2 bg-black border-0 greentext text-uppercase"
                    >
                      Cambia password
                    </Button>
                    <Button
                      className="rounded-pill bg-white border mt-3 text-black text-uppercase"
                      onClick={() => {
                        handleBack()
                      }}
                    >
                      <i className="fas fa-caret-left me-2"></i>Torna indietro
                    </Button>
                  </Form>
                )}
              </Col>
              <Col className="col-12 col-md-4 d-flex flex-column gap-3 mt-4 border-start border-2 border-black">
                <h2>Le tue schede</h2>
                {isLoading && <FetchLoading />}
                {isError && <FetchError />}
                {!isError &&
                  !isLoading &&
                  trainingWeeks.map((t) => {
                    return <TrainingUserList t={t} key={t.id} />
                  })}
              </Col>
              <Col className="col-12 col-md-4 d-flex flex-column gap-3 mt-4 border-start border-2 border-black">
                <h2>Le tue diete</h2>
                {isLoadingD && <FetchLoading />}
                {isErrorD && <FetchError />}
                {!isErrorD &&
                  !isLoadingD &&
                  dietWeeks.map((d) => {
                    return <DietUserList d={d} key={d.id} />
                  })}
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  )
}

export default Dashboard
