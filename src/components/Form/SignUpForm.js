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
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
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
  
  return (
    <div className="register">
      <div className="register__container">
        <input
          type="text"
          className="register__textBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          type="text"
          className="register__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="register__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
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
        <button className="register__btn" onClick={register}>
          Registrati
        </button>
        <div>
          Hai già un account? Vai alla <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}
export default Register;