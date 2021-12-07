import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, switchMap, EMPTY, map } from 'rxjs';
import { User } from '../models/user';
import { OrdersService } from './orders.service';

@Injectable({
  providedIn: 'root',
})
export class OrderDetailsGuardService {
  constructor(private ordersService: OrdersService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const orderId = next.params['orderId'];

    console.log('order Id', orderId);
    if (!orderId) {
      this.router.navigate(['/orders']);
      return false;
    }

    return this.ordersService.getOrderById(orderId);
  }
}
