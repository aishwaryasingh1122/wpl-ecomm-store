import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuardService } from 'src/app/services/admin-guard.service';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { ProductManagementComponent } from './product-management.component';

const routes: Routes = [
  {
    path: '',
    component: ProductManagementComponent,
  },
  {
    path: 'modify',
    component: ManageProductsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductManagementRoutingModule {}
