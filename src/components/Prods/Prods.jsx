import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Prods.css";
import CartWidget from "../CartWidget/CartWidget";
import { useCart } from "../../context/CartContext";

const Prods = ({ products }) => {
  const [hoveredImages, setHoveredImages] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});
  const { cart, addToCart } = useCart();

  const handleMouseEnter = (id, imageBack) => {
    setHoveredImages((prev) => ({ ...prev, [id]: imageBack }));
  };

  const handleMouseLeave = (id, image) => {
    setHoveredImages((prev) => ({ ...prev, [id]: image }));
  };

  const handleSizeSelect = (id, size) => {
    setSelectedSizes((prev) => {
      const isSameSize = prev[id] === size;
      return {
        ...prev,
        [id]: isSameSize ? null : size,
      };
    });
  };

  const handleAddToCart = (prod) => {
    const selectedSize = selectedSizes[prod.id];
    if (!selectedSize) {
      alert("Por favor selecciona un talle antes de agregar al carrito.");
      return;
    }

    const alreadyInCart = cart.some(
      (item) => item.id === prod.id && item.size === selectedSize
    );

    if (alreadyInCart) {
      console.log("Ya está en el carrito con ese talle.");
      return;
    }

    addToCart(prod, selectedSize);
  };

  if (!Array.isArray(products)) return null;

  return (
    <div className="productos-container">
      {products.map((prod) => {
        const currentImage = hoveredImages[prod.id] || prod.image;
        const selectedSize = selectedSizes[prod.id];

        return (
          <div key={prod.id} className="producto">
            <div className="imagen">
              <Link to={`/shop/item/${prod.id}`}>
                <img
                  src={currentImage}
                  alt={prod.name}
                  className="product-image"
                  onMouseEnter={() => handleMouseEnter(prod.id, prod.imageBack)}
                  onMouseLeave={() => handleMouseLeave(prod.id, prod.image)}
                />
              </Link>
            </div>
            <div className="detalles">
              <p className="categoria">{prod.category}</p>
              <h3>{prod.name}</h3>
              <p className="precio">${prod.price}</p>
              <div className="bp">
                <div className="talles">
                  {prod.sizes.map((size) => (
                    <button
                      key={size}
                      className={`size-button ${
                        selectedSize === size ? "selected" : ""
                      }`}
                      onClick={() => handleSizeSelect(prod.id, size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <div className="add-product">
                  <div className="cart">
                    <button
                      onClick={() => handleAddToCart(prod)}
                      className="add-to-cart-btn"
                    >
                      <CartWidget />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Prods;
