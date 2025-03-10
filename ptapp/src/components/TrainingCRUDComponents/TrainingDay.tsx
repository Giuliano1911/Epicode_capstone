import { Card, Col, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { useState } from 'react'

import TrainingDayResponse from '../../types/TrainingDayResponse'

import DetailedExercise from './DetailedExercise'

interface TrainingDayProps {
  t: TrainingDayResponse
}

interface DetailedExerciseRegister {
  exerciseId: number
  reps: number
  sets: number
  rest: number
}

const initialDetailedExerciseState = {
  exerciseId: 0,
  reps: 0,
  sets: 0,
  rest: 0,
}

function TrainingDay({ t }: TrainingDayProps) {
  const navigate = useNavigate()
  const [isAdd, setIsAdd] = useState<boolean>(false)
  const [isMod, setIsMod] = useState<boolean>(false)
  const [detailedExercise, setDetailedExercise] =
    useState<DetailedExerciseRegister>(initialDetailedExerciseState)
  return (
    <Col className="col-12 col-md-6 col-lg-4 mb-4">
      <Card className="rounded-4 h-100">
        <Card.Body>
          <Card.Title className="d-flex justify-content-between">
            {t.day}
          </Card.Title>
          {t.detailedExercises!.map((e) => {
            return <DetailedExercise e={e} key={e.id} />
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
            <Form>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                Esercizio:
                <select className="ms-2">
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                  {/* map exercises into options*/}
                </select>
              </Form.Group>
            </Form>
          )}
        </Card.Body>
      </Card>
    </Col>
  )
}

export default TrainingDay
