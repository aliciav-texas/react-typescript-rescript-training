import { findIndex, get, reduce, matches } from "lodash";
import { Product, ProductList } from "../types/products";

// pre-defined type alias
// type MyFunctionSignature = (Product) => number;
// In line typing is suggested for a function that is not being re-used

//Alias approach is good for functions that are passed as props or reused.

export const calculateProductPrice = (product: Product): number =>
  get(product, "quantity") * get(product, "price");

export const calculateTotalPrice = (
  cart: ProductList,
  initialTotal: number
): number =>
  reduce(
    cart,
    (result, product) => {
      result += calculateProductPrice(product);
      return result;
    },
    initialTotal
  );

export const findIndexAndUpdateQuantity = (
  cart: ProductList,
  id: string,
  quantity: number
): ProductList => {
  const productIndex = findIndex(cart, matches({ id }));
  const updateProduct = (product, index) =>
    index === productIndex ? { ...product, quantity } : { ...product };
  return cart.map(updateProduct);
};
