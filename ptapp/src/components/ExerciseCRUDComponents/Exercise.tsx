import { useState } from 'react'
import { Alert, Card } from 'react-bootstrap'
import { Link } from 'react-router'

import ExerciseResponse from '../../types/ExerciseResponse'

interface ExerciseProps {
  e: ExerciseResponse
  setRestart: React.Dispatch<React.SetStateAction<boolean>>
  URL: string
  token: string
}

function Exercise({ e, setRestart, URL, token }: ExerciseProps) {
  const [alert, setAlert] = useState<boolean>(false)

  const deleteEx = async () => {
    try {
      fetch(URL + 'exercises/' + e.id, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + token!,
        },
      }).then((response) => {
        if (response.ok) {
          setRestart(true)
          return response.json()
        } else {
          throw new Error('Cannot delete')
        }
      })
    } catch (error) {
      console.log('Error', error)
    }
  }

  return (
    <Card className="rounded-4">
      <Card.Body>
        <Card.Title className="d-flex justify-content-between">
          <div>{e.name}</div>
          <div className="text-end">
            <Link to={'/exercises/update/' + e.id}>
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
                <button className="rounded bg-white" onClick={() => deleteEx()}>
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
        <Card.Text>Muscolo allenato: {e.muscleGroup}</Card.Text>
        <Card.Text className="mb-0">Descrizione: {e.description}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Exercise
