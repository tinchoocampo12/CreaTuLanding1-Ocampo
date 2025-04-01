import { useState } from "react";

function ItemCount({ stock, initial, onAdd }) {
  const [count, setCount] = useState(initial);

  const sumar = () => count < stock && setCount(count + 1);
  const restar = () => count > 1 && setCount(count - 1);

  return (
    <div className="added-detail">
      <div className="quanty">
        {" "}
        <button className="min-max min" onClick={restar}>
          -
        </button>
        <span>{count}</span>
        <button className="min-max" onClick={sumar}>
          +
        </button>
      </div>

      <button className="add-cart" onClick={() => onAdd(count)}>
        Agregar al carrito
      </button>
    </div>
  );
}

export default ItemCount;
