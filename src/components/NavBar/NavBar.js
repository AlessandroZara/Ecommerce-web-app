import { Container, Nav, Navbar} from "react-bootstrap"
import {useContext} from 'react'
import {CartContext} from "../../context/Cart"
import {LoginContext} from "../../context/contextLogIn"
import {Link} from "react-router-dom"
import './NavBar.css'

function NavBar(){
        const {cart}= useContext(CartContext)
        const sumProduct= cart.reduce((prev,current)=>{
            return prev + current.quantity
        },0);

        const {user,setUser}= useContext(LoginContext)
        
    return <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
       <Link to="/"> <Navbar.Brand 
        >
            <img
        src="https://www.crearelogo.it/wp-content/uploads/louis-vuitton-logo-300x223.jpg"
        width="40"
        height="40"
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
      />
            </Navbar.Brand>
            </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            <Link to="/"> <Nav.Link as="span">Home</Nav.Link></Link>
            <Link to="/prodotto"> <Nav.Link as="span">Prodotto</Nav.Link></Link>
            </Nav>
            <Nav>
                {user ? <Nav.Link onClick={()=>{setUser(null)}}>
                Log-out
            </Nav.Link>
            :
            <Link to="/login"><Nav.Link as="span" >
                Log-in
            </Nav.Link>
            </Link>
            }
            {user ?
           <Link to="/cart"> <Nav.Link as="span">
                Cart({sumProduct})
            </Nav.Link>
            </Link>
           :null }
            </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>
}

export default NavBar