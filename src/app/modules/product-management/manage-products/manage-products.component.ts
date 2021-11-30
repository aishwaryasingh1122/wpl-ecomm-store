import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FilePickerDirective } from 'ngx-file-helpers';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AddProductParams } from 'src/app/models/product';
import { ProductCategory } from 'src/app/models/product-category';
import { ProductCategoriesService } from 'src/app/services/product-categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { EditImageDialogComponent } from '../../dialogs/edit-image-dialog/edit-image-dialog.component';

@Component({
  selector: 'manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss'],
})
export class ManageProductsComponent implements OnInit {
  categories$: Observable<ProductCategory[]>;
  showLoader = true;
  productImage: any;
  imageFileName: string = '';
  dialogRef: any;

  @ViewChild(FilePickerDirective) private filePicker: any;

  newProductForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    weight: new FormControl('', [Validators.required]),
    unit: new FormControl('', [Validators.required]),
    rate: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
    bufferQuantity: new FormControl('', [Validators.required]),
  });
  constructor(
    private productsService: ProductsService,
    private categoriesService: ProductCategoriesService,
    private toastrService: ToastrService,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
    this.categories$ = this.categoriesService.categories$;
  }

  ngOnInit(): void {
    this.loadProductCategories();
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
    const newProductData: AddProductParams = this.newProductForm.value;
    newProductData.imgData = this.productImage.base64;
    newProductData.fileName = this.imageFileName;
    console.log('IMage', newProductData);

    if (!newProductData.imgData || !newProductData.fileName) {
      this.toastrService.error(
        'Please select a product image. Image required.'
      );

      return;
    }

    this.spinner.show();
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
