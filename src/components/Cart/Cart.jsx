import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  getFirestore,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import "./Cart.css";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const [buyer, setBuyer] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [orderId, setOrderId] = useState(null);

  const handleChange = (e) => {
    setBuyer({ ...buyer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const order = {
      buyer,
      items: cart,
      total,
      date: serverTimestamp(),
    };

    const dbRef = getFirestore();

    try {
      console.log("Verificando productos del carrito:", cart);

      for (const item of cart) {
        if (!item.firebaseId) {
          console.error("Error: Producto sin firebaseId:", item);
          alert(
            `No se puede procesar "${item.name}" porque no tiene un ID válido.`
          );
          return;
        }

        const docRef = doc(dbRef, "products", item.firebaseId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const currentStock = docSnap.data().stock;
          if (currentStock < item.quantity) {
            alert(
              `No hay suficiente stock para "${item.name}". Stock actual: ${currentStock}`
            );
            return;
          }
        } else {
          alert(`El producto "${item.name}" no existe en la base de datos.`);
          return;
        }
      }

      for (const item of cart) {
        const docRef = doc(dbRef, "products", item.firebaseId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const currentStock = docSnap.data().stock;
          await updateDoc(docRef, {
            stock: currentStock - item.quantity,
          });
        }
      }

      const docRef = await addDoc(collection(dbRef, "orders"), order);
      setOrderId(docRef.id);
      clearCart();
    } catch (error) {
      console.error("Error al procesar la orden:", error);
      alert(
        "Ocurrió un error al procesar tu compra. Por favor, intentá de nuevo."
      );
    }
  };

  return (
    <>
      <NavBar />
      <div className="cart-container">
        {orderId ? (
          <div className="cart-empty">
            ¡Gracias por tu compra!
            <br />
            Tu número de orden es: <strong>{orderId}</strong>
            <br />
            <button className="btn-checkout" onClick={() => navigate("/shop")}>
              Volver a la tienda
            </button>
          </div>
        ) : cart.length === 0 ? (
          <div className="cart-empty">El carrito está vacío.</div>
        ) : (
          <div className="cart-content">
            <div className="cart-left">
              <h2>Finalizar compra:</h2>
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={`${item.id}-${item.size}`}>
                      <td>
                        <div className="cart-item-info">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="cart-img"
                          />
                          <div className="cart-desc">
                            <strong>{item.name}</strong>
                            <div className="code">Talle: {item.size}</div>
                          </div>
                        </div>
                      </td>
                      <td>{item.quantity}</td>
                      <td>${(item.price * item.quantity).toLocaleString()}</td>
                      <td>
                        <button
                          className="delete"
                          onClick={() => removeFromCart(item.id, item.size)}
                        >
                          <i className="bi bi-trash-fill"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="cart-total">Total: ${total.toLocaleString()}</div>

              <div className="cart-actions">
                <button className="btn-clear" onClick={clearCart}>
                  Vaciar carrito
                </button>
              </div>
            </div>

            <div className="cart-right">
              <h3>Datos del comprador</h3>
              <form className="buyer-form" onSubmit={handleSubmit}>
                <label>
                  Nombre:
                  <input
                    type="text"
                    name="name"
                    value={buyer.name}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={buyer.email}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  Teléfono:
                  <input
                    type="tel"
                    name="phone"
                    value={buyer.phone}
                    onChange={handleChange}
                  />
                </label>
                <button type="submit" className="btn-form">
                  Finalizar compra
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
