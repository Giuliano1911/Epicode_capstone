import { Button, Col, Container, Row } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'

import UserResponse from '../../types/UserResponse'

import DashboardNav from '../DashboardNav'
import NotFound from '../NotFound'
import FetchLoading from '../FetchLoading'
import FetchError from '../FetchError'
import User from './User'

interface UsersProps {
  URL: string
  restart: boolean
  setRestart: React.Dispatch<React.SetStateAction<boolean>>
}

function Users({ URL, restart, setRestart }: UsersProps) {
  const role = localStorage.getItem('roles')
  const token = localStorage.getItem('token')
  const [users, setUsers] = useState<UserResponse[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)
  const [isClicked, setIsClicked] = useState<boolean>(false)

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
        setRestart(false)
      })
      .catch((error) => {
        setIsError(true)
        console.log('Error', error)
      })
  }

  useEffect(() => {
    getUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restart])

  function isDateBeforeNinetyDaysAgo(date: number) {
    if (date) {
      return (
        new Date(date) < new Date(new Date().setDate(new Date().getDate() - 90))
      )
    } else if (!date) {
      return true
    } else {
      return false
    }
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
              <Row>
                <Col className="col-12 col-md-4 mt-4 d-flex flex-column gap-4">
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
                  <Button className="submit-button-login rounded-pill border-0 px-4 fw-bold">
                    NONLOSOO
                  </Button>
                </Col>
                {!isClicked && (
                  <Col className="col-12 col-md-8 d-flex flex-column gap-3 mt-4 border-start border-2 border-black">
                    <h2>Lista utenti</h2>
                    {users.slice(2).map((u) => {
                      return <User u={u} key={u.id} />
                    })}
                  </Col>
                )}
                {isClicked && (
                  <Col className="col-12 col-md-8 d-flex flex-column gap-3 mt-4 border-start border-2 border-black">
                    <h2>Lista utenti</h2>
                    {users
                      .slice(2)
                      .filter((u) =>
                        isDateBeforeNinetyDaysAgo(Date.parse(u.lastPaymentDate))
                      )
                      .map((u) => {
                        return <User u={u} key={u.id} />
                      })}
                  </Col>
                )}
              </Row>
            </Container>
          )}
        </>
      )}
    </>
  )
}

export default Users
