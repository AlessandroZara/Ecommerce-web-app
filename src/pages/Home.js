import { useEffect, useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import Hero from "../components/Hero/Hero";
import styled from "styled-components";
import { Row, Container } from "react-bootstrap";
import Product from "../components/ListProduct";
import {db} from '../config/firebase';
import { ref,onValue } from "firebase/database";
import { LoginState } from "../context/contextLogIn";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from '../config/firebase';
import {CartState} from '../context/ContextCart';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const {user,setUser}=LoginState();
  const {productApi} = CartState();

  
  
  useEffect(() => {
    ( () => {
      try {
         const res = ref(db, 'products/');
        onValue(res, (snapshot) => {
        const ref = snapshot.val();// arriva oggetto con più oggetti
        const arrKeys =Object.values(ref);
        setData(arrKeys) // Qui viene trasformato in array perche lo stato è un array
        console.log(arrKeys) 

        //recupero i prodotti dell'utente dal database ogni qualvolta ritorna sul sito(funzione che fornisce google firebase)
        onAuthStateChanged(auth, (user) => {
          if (user) {
            const uid = user.uid;
            console.log(uid);
            setUser(uid);
            productApi(uid);
          } else {
            setUser(null);
          }
        });
        })
      } catch (err) {
        console.warn(err);
      } finally {
        setLoading(false);
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

       
  // const Container = styled.div`
  //   display: flex;
  //   background: rgb(198,238,235);
  //   background: linear-gradient(90deg, rgba(198,238,235,1) 0%, rgba(142,178,221,1) 100%);
  //   min-height: 50vh;

  // `;

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
    padding-bottom:1px;
    height:50px
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

      <Hero />

      <Container>
        {loading ? (
          "Loading"
        ) : data.length ? (
          <Row xs={1} md={5} className="g-4">
            {data.map((product) => (
              <Product key={product.id} data={product} user={user} showImage showButton />
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
}
