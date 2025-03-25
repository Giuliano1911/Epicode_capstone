import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { URL } from '../../config/config'

import UserResponse from '../../types/UserResponse'

import DashboardNav from '../DashboardNav'
import NotFound from '../NotFound'
import FetchLoading from '../FetchLoading'
import FetchError from '../FetchError'
import User from './User'

function Users() {
  const role = localStorage.getItem('roles')
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const [users, setUsers] = useState<UserResponse[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)
  const [isClicked, setIsClicked] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')

  const getUsers = async () => {
    fetch(URL + 'customers', {
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
      .then((data: UserResponse[]) => {
        console.log(data)
        setUsers(data)
        setIsLoading(false)
      })
      .catch((error) => {
        setIsError(true)
        setIsLoading(false)
        console.log('Error', error)
      })
  }

  useEffect(() => {
    getUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function isDateBeforeNinetyDaysAgo(date: number) {
    if (date) {
      return (
        new Date(date) < new Date(new Date().setDate(new Date().getDate() - 90))
      )
    } else return !date
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
                {!isClicked && (
                  <Col className="col-12 col-md-8 d-flex flex-column gap-3 mt-4 bg-body-tertiary rounded-3 py-3 h-100">
                    <h2>Lista utenti</h2>
                    {users
                      .slice(2)
                      .filter((u) =>
                        u.surname.toLowerCase().includes(search.toLowerCase())
                      )
                      .map((u) => {
                        return <User u={u} key={u.id} token={token!} />
                      })}
                  </Col>
                )}
                {isClicked && (
                  <Col className="col-12 col-md-8 d-flex flex-column gap-3 mt-4 bg-body-tertiary rounded-3 py-3 h-100">
                    <h2>Lista utenti</h2>
                    {users
                      .slice(2)
                      .filter((u) =>
                        isDateBeforeNinetyDaysAgo(Date.parse(u.lastPaymentDate))
                      )
                      .filter((u) =>
                        u.surname.toLowerCase().includes(search.toLowerCase())
                      )
                      .map((u) => {
                        return <User u={u} key={u.id} token={token!} />
                      })}
                  </Col>
                )}
                <Col className="col-12 col-md-3 d-flex flex-column gap-3 mt-4 bg-body-tertiary rounded-3 py-3 gap-4 h-100">
                  <h2>Impostazioni</h2>
                  {!isClicked && (
                    <Button
                      className="submit-button-login rounded-pill border-0 px-4 fw-bold"
                      onClick={() => setIsClicked(true)}
                    >
                      Visualizza pagamenti scaduti
                    </Button>
                  )}
                  {isClicked && (
                    <Button
                      className="submit-button-login rounded-pill border-0 px-4 fw-bold"
                      onClick={() => setIsClicked(false)}
                    >
                      Visualizza tutti gli utenti
                    </Button>
                  )}
                  <Link
                    className="text-decoration-none text-black"
                    to={'/users/register'}
                  >
                    <Button className="submit-button-login rounded-pill border-0 px-4 fw-bold w-100">
                      Crea nuovo utente
                    </Button>
                  </Link>
                  <Button
                    className="submit-button-login rounded-pill border-0 px-4 fw-bold w-100"
                    onClick={() => navigate('/chat/2')}
                  >
                    Vai alle chat
                  </Button>
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicSurname">
                      <Form.Label className="ms-2 fw-bold">
                        Cerca utente per cognome
                      </Form.Label>
                      <Form.Control
                        className="py-3"
                        type="text"
                        required
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
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

export default Users
