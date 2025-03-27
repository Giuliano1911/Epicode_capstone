import { Card, Col } from 'react-bootstrap'

import DietDayResponse from '../../types/DietDayResponse'
import FoodResponse from '../../types/FoodResponse'

import Meal from './Meal'

interface DietDayProps {
  d: DietDayResponse
  foods: FoodResponse[]
}

function DietDay({ d, foods }: DietDayProps) {
  return (
    <Col className="col-12 col-md-6 mb-4">
      <Card className="rounded-4 h-100 border-0 bg-body-tertiary">
        <Card.Body>
          <Card.Title className="d-flex justify-content-between fs-2">
            {d.day}
          </Card.Title>
          {d.meals.map((m) => {
            return <Meal d={d} m={m} foods={foods} key={m.id} />
          })}
        </Card.Body>
      </Card>
    </Col>
  )
}

export default DietDay
