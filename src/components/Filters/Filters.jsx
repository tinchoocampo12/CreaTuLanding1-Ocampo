import { useEffect, useState } from "react";
import { getItems } from "../../firebase/db";
import "./Filters.css";

const Filters = ({ filters, onFilterChange, resetAll }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const items = await getItems();
        setProducts(items);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categoriasUnicas = [...new Set(products.map((item) => item.category))];
  const tallesUnicos = [
    ...new Set(products.flatMap((item) => item.size || [])),
  ].sort();

  const handleChange = (updatedFilter) => {
    onFilterChange({ ...filters, ...updatedFilter });
  };

  return (
    <div className="filter-box">
      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <>
          <div className="filter-group">
            <h4>CATEGORÍA</h4>
            {categoriasUnicas.map((cat) => (
              <div key={cat} className="radio-line">
                <input
                  type="radio"
                  name="categoria"
                  id={cat}
                  checked={filters.categoria === cat}
                  onChange={() => handleChange({ categoria: cat })}
                />
                <label htmlFor={cat}>{cat}</label>
              </div>
            ))}
            <div className="radio-line">
              <input
                type="radio"
                name="categoria"
                id="all-cat"
                checked={filters.categoria === ""}
                onChange={() => handleChange({ categoria: "" })}
              />
              <label htmlFor="all-cat">Todas</label>
            </div>
          </div>

          <div className="filter-group">
            <h4>TALLE</h4>
            <div className="sizes-filter">
              {tallesUnicos.map((size) => (
                <button
                  key={size}
                  className={`size-filter-btn ${
                    filters.talle === size ? "selected" : ""
                  }`}
                  onClick={() =>
                    handleChange({
                      talle: filters.talle === size ? "" : size,
                    })
                  }
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h4>PRECIO ($)</h4>
            <div className="price-inputs">
              <input
                type="number"
                placeholder="Desde"
                value={filters.minPrice || ""}
                onChange={(e) =>
                  handleChange({ minPrice: parseFloat(e.target.value) || "" })
                }
              />
              <input
                type="number"
                placeholder="Hasta"
                value={filters.maxPrice || ""}
                onChange={(e) =>
                  handleChange({ maxPrice: parseFloat(e.target.value) || "" })
                }
              />
            </div>
          </div>

          <button className="reset-filters-btn" onClick={resetAll}>
            Reiniciar filtros
          </button>
        </>
      )}
    </div>
  );
};

export default Filters;
