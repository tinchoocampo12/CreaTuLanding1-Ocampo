import "./itemlistcontainer.css";
import "../globals.css";
import cantera from "../../assets/images/cantera.png";
const ItemListContainer = ({ text }) => {
  return (
    <div className="main-section flex flex-column justify-center align-center wdth-100">
      <h1 className="title-size gradient-text">{text}</h1>
      <div className="nc-events">
        <img src={cantera} alt="" />
      </div>
    </div>
  );
};
export default ItemListContainer;
