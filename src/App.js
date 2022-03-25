import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
// import Product from './pages/Product'
import NotFound from "./pages/NotFound";
import "bootstrap/dist/css/bootstrap.min.css";
import Product from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import Thanks from "./pages/ThankYouPage";
import { LoginState } from "./context/contextLogIn";
import CookieConsent from "react-cookie-consent";
import ProdottiPage from "./pages/SingleProduct";
import SignUp from './components/Form/SignUpForm';
import ResetPassword from './components/Form/ResetPassword'
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
        <Route path="/prodotti" element={<ProdottiPage />} />

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
        <Route path="/signup" element={<SignUp />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
       
        <Route
          path="/product/:id"
          element={<Product/>}
        /> 

        <Route path="*" element={<NotFound />} />
      </Routes>
      <CookieConsent
  location="bottom"
  buttonText="Accetto"
  cookieName="myAwesomeCookieName2"
  style={{ background: "#2B373B" }}
  buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
  expires={150}
  
>
  This website uses cookies to enhance the user experience.{" "}
  <span style={{ fontSize: "10px" }}>This bit of text is smaller :O</span>
  <button
    style={{
      float: "right",
      background: "#ff0000",
      border: "0",
      fontWeight: "bolder",
      borderRadius: "0px",
      boxShadow: "none",
      color: "black",
      
    }}
    onClick={() => {
      alert("devi accettare per proseguire");
    }}
  >
    decline
  </button>
</CookieConsent>
    </BrowserRouter>
  );
}

export default App;

const PrivateRoutes = ({ children }) => {
  const { user } = LoginState();

  return <>{user ? children : <Navigate to={"/"} />}</>;
};
