import { Col, Container, Row } from 'react-bootstrap'
import HeroSection from './HeroSection'
import MyNav from './MyNav'
import HomepageCentralSection from './HomepageCentralSection'

function Homepage() {
  return (
    <Container fluid>
      <Row>
        <Col className="px-0 col-12">
          <MyNav />
        </Col>
        <Col className="px-0 py-5 bg-black col-12">
          <HeroSection />
        </Col>
      </Row>
      <HomepageCentralSection />
    </Container>
  )
}

export default Homepage
