import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/models/product';
import { some, method } from 'lodash';

@Pipe({
  name: 'searchProducts',
})
export class SearchProductsPipe implements PipeTransform {
  constructor() {}

  transform(products?: Product[], searchText?: string) {
    if (!products || products.length == 0 || products == null || !searchText) {
      return products;
    } else if (searchText && searchText.length == 0) {
      return products;
    } else {
      const result = [];
      /** Search for individual search terms, and place result at the same index position */
      searchText = searchText.toLowerCase();

      for (const product of products) {
        /** tagsToSearchFrom is an array containing product name, category, etc */
        let tagsToSearchFrom: string[] = [];
        tagsToSearchFrom = tagsToSearchFrom.map(function (x: string) {
          return x.toLowerCase();
        });
        tagsToSearchFrom.push(product.name.toLowerCase());
        tagsToSearchFrom.push(product.category.title.toLowerCase());

        /** If search text is a substring of any element of the array, then push that element as result */
        if (some(tagsToSearchFrom, method('includes', searchText))) {
          result.push(product);
        }
      }
      return result;
    }
  }
}
