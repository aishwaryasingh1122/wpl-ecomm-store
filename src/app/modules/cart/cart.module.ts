import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { MaterialModule } from 'src/app/material.module';
import { CheckoutComponent } from './checkout/checkout.component';
import { DialogsModule } from '../dialogs/dialogs.module';

@NgModule({
  declarations: [CartComponent, CartItemComponent, CheckoutComponent],
  imports: [CommonModule, CartRoutingModule, MaterialModule, DialogsModule],
})
export class CartModule {}
