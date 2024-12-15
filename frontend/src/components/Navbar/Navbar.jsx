import "./Navbar.scss";
import { Link, useLocation } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { IoLockOpenOutline } from "react-icons/io5";
import { BsCart2 } from "react-icons/bs";
import { IoPersonOutline } from "react-icons/io5";
import { useUserStore } from "../../stores/useUserStore";
import { useCartStore } from "../../stores/useCartStore";
import { RxHamburgerMenu } from "react-icons/rx";
import { useEffect, useState } from "react";
import logo from "../../assets/logo.jpg";
const Navbar = () => {
  const [hamburgerMenu, setHamburgerMenu] = useState(false);
  const { logout, user } = useUserStore();
  const { cart } = useCartStore();
  const itemsInCart = cart.length;

  const loaction = useLocation();
  useEffect(() => {
    setHamburgerMenu(false);
  }, [loaction]);
  const getActiveClass = (path) =>
    location.pathname === path ? "active-link" : "";
  return (
    <div className="navbar">
      <div className="left-sec">
        <Link to={"/"} className={getActiveClass("/")}>
          <p>Home</p>
        </Link>
        <Link to={"/shop"} className={getActiveClass("/shop")}>
          <p>Shop</p>
        </Link>
        

        <Link to={"/services"} className={getActiveClass("/services")}>
          <p>Services</p>
        </Link>
        <Link to={"/about"} className={getActiveClass("/about")}>
          <p>ABOUT</p>
        </Link>
        
         <Link to={"/myorders"} className={getActiveClass("/myorders")}>
          <p>My Orders</p>
        </Link>

      
      </div>
      <Link to={"/"}>
        <div className="logo-wrapper">
          <div className="logo">
            <img src={logo} alt="err" />
          </div>
          <p>Avefiles Foundation</p>
        </div>
      </Link>
      <div className="right-sec">
        <Link to={"/search"}>
          {" "}
          <IoSearchOutline />
        </Link>

        {user && user.role === "admin" && (
          <Link to={"/admin-dashboard"} className="admin-icon">
            <IoLockOpenOutline />
            <p>Admin Dashboard</p>
          </Link>
        )}
        <Link to="/login" className="login-icon">
          <IoPersonOutline />
          <p>Login</p>
        </Link>

        {user && (
          <>
            <Link to={"/cart"}>
              <BsCart2 />
              {itemsInCart > 0 && (
                <p className="items-in-cart">{itemsInCart}</p>
              )}
            </Link>
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>

      <div className="mini-screen-icons">
        {user && (
          <>
            <Link to={"/cart"}>
              <BsCart2 />
              {itemsInCart > 0 && (
                <p className="items-in-cart">{itemsInCart}</p>
              )}
            </Link>
          </>
        )}
        {user && user.role === "admin" && (
          <Link to={"/admin-dashboard"} className="admin-icon">
            <IoLockOpenOutline />
            <p>Admin Dashboard</p>
          </Link>
        )}
        <RxHamburgerMenu
          className="ham-icon"
          onClick={() => setHamburgerMenu(!hamburgerMenu)}
        />
      </div>

      {hamburgerMenu && (
        <div className="hamburger-menu">
          <Link to="/shop">
            <p>SHOP</p>
          </Link>

          <Link to={"/about"}>
            <p>ABOUT</p>
          </Link>

          <Link to="/login" className="login-icon">
            <p>LOGIN</p>
          </Link>

          {user && (
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
