import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { API_CONFIG, handleHTTPError, ORDER_STATUS } from '../constants';
import { Order } from '../models/order';
import { DataService } from './data.service';
import { findIndex } from 'lodash';
@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private ordersSubject = new BehaviorSubject<Order[]>([]);
  orders$: Observable<Order[]> = this.ordersSubject.asObservable();

  private orderDetailsSubject = new BehaviorSubject<Order>({});
  order$: Observable<Order> = this.orderDetailsSubject.asObservable();

  constructor(private dataService: DataService) {}

  getOrderById(orderId: string): Observable<boolean> {
    return this.dataService
      .sendGET(API_CONFIG.ORDERS.GET_ORDER_BY_ID.replace(':orderId', orderId))
      .pipe(
        map((res: HttpResponse<any>) => {
          if (res && res.status == 200) {
            this.orderDetailsSubject.next(res.body);
          }

          return res && res.status === 200;
        }),
        catchError(handleHTTPError)
      );
  }

  getAllOrders(): Observable<boolean> {
    return this.dataService
      .sendGET(API_CONFIG.ADMIN.ORDERS.GET_ALL_ORDERS)
      .pipe(
        map((res: HttpResponse<any>) => {
          if (res && res.status == 200) {
            this.ordersSubject.next(res.body);
          }

          return res && res.status === 200;
        }),
        catchError(handleHTTPError)
      );
  }

  getOrdersForUser(): Observable<boolean> {
    return this.dataService.sendGET(API_CONFIG.ORDERS.GET_ORDERS_FOR_USER).pipe(
      map((res: HttpResponse<any>) => {
        if (res && res.status == 200) {
          this.ordersSubject.next(res.body);
        }

        return res && res.status === 200;
      }),
      catchError(handleHTTPError)
    );
  }

  createOrder(deliveryAddress: string): Observable<boolean> {
    return this.dataService
      .sendPOST(API_CONFIG.ORDERS.CREATE_ORDER, undefined, { deliveryAddress })
      .pipe(
        map((res: HttpResponse<any>) => {
          return res && res.status === 200;
        }),
        catchError(handleHTTPError)
      );
  }

  updateOrderStatus(
    orderId: string,
    status: ORDER_STATUS
  ): Observable<boolean> {
    return this.dataService
      .sendPUT(
        API_CONFIG.ADMIN.ORDERS.UPDATE_ORDER_STATUS.replace(
          ':orderId',
          orderId
        ).replace(':status', status + '')
      )
      .pipe(
        map((res: HttpResponse<any>) => {
          if (res && res.status === 200) {
            const orders = this.ordersSubject.value;
            const orderIndexToUpdate = findIndex(orders, { _id: orderId });

            if (orderIndexToUpdate != -1) {
              orders[orderIndexToUpdate].status = status;
              this.ordersSubject.next([...orders]);
              this.orderDetailsSubject.next({ ...orders[orderIndexToUpdate] });
            }
          }
          return res && res.status === 200;
        }),
        catchError(handleHTTPError)
      );
  }
}
