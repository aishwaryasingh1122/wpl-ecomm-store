import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { API_CONFIG, handleHTTPError } from '../constants';
import { Cart } from '../models/cart';
import { DataService } from './data.service';

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
}
