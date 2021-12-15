import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../util/api";
import NavBar from "../components/NavBar/NavBar";
import { Button, Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { CartState } from "../context/Cart";
import { LoginState } from "../context/contextLogIn";
import styled from "styled-components";

export default function Product({ sendMessage }) {
  const { id } = useParams();
  const { user } = LoginState();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [showErrorProduct, setShowErrorProduct] = useState(false);

  const { addToCart } = CartState();

  const sendMessageProduct = () => {
    setTimeout(() => {
      setShowErrorProduct(false);
    }, 2000);
  };

  useEffect(() => {
    setTimeout(() => {
      (async () => {
        try {
          const res = await api.getProduct(id);

          console.log("product", res);

          setData(res.data);
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

  return (
    <>
      <NavBar />
      <Container className="container-single-product">
        {loading ? (
          <Spinner animation="border" />
        ) : data ? (
          <>
            {" "}
            <Row>
              <Col sm={8}>
                <Image src="https://via.placeholder.com/300.png/09f/fff" />
              </Col>
              <Col sm={4}>
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
      <Footer>
        <Title>E-commerce</Title>
        <Text>Copyright 2021</Text>
      </Footer>
    </>
  );
}
