import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
import { ProductCategory } from 'src/app/models/product-category';

@Pipe({
  name: 'filterDeleted',
})
export class FilterDeletedCategories implements PipeTransform {
  constructor() {}

  transform(cagtegories?: ProductCategory[], showDeleted = false) {
    if (
      !cagtegories ||
      cagtegories.length == 0 ||
      cagtegories == null ||
      showDeleted
    ) {
      return cagtegories;
    } else {
      return cagtegories.filter(
        (category: ProductCategory) => !category.isDeleted
      );
    }
  }
}
