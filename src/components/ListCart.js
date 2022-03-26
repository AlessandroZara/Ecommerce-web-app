import { CartState } from "../context/ContextCart";
import { Button, ListGroup } from "react-bootstrap";
import Product from "./ListProduct";
import { useNavigate } from "react-router-dom";
//import { LoginState } from "../context/contextLogIn";


export default function ListCart({ data}) {
  const navigate = useNavigate(); //navigate in input prende più parametri, guardare documentazione
  const { cart, ThankDelete, sumPrice,Empty} = CartState();
  
      return (
    <>
        <ListGroup className="cart__cart" as="ul">
        {cart.map((product) => (
          <>
            <Product key={product.id} data={product} showButtonCart />
          </>
        ))}
      </ListGroup>
    
   

    {cart.length >= 1 ? (
        <>
          <h3>{sumPrice.toFixed(2)} &euro;</h3>
          <Button
            id="buy"
            onClick={() => {
              ThankDelete(cart);
              console.log("sono in ListCard", cart);
              navigate(`/thankyoupage`, { state: { cart, sumPrice } }); // "state" è un parametro dello useNavigate
            }}
          >
            Compra
          </Button>
          
             <Button
              id="buy"
              onClick={() => {
                Empty(cart)
              }}
            >
              Svuota Carrello
            </Button> 
         
        </>
      ) : null}
      
    </>
  );
}
