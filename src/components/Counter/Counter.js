import React,{useState} from "react";
import { Button } from "react-bootstrap";


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
        <Button onClick={addCounter}>+</Button>
        <span>{count}</span>
        <Button onClick={negCounter}>-</Button>
        </div>

    )
    
}