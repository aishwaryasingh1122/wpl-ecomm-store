import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterDeletedProducts } from './filter-deleted-products.pipe';
import { FilterByCategoryPipe } from './filter-product-category.pipe';

@NgModule({
  declarations: [FilterDeletedProducts, FilterByCategoryPipe],
  imports: [CommonModule],
  exports: [FilterDeletedProducts, FilterByCategoryPipe],
})
export class PipesModule {}
