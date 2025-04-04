import "./Filters.css";

const Options = ({ orden, setOrden }) => {
  return (
    <div className="order-group">
      <h4>ORDENAR POR:</h4>
      <select
        value={orden}
        onChange={(e) => setOrden(e.target.value)}
        className="order-select"
      >
        <option value="">Seleccionar</option>
        <option value="mayor">Precio: mayor a menor</option>
        <option value="menor">Precio: menor a mayor</option>
        <option value="reciente">Más recientes</option>
      </select>
    </div>
  );
};

export default Options;
