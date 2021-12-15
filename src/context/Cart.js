import api from '../util/api'
import {createContext, useContext, useState,useEffect} from 'react'


export const CartContext=createContext();

const CartProvider=({children})=>{
const [cart,setCart]=useState([])

const productApi =async()=>{
  try {
    const res=  await api.getCart()
    console.log(res)
    setCart(res.data.products)
  }
  catch(err) {
    if(err.response){
      console.warn(err.response.data)
    }
    else{
      console.warn(err)
    }
  }
  
    
}

 const addToCart = async (product)=>{
    
  try {
    await api.addToCart(product.id)
      productApi()
    }
    catch(err) {
      if(err.response){
        console.warn(err.response.data)
    }
    else{
      console.warn(err)
    }
  }
  
}
const updateCart = async (product,count)=>{
    
  try {
    await api.updateCart(product.id,{quantity:(product.quantity = count)})
      productApi()
    }
    catch(err) {
      if(err.response){
        console.warn(err.response.data)
    }
    else{
      console.warn(err)
    }
  }
  
}
  
const Delete = async (product)=>{
    
  try {
    await api.updateCart(product.id,{quantity:(product.quantity = 0)})
      productApi()
      
    }
    catch(err) {
      if(err.response){
        console.warn(err.response.data)
    }
    else{
      console.warn(err)
    }
  }
  
}
const Empty = async ()=>{
    
  try {
    await api.emptyCart()
       setCart([])
      
    }
    catch(err) {
      if(err.response){
        console.warn(err.response.data)
    }
    else{
      console.warn(err)
    }
  }
  
}


const ThankDelete = async (product)=>{
    
  try {
    
     await api.checkoutCart()
    
           setCart([])
              }
    catch(err) {
      if(err.response){
        console.warn(err.response.data)
    }
    else{
      console.warn(err)
    }
  }
  
}


useEffect(() => {
    productApi()
    
},[]);

return (
<CartContext.Provider value={{addToCart,setCart,cart,Delete,ThankDelete,Empty,updateCart}}>
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


 
 