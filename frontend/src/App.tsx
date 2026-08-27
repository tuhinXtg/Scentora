import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CartProvider } from "./context/CartContext";
import { ToastProvider } from "./context/ToastContext";

// pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";

// components
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <CartProvider>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/products"
              element={<Products />}
            />

            <Route
              path="/products/:productId"
              element={<ProductDetails />}
            />

            <Route
              path="/cart"
              element={<Cart />}
            />

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/register"
              element={<Register />}
            />

            <Route
              path="/checkout"
              element={<Checkout />}
            />

            <Route
              path="/order-success"
              element={<OrderSuccess />}
            />
          </Routes>
        </CartProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;