import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AuthModule } from './modules/auth/auth.module';
import { CartModule } from './modules/cart/cart.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ProductCategoriesModule } from './modules/product-categories/product-categories.module';
import { ProductManagementModule } from './modules/product-management/product-management.module';
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';
import { AdminGuardService } from './services/admin-guard.service';
import { AuthGuardService } from './services/auth-guard.service';
import { RestoreSessionService } from './services/restore-session.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => AuthModule,
      },
    ],
  },
  {
    path: '',
    canActivate: [],
    component: AppLayoutComponent,
    children: [
      {
        path: 'users',
        loadChildren: () => UsersModule,
        canActivate: [
          AuthGuardService,
          RestoreSessionService,
          AdminGuardService,
        ],
      },
      {
        path: 'product-categories',
        loadChildren: () => ProductCategoriesModule,
        canActivate: [
          AuthGuardService,
          RestoreSessionService,
          AdminGuardService,
        ],
      },
      {
        path: 'product-management',
        loadChildren: () => ProductManagementModule,
        canActivate: [
          AuthGuardService,
          RestoreSessionService,
          AdminGuardService,
        ],
      },
      {
        path: 'products',
        loadChildren: () => ProductsModule,
        canActivate: [RestoreSessionService],
      },
      {
        path: 'cart',
        loadChildren: () => CartModule,
        canActivate: [AuthGuardService, RestoreSessionService],
      },
      {
        path: 'orders',
        loadChildren: () => OrdersModule,
        canActivate: [AuthGuardService, RestoreSessionService],
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/products',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
