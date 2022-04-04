import { createContext, useContext, useState } from "react";
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
import { auth } from "../config/firebase";
import {onAuthStateChanged} from 'firebase/auth'
import emailjs from '@emailjs/browser';
import{ init } from '@emailjs/browser';



export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  
  // funzione che legge i prodotti nel carrello
  const productApi = async (user) => {
    
    try {
      const arr = [];
      const querySnapshot = await getDocs(collection(dbFire, user));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        arr.push(doc.data());
        
        
      });
      setCart(arr)
    } catch (err) {
      if (err.response) {
        console.warn(err.response.data);
      } else {
        console.warn(err);
      }
    }
  };
  
  // funzione che aggiunge un prodotto al carrello
  const addToCart = async (product,user) => {
    
    const cityRef = doc(dbFire, user, product.id);
    setDoc(cityRef, {
      id: product.id,
      name: product.name,
      quantity: product.quantity,
      price: product.price,
      available: product.available,
      user: user
    });
    
    console.log(product.id);
    console.log("Document written with ID: ", cityRef.id);
   
    // id: product.id,
    // name:product.name,
    // quantity:product.quantity,
    // available:product.available,
    // price:product.price
   await productApi(user);
     
  };

  // funzione che aggiunge o rimuove la quantità di un prodotto dal carrello
  const updateCart = async (product, count,user) => {
    
    try {
      const RefProd = doc(dbFire, user, product.id);
      await updateDoc(RefProd, {
      quantity:(product.quantity = count),       
      });
      const arr = [];
      const querySnapshot = await getDocs(collection(dbFire, user));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        arr.push(doc.data());
        
        
      });
      //console.log(product.id);
      setCart(arr)
    } catch (err) {
      if (err.response) {
        console.warn(err.response.data);
      } else {
        console.warn(err);
      }
    }
  };
  
  // funzione che rimuove un singolo prodotto dal carrello (il simbolo della "X" accanto al prodotto)
  const Delete = async (product,user) => {
    try {
      //questa parte è messa a disposizone da google firebase(guardare documentazione)
       const RefDele = doc(dbFire, user, product.id);

      // Remove the 'capital' field from the document
      await updateDoc(RefDele, {
        id: deleteField(product.id),
        name: deleteField(product.name),
        quantity: deleteField(product.quantity),
        price: deleteField(product.price),
        available: deleteField(product.available),
        user:deleteField(product.user),
      });
      await deleteDoc(doc(dbFire, user, product.id));
      //fine parte google firebase

      //se carrello ha un prodotto ancora a carrello parte la lettura del carrello
      // altrimenti il carrello si azzera(solo parte frontend )
      if(cart.length > 1){
        productApi(user);
      }else{
        setCart([])
      }    

    } catch (err) {
      if (err.response) {
        console.warn(err.response.data);
      } else {
        console.warn(err);
      }
    }
  };

  //Funzione che svuota il carrello compeltamente
  const Empty = async (product,user) => {
    try {
      product.map((ele) => {
        return (
          //Guardare documentazioni firebase per vedere come eliminare prodotti (cancellare documento lo chiamano loro)
        product = doc(dbFire, user, ele.id),
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

  // funzione che ti fa comprare i prodotti messi a carrello e che invia una mail con i dati del carrello
 const ThankDelete = (product,user) => {
  const nameProduct =product.map((obj) => {
    return (obj.name) 
  }
  )
  //Funzione messa a disposizione da firebase per recuperare i prodotti dal database 
  //Più funzione messa a disposizione da emailjs per mandare le email
  // (con poi tutte le personalizzazioni che ho settato per il mio progetto)
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userE = user.email;
      var templateParams = {
        user_email:userE,
        user_name: userE,
        message: `Grazie Mille per Aver comprato questi prodotti: ${nameProduct} ,'`
      };
      init("ogEYvQRjM6yFTn1Gj");
      emailjs.send('form', 'template_dg4f7pl', templateParams)
        .then(function(response) {
           console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
           console.log('FAILED...', error);
        });
        console.log(user)
    } else {
      //
    }
  });
  try {
    product.map((ele) => {
      return (
      product = doc(dbFire, user, ele.id),  //qui cancello i prodotti anche dal database (per poi quindi torglierli dal carrello)
      deleteDoc(product)
      )
    })
    setCart([]);// qui risetto il carrello (parte frontend) a zero
    
  } catch (err) {
    if (err.response) {
      console.warn(err.response.data);
    } else {
      console.warn(err);
    }
  }
  
   
  };

  // useEffect(() => {
  //   productApi();
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

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
        Empty,
        productApi
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
