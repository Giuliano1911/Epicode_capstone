import { Alert, Button, Card, Form } from 'react-bootstrap'
import { FormEvent, useState } from 'react'
import { URL } from '../../config/config'

import DetailedExerciseResponse from '../../types/DetailedExerciseResponse'
import { useNavigate } from 'react-router'
import ExerciseResponse from '../../types/ExerciseResponse'

interface DetailedExerciseProps {
  e: DetailedExerciseResponse
  token: string
  exercises: ExerciseResponse[]
}

interface DetailedExerciseRegister {
  exerciseId: number
  reps: number
  sets: number
  rest: number
}

function DetailedExercise({ e, token, exercises }: DetailedExerciseProps) {
  const detailedExerciseState = {
    exerciseId: e.exercise.id,
    reps: e.reps,
    sets: e.sets,
    rest: e.rest,
  }

  const [alert, setAlert] = useState<boolean>(false)
  const navigate = useNavigate()
  const [isMod, setIsMod] = useState<boolean>(false)
  const [detailedExercise, setDetailedExercise] =
    useState<DetailedExerciseRegister>(detailedExerciseState)

  const deleteDetailedEx = async () => {
    try {
      fetch(URL + 'detailedExercises/' + e.id, {
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

  const handleSubmit = async (ef: FormEvent) => {
    ef.preventDefault()
    try {
      fetch(URL + 'detailedExercises/' + e.id, {
        method: 'PUT',
        body: JSON.stringify(detailedExercise),
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
    <Card className={e.exercise.muscleGroup + ' rounded-3 mb-2'}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between">
          {e.exercise.name}
          <div className="text-end">
            <button
              className={e.exercise.muscleGroup + ' border-0 bg-white'}
              onClick={() => setIsMod(true)}
            >
              <i className="fas fa-pencil-alt text-black"></i>
            </button>
            <button
              className={e.exercise.muscleGroup + ' border-0 bg-white ms-2'}
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
                  onClick={() => deleteDetailedEx()}
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
        <Card.Text className="mb-0">
          {e.sets} serie da {e.reps}
        </Card.Text>
        <Card.Text>Rest: {e.rest} secondi</Card.Text>
        {isMod && (
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
                {exercises
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
                value={detailedExercise.sets || ''}
                onChange={(e) =>
                  setDetailedExercise({
                    ...detailedExercise,
                    sets: Number.isFinite(+e.target.value)
                      ? +e.target.value
                      : detailedExercise.sets,
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
                value={detailedExercise.reps || ''}
                onChange={(e) =>
                  setDetailedExercise({
                    ...detailedExercise,
                    reps: Number.isFinite(+e.target.value)
                      ? +e.target.value
                      : detailedExercise.reps,
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
                value={detailedExercise.rest || ''}
                onChange={(e) =>
                  setDetailedExercise({
                    ...detailedExercise,
                    rest: Number.isFinite(+e.target.value)
                      ? +e.target.value
                      : detailedExercise.rest,
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

export default DetailedExercise
