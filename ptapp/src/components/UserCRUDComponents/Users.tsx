import { Button, Col, Container, Row } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'

import DashboardNav from '../DashboardNav'
import NotFound from '../NotFound'
import UserResponse from '../../types/UserResponse'
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
                  <Button className="submit-button-login rounded-pill border-0 px-4 fw-bold">
                    Visualizza pagamenti scaduti
                  </Button>
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
                <Col className="col-12 col-md-8 d-flex flex-column gap-3 mt-4 border-start border-2 border-black">
                  <h2>Lista utenti</h2>
                  {users.slice(2).map((u) => {
                    return <User u={u} key={u.id} />
                  })}
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
