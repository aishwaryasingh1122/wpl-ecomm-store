import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { getCartTotal } from 'src/app/constants';
import { Cart } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  cart$: Observable<Cart>;
  orderTotal: number = 0;

  constructor(private cartService: CartService) {
    this.cart$ = this.cartService.cart$.pipe(
      map((cart: Cart) => {
        this.orderTotal = getCartTotal(cart?.productData!);
        return cart;
      })
    );
  }

  ngOnInit(): void {}

  get isMobileDisplay() {
    return window.screen.width <= 576;
  }
}
