import api from '../util/api'
import {createContext, useContext, useState,useEffect} from 'react'


export const CartContext=createContext();

const CartProvider=({children})=>{
const [cart,setCart]=useState([])

const productApi =async()=>{
  const res=  await api.getCart()
    console.log(res)
    setCart(res.data.products)
    
}

 const addToCart = async (product)=>{
  await api.addToCart(product.id)
  productApi()
}

const update = async ()=>{
  await api.updateCart()
}

useEffect(() => {
    productApi()
    
},[]);

return (
<CartContext.Provider value={{addToCart,setCart,cart,update}}>
{children}
</CartContext.Provider>
)
}

export const CartState=()=>{
const context=useContext(CartContext);
if(context===undefined)
{
throw Error("Context deve essere usato dentro Cart Provider")
}
return context
}


export default CartProvider;


 
 