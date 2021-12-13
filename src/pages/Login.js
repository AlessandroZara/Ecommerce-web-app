import { Container } from "react-bootstrap";
import SignUpForm from "../components/Form/SignUpForm";
import NavBar from "../components/NavBar/NavBar";

export default function Login () {
    return <>
        
        <NavBar />
        <Container>
            <SignUpForm />    
        </Container>
    </>
}
