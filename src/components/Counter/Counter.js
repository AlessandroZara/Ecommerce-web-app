import React,{useState} from "react";
import { Button } from "react-bootstrap";
import {CartState} from "../../context/Cart"




export default function Counter({
    initialValue,
    product
}){
    const {updateCart}=CartState()
    const[count,setCounter]=useState(initialValue)

    function addCounter(){
        setCounter(prevCount=>prevCount+1)
    }
    function negCounter(){
        if(count > 0){
        setCounter(prevCount=>prevCount-1)
        }
    }
    

    return(
        <>
        <div>
        <Button onClick={addCounter}>+</Button>
        <span>{count}</span>
        <Button onClick={negCounter}>-</Button>
        
        </div>
        <div>
        <Button onClick={()=> {updateCart(product,count)}}>Conferma quantità </Button>
        </div> 
       </>

    )
    
}