import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const getItems = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const items = querySnapshot.docs.map((doc) => ({
      firebaseId: doc.id,
      ...doc.data(),
    }));
    return items;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return [];
  }
};
