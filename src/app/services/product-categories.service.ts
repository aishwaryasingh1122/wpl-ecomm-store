import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { API_CONFIG, handleHTTPError } from '../constants';
import { ProductCategory } from '../models/product-category';
import { DataService } from './data.service';
import { findIndex } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoriesService {
  private categoriesSubject = new BehaviorSubject<ProductCategory[]>([]);
  categories$: Observable<ProductCategory[]> =
    this.categoriesSubject.asObservable();

  constructor(private dateService: DataService) {}

  getAllCategories(): Observable<boolean> {
    return this.dateService.sendGET(API_CONFIG.ADMIN.CATEGORIES.GET_ALL).pipe(
      map((res: HttpResponse<any>) => {
        if (res && res.status === 200) {
          this.categoriesSubject.next(res.body);
        }

        return res && res.status === 200;
      }, catchError(handleHTTPError))
    );
  }

  addProductCategory(title: string): Observable<boolean> {
    return this.dateService
      .sendPOST(API_CONFIG.ADMIN.CATEGORIES.ADD_CATEGORY, undefined, { title })
      .pipe(
        map((res: HttpResponse<any>) => {
          if (res && res.status === 200) {
            const categories: ProductCategory[] = this.categoriesSubject.value;
            categories.push(res.body);
            this.categoriesSubject.next([...categories]);
          }

          return res && res.status === 200;
        }, catchError(handleHTTPError))
      );
  }

  removeProductCategory(categoryId: string): Observable<boolean> {
    return this.dateService
      .sendDELETE(
        API_CONFIG.ADMIN.CATEGORIES.REMOVE_CATEGORY.replace(
          ':categoryId',
          categoryId
        )
      )
      .pipe(
        map((res: HttpResponse<any>) => {
          if (res && res.status === 200) {
            const categories: ProductCategory[] = this.categoriesSubject.value;
            const categoryIndexToRemove = findIndex(categories, {
              _id: categoryId,
            });
            categories.splice(categoryIndexToRemove, 1);
            this.categoriesSubject.next([...categories]);
          }

          return res && res.status === 200;
        }, catchError(handleHTTPError))
      );
  }
}
