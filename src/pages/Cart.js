import NavBar from "../components/NavBar/NavBar"
import styled from "styled-components";
import Product from "../components/Product";

export default function Cart () {
    const Container = styled.div`
    display: flex;
    background: rgb(198,238,235);
    background: linear-gradient(90deg, rgba(198,238,235,1) 0%, rgba(142,178,221,1) 100%);
    height: 50vh;
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
        
      </Container>
      <Footer>
      <Title>E-commerce</Title>
      <Text>Copyright 2021</Text>
      </Footer>
    </>
  )
}

