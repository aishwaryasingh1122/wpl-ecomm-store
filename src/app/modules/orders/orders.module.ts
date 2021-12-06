import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { PipesModule } from '../pipes/pipes.module';
import { MomentModule } from 'ngx-moment';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [OrdersComponent, OrderDetailsComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    PipesModule,
    MomentModule,
    MaterialModule,
  ],
})
export class OrdersModule {}
