import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Shop from "./sites/shop.jsx";
import Home from "./components/Home/Home.jsx";
import { productsLoader } from "./helpers.js";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer.jsx";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    productsLoader().then((res) => {
      setProducts(res);
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route index element={<Home products={products} />} />
        <Route path="/shop" element={<Shop products={products} />} />
        <Route
          path="/shop/category/:categoryId"
          element={<Shop products={products} />}
        />
        <Route path="/shop/item/:itemId" element={<ItemDetailContainer />} />
        <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
