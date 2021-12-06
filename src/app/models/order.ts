import { ORDER_STATUS } from '../constants';
import { CartItem } from './cart';

export interface Order {
  _id?: string;
  orderTotal?: number;
  user?: string;
  status?: ORDER_STATUS;
  productData?: CartItem[];
  createdAt?: string;
}

export interface OrderGroup {
  orderDate: string;
  orders: Order[];
}
