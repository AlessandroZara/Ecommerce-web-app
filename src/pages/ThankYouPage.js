import { Container,Button } from "react-bootstrap";
import NavBar from "../components/NavBar/NavBar"
import {Link} from "react-router-dom"

export default function Thank (){
    return(
        <>
        <NavBar />
        
        <Container>
            <h1>Complimenti hai comprato gli articoli</h1>
            <h2>Sfigato però...siccome non c'è un vero E-commerce dietro non ti arriva una sega</h2>
            <Link to="/"><Button> Torna alla Home Và</Button></Link>    
        </Container>
            </>
            
    )
}
