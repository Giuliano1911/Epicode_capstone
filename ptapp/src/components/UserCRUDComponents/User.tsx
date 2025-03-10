import { Alert, Button, Card } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router'
import { useState } from 'react'
import { URL } from '../../config/config'

import UserResponse from '../../types/UserResponse'

interface UserProps {
  u: UserResponse
  token: string
}

function User({ u, token }: UserProps) {
  const [alert, setAlert] = useState<boolean>(false)
  const navigate = useNavigate()

  const deleteUser = async () => {
    try {
      fetch(URL + 'customers/' + u.id, {
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
    navigate(0)
  }

  return (
    <Card className="rounded-4">
      <Card.Body>
        <Card.Title className="d-flex justify-content-between">
          <div>
            {u.name} {u.surname}
          </div>
          <div className="text-end">
            <Link to={'/users/update/' + u.id}>
              <i className="fas fa-pencil-alt text-black"></i>
            </Link>
            <button
              className=" border-0 bg-white ms-4"
              onClick={() => setAlert(true)}
            >
              <i className="fas fa-trash-alt text-black"></i>
            </button>
            {alert && (
              <div>
                <Alert variant="danger" className="rounded-4 mt-2">
                  Sei sicuro di volerlo eliminare?
                </Alert>
                <button
                  className="rounded bg-white"
                  onClick={() => deleteUser()}
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
          </div>
        </Card.Title>
        <Card.Text className="mb-0">Data di nascita: {u.dateOfBirth}</Card.Text>
        <Card.Text className="mb-0">
          Numero di telefono: {u.phoneNumber}
        </Card.Text>
        <Card.Text>Ultimo pagamento: {u.lastPaymentDate}</Card.Text>
        <Link className="text-decoration-none text-black" to={'/'}>
          <Button className="submit-button-login rounded-pill border-0 px-4 fw-bold mt-2">
            Visualizza Schede
          </Button>
        </Link>
        <Link className="text-decoration-none text-black" to={'/'}>
          <Button className="submit-button-login rounded-pill border-0 px-4 fw-bold ms-2 me-2 mt-2">
            Visualizza Dieta
          </Button>
        </Link>
        <Link
          className="text-decoration-none text-black"
          to={'/users/payment/' + u.id}
        >
          <Button className="submit-button-login rounded-pill border-0 px-4 fw-bold mt-2">
            Aggiorna pagamento
          </Button>
        </Link>
      </Card.Body>
    </Card>
  )
}

export default User
