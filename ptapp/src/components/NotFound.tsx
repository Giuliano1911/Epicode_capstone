import { Alert, Button, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router'

function NotFound() {
  const navigate = useNavigate()

  return (
    <Container className="text-center my-5">
      <Alert variant="danger">Pagina non trovata!</Alert>
      <Button
        variant="success"
        onClick={() => {
          navigate(-1)
        }}
      >
        Torna indietro
      </Button>
    </Container>
  )
}

export default NotFound
