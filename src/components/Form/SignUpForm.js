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
      alert(err.message);
    }
  };

  const checkPW =/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/
  const test =checkPW.test(password)
  console.log(test)
 const register = () => {
    if (!name || !password || !email  ) {
      alert("Please enter name ,email e password")
    history("/signup");
    }else if(password.length < 6){
      alert("your password not less than 6 characters")
      history("/signup");
    }else if(test ===false ){
      alert("password not match pattern")
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
            />
        <button className="register__btn" onClick={register}>
          Register
        </button>
        <div>
          Already have an account? <Link to="/login">Login</Link> now.
        </div>
      </div>
    </div>
  );
}
export default Register;