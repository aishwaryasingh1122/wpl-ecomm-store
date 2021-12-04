import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UPDATE_QUANTITY } from 'src/app/constants';
import { CartItem } from 'src/app/models/cart';

@Component({
  selector: 'cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
  @Input('cart-item') cartItem?: CartItem;

  @Output('updatedQuantity') updatedQuantity = new EventEmitter();
  UPDATE_QUANTITY = UPDATE_QUANTITY;

  constructor() {}

  ngOnInit(): void {}

  updateQuantity(updateAction: UPDATE_QUANTITY) {
    if (this.cartItem) {
      this.updatedQuantity.emit({
        product: this.cartItem.product,
        productId: this.cartItem?.product?._id,
        quantity:
          updateAction == UPDATE_QUANTITY.DECREMENT
            ? this.cartItem?.quantity - 1
            : this.cartItem?.quantity + 1,
      });
    }
  }
}
