import React, { useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import { Button,Form } from "react-bootstrap";
import { LoginState } from "../context/contextLogIn";
import {CartState} from '../context/ContextCart';
//import api from "../util/api.js";
import {useNavigate} from "react-router-dom";
import {Container} from "react-bootstrap";
import styled from "styled-components";
import "./Login.css";
import {auth} from '../config/firebase';
import { signInWithEmailAndPassword} from "firebase/auth";
import {Link} from 'react-router-dom';
// import {
//   getDocs,
//   collection,
//   deleteDoc,
// } from "firebase/firestore";
// import { dbFire } from "../../config/firebase";

export default function Login() {
  const { setUser } = LoginState();
  
  const [showErrorDate, setShowErrorDate] = useState(false);
  const [mail, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });
  const {productApi} = CartState();

  const navigate = useNavigate()
 
  
  const sendMessageError = () => {
    setTimeout(() => {
      setShowErrorDate(false);
    }, 2000);
  };
 
  const handleLogin = async (email, password) => {
    
    try {
      await signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        setUser(response.user.uid);
        console.log(response.user);
        if(response.user.uid){
          productApi(response.user.uid); 
        }
      }); 
     
      navigate(`/`)
      
    } catch (err) {
      setShowErrorDate(true);
      sendMessageError();
      if (err.response) {
        console.warn(err.response.data);
       
      }else{
      console.warn(err);
      }
    }
  };
    
   const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  
  // const handleLogin = async () => {
  //   console.log("Sono HandleLogin",password, Username);
  //   try {
  //     const response = await api.login(Username, password);
  //     setUser(response.data); // imposto l'utente che mi arriva dalle API che ha una propriet?? "name"
  //     navigate(`/`)
  //   } catch (err) {
  //     setShowErrorDate(true);
  //     sendMessageError();
  //     if (err.response) {
        
  //       console.warn(err.response.data);
        
  //     } else {
  //       console.warn(err);
  //     }
  //   }
  // };
 
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


  return (
    <>
      <NavBar />
      <Container fluid className="__form">
      <Form onSubmit={(e)=>{
         e.preventDefault();
         handleLogin(mail,password)}}>
           <h2 style={{ fontSize: '40px',marginLeft:"35%"}}>Login</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={mail} onChange={(e)=>{setEmail(e.target.value)}}/>
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
          {showErrorDate ?
          <p>c'?? qualche errorre nei dati inserti</p>
          :null}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <br />
      <p>Non hai un account? <Link to ="/signup">Registrati</Link> </p>
      <p>Non ti ricordi la password? <Link to ="/resetpassword">Reset Password</Link> </p>
      </Container>
      <Footer>
      <Title>E-commerce</Title>
      <Text>Copyright 2021</Text>
      </Footer>
    </>
  );
}
