import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterDeletedProducts } from './filter-deleted-products.pipe';

@NgModule({
  declarations: [FilterDeletedProducts],
  imports: [CommonModule],
  exports: [FilterDeletedProducts],
})
export class PipesModule {}
