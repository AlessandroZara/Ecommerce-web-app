import { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";

export default function SignUpForm(){
    const [email,emailSetter]=useState("")
    const [password,setPassword]=useState("")
    const [error,setError]=useState("")
    const [success,setSuccess]=useState("")
    const [user,setUser]=useState("")
    const [hold,setHold]=useState(true)

    const checkInput=()=>{
        if(email.length>40){
            setError("Email too long")
        }else{
            setError("")
        }
    }

    useEffect(checkInput,[email])

    async function handleSignUp(){
        const baseUrl="https://reqres.in/"
        const endPoint=baseUrl+"api/users"

        const payload={ //dati che ci serve ricevere
            user,
            password
        }

        try {
            const res = await axios.post(
                endPoint,
                payload
            )
            console.log(res) // Controllo se arrivano i dati
            console.log("ID utente: ", res.data.id)
            console.log("Status: ", res.status)
            setSuccess(res.status)
            setHold(false)
            
        } catch (e) {
            console.log("Errore: ", e)
        }
    }

    const handleChange = (obj) => {
        const newValue=obj.target.value
        emailSetter(newValue)
    }

    const handlePasswordChange = (obj) =>{
        const newValue = obj.target.value
        setPassword(newValue)
    }

    const handleUserChange = (obj) =>{
        const newValue = obj.target.value
        setUser(newValue)
    }

    return <div>
        {error && <p>Errore {error}</p>}
        
        <input type={"text"} onChange={handleUserChange} value={user} placeholder={"Username"}/>
        <input type={"password"} onChange={handlePasswordChange} value={password} placeholder={"Password"}/>
       <Link to="/"> <button onClick={handleSignUp} >Send</button></Link>
        {hold && <div>Inserisci nome utente e password</div>}
        
        {success && <>
            <div>Piacere di rivederti {user}</div>
            <div>Lo status della chiamata è: {success}</div>
        </>
        }
        
    </div>
}