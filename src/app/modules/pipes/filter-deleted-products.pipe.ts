import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
import { Product } from 'src/app/models/product';

@Pipe({
  name: 'filterDeletedProducts',
})
export class FilterDeletedProducts implements PipeTransform {
  constructor() {}

  transform(products?: Product[], showDeleted = false) {
    if (!products || products.length == 0 || products == null || showDeleted) {
      return products;
    } else {
      return products.filter((product: Product) => !product.isDeleted);
    }
  }
}
