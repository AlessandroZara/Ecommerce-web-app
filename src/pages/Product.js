import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../util/api"
import NavBar from "../components/NavBar/NavBar"
import { Button, Col, Container, Image, Row } from "react-bootstrap"
import {CartState} from "../context/Cart"

export default function Product () {
  const { id } = useParams()

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const {addToCart}=CartState()

  useEffect(() => {
    (async () => {
      try {
        const res = await api.getProduct(id)

        console.log('product', res)

        setData(res.data)
      } catch (err) {
        if (err.response) {
          console.warn('response error', err.response)
        } else {
          console.error("An error occurred")
        }
      } finally {
        setLoading(false)
      }
    })()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container>
    <NavBar />
      {loading
        ? 'Loading'
        : data
          ?
          <>
            <h1>{data.name}</h1>
          </>
          : 'Product not found'
      }
      
      <Row>
        <Col sm={8}><Image src="https://images.pexels.com/photos/78778/fire-lighter-the-flame-firefox-78778.jpeg" alt="" fluid /></Col>
        <Col sm={4}>
          <h1>Prodotto</h1>
          Price:
          <h4>30 &euro;</h4>
          <p>Quantità disponibile: 4 pezzi</p>
          <Button onClick={()=> {addToCart(data)}}> Aggiungi a Carrello</Button>
        </Col>
      </Row>
    </Container>
  )
}
