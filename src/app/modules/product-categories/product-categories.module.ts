import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductCategoriesRoutingModule } from './product-categories-routing.module';
import { ProductCategoriesComponent } from './product-categories.component';
import { MaterialModule } from 'src/app/material.module';
import { MomentModule } from 'ngx-moment';
import { DialogsModule } from '../dialogs/dialogs.module';
import { FilterDeletedCategories } from './filter-categories.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProductCategoriesComponent, FilterDeletedCategories],
  imports: [
    CommonModule,
    ProductCategoriesRoutingModule,
    MaterialModule,
    MomentModule,
    DialogsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ProductCategoriesModule {}
