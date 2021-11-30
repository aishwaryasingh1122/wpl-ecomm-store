import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { API_CONFIG, handleHTTPError } from '../constants';
import {
  AddProductParams,
  Product,
  UpdateQuantityParams,
} from '../models/product';
import { DataService } from './data.service';
import { findIndex } from 'lodash';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$: Observable<Product[]> = this.productsSubject.asObservable();

  constructor(private dataService: DataService) {}

  getAllProducts(): Observable<boolean> {
    return this.dataService.sendGET(API_CONFIG.PRODUCTS.GET_PRODUCTS).pipe(
      map((res: HttpResponse<any>) => {
        if (res && res.status === 200) {
          this.productsSubject.next(res.body);
        }

        return res && res.status === 200;
      }, catchError(handleHTTPError))
    );
  }

  addNewProduct(product: AddProductParams): Observable<boolean> {
    return this.dataService
      .sendPOST(API_CONFIG.ADMIN.PRODUCTS.ADD_PRODUCT, undefined, product)
      .pipe(
        map((res: HttpResponse<any>) => {
          if (res && res.status == 200) {
            const products = this.productsSubject.value;
            products.push(res.body);
            this.productsSubject.next([...products]);
          }

          return res && res.status == 200;
        }),
        catchError(handleHTTPError)
      );
  }

  toggleProductAvailability(productId: string): Observable<boolean> {
    return this.dataService
      .sendPUT(
        API_CONFIG.ADMIN.PRODUCTS.TOGGLE_AVAILABILITY.replace(
          ':productId',
          productId
        )
      )
      .pipe(
        map((res: HttpResponse<any>) => {
          if (res && res.status == 200) {
            const products = this.productsSubject.value;
            const productIndexToUpdate = findIndex(products, {
              _id: productId,
            });
            products[productIndexToUpdate].isDeleted =
              !products[productIndexToUpdate].isDeleted;

            this.productsSubject.next([...products]);
          }

          return res && res.status == 200;
        }),
        catchError(handleHTTPError)
      );
  }

  updateProductQuantity(params: UpdateQuantityParams) {
    return this.dataService
      .sendPUT(
        API_CONFIG.ADMIN.PRODUCTS.UPDATE_QUANTITY.replace(
          ':productId',
          params.productId
        ),
        undefined,
        params
      )
      .pipe(
        map((res: HttpResponse<any>) => {
          if (res && res.status == 200) {
            const products = this.productsSubject.value;
            const productIndexToUpdate = findIndex(products, {
              _id: params.productId,
            });

            if (params.quantity) {
              products[productIndexToUpdate].quantity = params.quantity;
            }

            if (params.bufferQuantity) {
              products[productIndexToUpdate].bufferQuantity =
                params.bufferQuantity;
            }

            this.productsSubject.next([...products]);
          }

          return res && res.status == 200;
        }),
        catchError(handleHTTPError)
      );
  }
}
