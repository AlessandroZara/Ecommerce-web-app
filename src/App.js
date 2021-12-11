import './App.css'
import { BrowserRouter, Routes } from 'react-router-dom'
import { Route } from 'react-router'
import Home from './pages/Home'
// import Product from './pages/Product'
import NotFound from './pages/NotFound'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    // provider carrello

    <BrowserRouter>
      <nav>
        {/* links */}

        {/* icona cart: quantità */}
      </nav>

      <Routes>

        <Route
          path="/"
          element={<Home/>}
        />

        <Route
          path="/cart"
          element={<></>}
        />

        {/* <Route
          path="/product/:id"
          element={<Product/>}
        /> */}

        <Route
          path="*"
          element={<NotFound/>}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App
