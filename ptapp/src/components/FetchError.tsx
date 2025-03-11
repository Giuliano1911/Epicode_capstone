import { Alert } from 'react-bootstrap'

function FetchError() {
  return (
    <Alert variant="danger" className="mt-5 text-center">
      Errore nel caricamento dei dati
    </Alert>
  )
}

export default FetchError
