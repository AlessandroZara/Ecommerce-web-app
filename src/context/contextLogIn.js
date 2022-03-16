import {createContext, useContext, useState} from 'react'


export const LoginContext = createContext();

const Login=({children})=>{
    
    const[user,setUser]=useState(null)
    
    
    return (
        <LoginContext.Provider value={{user,setUser}}>
        {children}
        </LoginContext.Provider>
        )
        }
        
        export const LoginState=()=>{
        const contextLogin=useContext(LoginContext);
        if(contextLogin===undefined)
        {
        throw Error("err")
        }
        return contextLogin
        }
        
        
        export default Login;
        
        