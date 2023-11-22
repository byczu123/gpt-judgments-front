import {Link, useNavigate} from "react-router-dom";
import '../style/navbar.css'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

const MyNavbar = () => {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('token') !== null;

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/gpt-judgments-front/login');
    };
    return (
        <Navbar expand="false" data-bs-theme="dark" className="bg-body-primary mb-3">
          <Container fluid>
            <Navbar.Brand>Aplikacja generująca uzasadnienia wyroków sądowych</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-false`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-false`}
              aria-labelledby={`offcanvasNavbarLabel-expand-false`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-false`}>
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link><Link className="link" to="/gpt-judgments-front/">Strona główna</Link></Nav.Link>
                    {!isLoggedIn &&<Nav.Link>
                        <Link className="link" to="/gpt-judgments-front/login">Zaloguj się</Link>
                    </Nav.Link>}
                    {isLoggedIn && <Nav.Link>
                        <Link to={"/gpt-judgments-front/query"} className="link">Generuj uzasadninie</Link>
                    </Nav.Link>}
                    {isLoggedIn &&<Nav.Link><Link to={"/gpt-judgments-front/"} className="link" onClick={handleLogout}>Wyloguj się</Link></Nav.Link>}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
    );
}

                    // {isLoggedIn && <li><Link to={"/gpt-judgments-front/"} className="link" onClick={handleLogout}>Wyloguj się</Link></li>}
export default MyNavbar;
