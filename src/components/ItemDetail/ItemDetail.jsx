import { useState } from "react";
import ItemCount from "../ItemCount/ItemCount";
import "./ItemDetail.css";
import { useCart } from "../../context/CartContext";

function ItemDetail({ id, name, description, price, image, imageBack, sizes }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [hovered, setHovered] = useState(false);
  const { addToCart } = useCart();

  const handleAdd = (quantity) => {
    if (!selectedSize) {
      alert("Por favor selecciona un talle.");
      return;
    }

    const item = {
      id,
      name,
      price,
      image,
    };

    addToCart(item, selectedSize, quantity);
  };

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

        <div className="sizes">
          <label>Talle:</label>
          <div className="size-buttons">
            {sizes.map((size) => (
              <button
                key={size}
                className={`size-button ${
                  selectedSize === size ? "selected" : ""
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="buy-section">
          <ItemCount stock={10} initial={1} onAdd={handleAdd} />
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;
