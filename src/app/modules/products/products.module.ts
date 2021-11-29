import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { ProductCategoriesModule } from '../product-categories/product-categories.module';
import { NgxFileHelpersModule } from 'ngx-file-helpers';

@NgModule({
  declarations: [ProductsComponent, ManageProductsComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ProductCategoriesModule,
    NgxFileHelpersModule,
  ],
})
export class ProductsModule {}
