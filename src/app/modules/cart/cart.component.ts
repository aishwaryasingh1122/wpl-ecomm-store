import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart$: Observable<Cart>;
  showLoader = true;

  constructor(
    private cartService: CartService,
    private toastrService: ToastrService
  ) {
    this.cart$ = this.cartService.cart$;
  }

  ngOnInit(): void {}
}
