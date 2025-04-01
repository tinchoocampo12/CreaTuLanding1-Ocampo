import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import data from "../../data/data.json";
import Prods from "../Prods/Prods";

function ItemListContainer() {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getData = new Promise((resolve) => {
      setTimeout(() => {
        if (categoryId) {
          resolve(
            data.filter(
              (p) => p.category.toLowerCase() === categoryId.toLowerCase()
            )
          );
        } else {
          resolve(data);
        }
      }, 500);
    });

    getData.then((res) => setItems(res));
  }, [categoryId]);

  return (
    <div>
      <Prods products={items} />
    </div>
  );
}

export default ItemListContainer;
