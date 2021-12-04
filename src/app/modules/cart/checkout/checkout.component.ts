import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { getCartTotal } from 'src/app/constants';
import { Address } from 'src/app/models/address';
import { Cart } from 'src/app/models/cart';
import { AddressService } from 'src/app/services/address.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  cart$: Observable<Cart>;
  addresses$: Observable<Address[]>;
  orderTotal: number = 0;
  selectedAddress?: Address;

  constructor(
    private cartService: CartService,
    private addressService: AddressService,
    private toastrService: ToastrService
  ) {
    this.cart$ = this.cartService.cart$.pipe(
      map((cart: Cart) => {
        this.orderTotal = getCartTotal(cart?.productData!);
        return cart;
      })
    );

    this.addresses$ = this.addressService.address$;
  }

  ngOnInit(): void {
    this.addressService.getAddressesForUser().subscribe({
      next: (res: boolean) => {
        if (!res) {
          this.toastrService.error(
            'Failed to load delivery addresses.',
            'Something went wrong. Try again!'
          );
        }
      },
      error: (err) => {
        this.toastrService.error(err, 'Something went wrong. Try again!');
      },
    });
  }

  get isMobileDisplay() {
    return window.screen.width <= 576;
  }

  setSelectedAddress(address: Address) {
    this.selectedAddress = address;
  }
}
