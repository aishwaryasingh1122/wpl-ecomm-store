import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuardService } from 'src/app/services/admin-guard.service';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { ProductsComponent } from './products.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
  },
  {
    path: 'manage',
    component: ManageProductsComponent,
    canActivate: [AuthGuardService, AdminGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
