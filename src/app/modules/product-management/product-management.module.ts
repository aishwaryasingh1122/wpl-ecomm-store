import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductManagementRoutingModule } from './product-management-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFileHelpersModule } from 'ngx-file-helpers';
import { MaterialModule } from 'src/app/material.module';
import { ProductManagementComponent } from './product-management.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { MomentModule } from 'ngx-moment';
import { DialogsModule } from '../dialogs/dialogs.module';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [ProductManagementComponent, ManageProductsComponent],
  imports: [
    CommonModule,
    ProductManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxFileHelpersModule,
    MomentModule,
    DialogsModule,
    PipesModule,
  ],
})
export class ProductManagementModule {}
