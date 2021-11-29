import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductManagementRoutingModule } from './product-management-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFileHelpersModule } from 'ngx-file-helpers';
import { MaterialModule } from 'src/app/material.module';
import { ProductCategoriesModule } from '../product-categories/product-categories.module';
import { ProductManagementComponent } from './product-management.component';

@NgModule({
  declarations: [
    ProductManagementComponent
  ],
  imports: [
    CommonModule,
    ProductManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ProductCategoriesModule,
    NgxFileHelpersModule,
  ],
})
export class ProductManagementModule {}
