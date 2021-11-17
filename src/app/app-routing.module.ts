import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AuthModule } from './modules/auth/auth.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';

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
      },
      {
        path: 'products',
        loadChildren: () => ProductsModule,
      },
      {
        path: 'orders',
        loadChildren: () => OrdersModule,
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
