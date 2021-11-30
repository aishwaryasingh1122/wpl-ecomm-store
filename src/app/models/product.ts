import { ProductCategory } from './product-category';

export interface Product {
  _id: string;
  name: string;
  weight: number;
  unit: string;
  rate: number;
  category: ProductCategory;
  createdAt: string;
  imageURL: string;
  isDeleted: boolean;
  quantity: number;
  bufferQuantity: number;
}

export interface AddProductParams {
  name: string;
  weight: number;
  unit: string;
  rate: number;
  category: string;
  imgData: string;
  fileName: string;
}

export interface UpdateQuantityParams {
  productId: string;
  quantity?: number;
  bufferQuantity?: number;
}
