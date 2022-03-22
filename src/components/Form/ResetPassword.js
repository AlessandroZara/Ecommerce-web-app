import React,{useState} from 'react'
import {auth} from '../../config/firebase';
import { sendPasswordResetEmail  } from "firebase/auth";
  import {useNavigate} from "react-router-dom";
  import NavBar from "../NavBar/NavBar";
import { Button,Form } from "react-bootstrap";
import {Container} from "react-bootstrap";

export default function ResetPassword() {
    const [mail, setEmail] = useState('');

    const navigate = useNavigate();
    const [showErrorDate, setShowErrorDate] = useState(false);
   
    const resetPassword = async (email) => {
        try {
          auth.languageCode = 'it';
          await sendPasswordResetEmail(auth, email)
          console.log(email)
          navigate("/login");
          alert(` controlla la tua casella di posta.\nUna email di reset è appena stata inviata`)
        } catch (err) {
            setShowErrorDate(true);
            sendMessageError();
            console.log(err.code) 
            console.log(err.message)
        }
      };
      const sendMessageError = () => {
        setTimeout(() => {
          setShowErrorDate(false);
        }, 2000);
      };
  return (
    <>
      <NavBar />
      <Container className="__form">
      <Form onSubmit={(e)=>{
         e.preventDefault();
         resetPassword(mail)}}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={mail} onChange={(e)=>{setEmail(e.target.value)}}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        {showErrorDate ?
          <p>Inserisci una email valida</p>
          :null}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
    </>
  )
}
