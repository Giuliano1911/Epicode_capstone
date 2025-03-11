import { Button, Card, Col, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { FormEvent, useState } from 'react'
import { URL } from '../../config/config'

import TrainingDayResponse from '../../types/TrainingDayResponse'

import DetailedExercise from './DetailedExercise'
import ExerciseResponse from '../../types/ExerciseResponse'

interface TrainingDayProps {
  t: TrainingDayResponse
  exercises: ExerciseResponse[]
}

interface DetailedExerciseRegister {
  exerciseId: number | string
  reps: number | string
  sets: number | string
  rest: number | string
}

const initialDetailedExerciseState = {
  exerciseId: '',
  reps: '',
  sets: '',
  rest: '',
}

function TrainingDay({ t, exercises }: TrainingDayProps) {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const [isAdd, setIsAdd] = useState<boolean>(false)

  const [detailedExercise, setDetailedExercise] =
    useState<DetailedExerciseRegister>(initialDetailedExerciseState)

  const handleBack = () => {
    setIsAdd(false)
    setDetailedExercise(initialDetailedExerciseState)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      fetch(URL + 'detailedExercises/' + t.id, {
        method: 'POST',
        body: JSON.stringify(detailedExercise),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token!,
        },
      }).then((response) => {
        if (response.ok) {
          setDetailedExercise(initialDetailedExerciseState)
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
    <Col className="col-12 col-md-6 col-lg-4 mb-4">
      <Card className="rounded-4 h-100">
        <Card.Body>
          <Card.Title className="d-flex justify-content-between">
            {t.day}
          </Card.Title>
          {t.detailedExercises!.map((e) => {
            return (
              <DetailedExercise
                exercises={exercises}
                token={token!}
                e={e}
                key={e.id}
              />
            )
          })}
          <button
            className="d-flex align-items-center border-0 bg-white"
            onClick={() => {
              setIsAdd(true)
            }}
          >
            <i className="fas fa-plus me-2"></i>
            <p className="fw-bold mb-0">Aggiungi esercizio</p>
          </button>
          {isAdd && (
            <Form className="mt-3" onSubmit={(e) => handleSubmit(e)}>
              <Form.Group
                className="mb-3 d-flex flex-column"
                controlId="formBasicUsername"
              >
                <Form.Label className=" text-uppercase ms-2 fw-bold">
                  * Esercizio
                </Form.Label>
                <select
                  className="rounded p-3 border border-secondary-subtle"
                  value={detailedExercise.exerciseId}
                  onChange={(e) => {
                    setDetailedExercise({
                      ...detailedExercise,
                      exerciseId: Number(e.target.value),
                    })
                  }}
                >
                  <option>Seleziona esercizio</option>
                  {exercises!
                    .sort((a, b) => (a.name < b.name ? -1 : 1))
                    .map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.name}
                      </option>
                    ))}
                </select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicSets">
                <Form.Label className=" text-uppercase ms-2 fw-bold">
                  * Numero di set
                </Form.Label>
                <Form.Control
                  className="py-3"
                  type="number"
                  min={1}
                  max={5}
                  required
                  value={detailedExercise.sets}
                  onChange={(e) =>
                    setDetailedExercise({
                      ...detailedExercise,
                      sets: Number(e.target.value),
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicReps">
                <Form.Label className=" text-uppercase ms-2 fw-bold">
                  * Numero di ripetizioni
                </Form.Label>
                <Form.Control
                  className="py-3"
                  type="number"
                  min={1}
                  max={100}
                  required
                  value={detailedExercise.reps}
                  onChange={(e) =>
                    setDetailedExercise({
                      ...detailedExercise,
                      reps: Number(e.target.value),
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicRest">
                <Form.Label className=" text-uppercase ms-2 fw-bold">
                  * Riposo (in secondi)
                </Form.Label>
                <Form.Control
                  className="py-3"
                  type="number"
                  min={1}
                  max={300}
                  required
                  value={detailedExercise.rest}
                  onChange={(e) =>
                    setDetailedExercise({
                      ...detailedExercise,
                      rest: Number(e.target.value),
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
        </Card.Body>
      </Card>
    </Col>
  )
}

export default TrainingDay
