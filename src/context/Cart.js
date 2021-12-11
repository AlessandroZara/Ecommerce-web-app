import { createContext } from "react";

export const CartContext = createContext()

export default function CartProvider ({ children }) {
  // const [cart, setCart] = ([])

  /* creare funzione updateCart (refresha carrello)
    - chiamare appena avviata app
    - chiamare quando 
  */

  /*
  aggiornamento con chiamate (addToCart, updateCart, emptyCart):
  1. update manuale array cart (lenta)
  2. get carrello (veloce)
  */

  return (
    <CartContext.Provider value={null}>
      {children}
    </CartContext.Provider>
  )
}
