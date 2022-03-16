import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import { Button, Col, Container,Row, Spinner } from "react-bootstrap";
import { CartState } from "../context/Cart";
import { LoginState } from "../context/contextLogIn";
import styled from "styled-components";
import {db} from '../config/firebase';
import { ref,onValue } from "firebase/database";


export default function Product({ sendMessage }) {
  const { id } = useParams();
   
  const { user } = LoginState();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [showErrorProduct, setShowErrorProduct] = useState(false);

  const { addToCart } = CartState();

  const sendMessageProduct = () => {
    setTimeout(() => {
      setShowErrorProduct(false);
    }, 2000);
  };

  useEffect(() => {
    setTimeout(() => {
      ( () => {
        try {
          const res = ref(db, 'products/');
          onValue(res, (snapshot) => {
          const ref = snapshot.val();// arriva oggetto con più oggetti
          console.log(ref)
          const arrKeys =Object.values(ref);// Qui viene trasformato in array perche lo stato è un array
          const idProduct=arrKeys.filter(obj =>obj.id === id) // filtro i dati che mi interessano
          setData(idProduct[0]) //setto lo stato "data"
          console.log( idProduct[0])
          
        })
        } catch (err) {
          if (err.response) {
            console.warn("response error", err.response);
          } else {
            console.error("An error occurred");
          }
        } finally {
          setLoading(false);
        }
      })();
    }, 2000);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  
  

  const Footer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #191919;
    color: white;
    height: 8vh;
    font-size: 1.5rem;
    font-weight: bold;
  `;

  const Title = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    
  `;

  const Text = styled.div`
    font-size: 0.8rem;
  `;
  const imgUrl="https://via.placeholder.com/300.png/09f/fff";
  return (
    <>
      <NavBar />
      <div className="container-single">
      <Container style={{margin:"0",paddingTop:"50px"}} className="container-single-product">
        {loading ? (
          <Spinner animation="border" />
        ) : data ? (
          <>
            {" "}
            <Row>
              <Col sm={8}>
                <img src={imgUrl} alt="massimiliano grazie" />
              </Col>
              <Col className="text__col" sm={4}>
                <h1>{data.name}</h1>
                Price:
                <h4>{data.price.toFixed(2)} &euro;</h4>
                <p>Disponibilità: {data.available}</p>
                <Button 
                  onClick={() => {
                    if (user) {
                      addToCart(data);
                    } else {
                      setShowErrorProduct(true);
                      sendMessageProduct();
                    }
                  }}
                >
                  {" "}
                  Aggiungi a Carrello
                  
                </Button>
                {showErrorProduct ? (
                  <div>
                    <p>Devi Essere Loggato per acquistare</p>
                  </div>
                ) : null}
              </Col>
            </Row>
          </>
        ) : (
          "Product not found"
        )}
      </Container>
      </div>
      <Footer>
        <Title>E-commerce</Title>
        <Text>Copyright 2021</Text>
      </Footer>
    </>
  );
}
