import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ManageProductsComponent } from '../product-management/manage-products/manage-products.component';
import { ProductTileComponent } from './product-tile/product-tile.component';
import { PipesModule } from '../pipes/pipes.module';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProductsComponent, ProductTileComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    PipesModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ProductsModule {}
