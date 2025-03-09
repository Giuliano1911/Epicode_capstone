import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router'

import UserResponse from '../../types/UserResponse'

interface UserProps {
  u: UserResponse
}

function User({ u }: UserProps) {
  return (
    <Card className="rounded-4">
      <Card.Body>
        <Card.Title className="d-flex justify-content-between">
          <div>
            {u.name} {u.surname}
          </div>
          <Link to={'/users/update/' + u.id}>
            <i className="fas fa-pencil-alt text-black"></i>
          </Link>
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
