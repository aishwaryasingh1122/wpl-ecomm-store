import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart';

@Component({
  selector: 'cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
  @Input('cart-item') cartItem?: CartItem;

  constructor() {}

  ngOnInit(): void {}
}
