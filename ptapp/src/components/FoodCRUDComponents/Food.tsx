import { Link, useNavigate } from 'react-router'
import { Alert, Card } from 'react-bootstrap'
import { useState } from 'react'
import { URL } from '../../config/config'

import FoodResponse from '../../types/FoodResponse'

interface FoodProps {
  f: FoodResponse
  token: string
}

function Food({ f, token }: FoodProps) {
  const [alert, setAlert] = useState<boolean>(false)
  const navigate = useNavigate()

  const deleteFood = async () => {
    try {
      fetch(URL + 'foods/' + f.id, {
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
          <div>{f.name}</div>
          <div className="text-end">
            <Link to={'/aliment/update/' + f.id}>
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
                  onClick={() => deleteFood()}
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
        <Card.Text>Calorie per 100 grammi: {f.calories}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Food
