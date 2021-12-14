import { CartState } from "../context/Cart";
import { Button, ListGroup } from "react-bootstrap";
import Product from "./Product";
import {Link} from "react-router-dom"

export default function ListCart({
    data,
}) {
  const { cart,ThankDelete} = CartState();
  return (
    <>
      <ListGroup as="ul">
        {cart.map((product) => (
          <><Product key={product.id} data={product} showButtonCart/></>
        ))}
      </ListGroup>
      <br />
      <Link to="/thankyoupage"><Button id="buy" onClick={() => {
                ThankDelete(data);
              }}>Compra</Button></Link>
    </>
  );
}

