import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { API_CONFIG, handleHTTPError } from '../constants';
import { AddProductParams, Product } from '../models/product';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$: Observable<Product[]> = this.productsSubject.asObservable();

  constructor(private dateService: DataService) {}

  getAllProducts(): Observable<boolean> {
    return this.dateService.sendGET(API_CONFIG.PRODUCTS.GET_PRODUCTS).pipe(
      map((res: HttpResponse<any>) => {
        if (res && res.status === 200) {
          this.productsSubject.next(res.body);
        }

        return res && res.status === 200;
      }, catchError(handleHTTPError))
    );
  }

  addNewProduct(product: AddProductParams): Observable<boolean> {
    return this.dateService
      .sendPOST(API_CONFIG.ADMIN.PRODUCTS.ADD_PRODUCT, undefined, product)
      .pipe(
        map((res: HttpResponse<any>) => {
          if (res && res.status == 200) {
            const products = this.productsSubject.value;
            products.push(res.body);
            this.productsSubject.next([...products]);
          }

          return res && res.status == 200;
        })
      );
  }
}
