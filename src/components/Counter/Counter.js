import React,{useState} from "react";


export default function Counter(){
    const[count,setCounter]=useState(0)

    function addCounter(){
        setCounter(prevCount=>prevCount+1)
    }
    function negCounter(){
        setCounter(prevCount=>prevCount-1)
        if (prevCount=0)
        return
    }
    

    return(
        <div>
        <button onClick={addCounter}>+</button>
        <span>{count}</span>
        <button onClick={negCounter}>-</button>
        </div>

    )
    
}