import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
import { Product } from 'src/app/models/product';

@Pipe({
  name: 'filterByCategory',
})
export class FilterByCategoryPipe implements PipeTransform {
  constructor() {}

  transform(products?: Product[], category?: any) {
    console.log('Products filter category', products, category);
    if (!products || products.length == 0 || products == null || !category) {
      return products;
    } else {
      return products.filter(
        (product: Product) => product.category._id === category
      );
    }
  }
}
