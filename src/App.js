import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
// import Product from './pages/Product'
import NotFound from "./pages/NotFound";
import "bootstrap/dist/css/bootstrap.min.css";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Thanks from "./pages/ThankYouPage";
import { LoginState } from "./context/contextLogIn";

function App() {
  return (
    // provider carrello

    <BrowserRouter>
      <nav>
        {/* links */}

        {/* icona cart: quantità */}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prodotto" element={<Product />} />

        <Route
          path="/cart"
          element={
            <PrivateRoutes>
              <Cart />
            </PrivateRoutes>
          }
        />

        <Route
          path="/thankyoupage"
          element={
            <PrivateRoutes>
              <Thanks />
            </PrivateRoutes>
          }
        />

        <Route path="/login" element={<Login />} />

        {/* <Route
          path="/product/:id"
          element={<Product/>}
        /> */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

const PrivateRoutes = ({ children }) => {
  const { user } = LoginState();

  return <>{user ? children : <Navigate to={"/"} />}</>;
};
