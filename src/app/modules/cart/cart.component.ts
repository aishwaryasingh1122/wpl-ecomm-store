import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { Cart, CartItem } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart.service';
import { ActionConfirmDialogComponent } from '../dialogs/action-confirm-dialog/action-confirm-dialog.component';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart$: Observable<Cart>;
  dialogRef: any = null;
  cartTotal: number = 0;

  constructor(
    private cartService: CartService,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog
  ) {
    this.cart$ = this.cartService.cart$.pipe(
      map((cart: Cart) => {
        this.getCartTotal(cart.productData);
        return cart;
      })
    );
  }

  ngOnInit(): void {}

  showRemoveItemConfirmation(cartItem: CartItem) {
    this.dialogRef = this.dialog.open(ActionConfirmDialogComponent, {
      width: '550px',
      closeOnNavigation: true,
      data: {
        title: `Confirm remove item from cart`,
        messageLine1: `Are you sure you want to remove item from cart ?`,
        successText: 'Remove Item',
      },
    });

    this.dialogRef.afterClosed().subscribe((res: boolean) => {
      if (res) {
        this.setItemToCart(cartItem);
      }
    });
  }

  setItemToCart(cartItem: CartItem) {
    this.spinner.show();
    this.cartService.setItemInCart(cartItem).subscribe({
      next: (res: boolean) => {
        this.spinner.hide();
        if (!res) {
          this.toastrService.error(
            'Failed to update item in cart.',
            'Something went wrong. Try again!'
          );
        }
      },
      error: (err: string) => {
        this.spinner.hide();
        this.toastrService.error(err, 'Something went wrong. Try again!');
      },
    });
  }

  handleCartItemQuantityUpdated(cartItem: CartItem) {
    if (cartItem.quantity === 0) {
      this.showRemoveItemConfirmation(cartItem);
    } else {
      this.setItemToCart(cartItem);
    }
  }

  getCartTotal(productData?: CartItem[]) {
    let cartTotal = 0;
    productData?.forEach((item: CartItem) => {
      cartTotal += (item.product?.rate || 1) * item.quantity;
    });

    this.cartTotal = cartTotal;
  }
}
