export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
}

export type ProductList = Product[];
