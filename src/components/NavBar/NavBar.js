import { Container, Nav, Navbar} from "react-bootstrap"
import {useContext} from 'react'
import {CartContext} from "../../context/Cart"
import './NavBar.css'

function NavBar(){
        const {cart}= useContext(CartContext)
        const sumProduct= cart.reduce((prev,current)=>{
            return prev + current.quantity
        },0);

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
            <Nav.Link href="/prodotto">Prodotto</Nav.Link>
            </Nav>
            <Nav>
            <Nav.Link eventKey={2} href="/login">
                Log-in
            </Nav.Link>
            <Nav.Link eventKey={2} href="/thankyoupage">
                Cart({sumProduct})
            </Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>
}

export default NavBar