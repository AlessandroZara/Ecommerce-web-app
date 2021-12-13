import NavBar from "../components/NavBar/NavBar"
import styled from "styled-components";
import Product from "../components/Product";
import { Button, Container, ListGroup } from "react-bootstrap";
import '../App.css'

export default function Cart () {
    const Page = styled.div`
    display: flex;
    background: rgb(198,238,235);
    background: linear-gradient(90deg, rgba(198,238,235,1) 0%, rgba(142,178,221,1) 100%);
    min-height: 50vh;
  `;


 const Footer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #191919;
    color: white;
    min-height: 8vh;
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
      <Page>
        <Container>
          <h1>Carrello</h1>
          <ListGroup as="ul">
            <ListGroup.Item as="li">Prodotto<div><Button>Rimuovi articolo</Button><Button>+</Button>Quantità: 1<Button>-</Button></div></ListGroup.Item>
            <ListGroup.Item as="li">Prodotto<div><Button>Rimuovi articolo</Button><Button>+</Button>Quantità: 1<Button>-</Button></div></ListGroup.Item>
            <ListGroup.Item as="li">Prodotto<div><Button>Rimuovi articolo</Button><Button>+</Button>Quantità: 1<Button>-</Button></div></ListGroup.Item>
            <ListGroup.Item as="li">Prodotto<div><Button>Rimuovi articolo</Button><Button>+</Button>Quantità: 1<Button>-</Button></div></ListGroup.Item>
          </ListGroup>
          <Button id="buy">Compra</Button>
        </Container>
        

      </Page>
      <Footer>
      <Title>E-commerce</Title>
      <Text>Copyright 2021</Text>
      </Footer>
    </>
  )
}

