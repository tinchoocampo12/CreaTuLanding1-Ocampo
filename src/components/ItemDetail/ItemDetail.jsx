import { useState } from "react";
import ItemCount from "../ItemCount/ItemCount";
import "./ItemDetail.css";
import { useCart } from "../../context/CartContext";

function ItemDetail({
  firebaseId,
  name,
  description,
  price,
  image,
  imageBack,
  size,
  stock,
}) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [productoAgregado, setProductoAgregado] = useState(false);
  const { addToCart } = useCart();

  const handleAdd = (quantity) => {
    if (!selectedSize) {
      alert("Por favor selecciona un talle.");
      return;
    }

    const item = {
      id: firebaseId,
      firebaseId,
      name,
      price,
      image,
    };

    addToCart(item, selectedSize, quantity);
    setProductoAgregado(true);
  };

  const sizes = Array.isArray(size)
    ? size
    : String(size)
        .split(",")
        .map((s) => s.trim());

  return (
    <div className="item-detail-container">
      <div className="image-section">
        <img
          src={hovered ? imageBack : image}
          alt={name}
          className="product-main-image"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        />
      </div>
      <div className="details-section">
        <h2>{name}</h2>
        <p className="description">{description}</p>
        <p className="price">${price}</p>
        <p className="stock">Stock disponible: {stock} Uds.</p>

        <div className="sizes">
          <label>Talle:</label>
          <div className="size-buttons">
            {sizes.map((s) => (
              <button
                key={s}
                className={`size-button ${
                  selectedSize === s ? "selected" : ""
                }`}
                onClick={() => setSelectedSize(s)}
                disabled={stock === 0}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="buy-section">
          {stock > 0 ? (
            <ItemCount
              stock={stock}
              initial={1}
              onAdd={handleAdd}
              disabled={productoAgregado}
            />
          ) : (
            <p className="sin-stock">Sin stock disponible</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;
