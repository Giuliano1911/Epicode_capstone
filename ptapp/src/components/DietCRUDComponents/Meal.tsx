import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router'
import { Button, Card, Form } from 'react-bootstrap'
import { URL } from '../../config/config'

import DietDayResponse from '../../types/DietDayResponse'
import FoodResponse from '../../types/FoodResponse'
import MealResponse from '../../types/MealResponse'

import DetailedFood from './DetailedFood'

interface DietDayProps {
  d: DietDayResponse
  m: MealResponse
  foods: FoodResponse[]
}

interface DetailedFoodRegister {
  foodId: number | string
  quantity: number | string
}

const initialRegisterState = {
  foodId: '',
  quantity: '',
}

function Meal({ d, m, foods }: DietDayProps) {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('roles')
  const navigate = useNavigate()
  const [isAdd, setIsAdd] = useState<boolean>(false)
  const [detailedFood, setDetailedFood] =
    useState<DetailedFoodRegister>(initialRegisterState)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      fetch(URL + 'detailedFood/' + m.id + '/' + d.id, {
        method: 'POST',
        body: JSON.stringify(detailedFood),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token!,
        },
      }).then((response) => {
        if (response.ok) {
          setDetailedFood(initialRegisterState)
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

  const handleBack = () => {
    setIsAdd(false)
    setDetailedFood(initialRegisterState)
  }

  return (
    <Card className=" border-bottom-0 border-start-0 border-end-0 border-top border-2 rounded-0 py-2  bg-body-tertiary">
      <Card.Title className=" d-flex justify-content-between">
        {m.name}
        <div>
          {m.detailedFoods.reduce(
            (acc, df) => acc + (df.food.calories * df.quantity) / 100,
            0
          )}{' '}
          calorie
        </div>
      </Card.Title>
      {m.detailedFoods.map((df) => {
        return (
          <DetailedFood
            df={df}
            foods={foods}
            token={token!}
            role={role!}
            key={df.id}
          />
        )
      })}
      {role!.includes('PERSONALTRAINER') && (
        <button
          className="d-flex align-items-center border-0  bg-body-tertiary"
          onClick={() => {
            setIsAdd(true)
          }}
        >
          <i className="fas fa-plus me-2"></i>
          <p className="fw-bold mb-0">Aggiungi alimento</p>
        </button>
      )}
      {isAdd && (
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
            Aggiungi
          </Button>
          <Button
            type="button"
            className="rounded-pill bg-white border text-black mb-3 mt-2 text-uppercase ms-2"
            onClick={() => handleBack()}
          >
            Indietro
          </Button>
        </Form>
      )}
    </Card>
  )
}

export default Meal
