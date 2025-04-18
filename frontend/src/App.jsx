import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, HashRouter} from "react-router-dom";
import Shop from "./pages/Shop/Shop";
import "./styles/global.scss";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Cart from "./pages/Cart/Cart";
import Search from "./pages/Search/Search";
import Login from "./pages/Login/Login";
import Signup from "./pages/SignUp/Signup";
import Shipping from "./pages/Shipping/Shipping";
import ScrollToTop from "./components/ScrollToTop";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Contact from "./pages/Contact/Contact";
import About from "./pages/About/About";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import Loader from "./components/Loaders/maxLoader/Loader";
import { useCartStore } from "./stores/useCartStore";
import Success from "./pages/Success/Success";
import Cancel from "./pages/Cancel/Cancel";
import Home from "./pages/Home/Home";
import ProductDescription from "./pages/ProductDescription/ProductDescription";
import SingleService from "./pages/SingleServicePage/SingleService";
import ServicePage from "./pages/ServicePage/ServicePage";
import MyOrders from "./pages/MyOrders/MyOrders";
import OrderDetails from "./pages/Admin/Orders/OrderDetails";
import Profile from "./pages/Profile/Profile";
import BookNowForm from "./pages/BookNowForm/BookNowForm";

const App = () => {
  const { user, checkAuth, checkingAuth } = useUserStore();
  const { getCartItems } = useCartStore();
  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (!user) return;

    getCartItems();
  }, [getCartItems, user]);

  if (checkingAuth) return <Loader />;

  return (
    <HashRouter>
      <Navbar />
      <Toaster />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/admin-dashboard"
          element={user?.role === "admin" ? <AdminDashboard /> : <Login />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <Signup />}
        />
        <Route path="/cart" element={user ? <Cart /> : <Navigate to="/" />} />
      
        <Route
          path="/product-description/:id"
          element={<ProductDescription />}
        />
        <Route path="/search" element={<Search />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/purchase-success" element={<Success />} />
        <Route path="/purchase-failed" element={<Cancel />} />
        <Route path="/services" element={<ServicePage />} />
        <Route path="/service/:id" element={<SingleService />} />
        <Route path="/myorders" element={<MyOrders />} />
        <Route path="/admin/orders/:orderId" element={<OrderDetails />} />
        <Route 
          path="/profile" 
          element={user ? <Profile /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/book-service/:id" 
          element={user ? <BookNowForm /> : <Navigate to="/login" />} 
        />
      </Routes>
      <Footer />
    </HashRouter>
  );
};

export default App;
