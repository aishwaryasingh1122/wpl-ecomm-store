import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderDetailsGuardService } from 'src/app/services/order-details-guard.service';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrdersComponent } from './orders.component';

const routes: Routes = [
  {
    path: '',
    component: OrdersComponent,
  },
  {
    path: 'details/:orderId',
    component: OrderDetailsComponent,
    canActivate: [OrderDetailsGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
