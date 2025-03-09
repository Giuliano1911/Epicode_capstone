import { Card } from 'react-bootstrap'

import ExerciseResponse from '../../types/ExerciseResponse'
import { Link } from 'react-router'

interface ExerciseProps {
  e: ExerciseResponse
}

function Exercise({ e }: ExerciseProps) {
  return (
    <Card className="rounded-4">
      <Card.Body>
        <Card.Title className="d-flex justify-content-between">
          <div>{e.name}</div>
          <Link to={'/exercises/update/' + e.id}>
            <i className="fas fa-pencil-alt text-black"></i>
          </Link>
        </Card.Title>
        <Card.Text>Muscolo allenato: {e.muscleGroup}</Card.Text>
        <Card.Text className="mb-0">Descrizione: {e.description}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Exercise
