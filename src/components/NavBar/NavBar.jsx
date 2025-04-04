import React, { useState, useRef, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./NavBar.css";
import logo from "../../assets/images/nc-navbar.png";
import shopLogo from "../../assets/images/escudo_bolso.png";
import CartWidget from "../CartWidget/CartWidget";
import data from "../../data/data.json";
import { useCart } from "../../context/CartContext";

const Navbar = () => {
  const categoriasUnicas = [...new Set(data.map((p) => p.category))];
  const [shopping, setShopping] = useState(false);
  const location = useLocation();
  const logoSrc = location.pathname != "/" ? shopLogo : logo;
  const { cart, removeFromCart } = useCart();

  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [showCartDetails, setShowCartDetails] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setDropdownVisible(false);
    }, 200);
  };

  const toggleCartDetails = () => {
    setShowCartDetails((prev) => !prev);
  };

  useEffect(() => {
    const handleShopping = () => {
      setShopping(location.pathname !== "/");
    };

    window.addEventListener("shopping", handleShopping);
    handleShopping();

    return () => {
      window.removeEventListener("shopping", handleShopping);
    };
  }, []);

  return (
    <>
      <div
        className={`flex align-center wdth-100 sp-btw fixed navbar ${
          shopping ? "shopping" : ""
        }`}
      >
        <div className="shopping-logo">
          <img className="navbar-logo" src={logoSrc} alt="nacional-logo" />
          <p>Nacionalistas</p>
        </div>

        <ul className="landing-navbar justify-center">
          <li>
            <NavLink className="navlink" to="/">
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink className="navlink" to="/shop">
              Tienda
            </NavLink>
          </li>
          <li
            className="dropdown"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span className="links categories">Productos</span>
            <ul className={`dropdown-menu ${isDropdownVisible ? "show" : ""}`}>
              {categoriasUnicas.map((cat) => (
                <li key={cat}>
                  <NavLink to={`/shop/category/${cat.toLowerCase()}`}>
                    {cat}
                  </NavLink>
                </li>
              ))}
            </ul>
          </li>

          <div
            className="icons flex align-end justify-center text-size"
            style={{ position: "relative" }}
          >
            <div
              onClick={toggleCartDetails}
              className="cart-icon-wrapper"
              style={{ position: "relative", cursor: "pointer" }}
            >
              <CartWidget />
              {cart.length > 0 && (
                <span className="cart-count">{cart.length}</span>
              )}
            </div>

            {showCartDetails && cart.length > 0 && (
              <div className="cart-dropdown-detailed">
                {cart.map((item, idx) => (
                  <div key={idx} className="cart-item">
                    <img
                      src={item.image}
                      alt={item.name || item.title}
                      className="cart-item-img"
                    />
                    <div className="cart-item-info">
                      <NavLink
                        to={`/shop/item/${item.id}`}
                        className="cart-item-link"
                      >
                        <strong>{item.name || item.title}</strong>
                      </NavLink>
                      <div className="cart-item-size">Talle {item.size}</div>
                      <div className="cart-item-qty-price">
                        x{item.quantity} — ${item.price.toLocaleString()}
                        <button
                          onClick={() => removeFromCart(item.id, item.size)}
                          className="cart-remove"
                        >
                          <i className="remove bi bi-trash-fill"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
