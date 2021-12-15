// https://placeholder.com/ per le immagini
import { Button, Image, Row } from "react-bootstrap";
import { CartState } from "../context/Cart";
import { LoginState } from "../context/contextLogIn";
import { Col, Card } from "react-bootstrap";
import Counter from "../components/Counter/Counter";
import {useState} from "react"


export default function Product({
  data,
  showImage, //questa è true o false
  showButton, //questa è true o false
  showButtonCart,
   //questa è true o false
}) {
  /* add to cart
  chiamare setCart dal context
  */
  const [showError,setShowError] = useState(false)
  const { addToCart,Delete } = CartState();
  const { user } = LoginState();

    
  const sendMessage = () => {
      setTimeout(() => {
        setShowError(false)
    }, 2000);
  };



  return (
    <Col>
      <Card>
        {showImage ? (
          <Card.Img
            variant="top"
            src="https://via.placeholder.com/200.png/09f/fff"
          />
        ) : null}
        {/*{showButtonCart ? da fare con un ternario */}
        <Card.Body id="bottonCart">
        {/*: <Card.Body> da fare con un ternario */}
          <Card.Title>{data.name}</Card.Title>
          {showButton ? (
            <Button
              onClick={() => {
                if(user){
                addToCart(data);
                }
                else {
                  setShowError(true)
                  sendMessage()
                }
              }}
            >
              {" "}
              Aggiungi a Carrello
            </Button>
            
          ) : null}
         {showError ?
         <div >
           <p>Devi Essere Loggato per acquistare</p>
         </div>
          
        :null}
         
          {showButtonCart ? (
            <Row className="row">
              <Button id="delete"
              onClick={() => {
              Delete(data);
              }}>X</Button>
              <Counter initialValue={data.quantity} product={data} />
            </Row>
          ) : null}
        </Card.Body>
      </Card>

      {/* visualizzazione dati */}
      {/* counter quantità */}

      {/* bottone aggiunta carrello */}
    </Col>
  );
}
