import { ProductCategory } from './product-category';

export interface Product {
  _id: string;
  name: string;
  weight: number;
  unit: string;
  rate: number;
  category: ProductCategory;
  createdAt: string;
  imageUrl: string;
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
