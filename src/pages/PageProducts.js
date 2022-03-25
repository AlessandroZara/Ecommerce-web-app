import React from "react";
import { useState, useEffect } from "react";
//import api from "../util/api";
import NavBar from "../components/NavBar/NavBar";
import { Row, Carousel } from "react-bootstrap";
import styled from "styled-components";
import Product from "../components/ListProduct";
import belivemaglia from "../images/belivemaglia.jpg";
import nike from "../images/nike.jpg";
import sportcinese from "../images/sportcinese.jpg";
import {db} from '../config/firebase';
import {ref,onValue} from 'firebase/database';


const ProdottiPage = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = ref(db, 'products/');
        onValue(res, (snapshot) => {
        const data = snapshot.val();
        setData(data)
        console.log(data)
        })
      } catch (err) {
        console.warn(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const Container = styled.div`
    justify-content: center;
    align-items: center;
  `;
  const Title2 = styled.h1`
    font-size: 3rem;
    font-weight:600;
    background: #46B8CF;
    background: -webkit-radial-gradient(circle farthest-corner at center center, #46B8CF 0%, #000000 37%);
    background: -moz-radial-gradient(circle farthest-corner at center center, #46B8CF 0%, #000000 37%);
    background: radial-gradient(circle farthest-corner at center center, #46B8CF 0%, #000000 37%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-align: center;
    padding-bottom:1rem;
    margin: 1rem;
    margin-top:100px;
    animation: fadeIn 3s;
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
`;

  

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

      <Container>
        <Title2>Prodotti</Title2>
        <Carousel>
          <Carousel.Item >
            <img
              className="d-block w-100"
              src={belivemaglia}
              alt="First slide"
              height="540px"
            />
            <Carousel.Caption>
              <h3>Vestiti bene e credici sempre</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={nike}
              alt="Second slide"
              height="540px"
            />

            <Carousel.Caption>
              <h3>Le migliori marche al mondo</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={sportcinese}
              alt="Third slide"
              height="540px"
            />

            <Carousel.Caption>
              <h3>Corsa,camminata,tutto cio che Vuoi</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>

      <Container>
       
        {loading ? (
          "Loading"
        ) : data.length ? (
          <Row xs={1} md={5} className="g-4">
            {data.map((product) => (
              <Product key={product.id} data={product} quantity={1} showImage showButton />
            ))}
          </Row>
        ) : (
          "No products found"
        )}
      </Container>
      <Footer>
        <Title>E-commerce</Title>
        <Text>Copyright 2021</Text>
      </Footer>
    </>
  );
};

export default ProdottiPage;
