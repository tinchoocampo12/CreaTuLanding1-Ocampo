import "./Footer.css";
import footerLogo from "../../assets/images/nc-footer-logo.png";
const Footer = () => {
  return (
    <footer className="footer footer-text p-color flex align-center sp-btw">
      <div className="nc-footer-info footer-text p-color flex align-center">
        <img className="footer-logo" src={footerLogo} alt="Nacional-Logo" />
        <p>Club Nacional de Football © 2025. Todos los derechos reservados.</p>
      </div>
      <div className="footer-links footer-text p-color">
        {" "}
        <a href="">Aviso legal</a>
        <span>•</span>
        <a href="">Politica de cookies</a>
        <span>•</span>
        <a href="">Politica de privacidad</a>
        <span>•</span>
        <a href="">nacional.uy</a>
      </div>
    </footer>
  );
};

export default Footer;
