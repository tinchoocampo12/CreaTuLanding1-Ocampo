import { useState } from "react";

function ItemCount({ stock, initial, onAdd, disabled }) {
  const [count, setCount] = useState(initial);

  const sumar = () => count < stock && setCount(count + 1);
  const restar = () => count > 1 && setCount(count - 1);

  if (stock === 0) {
    return <p style={{ marginTop: "1rem" }}>⚠️ Sin stock disponible</p>;
  }

  return (
    <div className="added-detail">
      <div className="quanty">
        <button className="min-max min" onClick={restar} disabled={disabled}>
          -
        </button>
        <span>{count}</span>
        <button className="min-max" onClick={sumar} disabled={disabled}>
          +
        </button>
      </div>

      <button
        className="add-cart"
        onClick={() => onAdd(count)}
        disabled={disabled}
        style={{
          backgroundColor: disabled ? "#ccc" : "",
          cursor: disabled ? "not-allowed" : "pointer",
        }}
      >
        {disabled ? "Agregado" : "Agregar al carrito"}
      </button>
    </div>
  );
}

export default ItemCount;
