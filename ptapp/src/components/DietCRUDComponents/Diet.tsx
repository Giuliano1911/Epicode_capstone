import { Button, Card } from 'react-bootstrap'
import DietWeekResponse from '../../types/DietWeekResponse'
import { Link } from 'react-router'

interface DietProps {
  d: DietWeekResponse
}

function Diet({ d }: DietProps) {
  return (
    <Card className="rounded-4">
      <Card.Body>
        <Card.Title className="d-flex justify-content-between">
          <div>{d.name}</div>
          <Link to={'/dietWeeks/update/' + d.id}>
            <i className="fas fa-pencil-alt text-black"></i>
          </Link>
        </Card.Title>
        <Link
          className="text-decoration-none text-black"
          to={'/dietWeeks/update/' + d.id}
        >
          <Button className="submit-button-login rounded-pill border-0 px-4 fw-bold mt-2">
            Visualizza Dieta
          </Button>
        </Link>
      </Card.Body>
    </Card>
  )
}

export default Diet
