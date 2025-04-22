import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Products.css";
import banner from "../../assets/images/banner-1920-3.webp";
import Navbar from "../NavBar/NavBar.jsx";
import Filters from "../Filters/Filters";
import Options from "../Filters/Options";
import Prods from "../Prods/Prods";
import Footer from "../Footer/Footer";

const Products = ({ products }) => {
  const { categoryId } = useParams();
  const [orden, setOrden] = useState("");
  const [filters, setFilters] = useState({
    categoria: "",
    talle: "",
    minPrice: "",
    maxPrice: "",
  });
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (categoryId) {
      setFilters((prev) => ({ ...prev, categoria: capitalize(categoryId) }));
    }
  }, [categoryId]);

  useEffect(() => {
    let resultado = [...products];

    if (filters.categoria) {
      resultado = resultado.filter((p) => p.category === filters.categoria);
    }

    if (filters.talle) {
      resultado = resultado.filter(
        (p) => Array.isArray(p.size) && p.size.includes(filters.talle)
      );
    }

    if (filters.minPrice) {
      resultado = resultado.filter((p) => p.price >= Number(filters.minPrice));
    }

    if (filters.maxPrice) {
      resultado = resultado.filter((p) => p.price <= Number(filters.maxPrice));
    }

    if (orden === "mayor") resultado.sort((a, b) => b.price - a.price);
    else if (orden === "menor") resultado.sort((a, b) => a.price - b.price);
    else if (orden === "reciente") resultado.sort((a, b) => b.id - a.id);
    else resultado.sort((a, b) => a.id - b.id);

    setFilteredProducts(resultado);
  }, [products, filters, orden]);

  const handleFilterChange = (updated) => {
    setFilters(updated);
  };

  const resetAll = () => {
    setFilters({
      categoria: categoryId ? capitalize(categoryId) : "",
      talle: "",
      minPrice: "",
      maxPrice: "",
    });
    setOrden("");
  };

  const capitalize = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  return (
    <>
      <Navbar />
      <section className="productos">
        <img className="banner" src={banner} alt="Banner" />
        <div className="filters-container">
          <div className="position">Inicio / Tienda</div>
          <Options orden={orden} setOrden={setOrden} />
        </div>
        <div className="sep"></div>
        <div className="products-principal">
          <Filters
            filters={filters}
            onFilterChange={handleFilterChange}
            resetAll={resetAll}
          />
          <div className="productos-container">
            <Prods products={filteredProducts} />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Products;
