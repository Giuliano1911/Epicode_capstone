import { Card, Col, Row } from 'react-bootstrap'

import pic from '../assets/pt-photo.jpg'
import basic from '../assets/basicPlan.png'
import pro from '../assets/mediumPlan.png'
import elite from '../assets/superPlan.png'

function HomepageCentralSection() {
  return (
    <>
      <Row id="upper-page">
        <Col className="col-12 col-md-6">
          <h5 className=" text-uppercase text-center my-5">
            Coaching Online e Dietologo nutrizionista
          </h5>
          <div className=" d-flex justify-content-center">
            <img className=" w-75" src={pic} />
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
        <Col className="col-12 col-md-6 ps-5">
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
        <Col className="col-12 col-md-4">
          <Card className=" p-3 mx-4 h-100">
            <Card.Img className="rounded" src={basic} />
            <Card.Body>
              <Card.Title className="fs-3 my-3">Basic Plan</Card.Title>
              <Card.Text>
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
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col className="col-12 col-md-4">
          <Card className=" p-3 mx-4 h-100">
            <Card.Img className="rounded" src={pro} />
            <Card.Body>
              <Card.Title className="fs-3 my-3">Pro Plan</Card.Title>
              <Card.Text>
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
                    Scheda di allenamento e dieta{' '}
                    <strong>personalizzate</strong>
                  </Col>
                </Row>
                <Row className="my-2">
                  <Col className="col-1">
                    <i className="fas fa-video"></i>
                  </Col>
                  <Col className="col-11">
                    <strong>Check</strong> settimanale dei progressi e dei log
                    di allenamento
                  </Col>
                </Row>
                <hr />
                <h5 className="mt-3 mb-0">
                  <i className="fas fa-money-bill-wave-alt fs-6"></i> € 200 ogni
                  12 settimane
                </h5>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col className="col-12 col-md-4">
          <Card className=" p-3 mx-4 h-100">
            <Card.Img className="rounded" src={elite} />
            <Card.Body>
              <Card.Title className="fs-3 my-3">Elite Plan</Card.Title>
              <Card.Text>
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
                    Scheda di allenamento e dieta{' '}
                    <strong>personalizzate</strong>
                  </Col>
                </Row>
                <Row className="my-2">
                  <Col className="col-1">
                    <i className="fas fa-video"></i>
                  </Col>
                  <Col className="col-11">
                    <strong>Check</strong> online dopo ogni seduta di
                    allenamento: analisi dei video dell'allenamento e del diario
                  </Col>
                </Row>
                <Row className="my-2">
                  <Col className="col-1">
                    <i className="fas fa-pencil-alt"></i>
                  </Col>
                  <Col className="col-11">
                    Possibilità di apportare modifiche anche durante la
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
                  <i className="fas fa-money-bill-wave-alt fs-6"></i> € 320 ogni
                  12 settimane
                </h5>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default HomepageCentralSection
