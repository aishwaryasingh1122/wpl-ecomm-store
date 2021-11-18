import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { EMPTY, first, map, Observable, of, switchMap } from 'rxjs';
import { GUEST_USER } from '../constants';
import { User } from '../models/user';
import { UserService } from './user.service';

/**
 * This service must always be used with and after the RestoreSessionService as it requires user data to validate authorization
 */
@Injectable({
  providedIn: 'root',
})
export class AdminGuardService {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.userService.isAuthenticated) {
      return this.userService.getUserSession().pipe(
        switchMap((res: boolean) => {
          if (res) {
            return this.userService.user$;
          }
          return EMPTY;
        }),
        map((user: User) => {
          return user.role >= 1;
        })
      );
    }
    return false;
  }
}
