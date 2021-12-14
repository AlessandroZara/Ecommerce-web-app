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
    <>
    <NavBar />
    <Container>
    {loading
      ? 'Loading'
      : data.length
        ?
        <Row xs={1} md={5} className="g-4">
          
          {data.map(product => (
            <Product
              key={product.id}
              data={product}
              showImage
              showButton
            />
            
          ))}
          
          </Row>
        : 'No products found'
    }
    </Container>
      </>
  )
}
