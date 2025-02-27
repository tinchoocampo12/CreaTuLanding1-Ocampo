import React, { useState, useRef } from "react";
import "./navbar.css";
import "../globals.css";
import logo from "../../assets/images/nc-footer-logo.png";
const Navbar = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
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

  return (
    <div className="nc-navbar absolute wdth-100 p-color flex sp-btw">
      <div className="nc-logo logo-text flex align-center">
        <img className="logo" src={logo} alt="Nacional-Logo" />
        <p>Nacionalizate</p>
      </div>
      <div className="flex align-center">
        <ul className="links flex align-center justify-center gap-6">
          <li>
            <span className="relink link">Inicio</span>
          </li>
          <li>
            <span className="relink link">Productos</span>
          </li>
          <li
            className="dropdown"
            onMouseEnter={() => setDropdownVisible(true)}
            onMouseLeave={() => setDropdownVisible(false)}
          >
            <span ClassName="relink navbar-text link">Categorias</span>
            <ul className={`dropdown-menu ${isDropdownVisible ? "show" : ""}`}>
              <li>
                <a className="navbar-text" href="#">
                  Camisetas
                </a>
              </li>
              <li>
                <a className="navbar-text" href="#">
                  Shorts
                </a>
              </li>
              <li>
                <a className="navbar-text" href="#">
                  Accesorios
                </a>
              </li>
            </ul>
          </li>
          <li>
            <span className="relink navbar-text link">Socios</span>
          </li>
          <li>
            <span className="relink navbar-text link">Contacto</span>
          </li>
        </ul>
      </div>
      <div className="btn flex align-center">
        <div className="container-icons">
          <i class="flex relink bi bi-bag-dash"></i>
          <div className="count-products">
            <span className="s-color">0</span>
          </div>
        </div>
        <i className="relink bi bi-box-arrow-up-right"></i>
      </div>
    </div>
  );
};

export default Navbar;
