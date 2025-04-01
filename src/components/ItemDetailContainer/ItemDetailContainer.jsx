import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ItemDetail from "../ItemDetail/ItemDetail";
import data from "../../data/data.json";
import Navbar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import "./ItemDetailContainer.css";

function ItemDetailContainer() {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const getItem = new Promise((resolve) => {
      setTimeout(() => {
        const producto = data.find((p) => p.id === parseInt(itemId));
        resolve(producto);
      }, 500);
    });

    getItem.then((res) => setItem(res));
  }, [itemId]);

  return (
    <>
      <div className="detail-container">
        {" "}
        <Navbar />
        <div>
          {item ? <ItemDetail {...item} /> : <p>Cargando producto...</p>}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default ItemDetailContainer;
