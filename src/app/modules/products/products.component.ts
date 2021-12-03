import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { ProductCategory } from 'src/app/models/product-category';
import { User } from 'src/app/models/user';
import { CartService } from 'src/app/services/cart.service';
import { ProductCategoriesService } from 'src/app/services/product-categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products$: Observable<Product[]>;
  cart$: Observable<Cart>;
  categories$: Observable<ProductCategory[]>;
  searchText?: string;
  currentUser?: User;

  showLoader = true;
  dialogRef: any = null;

  categoryFilterControl: FormControl = new FormControl('', []);

  constructor(
    private toastrService: ToastrService,
    private productsService: ProductsService,
    private productCategoriesService: ProductCategoriesService,
    private cartService: CartService,
    private spinner: NgxSpinnerService,
    private usersService: UserService
  ) {
    this.products$ = this.productsService.products$;
    this.categories$ = this.productCategoriesService.categories$;
    this.cart$ = this.cartService.cart$;
    this.usersService.user$.subscribe({
      next: (user: User) => {
        this.currentUser = user;
      },
    });
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

  handleAddToCart(productId: string) {
    console.log('Adding to cart in products', productId);
    if (this.currentUser?._id === 'guest') {
      this.toastrService.warning(
        'Please login to add item to cart.',
        'Login Required'
      );
      return;
    }
    this.spinner.show();
    this.cartService.setItemInCart({ productId, quantity: 1 }).subscribe({
      next: (res: boolean) => {
        this.spinner.hide();
        if (res) {
          this.toastrService.success(
            'Item added to cart successfully.',
            'Cart Updated!'
          );
        } else {
          this.toastrService.error(
            'Failed to add item to cart.',
            'Something went wrong. Try again!'
          );
        }
      },
      error: (err: string) => {
        this.spinner.hide();
        this.toastrService.error(err, 'Something went wrong. Try again!');
      },
    });
  }
}
