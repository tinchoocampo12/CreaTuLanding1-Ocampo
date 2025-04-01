import data from "./data/data.json";

export const productsLoader = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, 100);
  });
};
