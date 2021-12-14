// https://placeholder.com/ per le immagini
import { Button, Image } from "react-bootstrap";
import { CartState } from "../context/Cart";
import {Col, Card } from "react-bootstrap";

export default function Product({
  data,
  showImage, //questa è true o false
  showButton,//questa è true o false
}) {
  /* add to cart
  chiamare setCart dal context
  */

  const { addToCart } = CartState();
  return (
    <Col >
      <Card>
        {showImage ? (
          <Card.Img
            variant="top"
            src="https://via.placeholder.com/200.png/09f/fff"
          />
        ) : null}
        <Card.Body>
          <Card.Title>{data.name}</Card.Title>
          {showButton ? (
            <Button
              onClick={() => {
                addToCart(data);
              }}
            >
              {" "}
              Aggiungi a Carrello
            </Button>
          ) : null}
        </Card.Body>
      </Card>

      {/* visualizzazione dati */}
      {/* counter quantità */}

      {/* bottone aggiunta carrello */}
    </Col>
  );
}
