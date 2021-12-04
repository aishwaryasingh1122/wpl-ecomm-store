import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { MaterialModule } from 'src/app/material.module';
import { CheckoutComponent } from './checkout/checkout.component';

@NgModule({
  declarations: [CartComponent, CartItemComponent, CheckoutComponent],
  imports: [CommonModule, CartRoutingModule, MaterialModule],
})
export class CartModule {}
