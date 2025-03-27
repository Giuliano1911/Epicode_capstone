import { Button, Card } from 'react-bootstrap'
import TraininWeekResponse from '../../types/TrainingWeeksResponse'
import { Link } from 'react-router'

interface TrainigUserProps {
  t: TraininWeekResponse
}

function TrainingUserList({ t }: TrainigUserProps) {
  return (
    <Card className="rounded-4 scale">
      <Card.Body>
        <Card.Title className="d-flex justify-content-between">
          <div>{t.name}</div>
        </Card.Title>
        <Link
          className="text-decoration-none text-black"
          to={'/training/' + t.id}
        >
          <Button className="submit-button-login rounded-pill border-0 px-4 fw-bold mt-2">
            Visualizza Scheda
          </Button>
        </Link>
      </Card.Body>
    </Card>
  )
}

export default TrainingUserList
