import { Container, Button } from "react-bootstrap";
import NavBar from "../components/NavBar/NavBar";
import { useNavigate, useLocation } from "react-router-dom";


export default function Thank({ 
    price,
    quantity
}) {
  const navigate = useNavigate();
  const { state } = useLocation(); // con lo useLocation importo quello che io ho passato nello useNavigate nel file "ListCart"
  console.log("sono nella thankyoupage", state);
  
  const getAmount = (singleProduct, productQuantity) => {
    const totalAmount = singleProduct * productQuantity;
    return (
      <span>
        <h6>Amount: {totalAmount}$</h6>
      </span>
    );
  };

  
  return (
    <>
      <NavBar />

      <Container>
        <h1>Complimenti hai comprato gli articoli</h1>
        <ul className="lista-carrello">
         
          {      
          state?.cart.map((product) => ( //con il punto di domanda davanti diventa undefined e quindi si ferma e non va alla successiva(quindi "cart.map")
            <>
              <li>{product.name}</li>
              <li>{product.quantity}</li>
              <li>{product.price.toFixed(2)} &euro;</li>
            </>
          ))}
        </ul>
            <><h3>{getAmount(price, quantity)} &euro;</h3></>
        {/* <h2>Sfigato però...siccome non c'è un vero E-commerce dietro non ti arriva una sega</h2>*/}
        <Button
          onClick={() => {
            navigate("/");
          }}
        >
          {" "}
          Torna alla Home 
        </Button>
      </Container>
    </>
  );
}
