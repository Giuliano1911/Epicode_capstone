import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router'

import TraininWeekResponse from '../../types/TrainingWeeksResponse'

interface TrainingProps {
  t: TraininWeekResponse
}

function Training({ t }: TrainingProps) {
  return (
    <Card className="rounded-4 scale">
      <Card.Body>
        <Card.Title className="d-flex justify-content-between">
          <div>{t.name}</div>
          <Link to={'/trainingWeeks/update/' + t.id}>
            <i className="fas fa-pencil-alt text-black"></i>
          </Link>
        </Card.Title>
        <Link
          className="text-decoration-none text-black"
          to={'/trainingWeeks/update/' + t.id}
        >
          <Button className="submit-button-login rounded-pill border-0 px-4 fw-bold mt-2">
            Visualizza Scheda
          </Button>
        </Link>
      </Card.Body>
    </Card>
  )
}

export default Training
