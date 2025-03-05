import { Card } from 'react-bootstrap'

interface ReviewProps {
  name: string
  text: string
  rating: number
}

function Review({ name, text, rating }: ReviewProps) {
  return (
    <Card className="m-3">
      <Card.Body>
        <div className=" d-flex justify-content-between">
          <Card.Title>{name}</Card.Title>
          <Card.Text className="mb-4">{rating}/5</Card.Text>
        </div>
        <Card.Text>{text}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Review
