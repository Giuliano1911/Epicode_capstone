import { Col, Row } from 'react-bootstrap'

import whiteLogo from '../assets/whiteLogo.png'

function MyFooter() {
  return (
    <Col id="contact" className="col-12 px-5 pt-5">
      <Row>
        <Col className="col-4 col-lg-2">
          <img className="w-75" src={whiteLogo} alt="Giuliano Torres PT logo" />
        </Col>
        <Col className="col-lg-5 greentext">
          <p className="mb-4">Studio Catania centro</p>
          <p>Consulenza Online</p>
          <p>Dieta Personalizzata</p>
          <p>Allenamento Personalizzato</p>
        </Col>
        <Col className="col-8 col-lg-4 text-lg-end">
          <p className="text-white">Seguimi sui social</p>
          <a href="#">
            <i className="fab fa-facebook text-white fs-3 me-2"></i>
          </a>
          <a href="#">
            <i className="fab fa-instagram text-white fs-3 me-2"></i>
          </a>
          <a href="#">
            <i className="fab fa-tiktok text-white fs-3 me-2"></i>
          </a>
          <a href="#">
            <i className="fab fa-twitter text-white fs-3"></i>
          </a>
        </Col>
      </Row>
      <Row className=" justify-content-center">
        <Col className="col-12 mt-4">
          <p className="small-text text-white">
            ©{new Date().getFullYear()} Copyright | Giuliano Torres PT
          </p>
        </Col>
      </Row>
    </Col>
  )
}

export default MyFooter
