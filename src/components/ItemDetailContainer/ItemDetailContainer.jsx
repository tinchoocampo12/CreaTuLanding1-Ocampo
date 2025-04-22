import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getItems } from "../../firebase/db";
import ItemDetail from "../ItemDetail/ItemDetail";
import Navbar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import "./ItemDetailContainer.css";

function ItemDetailContainer() {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getItems().then((items) => {
      const producto = items.find((p) => p.firebaseId === itemId);
      setItem(producto);
      setLoading(false);
    });
  }, [itemId]);

  return (
    <>
      <div className="detail-container">
        <Navbar />
        <div>
          {loading ? (
            <p>Cargando producto...</p>
          ) : item ? (
            <ItemDetail {...item} />
          ) : (
            <p>Producto no encontrado</p>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default ItemDetailContainer;
