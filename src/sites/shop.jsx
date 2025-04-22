import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItems } from "../firebase/db";
import Products from "../components/Products/Products";

const Shop = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getItems().then((items) => {
      setProducts(items);
    });
  }, []);

  const filtered = categoryId
    ? products.filter(
        (p) => p.category.toLowerCase() === categoryId.toLowerCase()
      )
    : products;

  return <Products products={filtered} />;
};

export default Shop;
