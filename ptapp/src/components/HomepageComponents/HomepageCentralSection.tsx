import { Card, Col, Row, Form, Button } from 'react-bootstrap'
import { FormEvent, useState } from 'react'
import Carousel from 'react-multi-carousel'

import pic from '../assets/pt-photo.jpg'
import basic from '../assets/basicPlan.png'
import pro from '../assets/mediumPlan.png'
import elite from '../assets/superPlan.png'

import Review from './Review'
import MyFooter from './MyFooter'

interface InfoRequest {
  email: string
  name: string
  surname: string
  text: string
}

const initialInfoRequest: InfoRequest = {
  email: '',
  name: '',
  surname: '',
  text: '',
}

function HomepageCentralSection() {
  const [infoRequest, setInfoRequest] =
    useState<InfoRequest>(initialInfoRequest)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      fetch('http://localhost:8080/api/email', {
        method: 'POST',
        body: JSON.stringify(infoRequest),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        if (response.ok) {
          console.log('mail inviata')
        } else {
          throw new Error('Login non riuscito')
        }
      })
    } catch (error) {
      console.log('Error', error)
    }
    setInfoRequest(initialInfoRequest)
  }

  const responsive = {
    desktop: {
      breakpoint: { max: 994, min: 768 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    desktopLg: {
      breakpoint: { max: 8000, min: 994 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  }

  return (
    <>
      <Row id="upper-page">
        <Col className="col-12 col-md-6">
          <h5 className=" text-uppercase text-center my-5">
            Coaching Online e Dietologo nutrizionista
          </h5>
          <div className=" d-flex justify-content-center">
            <img
              className=" w-75"
              src={pic}
              alt="Giuliano Torres's photo at the gym"
            />
          </div>
          <h2 className=" text-center my-3">Giuliano Torres</h2>
          <div className=" mx-5">
            <p>
              Perché affidarsi ad un percorso di{' '}
              <strong>coaching online?</strong>
            </p>
            <p>
              Perché con l’attuale tecnologia la distanza non è più un problema
              e puoi scegliere il coach che preferisci, dovunque ti trovi.
            </p>
            <p>
              Se nonostante <strong>l’impegno</strong> non riesci a raggiungere
              i risultati sperati, la soluzione migliore in questi casi è
              affidarsi ad un professionista che possa guidarti passo passo per
              aiutarti a raggiungere il tuo obiettivo! Scopri i miei pacchetti
              di <strong>personal training online</strong> e scopri cosa posso
              fare te!
            </p>
          </div>
        </Col>
        <Col className="col-12 col-md-6">
          <h5 className=" text-uppercase text-center my-5">
            A chi è consigliato il coaching online
          </h5>
          <div className=" mx-5 m-md-0">
            <p>
              Il <strong>coaching online</strong> è rivolto a tutti coloro che
              vogliono intraprendere un percorso di allenamento personalizzato
              in funzione dei loro obiettivi. Che tu non sia mai entrato in
              palestra o che sia un atleta agonista di alto livello, il{' '}
              <strong>programma personalizzato</strong> ti permette di
              massimizzare la prestazione sportiva.
            </p>
            <p>
              Scrivimi su WhatsApp oppure compila il{' '}
              <a className=" text-decoration-none text-success" href="#form">
                Form di contatto
              </a>{' '}
              in fondo per avere per maggiori informazioni sul coaching online.
              Puoi anche associare un <strong>piano alimentare</strong> per
              ottimizzare i risultati.
            </p>
            <p></p>
          </div>
          <h5 className="text-uppercase text-center my-5">
            Quali sono i tuoi obiettivi?
          </h5>
          <div className=" mx-5 m-md-0">
            <p>
              Negli anni mi sono specializzato nell’allenamento della{' '}
              <strong>forza</strong> e dell’
              <strong>ipertrofia muscolare</strong>, sia con pesi che a corpo
              libero! Per prima cosa non solo allenando, ma sperimentando io
              stesso in prima persona tutti i vari metodi che propongo. Tutti i
              metodi che propongo li ho provati in prima persona prima di
              somministrarli a qualcuno.
            </p>
            <p>
              Negli anni ho accumulato esperienza poi con decine e decine di
              atleti nelle discipline più diverse. Ho allenato{' '}
              <strong>powerlifter</strong> e <strong>strongman</strong> agonisti
              (con risultati a livello nazionale e internazionale) e alleno
              tantissimi amatori del mondo della forza con gli obiettivi più
              disparati e anche atleti agonisti di altre discipline come
              preparatore atletico (rugbisti, lottatori). E io stesso ho
              gareggiato per anni provando in prima persona le cose di cui
              parlo.{' '}
            </p>
          </div>
        </Col>
      </Row>
      <Row id="presentation" className="mt-5">
        <Col className="col-12 col-lg-6 px-5">
          <h5 className="pt-5 pb-0 text-uppercase">Chi sono</h5>
          <h2 className="pb-4 fs-1">Giuliano Torres</h2>
          <div className="pb-4">
            <p>
              Ho sempre avuto un grande interesse per lo{' '}
              <strong>sport e per il fitness</strong>, per questo ho trasformato
              le mie passioni in un lavoro.
            </p>
            <p>
              Sono un <strong>Personal Trainer certificato ISSA</strong>{' '}
              (International Sports Sciences Association) con molti anni di
              esperienza.
            </p>
            <p>
              Il mio scopo è quello di far raggiungere ai clienti i propri
              obiettivi, seguirli passo dopo passo per "tagliare il traguardo"
              del loro <strong>benessere</strong> e <strong>felicità</strong>.
              Il miglior risultato è vederli soddisfatti ed è per me il miglior
              compenso!
            </p>
            <p>
              Se vuoi intraprendere questo <strong>percorso</strong> e ti senti
              pronto a raggiungere nuovi traguardi contattami!
            </p>
          </div>
        </Col>
      </Row>
      <Row id="prices" className="py-5 bg-black ">
        <Col className="col-12 ps-5">
          <h4 className="text-uppercase text-center mb-5 text-white">
            Trova il piano di coaching online che fa per te!
          </h4>
        </Col>
        <Col className="col-12 col-lg-4 mb-5 mb-lg-0">
          <Card className=" p-3 mx-4 h-100 rounded-4">
            <Card.Img
              className="rounded-4"
              src={basic}
              alt="basic plan picture"
            />
            <Card.Body>
              <Card.Title className="fs-3 my-3">Basic Plan</Card.Title>
              <Row className="my-2">
                <Col className="col-1">
                  <i className="fas fa-check"></i>
                </Col>
                <Col className="col-11">
                  Assessment iniziale che consiste in un questionario di
                  valutazione di dieta, allenamento e stile di vita, con
                  <strong> analisi dei video delle esecuzioni</strong> e{' '}
                  <strong>analisi posturale </strong>
                  (tramite foto).
                </Col>
              </Row>
              <Row className="my-2">
                <Col className="col-1">
                  <i className="fas fa-copy"></i>
                </Col>
                <Col className="col-11">
                  Scheda di allenamento <strong>personalizzata</strong>
                </Col>
              </Row>
              <Row className="my-2">
                <Col className="col-1">
                  <i className="fas fa-video"></i>
                </Col>
                <Col className="col-11">
                  1 <strong>check</strong> dei video di allenamento mensile
                </Col>
              </Row>
              <hr />
              <h5 className="mt-3 mb-0">
                <i className="fas fa-money-bill-wave-alt fs-6"></i> € 150 ogni
                12 settimane
              </h5>
            </Card.Body>
          </Card>
        </Col>
        <Col className="col-12 col-lg-4  mb-5 mb-lg-0">
          <Card className=" p-3 mx-4 h-100 rounded-4">
            <Card.Img className="rounded-4" src={pro} alt="pro plan picture" />
            <Card.Body>
              <Card.Title className="fs-3 my-3">Pro Plan</Card.Title>
              <Row className="my-2">
                <Col className="col-1">
                  <i className="fas fa-check"></i>
                </Col>
                <Col className="col-11">Assessment iniziale (vedi Basic)</Col>
              </Row>
              <Row className="my-2">
                <Col className="col-1">
                  <i className="fas fa-copy"></i>
                </Col>
                <Col className="col-11">
                  Scheda di allenamento e dieta <strong>personalizzate</strong>
                </Col>
              </Row>
              <Row className="my-2">
                <Col className="col-1">
                  <i className="fas fa-video"></i>
                </Col>
                <Col className="col-11">
                  <strong>Check</strong> settimanale dei progressi e dei log di
                  allenamento
                </Col>
              </Row>
              <hr />
              <h5 className="mt-3 mb-0">
                <i className="fas fa-money-bill-wave-alt fs-6"></i> € 200 ogni
                12 settimane
              </h5>
            </Card.Body>
          </Card>
        </Col>
        <Col className="col-12 col-lg-4 ">
          <Card className=" p-3 mx-4 h-100 rounded-4">
            <Card.Img
              className="rounded-4"
              src={elite}
              alt="elite plan picture"
            />
            <Card.Body>
              <Card.Title className="fs-3 my-3">Elite Plan</Card.Title>
              <Row className="my-2">
                <Col className="col-1">
                  <i className="fas fa-check"></i>
                </Col>
                <Col className="col-11">Assessment iniziale (vedi Basic)</Col>
              </Row>
              <Row className="my-2">
                <Col className="col-1">
                  <i className="fas fa-copy"></i>
                </Col>
                <Col className="col-11">
                  Scheda di allenamento e dieta <strong>personalizzate</strong>
                </Col>
              </Row>
              <Row className="my-2">
                <Col className="col-1">
                  <i className="fas fa-video"></i>
                </Col>
                <Col className="col-11">
                  <strong>Check</strong> online dopo ogni seduta di allenamento:
                  analisi dei video dell'allenamento e del diario
                </Col>
              </Row>
              <Row className="my-2">
                <Col className="col-1">
                  <i className="fas fa-pencil-alt"></i>
                </Col>
                <Col className="col-11">
                  Possibilità di apportare modifiche al piano anche durante la
                  settimana
                </Col>
              </Row>
              <Row className="my-2">
                <Col className="col-1">
                  <i className="fas fa-comments"></i>
                </Col>
                <Col className="col-11">Assistenza continua via chat</Col>
              </Row>
              <hr />
              <h5 className="mt-3 mb-0">
                <i className="fas fa-money-bill-wave-alt fs-6"></i> € 300 ogni
                12 settimane
              </h5>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row id="reviews">
        <h4 className="text-uppercase text-center my-5">
          Coaching online - recensioni
        </h4>
        <Col>
          <Carousel
            swipeable={false}
            draggable={false}
            showDots={false}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            <Review
              name="Gennaro Messina"
              text="Competenza, professionalità e disponibilità i suoi punti di forza, sempre pronto a trovare soluzioni condivise ed aperto al dialogo e alla comunicazione."
              rating={4.4}
            />
            <Review
              name="Sara Zucchi"
              text="Serio e competente. Mi ha seguita per diversi mesi con ottimi risultati."
              rating={4.8}
            />
            <Review
              name="Paolo Frigerio"
              text="Il migliore dei preparatori con cui ho avuto modo di collaborare!"
              rating={5.0}
            />
            <Review
              name="Luca Colmegna"
              text="Ottimo personal trainer 💪🏼"
              rating={4.0}
            />
            <Review
              name="Sara Pagani"
              text="Giuliano lo conosco da molti anni. È super preparato e mi sono trovata molto bene. Lo consiglio!!!"
              rating={4.8}
            />
            <Review
              name="Nunzia Pesola"
              text="Persona molto preparata..ottimo preparatore....ve lo consiglio"
              rating={5.0}
            />
            <Review
              name="Pierre Panci"
              text="Professionalità-serietà-passione. Il top!!!!!!"
              rating={4.4}
            />
            <Review
              name=" Lorenzo Bocci"
              text="È la seconda volta che lo contatto, per chiedere informazioni sulle sue schede e mi risponde subito togliendo i i miei dubbi. Grande"
              rating={5.0}
            />
          </Carousel>
        </Col>
      </Row>
      <Row id="form" className="mt-5 justify-content-center">
        <Col className="col-12">
          <h4 className="text-uppercase text-center my-5">
            Richiedi ulteriori informazioni
          </h4>
        </Col>
        <Col className="col-10">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className=" text-uppercase ms-2 fw-bold">
                * Indirizzo Email
              </Form.Label>
              <Form.Control
                className="py-3"
                type="email"
                required
                value={infoRequest.email}
                onChange={(e) =>
                  setInfoRequest({ ...infoRequest, email: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label className=" text-uppercase ms-2 fw-bold">
                * Nome
              </Form.Label>
              <Form.Control
                className="py-3"
                type="text"
                required
                value={infoRequest.name}
                onChange={(e) =>
                  setInfoRequest({ ...infoRequest, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicSurname">
              <Form.Label className=" text-uppercase ms-2 fw-bold">
                * Cognome
              </Form.Label>
              <Form.Control
                className="py-3"
                type="text"
                required
                value={infoRequest.surname}
                onChange={(e) =>
                  setInfoRequest({ ...infoRequest, surname: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label className=" text-uppercase ms-2 fw-bold">
                * Come posso aiutarti?
              </Form.Label>
              <Form.Control
                className="py-3"
                type="text"
                required
                value={infoRequest.text}
                onChange={(e) =>
                  setInfoRequest({ ...infoRequest, text: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPrivacy">
              <Form.Label className=" text-uppercase ms-1 opacity-50">
                Termini e Condizioni (Selezionare per proseguire)
              </Form.Label>
              <Form.Check
                required
                label="Ho letto la Privacy Policy e acconsento alla memorizzazione dei dati secondo il regolamento n. 679/2016, GDPR."
                feedback="Devi accettare per proseguire."
                feedbackType="invalid"
              />
            </Form.Group>
            <Button
              type="submit"
              className="submit-button-bw rounded-pill bg-black border-0 greentext mb-5 mt-2"
            >
              INVIA MESSAGGIO
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className=" bg-black">
        <MyFooter />
      </Row>
    </>
  )
}

export default HomepageCentralSection
