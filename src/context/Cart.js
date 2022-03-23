import { createContext, useContext, useState, useEffect } from "react";
import { dbFire } from "../config/firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  setDoc,
  deleteDoc,
  deleteField,
} from "firebase/firestore";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
 
  const productApi = async () => {
    try {
      const arr = [];
      const querySnapshot = await getDocs(collection(dbFire, "product"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        arr.push(doc.data());
        console.log(arr);
        
      });
      setCart(arr);
    } catch (err) {
      if (err.response) {
        console.warn(err.response.data);
      } else {
        console.warn(err);
      }
    }
  };

  const addToCart = async (product) => {
    
    const cityRef = doc(dbFire, "product", product.id);
    setDoc(cityRef, {
      id: product.id,
      name: product.name,
      quantity: product.quantity,
      price: product.price,
      available: product.available,
    });
       
    console.log(product.id);
    console.log("Document written with ID: ", cityRef.id);

    // id: product.id,
    // name:product.name,
    // quantity:product.quantity,
    // available:product.available,
    // price:product.price
     productApi();
  };

  const updateCart = async (product, count) => {
    try {
      const RefProd = doc(dbFire, "product", product.id);
      // Set the "capital" field of the city 'DC'
      await updateDoc(RefProd, {
      quantity:(product.quantity = count),       
      });
      
      console.log(product.id)
      productApi()
    } catch (err) {
      if (err.response) {
        console.warn(err.response.data);
      } else {
        console.warn(err);
      }
    }
  };

  const Delete = async (product) => {
    try {
       const RefDele = doc(dbFire, "product", product.id);

      // Remove the 'capital' field from the document
      await updateDoc(RefDele, {
        id: deleteField(product.id),
        name: deleteField(product.name),
        quantity: deleteField(product.quantity),
        price: deleteField(product.price),
        available: deleteField(product.available),
      });
      await deleteDoc(doc(dbFire, "product", product.id));
      
      productApi();
    } catch (err) {
      if (err.response) {
        console.warn(err.response.data);
      } else {
        console.warn(err);
      }
    }
  };
  const Empty = async (product) => {
    try {
      product.map((ele) => {
        return (
        product = doc(dbFire, 'product', ele.id),
        deleteDoc(product)
        )
      })
      setCart([])
    } catch (err) {
      if (err.response) {
        console.warn(err.response.data);
      } else {
        console.warn(err);
      }
    }
  };
 const ThankDelete = (product) => {
    try {
      product.map((ele) => {
        return (
        product = doc(dbFire, 'product', ele.id),
        deleteDoc(product)
        )
      })
      setCart([])
    } catch (err) {
      if (err.response) {
        console.warn(err.response.data);
      } else {
        console.warn(err);
      }
    }
  };

  useEffect(() => {
    productApi();
  }, []);

  const sumPrice = cart.reduce((prev, current) => {
    return prev + current.quantity * current.price;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        addToCart,
        setCart,
        cart,
        Delete,
        ThankDelete,
        updateCart,
        sumPrice,
        Empty
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const CartState = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw Error("Context deve essere usato dentro Cart Provider");
  }
  return context;
};

export default CartProvider;
