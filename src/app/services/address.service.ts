import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { API_CONFIG, handleHTTPError } from '../constants';
import { Address, ManageAddressParams } from '../models/address';
import { DataService } from './data.service';
import { findIndex } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private addressesSubject = new BehaviorSubject<Address[]>([]);
  address$: Observable<Address[]> = this.addressesSubject.asObservable();

  constructor(private dataService: DataService) {}

  getAddressesForUser(): Observable<boolean> {
    return this.dataService
      .sendGET(API_CONFIG.ADDRESSES.GET_ADDRESSES_FOR_USER)
      .pipe(
        map((res: HttpResponse<any>) => {
          if (res && res.status === 200) {
            this.addressesSubject.next(res.body);
          }

          return res && res.status == 200;
        }),
        catchError(handleHTTPError)
      );
  }

  addNewAddress(params: ManageAddressParams): Observable<boolean> {
    return this.dataService
      .sendPOST(API_CONFIG.ADDRESSES.ADD_NEW_ADDRESS, undefined, params)
      .pipe(
        map((res: HttpResponse<any>) => {
          if (res && res.status === 200) {
            const addresses = this.addressesSubject.value;
            addresses.push(res.body);
            this.addressesSubject.next([...addresses]);
          }

          return res && res.status == 200;
        }),
        catchError(handleHTTPError)
      );
  }

  removeUserAddress(addressId: string): Observable<boolean> {
    return this.dataService
      .sendDELETE(
        API_CONFIG.ADDRESSES.DELETE_ADDRESS.replace(':addressId', addressId)
      )
      .pipe(
        map((res: HttpResponse<any>) => {
          if (res && res.status === 200) {
            const addresses = this.addressesSubject.value;
            const addressIndexToRemove = findIndex(addresses, {
              _id: addressId,
            });

            if (addressIndexToRemove != -1) {
              addresses.splice(addressIndexToRemove, 1);
              this.addressesSubject.next([...addresses]);
            }
          }

          return res && res.status == 200;
        }),
        catchError(handleHTTPError)
      );
  }

  editUserAddress(params: ManageAddressParams): Observable<boolean> {
    return this.dataService
      .sendPUT(
        API_CONFIG.ADDRESSES.EDIT_ADDRESS.replace(':addressId', params._id!),
        undefined,
        params
      )
      .pipe(
        map((res: HttpResponse<any>) => {
          if (res && res.status === 200) {
            const addresses = this.addressesSubject.value;
            const addressIndexToUpdate = findIndex(addresses, {
              _id: params._id,
            });

            if (addressIndexToUpdate != -1) {
              addresses[addressIndexToUpdate] = {
                ...addresses[addressIndexToUpdate],
                ...params,
              };
              this.addressesSubject.next([...addresses]);
            }
          }

          return res && res.status == 200;
        }),
        catchError(handleHTTPError)
      );
  }
}
