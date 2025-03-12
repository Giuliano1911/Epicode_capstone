import { FormEvent, useState } from 'react'
import DetailedFoodResponse from '../../types/DetailedFoodResponse'
import FoodResponse from '../../types/FoodResponse'
import { useNavigate } from 'react-router'
import { URL } from '../../config/config'
import { Alert, Button, Card, Form } from 'react-bootstrap'

interface DetailedFoodProps {
  df: DetailedFoodResponse
  foods: FoodResponse[]
  token: string
}

interface DetailedFoodRegister {
  foodId: number
  quantity: number
}

function DetailedFood({ df, foods, token }: DetailedFoodProps) {
  const detailedFoodState = {
    foodId: df.food.id,
    quantity: df.quantity,
  }

  const [alert, setAlert] = useState<boolean>(false)
  const navigate = useNavigate()
  const [isMod, setIsMod] = useState<boolean>(false)
  const [detailedFood, setDetailedFood] =
    useState<DetailedFoodRegister>(detailedFoodState)

  const deleteDetailedFood = async () => {
    try {
      fetch(URL + 'detailedFood/' + df.id, {
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      fetch(URL + 'detailedFood/' + df.id, {
        method: 'PUT',
        body: JSON.stringify(detailedFood),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token!,
        },
      }).then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Registration error')
        }
      })
    } catch (error) {
      console.log('Error', error)
    }
    navigate(0)
  }

  return (
    <Card className="rounded-3 mb-2">
      <Card.Body>
        <Card.Title className="d-flex justify-content-between">
          {df.food.name}
          <div className="text-end">
            <button
              className="border-0 bg-white"
              onClick={() => setIsMod(true)}
            >
              <i className="fas fa-pencil-alt text-black"></i>
            </button>
            <button
              className="border-0 bg-white ms-2"
              onClick={() => setAlert(true)}
            >
              <i className="fas fa-trash-alt text-black"></i>
            </button>
            {alert && (
              <div>
                <Alert className="rounded-4 mt-2 text-start bg-white border-2 border-black">
                  Sei sicuro di volerlo eliminare?
                </Alert>
                <button
                  className="rounded bg-white"
                  onClick={() => deleteDetailedFood()}
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
        <Card.Text className="mb-0">{df.quantity} grammi</Card.Text>
        {isMod && (
          <Form className="mt-3" onSubmit={(e) => handleSubmit(e)}>
            <Form.Group
              className="mb-3 d-flex flex-column"
              controlId="formBasicFood"
            >
              <Form.Label className=" text-uppercase ms-2 fw-bold">
                * Alimento
              </Form.Label>
              <select
                className="rounded p-3 border border-secondary-subtle"
                value={detailedFood.foodId}
                onChange={(e) => {
                  setDetailedFood({
                    ...detailedFood,
                    foodId: Number(e.target.value),
                  })
                }}
              >
                <option>Seleziona alimento</option>
                {foods!
                  .sort((a, b) => (a.name < b.name ? -1 : 1))
                  .map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name}
                    </option>
                  ))}
              </select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicQuantity">
              <Form.Label className=" text-uppercase ms-2 fw-bold">
                * Quantità (in grammi)
              </Form.Label>
              <Form.Control
                className="py-3"
                type="text"
                min={1}
                max={5000}
                required
                value={detailedFood.quantity || ''}
                onChange={(e) =>
                  setDetailedFood({
                    ...detailedFood,
                    quantity: Number.isFinite(+e.target.value)
                      ? +e.target.value
                      : detailedFood.quantity,
                  })
                }
              />
            </Form.Group>
            <Button
              type="submit"
              className="submit-button-bw rounded-pill bg-black border-0 greentext mb-3 mt-2 text-uppercase"
            >
              Modifica
            </Button>
            <Button
              type="button"
              className="rounded-pill bg-white border text-black mb-3 mt-2 text-uppercase ms-2"
              onClick={() => setIsMod(false)}
            >
              Indietro
            </Button>
          </Form>
        )}
      </Card.Body>
    </Card>
  )
}

export default DetailedFood
