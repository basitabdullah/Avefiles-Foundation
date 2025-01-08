import "./Navbar.scss";
import { Link, useLocation } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { IoLockOpenOutline } from "react-icons/io5";
import { BsCart2 } from "react-icons/bs";
import { IoPersonOutline } from "react-icons/io5";
import { useUserStore } from "../../stores/useUserStore";
import { useCartStore } from "../../stores/useCartStore";
import { RxHamburgerMenu } from "react-icons/rx";
import { useEffect, useState, useRef } from "react";
import { IoIosLogIn } from "react-icons/io";
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

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
          <IoIosLogIn />
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
          </>
        )}

        {user && (
          <div className="profile-menu-container" ref={profileMenuRef}>
            <button
              className="profile-button"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <IoPersonOutline />
            </button>

            {showProfileMenu && (
              <div className="profile-dropdown">
                <div className="profile-header">
                  <p>{user.name}</p>
                  <small>{user.email}</small>
                </div>
                <div className="profile-menu-items">
                  <Link to="/profile" onClick={() => setShowProfileMenu(false)}>
                    <IoPersonOutline />
                    My Profile
                  </Link>
                  <Link
                    to="/myorders"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <BsCart2 />
                    My Orders
                  </Link>
                  <button className="logout-btn" onClick={logout}>
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
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
