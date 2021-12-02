import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { combineLatest, map, Observable } from 'rxjs';
import { CartService } from './cart.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class RestoreSessionService {
  constructor(
    private userService: UserService,
    private router: Router,
    private cartService: CartService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.userService.isAuthenticated) {
      return combineLatest([
        this.userService.getUserSession(),
        this.cartService.getUserCart(),
      ]).pipe(
        map((res: boolean[]) => {
          return res[0] && res[1];
        })
      );
    }
    return true;
  }
}
