import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersManagementRoutingModule } from './orders-management-routing.module';
import { OrdersManagementComponent } from './orders-management.component';
import { MaterialModule } from 'src/app/material.module';
import { PipesModule } from '../pipes/pipes.module';
import { MomentModule } from 'ngx-moment';
import { DialogsModule } from '../dialogs/dialogs.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [OrdersManagementComponent],
  imports: [
    CommonModule,
    OrdersManagementRoutingModule,
    MaterialModule,
    PipesModule,
    MomentModule,
    DialogsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class OrdersManagementModule {}
