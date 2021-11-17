import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { API_CONFIG, handleHTTPError } from '../constants';
import { User, UserLoginParams, UserRegisterParams } from '../models/user';
import { DataService } from './data.service';
import { SecureStorageService } from './secure-storage.service';

const guest: User = {
  _id: 'guest',
  firstName: 'Guest',
  lastName: 'User',
  email: 'guest@domain.com',
  isActive: false,
  isVerified: false,
  role: -1,
  createdAt: '',
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject(guest); // Initialize user as guest unless logged in.
  user$: Observable<User> = this.userSubject.asObservable();

  constructor(
    private dataService: DataService,
    private secureStorageService: SecureStorageService
  ) {
    this.getUserSession().subscribe();
  }

  login(userLoginParams: UserLoginParams): Observable<boolean> {
    return this.dataService
      .sendPOST(API_CONFIG.USER.LOGIN, undefined, userLoginParams)
      .pipe(
        map((res: HttpResponse<any>) => {
          if (res && res.status == 200) {
            this.secureStorageService.setValue('token', res.body.token);
            this.userSubject.next(res.body);
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
}
