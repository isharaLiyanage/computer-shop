import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Admin from "./Pages/Admin/Admin";

import Auth from "./Pages/auth";
import Checkout from "./Pages/Checkout";
import Home from "./Pages/Home";
import NoPage from "./Pages/NoPage";
import Product from "./Pages/Product";
import Product_info from "./Pages/Product_info";
import User from "./Pages/User";
function App() {
  const user = useSelector((state) => state.User?.Auth.username);
  const isAdmin = useSelector((state) => state.User?.Auth.isAdmin);
  console.log(isAdmin);

  return (
    <div className="App">
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Product />} />
        <Route path="/products/cat/:id" element={<Product />} />
        <Route path="/products/brand/:id" element={<Product />} />
        <Route path="/products/:id" element={<Product_info />} />
        <Route
          path="/user/:id"
          element={user ? <User /> : <Navigate to="/" replace={true} />}
        />

        <Route
          path="/auth"
          element={user ? <Navigate to="/" replace={true} /> : <Auth />}
        />
        <Route
          path="/checkout/:id"
          element={user ? <Checkout /> : <Navigate to="/" replace={true} />}
        />

        <Route index element={<Home />} />

        <Route path="*" element={<NoPage />} />
        <Route
          path="/Admin"
          element={isAdmin ? <Admin /> : <Navigate to="/" replace={true} />}
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
