import { useEffect, useState } from 'react'
import { URL } from '../../config/config'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router'

import FoodResponse from '../../types/FoodResponse'

import DashboardNav from '../DashboardNav'
import NotFound from '../NotFound'
import FetchLoading from '../FetchLoading'
import FetchError from '../FetchError'
import Food from './Food'

function Alimentation() {
  const role = localStorage.getItem('roles')
  const token = localStorage.getItem('token')
  const [foods, setFoods] = useState<FoodResponse[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')

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
        setIsLoading(false)
      })
      .catch((error) => {
        setIsError(true)
        setIsLoading(false)
        console.log('Error', error)
      })
  }

  useEffect(() => {
    getFoods()
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
              <Row className="justify-content-around">
                <Col className="col-12 col-md-8 d-flex flex-column gap-3 mt-4 bg-body-tertiary rounded-3 py-3 h-100 gap-3">
                  <h2>Lista alimenti</h2>
                  {foods
                    .filter((f) =>
                      f.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((f) => {
                      return <Food f={f} token={token!} key={f.id} />
                    })}
                </Col>
                <Col className="col-12 col-md-3 d-flex flex-column gap-3 mt-4 bg-body-tertiary rounded-3 py-3 gap-4 h-100">
                  <h2>Impostazioni</h2>
                  <Link
                    className="text-decoration-none text-black"
                    to={'/aliment/new'}
                  >
                    <Button className="submit-button-login rounded-pill border-0 px-4 fw-bold w-100">
                      Crea nuovo alimento
                    </Button>
                  </Link>
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicUsername">
                      <Form.Label className="ms-2 fw-bold">
                        Cerca alimento per nome
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

export default Alimentation
