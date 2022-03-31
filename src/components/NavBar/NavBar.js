import { Container, Nav, Navbar } from "react-bootstrap";
import { useContext } from "react";
import { CartContext } from "../../context/ContextCart";
import { LoginContext } from "../../context/contextLogIn";
import { Link } from "react-router-dom";
import "./NavBar.css";
import ButtonDark from "../ThemeBlack/ButtonDark";
import { FaCartArrowDown } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { signOut } from "firebase/auth";
import {auth} from '../../config/firebase'
import {
  getDocs,
  collection,
  deleteDoc,
} from "firebase/firestore";
import { dbFire } from "../../config/firebase";


function NavBar() {
  const { cart} = useContext(CartContext);
  // const sumProduct = cart.reduce((prev, current) => {
  //   return prev + current.quantity;
  // }, 0);
  const { user, setUser } = useContext(LoginContext);
        const authentication = auth

  const EmptyNav= async ()=>{
    const querySnapshot = await getDocs(collection(dbFire, user));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
        if(doc.data().user === user){
          console.log(doc.data());
          deleteDoc(doc.ref);
        }
    });

  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="fixed-top" >
      <Container>
        <Link to="/">
          {" "}
          <Navbar.Brand>
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
            <Link to="/" className="link-style">
              {" "}
              <Nav.Link as="span">Home</Nav.Link>
            </Link>
          </Nav>
          <Nav>
            {user ? (
              <Nav.Link
                onClick={async () => {
                  setUser(null);
                  signOut(authentication).then(() => {
                    console.log(user + " è stato disconnesso")
                    console.log(authentication)
                  }).catch((error) => {
                  console.log(error)
                });
                  EmptyNav()
                }}
              >
                <FaSignOutAlt size={28} />
              </Nav.Link>
            ) : (
              <Link to="/login" className="link-style">
                <Nav.Link as="span">
                  <FaUser />
                </Nav.Link>
              </Link>
            )}
            {user ? (
              <Link to="/cart" className="link-style">
                {" "}
                <Nav.Link as="span">
                  <FaCartArrowDown />({cart.length})
                </Nav.Link>
              </Link>
            ) : null}
          </Nav>
          <ButtonDark />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;