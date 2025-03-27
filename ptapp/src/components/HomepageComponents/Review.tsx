import { Card } from 'react-bootstrap'

import propic from '../assets/propicreview.png'

interface ReviewProps {
  name: string
  text: string
  rating: number
}

function Review({ name, text, rating }: ReviewProps) {
  return (
    <Card className="m-3 rounded-4 bg-body-tertiary">
      <Card.Body>
        <div className=" d-flex justify-content-between">
          <div className=" d-flex">
            <img
              src={propic}
              alt="profile picture"
              className="border border-1 border-black rounded-circle propic  me-2"
            />
            <Card.Title>{name}</Card.Title>
          </div>
          <Card.Text className="mb-4">{rating}/5</Card.Text>
        </div>
        <Card.Text>{text}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Review
