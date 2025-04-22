import { useEffect, useState } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    talle: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const db = getFirestore();
    const productsCollection = collection(db, "products");

    getDocs(productsCollection)
      .then((snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(docs);
        setFilteredProducts(docs);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = [...products];

    if (filters.talle) {
      filtered = filtered.filter((product) =>
        product.sizes.includes(filters.talle)
      );
    }

    setFilteredProducts(filtered);
  }, [filters, products]);

  const handleTalleFilterChange = (talle) => {
    setFilters({ ...filters, talle });
  };

  if (loading) {
    return <div>Cargando productos...</div>;
  }

  if (error) {
    return <div>Error al cargar los productos: {error}</div>;
  }

  return (
    <div>
      <div>
        <button onClick={() => handleTalleFilterChange("M")}>
          Filtrar por M
        </button>
        <button onClick={() => handleTalleFilterChange("L")}>
          Filtrar por L
        </button>
        <button onClick={() => handleTalleFilterChange("")}>Ver todos</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="border rounded-xl p-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto mb-2"
              />
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p>${product.price}</p>
              <p>Talles: {product.sizes.join(", ")}</p>
            </div>
          ))
        ) : (
          <div>No se encontraron productos para este filtro.</div>
        )}
      </div>
    </div>
  );
};

export default ItemListContainer;
