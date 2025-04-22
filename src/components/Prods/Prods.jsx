import { useState } from "react";
import { Link } from "react-router-dom";
import CartWidget from "../CartWidget/CartWidget";
import { useCart } from "../../context/CartContext";
import "./Prods.css";

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
    const selectedSize = selectedSizes[prod.firebaseId];
    if (!selectedSize) {
      alert("Por favor selecciona un talle antes de agregar al carrito.");
      return;
    }

    const alreadyInCart = cart.some(
      (item) => item.id === prod.firebaseId && item.size === selectedSize
    );

    if (alreadyInCart) return;

    addToCart(
      {
        id: prod.firebaseId,
        firebaseId: prod.firebaseId,
        name: prod.name,
        price: prod.price,
        image: prod.image,
      },
      selectedSize
    );
  };

  if (!Array.isArray(products) || products.length === 0) {
    return <div>No se encontraron productos.</div>;
  }

  return (
    <div className="productos-container">
      {products.map((prod) => {
        const sizes = Array.isArray(prod.size)
          ? prod.size
          : String(prod.size)
              .split(",")
              .map((s) => s.trim());

        const currentImage =
          hoveredImages[prod.firebaseId] || prod.image || "default-image.jpg";
        const selectedSize = selectedSizes[prod.firebaseId];

        return (
          <div key={prod.firebaseId} className="producto">
            <div className="imagen">
              <Link to={`/shop/item/${prod.firebaseId}`}>
                <img
                  src={currentImage}
                  alt={prod.name}
                  className="product-image"
                  onMouseEnter={() =>
                    handleMouseEnter(prod.firebaseId, prod.imageBack)
                  }
                  onMouseLeave={() =>
                    handleMouseLeave(prod.firebaseId, prod.image)
                  }
                />
              </Link>
            </div>
            <div className="detalles">
              <p className="categoria">{prod.category}</p>
              <h3>{prod.name}</h3>
              <p className="precio">${prod.price}</p>
              <div className="bp">
                <div className="talles">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      className={`size-button ${
                        selectedSize === size ? "selected" : ""
                      }`}
                      onClick={() => handleSizeSelect(prod.firebaseId, size)}
                      disabled={prod.stock === 0}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <div className="add-product">
                  <div className="cart">
                    {prod.stock === 0 ? (
                      <span className="sin-stock">Agotado</span>
                    ) : (
                      <button
                        onClick={() => handleAddToCart(prod)}
                        className="add-to-cart-btn"
                      >
                        <CartWidget />
                      </button>
                    )}
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
