import { useParams } from "react-router-dom";
import Products from "../components/Products/Products";

const Shop = ({ products }) => {
  const { categoryId } = useParams();

  const filtered = categoryId
    ? products.filter(
        (p) => p.category.toLowerCase() === categoryId.toLowerCase()
      )
    : products;

  return <Products products={filtered} />;
};

export default Shop;
