import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterDeletedProducts } from './filter-deleted-products.pipe';
import { FilterByCategoryPipe } from './filter-product-category.pipe';
import { FilterDeletedCategories } from './filter-deleted-categories.pipe';
import { SearchProductsPipe } from './products-search.pipe';
import { GroupOrdersByDatePipe } from './group-orders-by-date.pipe';
import { SummaryPipe } from './summary.pipe';
import { FilterOrdersByStatusPipe } from './filter-orders-by-status.pipe';

@NgModule({
  declarations: [
    FilterDeletedProducts,
    FilterByCategoryPipe,
    FilterDeletedCategories,
    SearchProductsPipe,
    GroupOrdersByDatePipe,
    SummaryPipe,
    FilterOrdersByStatusPipe,
  ],
  imports: [CommonModule],
  exports: [
    FilterDeletedProducts,
    FilterByCategoryPipe,
    FilterDeletedCategories,
    SearchProductsPipe,
    GroupOrdersByDatePipe,
    SummaryPipe,
    FilterOrdersByStatusPipe,
  ],
})
export class PipesModule {}
