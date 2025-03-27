import { useState } from 'react'
import { Alert, Button, Card } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router'
import { URL } from '../../config/config'

import ExerciseResponse from '../../types/ExerciseResponse'

interface ExerciseProps {
  e: ExerciseResponse
  token: string
}

function Exercise({ e, token }: ExerciseProps) {
  const [alert, setAlert] = useState<boolean>(false)
  const navigate = useNavigate()

  const deleteEx = async () => {
    try {
      fetch(URL + 'exercises/' + e.id, {
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
          <div>{e.name}</div>
          <div className="text-end">
            <Link to={'/exercises/update/' + e.id}>
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
                    onClick={() => deleteEx()}
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
        <Card.Text>Muscolo allenato: {e.muscleGroup}</Card.Text>
        <Card.Text className="mb-0">Descrizione: {e.description}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Exercise
