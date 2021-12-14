import React, { useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import { Button,Form } from "react-bootstrap";
import { LoginState } from "../context/contextLogIn";
import api from "../util/api.js";
import {useNavigate} from "react-router-dom";
import {Container} from "react-bootstrap";
import "./Login.css";

export default function Login() {
  const { setUser } = LoginState();

  const [Username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
 
  const handleLogin = async () => {
    console.log("Sono HandleLogin",password, Username);
    try {
      const response = await api.login(Username, password);
      setUser(response.data); // imposto l'utente che mi arriva dalle API che ha una proprietà "name"
      navigate(`/`)
    } catch (err) {
      if (err.response) {
        console.warn(err.response.data);
      } else {
        console.warn(err);
      }
    }
  };

  return (
    <>
      <NavBar />
      <Container className="form">
      <Form onSubmit={(e)=>{
         e.preventDefault();
         handleLogin()}}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={Username} onChange={(e)=>{setUsername(e.target.value)}}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      </Container>
    </>
  );
}
