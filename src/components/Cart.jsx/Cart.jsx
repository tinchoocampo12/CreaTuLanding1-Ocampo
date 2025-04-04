import { useCart } from "../context/CartContext";
import "./Cart.css";

const Cart = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();

  const handleIncrease = (item) => {
    addToCart(item, item.size);
  };

  const handleRemoveItem = (item) => {
    removeFromCart(item.id, item.size);
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h2>ARTÍCULOS ({cart.length})</h2>
      <table className="cart-table">
        <thead>
          <tr>
            <th> </th>
            <th> </th>
            <th>CANT.</th>
            <th>PRECIO</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, idx) => (
            <tr key={idx}>
              <td>
                <img
                  src={item.image}
                  alt={item.name || item.title}
                  className="cart-img"
                />
              </td>
              <td className="cart-desc">
                <strong>{item.name || item.title}</strong>
                <div>Talle {item.size}</div>
                <div className="code">Código {item.id}</div>
              </td>
              <td>
                <div className="qty-control">
                  <button disabled>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrease(item)}>+</button>
                </div>
              </td>
              <td>${(item.price * item.quantity).toLocaleString()}</td>
              <td>
                <button
                  onClick={() => handleRemoveItem(item)}
                  className="delete"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="cart-total">Total: ${total.toLocaleString()}</div>
    </div>
  );
};

export default Cart;
