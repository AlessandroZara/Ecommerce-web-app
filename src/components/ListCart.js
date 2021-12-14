import { CartState } from "../context/Cart";
import { Button, ListGroup } from "react-bootstrap";
import Product from "./Product";
export default function ListCart() {
  const { cart } = CartState();
  return (
    <>
      <ListGroup as="ul">
        {cart.map((product) => (
          <Product key={product.id} data={product}  />
          
        ))}
      </ListGroup>
      <br />
      <Button id="buy">Compra</Button>
    </>
  );
}

