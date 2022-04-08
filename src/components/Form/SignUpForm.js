import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
 createUserWithEmailAndPassword,
} from "firebase/auth";
import {auth,dbFire} from '../../config/firebase';
import {
    collection,
    addDoc,
  } from "firebase/firestore";
  import PasswordChecklist from "react-password-checklist"
import "./SignUp.css";
import styled from "styled-components";
import NavBar from "../NavBar/NavBar";
import { Container, Form,Button } from "react-bootstrap";
import "../../pages/Login.css";

function Register() {
  const Footer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background:  rgb(20,29,55);
  color: white;
  height:60px;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0;
  `;

  const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  `;

  const Text = styled.div`
  font-size: 0.8rem;
  `;



  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });
  const history = useNavigate();


  const registerWithEmailAndPassword = async (name, email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(dbFire, "users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });
    } catch (err) {
      console.error(err);
      
      if(err.code === 'auth/email-already-in-use'){
        history("/signup");
        alert("Questa email esiste già.\nDopo aver cliccato sul pulsante 'OK' ritornerai alla pagina di registrazione");
      }
    }
  };

  
  const checkPW =/^(?=.*\d)(?=.*[-_.,!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/
  const test =checkPW.test(password)
  console.log(test)

 const register = () => {
    if (!name || !password || !email  ) {
      alert("Inseirsci sia nome che password che email")
    history("/signup");
    }else if(password.length < 6){
      alert("la tua password è inferiore a 6 caratteri")
      history("/signup");
    }else if(test ===false ){
      alert("La password non corrisponde alle caratteristiche richieste")
    history("/signup");
    }else{
      registerWithEmailAndPassword(name, email, password);
      history("/")
    }
   
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  
  return (
    <>
    <NavBar />
      <Container fluid className="__form">
      <Form onSubmit={(e)=>{
         e.preventDefault();
         register(email,name,password)}}>
          <h2 style={{ fontSize: '40px',marginLeft:"30%"}}>Registrati</h2>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Nome Utente</Form.Label>
          <Form.Control type="text" placeholder="Enter Name" value={name} onChange={(e)=>{setName(e.target.value)}}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Indirizzo Email</Form.Label>
          <Form.Control type="email" placeholder="Enter Name" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type={values.showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Mostra Password" onClick={handleClickShowPassword}   onMouseDown={handleMouseDownPassword}/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <PasswordChecklist
                rules={["minLength","specialChar",
                        "number","capital",]}
                minLength={6}
                value={password}
                messages={{
                  minLength: "La password deve contenere almeno 6 caratteri",
                  specialChar: "La password deve contenere almeno 1 carattere speciale",
                  number: "La password deve contenere almeno 1 numero.",
                  capital: "La password deve contenere almeno 1 lettera maiuscola",
                }}
            />
      </Form>
      <br />
      <p>Hai già un account? Vai alla <Link to="/login">Login</Link> </p>
      </Container>
      <Footer>
      <Title>E-commerce</Title>
      <Text>Copyright 2021</Text>
      </Footer>
     </>
  );
}
export default Register;
