import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductCategory } from 'src/app/models/product-category';
import { ProductCategoriesService } from 'src/app/services/product-categories.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products$: Observable<Product[]>;
  categories$: Observable<ProductCategory[]>;
  searchText?: string;

  showLoader = true;
  dialogRef: any = null;

  categoryFilterControl: FormControl = new FormControl('', []);

  constructor(
    private toastrService: ToastrService,
    private productsService: ProductsService,
    private productCategoriesService: ProductCategoriesService
  ) {
    this.products$ = this.productsService.products$;
    this.categories$ = this.productCategoriesService.categories$;
  }

  ngOnInit(): void {
    this.loadData();
  }

  searchProducts(searchText: string) {
    this.searchText = searchText;
  }

  loadData() {
    this.showLoader = true;
    this.productsService.getAllProducts().subscribe({
      next: (res: boolean) => {
        this.showLoader = false;
        if (!res) {
          this.toastrService.error(
            'Failed to fetch products. Try again!',
            'Something went wrong'
          );
        }
      },
      error: (err) => {
        this.showLoader = false;
        this.toastrService.error(err, 'Something went wrong');
      },
    });

    this.productCategoriesService.getAllCategories().subscribe();
  }
}
