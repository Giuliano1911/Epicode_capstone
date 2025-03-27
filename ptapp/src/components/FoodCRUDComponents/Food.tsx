import { Link, useNavigate } from 'react-router'
import { Alert, Button, Card } from 'react-bootstrap'
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
    <Card className="rounded-4 scale">
      <Card.Body>
        <Card.Title className="d-flex justify-content-between">
          <div>{f.name}</div>
          <div className="text-end">
            <Link to={'/aliment/update/' + f.id}>
              <i className="fas fa-pencil-alt text-black"></i>
            </Link>
            <button
              className=" border-0 bg-white ms-4"
              onClick={() => setAlert((prev) => !prev)}
            >
              <i className="fas fa-trash-alt text-black"></i>
            </button>
            {alert && (
              <Alert className="rounded-4 mt-2 d-flex flex-column bg-body-tertiary border-dark-subtle text-black">
                Sei sicuro di volerlo eliminare?
                <div className="mt-2">
                  <Button
                    className="rounded submit-button-login button-width border-0 rounded-pill py-1 fw-bold"
                    onClick={() => deleteFood()}
                  >
                    Si
                  </Button>
                  <Button
                    className="ms-4 rounded submit-button-login button-width border-0 rounded-pill py-1 fw-bold"
                    onClick={() => setAlert(false)}
                  >
                    No
                  </Button>
                </div>
              </Alert>
            )}
          </div>
        </Card.Title>
        <Card.Text>{f.calories} kcal/100g</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Food
