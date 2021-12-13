// https://placeholder.com/ per le immagini
// import { Image } from "react-bootstrap"
import styled from "styled-components"
import {useState} from "react"


const Image = styled.img`
margin-top: 10px;
`;

const Button = styled.button`

`;


export default function Product ({
  data
  
}) {
  /* add to cart
  chiamare setCart dal context
  */

  return (
    <div className="product">
      {/* visualizzazione dati */}
      <div className="product__name">{data.name}</div>
      
     

      {/* counter quantità */}

      {/* bottone aggiunta carrello */}
    </div>
  )
}