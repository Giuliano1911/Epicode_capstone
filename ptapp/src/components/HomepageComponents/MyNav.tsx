import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link, useLocation } from 'react-router'

import whiteLogo from '../assets/whiteLogo.png'

const MyNav = () => {
  const location = useLocation()

  return (
    <header>
      <Navbar
        collapseOnSelect
        expand="xl"
        bg="black"
        data-bs-theme="black"
        sticky="top"
        className=" position-fixed w-100"
      >
        <Container fluid>
          <Link to={'/'} className="navbar-brand">
            <div className=" d-flex align-items-center">
              <img className="logo" src={whiteLogo} />
              <h4 className="greentext">Giuliano Torres PT</h4>
            </div>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="text-center ms-auto">
              <Link
                className={
                  location.pathname === '/'
                    ? 'nav-link active greentext px-4'
                    : 'nav-link greentext opacity-75 px-4'
                }
                to={'/'}
              >
                HOME
              </Link>
              {location.pathname === '/' && (
                <a
                  className="nav-link greentext opacity-75 px-4"
                  href="#presentation"
                >
                  CHI SONO
                </a>
              )}
              {location.pathname === '/' && (
                <a
                  className="nav-link greentext opacity-75 px-4"
                  href="#prices"
                >
                  TARIFFE
                </a>
              )}
              {location.pathname === '/' && (
                <a
                  className="nav-link greentext opacity-75 px-4"
                  href="#reviews"
                >
                  RECENSIONI
                </a>
              )}
              {location.pathname === '/' && (
                <a className="nav-link greentext opacity-75 px-4" href="#form">
                  SCRIVIMI
                </a>
              )}
              {location.pathname === '/' && (
                <a
                  className="nav-link greentext opacity-75 px-4"
                  href="#contact"
                >
                  CONTATTI
                </a>
              )}
              <Link
                className={
                  location.pathname === '/login'
                    ? 'nav-link active greentext px-4'
                    : 'nav-link greentext opacity-75 px-4'
                }
                to={'/login'}
              >
                LOGIN
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}
export default MyNav
