import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ManageProductsComponent } from '../product-management/manage-products/manage-products.component';

@NgModule({
  declarations: [ProductsComponent],
  imports: [CommonModule, ProductsRoutingModule],
})
export class ProductsModule {}
