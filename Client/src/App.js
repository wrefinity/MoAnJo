import React, { useEffect } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./Components/Layout";
import LandingPage from "./Components/Home/LandingPage";
import About from "./Components/Basic/About";
import Contact from "./Components/Basic/Contact";
import HeadNav from "./Components/HeadNav";
import Footer from "./Components/Footer";
import CategoryScreen from "./Components/Category/CategoryScreen";
import LoginScreen from "./Components/Auth/LoginScreen";
import RegisterScreen from "./Components/Auth/RegisterScreen";
import ProductScreen from "./Components/Product/ProductScreen";
import Customers from "./Components/Customer/Customers";
import { OrderForm } from "./Components/Order/OrderForm";
import OrderList from "./Components/Order/OrderList";

function App() {
  return (
    <ScrollToTop>
      <ToastContainer />
      <HeadNav />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/products" element={<ProductScreen />} />
          <Route path="/categories" element={<CategoryScreen />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/order/:product_id" element={<OrderForm />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
      <Footer />
    </ScrollToTop>
  );
}
const ScrollToTop = ({ children }) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return children;
};
export default App;
