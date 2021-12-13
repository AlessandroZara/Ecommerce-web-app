import { Container } from "react-bootstrap";
import SignUpForm from "../components/Form/SignUpForm";
import NavBar from "../components/NavBar/NavBar";

export default function Login () {
    return <>
        
        <NavBar />
        <Container>
            <h1>Login</h1>
            <p>Bentornato, inserisci i tuoi dati per loggarti</p>
            <SignUpForm />
        </Container>
    </>
}
