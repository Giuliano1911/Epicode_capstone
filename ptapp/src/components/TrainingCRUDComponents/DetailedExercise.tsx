import { Card } from 'react-bootstrap'

import DetailedExerciseResponse from '../../types/DetailedExerciseResponse'

interface DetailedExerciseProps {
  e: DetailedExerciseResponse
}

function DetailedExercise({ e }: DetailedExerciseProps) {
  return (
    <Card>
      <Card.Title>{e.exerciseResponse.name}</Card.Title>
    </Card>
  )
}

export default DetailedExercise
