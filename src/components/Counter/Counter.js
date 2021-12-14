import React,{useState} from "react";


export default function Counter(){
    const[count,setCounter]=useState(0)

    function addCounter(){
        setCounter(prevCount=>prevCount+1)
    }
    function negCounter(){
        if(count > 0){
        setCounter(prevCount=>prevCount-1)
        }
    }
    

    return(
        <div>
        <button onClick={addCounter}>+</button>
        <span>{count}</span>
        <button onClick={negCounter}>-</button>
        </div>

    )
    
}