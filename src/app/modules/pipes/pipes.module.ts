import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterDeletedProducts } from './filter-deleted-products.pipe';
import { FilterByCategoryPipe } from './filter-product-category.pipe';
import { FilterDeletedCategories } from './filter-deleted-categories.pipe';
import { SearchProductsPipe } from './products-search.pipe';

@NgModule({
  declarations: [
    FilterDeletedProducts,
    FilterByCategoryPipe,
    FilterDeletedCategories,
    SearchProductsPipe,
  ],
  imports: [CommonModule],
  exports: [
    FilterDeletedProducts,
    FilterByCategoryPipe,
    FilterDeletedCategories,
    SearchProductsPipe,
  ],
})
export class PipesModule {}
