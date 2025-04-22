import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Shop from "./sites/shop.jsx";
import Home from "./components/Home/Home.jsx";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer.jsx";
import Cart from "./components/Cart/Cart.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/category/:categoryId" element={<Shop />} />
        <Route path="/shop/item/:itemId" element={<ItemDetailContainer />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
