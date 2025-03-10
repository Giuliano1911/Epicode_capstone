import { FormEvent, useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router'
import { URL } from '../../config/config'

import UserResponse from '../../types/UserResponse'

import DashboardNav from '../DashboardNav'
import NotFound from '../NotFound'
import FetchLoading from '../FetchLoading'
import FetchError from '../FetchError'

interface PaymentProps {
  setRestart: React.Dispatch<React.SetStateAction<boolean>>
}

interface PaymentForm {
  lastPaymentDate: string
}

const initialPaymentForm = {
  lastPaymentDate: '',
}

function Payment({ setRestart }: PaymentProps) {
  const [date, setDate] = useState<PaymentForm>(initialPaymentForm)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)
  const role = localStorage.getItem('roles')
  const token = localStorage.getItem('token')
  const params = useParams()
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      fetch(URL + 'customers/lastPaymentDate/' + params.id, {
        method: 'PUT',
        body: JSON.stringify(date),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token!,
        },
      }).then((response) => {
        if (response.ok) {
          setRestart(true)
          return response.json()
        } else {
          throw new Error('Registration error')
        }
      })
    } catch (error) {
      console.log('Error', error)
    }
    navigate(-1)
  }

  useEffect(
    () => {
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
          if (data.lastPaymentDate) {
            setDate(data)
          }
          setIsLoading(false)
        })
        .catch((error) => {
          setIsLoading(false)
          setIsError(true)
          console.log('Error', error)
        })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return (
    <>
      {role!.includes('CUSTOMER') && <NotFound />}
      {role!.includes('PERSONALTRAINER') && (
        <>
          <DashboardNav role={role!} />
          {isLoading && <FetchLoading />}
          {isError && <FetchError />}
          {!isError && !isLoading && (
            <Container fluid className="mt-5">
              <Row className=" justify-content-center">
                <Col className="mt-3 col-12 col-md-10 col-lg-8">
                  <Form onSubmit={handleSubmit} className="mt-5">
                    <Form.Group className="mb-3" controlId="formBasicDate">
                      <Form.Label className=" text-uppercase ms-2 fw-bold">
                        * Data dell'ultimo pagamento
                      </Form.Label>
                      <Form.Control
                        className="py-3"
                        type="date"
                        required
                        value={date.lastPaymentDate}
                        onChange={(e) =>
                          setDate({ lastPaymentDate: e.target.value })
                        }
                      />
                    </Form.Group>
                    <Button
                      type="submit"
                      className="submit-button-bw rounded-pill bg-black border-0 greentext mb-5 mt-2 text-uppercase"
                    >
                      Aggiungi
                    </Button>
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

export default Payment
