import { CartState } from "../context/ContextCart";
import { Button, ListGroup } from "react-bootstrap";
import Product from "./ListProduct";
import { useNavigate } from "react-router-dom";
import { LoginState } from "../context/contextLogIn";
 
// import { useEffect
//  } from "react";
//  import { dbFire } from "../config/firebase";
//  import {
//   collection,
//   getDocs,
// } from "firebase/firestore";

export default function ListCart({ data }) {
  const navigate = useNavigate(); //navigate in input prende più parametri, guardare documentazione
  const { cart, ThankDelete, sumPrice, Empty } = CartState();
  const { user } = LoginState();


  // useEffect(() => {
  //   (async () => {
  //     const querySnapshot = await getDocs(collection(dbFire, "product"));
  //     querySnapshot.forEach((doc) => {
  //       // doc.data() is never undefined for query doc snapshots
  //      console.log(doc.data());
  //      if(doc.data().user === user){
  //       console.log(doc.data());
  //       setCart(cart)
  //      }  
  //     });
  //   })()
  // },[cart, setCart, user]);

  return (
    <>
   
      <ListGroup className="cart__cart" as="ul">
      {cart.map((product) => (
        <>
          <Product key={product.id} data={product} user={user} showButtonCart />
        </>
      ))}
    </ListGroup>
      {cart.length >= 1 ? (
        <>
          <h3>{sumPrice.toFixed(2)} &euro;</h3>
          <Button
            id="buy"
            onClick={() => {
              ThankDelete(cart,user);
              console.log("sono in ListCard", cart);
              navigate(`/thankyoupage`, { state: { cart, sumPrice } }); // "state" è un parametro dello useNavigate
              
            }}
          >
            Compra
          </Button>

          <Button
            id="buy"
            onClick={() => {
              Empty(cart);
              console.log(user)
            }}
          >
            Svuota Carrello
          </Button>
        </>
      ) : null}
    </>
  );
}
