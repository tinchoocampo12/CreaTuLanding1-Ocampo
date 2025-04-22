import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="notfound-container">
      <h1>404 :(</h1>
      <p>Página no encontrada</p>
      <Link to="/shop" className="back-button">
        Volver a la tienda
      </Link>
    </div>
  );
};

export default NotFound;
