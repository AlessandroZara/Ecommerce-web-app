import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { CartState } from "../../context/ContextCart";

export default function Counter({ initialValue, product, price ,available}) {
  const { updateCart } = CartState();
  const [count, setCounter] = useState(initialValue);
 

  function addCounter() {
      if(count >= 1 && count < available) {
        setCounter((prevCount) => prevCount + 1);
      }
    
  }
  function negCounter() {
    if (count > 1) {
      setCounter((prevCount) => prevCount - 1);
    }
  }

  const getAmount = (productAmount, productQuantity) => {
    const singleAmount = productAmount * productQuantity;
    return (
      <span>
        <h6>Amount: {singleAmount}$</h6>
      </span>
    );
  };

  return (
    <>
      <div>
        <Button onClick={addCounter}>+</Button>
        <span>{count}</span>
        <Button onClick={negCounter}>-</Button>
        {getAmount(price, initialValue)}
      </div>
      <div>
        <Button
          onClick={() => {
            updateCart(product, count);
            console.log(product,count)
          }}
        >
          Conferma quantità{" "}
        </Button>
      </div>
    </>
  );
}
