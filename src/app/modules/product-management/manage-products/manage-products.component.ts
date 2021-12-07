import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FilePickerDirective } from 'ngx-file-helpers';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, Subscription } from 'rxjs';
import { ManageProductParams, Product } from 'src/app/models/product';
import { ProductCategory } from 'src/app/models/product-category';
import { ProductCategoriesService } from 'src/app/services/product-categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { EditImageDialogComponent } from '../../dialogs/edit-image-dialog/edit-image-dialog.component';

@Component({
  selector: 'manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss'],
})
export class ManageProductsComponent implements OnInit, OnDestroy {
  categories$: Observable<ProductCategory[]>;
  product: Product;
  showLoader = true;
  productImage: any;
  imageFileName: string = '';
  dialogRef: any;
  productSubscription: Subscription;
  showForm = false;

  @ViewChild(FilePickerDirective) private filePicker: any;

  newProductForm: FormGroup;
  constructor(
    private productsService: ProductsService,
    private categoriesService: ProductCategoriesService,
    private toastrService: ToastrService,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.categories$ = this.categoriesService.categories$;
    const routeParams = this.route.snapshot.paramMap;
    const productId = routeParams.get('productId');
    if (!productId) {
      this.initProductForm();
      this.showForm = true;
    } else {
      this.productSubscription = this.productsService.product$.subscribe({
        next: (product: Product) => {
          if (productId && !product) {
            this.router.navigate(['/products']);
          } else {
            this.product = product;
            this.initProductForm();
            this.showForm = true;
          }

          console.log('product', this.product);
        },
      });
    }
  }

  ngOnInit(): void {
    this.loadProductCategories();
  }

  ngOnDestroy(): void {
    this.productSubscription?.unsubscribe();
  }

  initProductForm() {
    this.newProductForm = new FormGroup({
      name: new FormControl(this.product?.name ?? '', [Validators.required]),
      weight: new FormControl(this.product?.weight ?? '', [
        Validators.required,
      ]),
      unit: new FormControl(this.product?.unit ?? '', [Validators.required]),
      rate: new FormControl(this.product?.rate ?? '', [Validators.required]),
      category: new FormControl(this.product?.category._id ?? '', [
        Validators.required,
      ]),
      quantity: new FormControl(this.product?.quantity ?? '', [
        Validators.required,
      ]),
      bufferQuantity: new FormControl(this.product?.bufferQuantity ?? '', [
        Validators.required,
      ]),
    });
  }

  loadProductCategories() {
    this.showLoader = true;
    this.categoriesService.getAllCategories().subscribe({
      next: (res: boolean) => {
        this.showLoader = false;
        if (!res) {
          this.toastrService.error(
            'Failed to fetch product categories. Try again!',
            'Something went wrong'
          );
        }
      },
      error: (err) => {
        this.showLoader = false;
        this.toastrService.error(err, 'Something went wrong');
      },
    });
  }

  getSelectedImage($event: any) {
    console.log('Image', $event.underlyingFile.name);
    this.dialogRef = this.dialog.open(EditImageDialogComponent, {
      width: '600px',
      data: {
        selectedImage: $event.content,
      },
    });
    this.filePicker.reset();
    this.dialogRef.afterClosed().subscribe((image: any) => {
      if (image != undefined) {
        this.productImage = image;
        this.imageFileName = $event.underlyingFile.name;
      }
    });
  }

  submitProduct() {
    const newProductData: ManageProductParams = this.newProductForm.value;
    newProductData.imgData = this.productImage?.base64;
    newProductData.fileName = this.imageFileName;
    console.log('Image', newProductData);

    if (
      !this.product &&
      (!newProductData.imgData || !newProductData.fileName)
    ) {
      this.toastrService.error(
        'Please select a product image. Image required.'
      );

      return;
    }

    this.spinner.show();
    if (this.product) {
      const updatedProductData = {
        ...this.product,
        ...this.newProductForm.value,
        imgData: this.productImage?.base64,
        fileName: this.imageFileName,
      };
      this.productsService.updateProductDetails(updatedProductData).subscribe({
        next: (res: boolean) => {
          this.spinner.hide();
          if (res) {
            this.toastrService.success('Product Updated Successfully!');
            this.router.navigate(['/product-management']);
          } else {
            this.toastrService.error(
              'Failed to update product.',
              'Something went wrong. Try again!'
            );
          }
        },
        error: (err) => {
          this.spinner.hide();
          this.toastrService.error(err, 'Something went wrong. Try again!');
        },
      });
    } else {
      this.productsService.addNewProduct(newProductData).subscribe({
        next: (res: boolean) => {
          this.spinner.hide();
          if (res) {
            this.toastrService.success('New Product Added Successfully!');
            this.router.navigate(['/product-management']);
          } else {
            this.toastrService.error(
              'Failed to add new product.',
              'Something went wrong. Try again!'
            );
          }
        },
        error: (err) => {
          this.spinner.hide();
          this.toastrService.error(err, 'Something went wrong. Try again!');
        },
      });
    }
  }
}
