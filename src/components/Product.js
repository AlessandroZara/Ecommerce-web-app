// https://placeholder.com/ per le immagini
import {Button,Image}from 'react-bootstrap'
import CartProvider from "../context/Cart"



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
      {console.log(data.name)}
      <div className="product__img">
        <Image src="https://images.pexels.com/photos/2541310/pexels-photo-2541310.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" fluid
         width="200"
         height="200"
        
        />
      </div>
      {/* counter quantità */}

      {/* bottone aggiunta carrello */}
      
      <Button onClick={CartProvider}> Aggiungi a Carrello</Button>
    </div>
  )
}