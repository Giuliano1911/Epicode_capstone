import { Alert, Button, Card, Form } from 'react-bootstrap'
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router'
import { URL } from '../../config/config'

import DetailedExerciseResponse from '../../types/DetailedExerciseResponse'
import ExerciseResponse from '../../types/ExerciseResponse'

interface DetailedExerciseProps {
  e: DetailedExerciseResponse
  token: string
  role: string
  exercises: ExerciseResponse[]
}

interface DetailedExerciseRegister {
  exerciseId: number
  reps: number
  sets: number
  rest: number
}

function DetailedExercise({
  e,
  token,
  role,
  exercises,
}: DetailedExerciseProps) {
  const detailedExerciseState = {
    exerciseId: e.exercise.id,
    reps: e.reps,
    sets: e.sets,
    rest: e.rest,
  }
  const [isDetail, setIsDetail] = useState<boolean>(false)
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

  const handleMod = () => {
    setIsMod((prev) => !prev)
    setAlert(false)
  }

  const handleAlert = () => {
    setAlert((prev) => !prev)
    setIsMod(false)
  }

  return (
    <Card className={e.exercise.muscleGroup + ' rounded-3 mb-2'}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between">
          {e.exercise.name}
          {role.includes('PERSONALTRAINER') && (
            <div className="text-end">
              <button
                className={e.exercise.muscleGroup + ' border-0 bg-white'}
                onClick={() => handleMod()}
              >
                <i className="fas fa-pencil-alt text-black"></i>
              </button>
              <button
                className={e.exercise.muscleGroup + ' border-0 bg-white ms-2'}
                onClick={() => handleAlert()}
              >
                <i className="fas fa-trash-alt text-black"></i>
              </button>
              {alert && (
                <Alert className="rounded-4 mt-2 d-flex flex-column border-0 bg-transparent border-dark-subtle text-black">
                  Sei sicuro di volerlo eliminare?
                  <div className="mt-2">
                    <Button
                      className="rounded bg-black greentext button-width border-0 rounded-pill py-1 fw-bold"
                      onClick={() => deleteDetailedEx()}
                    >
                      Si
                    </Button>
                    <Button
                      className="ms-4 rounded bg-black greentext button-width border-0 rounded-pill py-1 fw-bold"
                      onClick={() => setAlert(false)}
                    >
                      No
                    </Button>
                  </div>
                </Alert>
              )}
            </div>
          )}
          {role.includes('CUSTOMER') && !isDetail && (
            <Button
              className={e.exercise.muscleGroup + ' border-0 + text-black'}
              onClick={() => setIsDetail(true)}
            >
              <i className="fas fa-eye me-2"></i>
            </Button>
          )}
          {role.includes('CUSTOMER') && isDetail && (
            <Button
              className={e.exercise.muscleGroup + ' border-0 + text-black'}
              onClick={() => setIsDetail(false)}
            >
              <i className="fas fa-times me-2"></i>
            </Button>
          )}
        </Card.Title>
        <Card.Text className="mb-0">
          {e.sets} serie da {e.reps} ripetizioni
        </Card.Text>
        <Card.Text>Rest: {e.rest} secondi</Card.Text>
        {isMod && (
          <Form className="mt-3" onSubmit={(e) => handleSubmit(e)}>
            <Form.Group
              className="mb-3 d-flex flex-column"
              controlId="formBasicExercise"
            >
              <Form.Label className=" text-uppercase ms-2 fw-bold ">
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
        {isDetail && (
          <>
            <Card.Text className="mb-0">
              Muscolo principale coinvolto: {e.exercise.muscleGroup}
            </Card.Text>
            <Card.Text>Esecuzione: {e.exercise.description}</Card.Text>
          </>
        )}
      </Card.Body>
    </Card>
  )
}

export default DetailedExercise
