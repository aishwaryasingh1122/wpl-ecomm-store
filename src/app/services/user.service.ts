import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { API_CONFIG, GUEST_USER, handleHTTPError } from '../constants';
import { User, UserLoginParams, UserRegisterParams } from '../models/user';
import { DataService } from './data.service';
import { SecureStorageService } from './secure-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject(GUEST_USER); // Initialize user as guest unless logged in.
  user$: Observable<User> = this.userSubject.asObservable();

  constructor(
    private dataService: DataService,
    private secureStorageService: SecureStorageService
  ) {}

  login(userLoginParams: UserLoginParams): Observable<boolean> {
    return this.dataService
      .sendPOST(API_CONFIG.USER.LOGIN, undefined, userLoginParams)
      .pipe(
        map((res: HttpResponse<any>) => {
          if (res && res.status == 200) {
            this.secureStorageService.setValue('token', res.body.token);
            this.userSubject.next(res.body.user);
          }
          return res && res.status == 200;
        }),
        catchError(handleHTTPError)
      );
  }

  register(userRegisterParams: UserRegisterParams): Observable<boolean> {
    return this.dataService
      .sendPOST(API_CONFIG.USER.REGISTER, undefined, userRegisterParams)
      .pipe(
        map((res: HttpResponse<any>) => {
          return res && res.status == 200;
        }),
        catchError(handleHTTPError)
      );
  }

  verifyAccount(userId: string): Observable<boolean> {
    return this.dataService
      .sendGET(API_CONFIG.USER.VERIFY_ACCOUNT.replace(':userId', userId))
      .pipe(
        map((res: HttpResponse<any>) => {
          return res && res.status === 200;
        }),
        catchError(handleHTTPError)
      );
  }

  getUserSession(): Observable<boolean> {
    return this.dataService.sendGET(API_CONFIG.USER.GET_SESSION).pipe(
      map((res: HttpResponse<any>) => {
        if (res && res.status === 200) {
          this.userSubject.next(res.body);
        }
        return res && res.status === 200;
      }),
      catchError(handleHTTPError)
    );
  }

  get isAuthenticated(): boolean {
    return (
      this.secureStorageService.getValue('token') &&
      this.secureStorageService.getValue('token') != null &&
      this.secureStorageService.getValue('token') != undefined
    );
  }

  signout() {
    this.secureStorageService.clearStorage();
    this.userSubject.next(GUEST_USER);
  }
}
