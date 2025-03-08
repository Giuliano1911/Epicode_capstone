import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router'

import whiteLogo from './assets/whiteLogo.png'

interface DashboardNavProps {
  role: string
}

function DashboardNav({ role }: DashboardNavProps) {
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
          <div className=" d-flex align-items-center navbar-brand">
            <img className="logo" src={whiteLogo} />
            <h4 className="greentext">Giuliano Torres PT</h4>
          </div>
          {role.includes('PERSONALTRAINER') && (
            <>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="text-center ms-auto">
                  <Link
                    className={
                      location.pathname === '/users'
                        ? 'nav-link active greentext px-4'
                        : 'nav-link greentext opacity-75 px-4'
                    }
                    to={'/users'}
                  >
                    UTENTI
                  </Link>
                  <Link
                    className={
                      location.pathname === '/exercises'
                        ? 'nav-link active greentext px-4'
                        : 'nav-link greentext opacity-75 px-4'
                    }
                    to={'/exercises'}
                  >
                    ESERCIZI
                  </Link>
                  <Link
                    className={
                      location.pathname === '/alimentation'
                        ? 'nav-link active greentext px-4'
                        : 'nav-link greentext opacity-75 px-4'
                    }
                    to={'/alimentation'}
                  >
                    ALIMENTAZIONE
                  </Link>
                </Nav>
              </Navbar.Collapse>
            </>
          )}
          {role.includes('CUSTOMER') && (
            <>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="text-center ms-auto">
                  <Link
                    className={
                      location.pathname === '/training'
                        ? 'nav-link active greentext px-4'
                        : 'nav-link greentext opacity-75 px-4'
                    }
                    to={'/training'}
                  >
                    SCHEDE
                  </Link>
                  <Link
                    className={
                      location.pathname === '/diet'
                        ? 'nav-link active greentext px-4'
                        : 'nav-link greentext opacity-75 px-4'
                    }
                    to={'/diet'}
                  >
                    ALIMENTAZIONE
                  </Link>
                </Nav>
              </Navbar.Collapse>
            </>
          )}
        </Container>
      </Navbar>
    </header>
  )
}

export default DashboardNav
