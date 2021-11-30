import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  throwError,
} from 'rxjs';
import { API_CONFIG, GUEST_USER, handleHTTPError } from '../constants';
import {
  AssignUserRoleParams,
  User,
  UserLoginParams,
  UserRegisterParams,
} from '../models/user';
import { DataService } from './data.service';
import { SecureStorageService } from './secure-storage.service';
import { find } from 'lodash';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject(GUEST_USER); // Initialize user as guest unless logged in.
  user$: Observable<User> = this.userSubject.asObservable();

  private userListSubect = new BehaviorSubject([]);
  userList$: Observable<User[]> = this.userListSubect.asObservable();

  constructor(
    private dataService: DataService,
    private router: Router,
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
      catchError((err: HttpErrorResponse) => {
        if (err.status == 401) {
          this.signout();
          this.router.navigate(['/products']);
        }
        throw err.error.message;
      })
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

  // Admin Services
  findAllUsers(): Observable<boolean> {
    return this.dataService.sendGET(API_CONFIG.ADMIN.USERS.GET_ALL).pipe(
      map((res: HttpResponse<any>) => {
        if (res && res.status == 200) {
          this.userListSubect.next(res.body);
        }
        return res && res.status == 200;
      }),
      catchError(handleHTTPError)
    );
  }

  assignUserRole(params: AssignUserRoleParams): Observable<boolean> {
    return this.dataService
      .sendPUT(
        API_CONFIG.ADMIN.USERS.ASSIGN_ROLE.replace(
          ':userId',
          params.userId
        ).replace(':role', params.role + '')
      )
      .pipe(
        map((res: HttpResponse<any>) => {
          if (res && res.status == 200) {
            const users = this.userListSubect.value;
            const userToUpdate: User | undefined = find(
              users,
              (user: User) => user._id === params.userId
            );

            if (userToUpdate) {
              userToUpdate.role = params.role;
              this.userListSubect.next([...users]);
            }
          }
          return res && res.status == 200;
        }),
        catchError(handleHTTPError)
      );
  }

  toggleAccountStatus(userId: string) {
    return this.dataService
      .sendPUT(API_CONFIG.ADMIN.USERS.TOGGLE_ACCOUNT.replace(':userId', userId))
      .pipe(
        map((res: HttpResponse<any>) => {
          if (res && res.status == 200) {
            const users = this.userListSubect.value;
            const userToUpdate: User | undefined = find(
              users,
              (user: User) => user._id === userId
            );

            if (userToUpdate) {
              userToUpdate.isActive = !userToUpdate.isActive;
              this.userListSubect.next([...users]);
            }
          }
          return res && res.status == 200;
        }),
        catchError(handleHTTPError)
      );
  }
}
