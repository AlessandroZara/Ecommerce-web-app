import { useEffect, useState } from "react";
import axios from "axios";

export default function SignUpForm(){
    const [email,emailSetter]=useState("")
    const [password,setPassword]=useState("")
    const [error,setError]=useState("")
    const [success,setSuccess]=useState("")

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
            email,
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

    return <div>
        {error && <p>Errore {error}</p>}
        <div>Per inviare la chiamata POST username: morfeus + password: leader</div>
        <div>Lo status della chiamata è: {success}</div>
        <input onChange={handleChange} value={email} placeholder={"Email"}/>
        <input type={"password"} onChange={handlePasswordChange} value={password} placeholder={"Password"}/>
        <button onClick={handleSignUp} >Send</button>
    </div>
}