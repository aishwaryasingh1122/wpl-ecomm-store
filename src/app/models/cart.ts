import { Product } from './product';

export interface Cart {
  _id?: string;
  userId?: string;
  productData?: CartItem[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
