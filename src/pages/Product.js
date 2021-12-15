import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../util/api"
import NavBar from "../components/NavBar/NavBar"
import { Button, Col, Container, Image, Row } from "react-bootstrap"
import {CartState} from "../context/Cart"

export default function Product (props) {
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
      <>
      <NavBar />
      <Container>
     
        {loading
          ? 'Loading'
          : data
            ?
            <> <Row>
            <Col sm={8}><Image
             src="https://via.placeholder.com/200.png/09f/fff"
       /></Col>
            <Col sm={4}>
            <h1>{props.data.name}</h1>
              Price:
              <h4>30 &euro;</h4>
              <p>{props.data.quantity}</p>
              <Button onClick={()=> {addToCart(props.data)}}> Aggiungi a Carrello</Button>
            </Col>
          </Row>
              

            </>
            : 'Product not found'
        }
  
       
      </Container>
      </>
    )
}
