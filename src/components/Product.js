// https://placeholder.com/ per le immagini
import {Button,Image}from 'react-bootstrap'
import {CartState} from "../context/Cart"



export default function Product ({
  data
  
}) {
  /* add to cart
  chiamare setCart dal context
  */
  
   
  const {addToCart}=CartState()
  return (
    <div className="product">
      {/* visualizzazione dati */}
      <div className="product__name">{data.name}</div>
      {console.log(data.name)}
      <div className="product__img">
        <Image src="https://via.placeholder.com/200.png/09f/fff" fluid
         
        
        />
      </div>
      {/* counter quantità */}

      {/* bottone aggiunta carrello */}
      
      <Button onClick={()=> {addToCart(data)}}> Aggiungi a Carrello</Button>
    </div>
  )
}