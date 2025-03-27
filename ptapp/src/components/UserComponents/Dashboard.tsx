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

const formData = new FormData()

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
  const [changed, setChanged] = useState<boolean>(false)
  const [image, setImage] = useState<boolean>(false)

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
    setImage(false)
    formData.delete('profile')
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      formData.append('profile', e.target.files[0])
    }
  }

  const handlePasswordClick = () => {
    setIsPassword(true)
    setImage(false)
  }

  const handleImageClick = () => {
    setIsPassword(false)
    setImage(true)
  }

  const putImage = async (e: FormEvent) => {
    e.preventDefault()
    fetch(URL + 'customers/avatar/' + params.id, {
      method: 'PUT',
      body: formData,
      headers: {
        Authorization: 'Bearer ' + token!,
      },
    })
      .then((response) => {
        if (response.ok) {
          formData.delete('profile')
          return response.json()
        } else {
          throw new Error('no ok')
        }
      })
      .catch((error) => {
        console.log(error)
      })
    navigate(0)
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
            setChanged(true)
            return response.json()
          } else {
            setWrong(true)
            setIsPassword(false)
            throw new Error('Unable to change password')
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
            <Row className=" justify-content-around">
              {isLoadingU && <FetchLoading />}
              {isErrorU && <FetchError />}
              {!isErrorU && !isLoadingU && (
                <Row className="d-flex align-items-center bg-body-tertiary rounded-3 pb-3">
                  <Col className="col-3 mt-4 d-flex justify-content-center">
                    <img
                      className="profileimage rounded-circle border object-fit-cover"
                      src={user!.avatar}
                    />
                  </Col>
                  <Col className="col-9 text-end text-md-start">
                    <h2 className="fs-1">Benvenuto {user!.name}</h2>
                  </Col>
                </Row>
              )}
              <Col className="col-12 col-md-4 d-flex flex-column gap-3 mt-4 bg-body-tertiary rounded-3 py-3 h-100">
                <h2>Le tue schede</h2>
                {isLoading && <FetchLoading />}
                {isError && <FetchError />}
                {!isError &&
                  !isLoading &&
                  trainingWeeks.map((t) => {
                    return <TrainingUserList t={t} key={t.id} />
                  })}
              </Col>
              <Col className="col-12 col-md-4 d-flex flex-column gap-3 mt-4 bg-body-tertiary rounded-3 py-3 h-100">
                <h2>Le tue diete</h2>
                {isLoadingD && <FetchLoading />}
                {isErrorD && <FetchError />}
                {!isErrorD &&
                  !isLoadingD &&
                  dietWeeks.map((d) => {
                    return <DietUserList d={d} key={d.id} />
                  })}
              </Col>
              <Col className="col-12 col-md-3 d-flex flex-column gap-3 mt-4 bg-body-tertiary rounded-3 d-flex flex-column gap-4 py-3 h-100">
                <h2 className=" overflow-hidden">Impostazioni</h2>
                <Button
                  className="submit-button-login rounded-pill border-0 px-4 fw-bold w-100"
                  onClick={() => handlePasswordClick()}
                >
                  Cambia password
                </Button>
                <Button
                  className="submit-button-login rounded-pill border-0 px-4 fw-bold w-100"
                  onClick={() => handleImageClick()}
                >
                  Cambia immagine profilo
                </Button>
                <Button
                  className="submit-button-login rounded-pill border-0 px-4 fw-bold w-100"
                  onClick={() => navigate('/calendar/' + params.id)}
                >
                  Vedi i tuoi appuntamenti
                </Button>
                <Button
                  className="submit-button-login rounded-pill border-0 px-4 fw-bold w-100"
                  onClick={() => navigate('/chat/' + params.id)}
                >
                  Vai alle chat
                </Button>
                {same && (
                  <>
                    <div>
                      <Alert className="rounded-4 mt-2 d-flex flex-column bg-body-tertiary border-dark-subtle text-black">
                        La nuova password non può essere uguale a quella vecchia
                        <Button
                          className="rounded submit-button-login button-width border-0 rounded-pill py-1 fw-bold mt-2"
                          onClick={() => handleSame()}
                        >
                          Ok
                        </Button>
                      </Alert>
                    </div>
                  </>
                )}
                {wrong && (
                  <>
                    <div>
                      <Alert className="rounded-4 mt-2 d-flex flex-column bg-body-tertiary border-dark-subtle text-black">
                        La vecchia password non è corretta, assicurati di non
                        avere CAPS LOCK attivo
                        <Button
                          className="rounded submit-button-login button-width border-0 rounded-pill py-1 fw-bold mt-2"
                          onClick={() => handleWrong()}
                        >
                          Ok
                        </Button>
                      </Alert>
                    </div>
                  </>
                )}
                {changed && (
                  <>
                    <div>
                      <hr />
                      <Alert className="submit-button-login border-0 px-4 fw-bold w-100">
                        Password cambiata con successo
                      </Alert>
                      <Button
                        className="border-black bg-white text-black"
                        onClick={() => setChanged(false)}
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
                            ? ' bg-transparent border border-0 d-block'
                            : ' bg-transparent border border-0 d-none'
                        }
                      >
                        <i className="fas fa-eye me-2"></i>
                        Nascondi le Password
                      </button>
                      <button
                        type="button"
                        onClick={() => setVisibility(true)}
                        className={
                          visibility
                            ? ' bg-transparent border border-0 d-none'
                            : ' bg-transparent border border-0 d-block'
                        }
                      >
                        <i className="fas fa-eye-slash me-2"></i>
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
                      type="button"
                      className="rounded-pill bg-white border mt-3 text-black text-uppercase"
                      onClick={() => {
                        handleBack()
                      }}
                    >
                      <i className="fas fa-chevron-up"></i> Chiudi
                    </Button>
                  </Form>
                )}
                {image && (
                  <Form
                    onSubmit={(e) => {
                      putImage(e)
                    }}
                  >
                    <Form.Group className="mb-3">
                      <Form.Label className="mb-0">
                        Carica l'immagine
                      </Form.Label>
                      <Form.Control
                        className="form border-dark "
                        type="file"
                        placeholder="Scegi immagine"
                        onChange={(e) => {
                          handleFileChange(
                            e as React.ChangeEvent<HTMLInputElement>
                          )
                        }}
                      />
                    </Form.Group>
                    <Button
                      type="submit"
                      className="submit-button-bw rounded-pill me-2 bg-black border-0 greentext text-uppercase"
                      onClick={() => console.log()}
                    >
                      Salva
                    </Button>
                    <Button
                      type="button"
                      className="rounded-pill bg-white border text-black text-uppercase"
                      onClick={() => {
                        handleBack()
                      }}
                    >
                      <i className="fas fa-chevron-up"></i> Chiudi
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

export default Dashboard
