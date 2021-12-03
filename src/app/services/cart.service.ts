import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { API_CONFIG, handleHTTPError } from '../constants';
import { Cart, CartItem } from '../models/cart';
import { DataService } from './data.service';
import { findIndex } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSubject = new BehaviorSubject<Cart>({});
  cart$: Observable<Cart> = this.cartSubject.asObservable();

  constructor(private dataService: DataService) {}

  getUserCart(): Observable<boolean> {
    return this.dataService.sendGET(API_CONFIG.CART.GET_CART).pipe(
      map((res: HttpResponse<any>) => {
        if (res && res.status == 200) {
          this.cartSubject.next(res.body);
        }

        return res && res.status == 200;
      }, catchError(handleHTTPError))
    );
  }

  setItemInCart(cartItem: CartItem) {
    return this.dataService
      .sendPOST(API_CONFIG.CART.SET_ITEM_TO_CART, undefined, cartItem)
      .pipe(
        map((res: HttpResponse<any>) => {
          if (res && res.status == 200) {
            const cart: Cart = this.cartSubject.value;
            const itemIndexToUpdate = findIndex(
              cart.productData,
              (item: CartItem) => item.product._id === cartItem.productId
            );

            if (itemIndexToUpdate != -1) {
              if (cartItem.quantity === 0) {
                cart.productData?.splice(itemIndexToUpdate, 1);
              } else {
                cart.productData![itemIndexToUpdate].quantity =
                  cartItem.quantity;
              }
            }

            this.cartSubject.next({ ...cart });
          }

          return res && res.status === 200;
        }, catchError(handleHTTPError))
      );
  }
}
