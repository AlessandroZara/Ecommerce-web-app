import { Container, Nav, Navbar} from "react-bootstrap"
import './NavBar.css'

function NavBar(){
    return <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="/"
        ><img
        src="https://www.crearelogo.it/wp-content/uploads/louis-vuitton-logo-300x223.jpg"
        width="40"
        height="40"
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
      />
            </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            </Nav>
            <Nav>
            <Nav.Link eventKey={2} href="/login">
                Log-in
            </Nav.Link>
            <Nav.Link eventKey={2} href="/thankyoupage">
                Cart
            </Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>
}

export default NavBar