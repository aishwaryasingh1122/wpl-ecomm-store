import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FilePickerDirective } from 'ngx-file-helpers';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
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
  profilePicture: any;
  dialogRef: any;

  @ViewChild(FilePickerDirective) private filePicker: any;

  newProductForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    weight: new FormControl('', [Validators.required]),
    unit: new FormControl('', [Validators.required]),
    rate: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    imageData: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
    bufferQuantity: new FormControl('', [Validators.required]),
  });
  constructor(
    private productsService: ProductsService,
    private categoriesService: ProductCategoriesService,
    private toastrService: ToastrService,
    private dialog: MatDialog
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
    this.dialogRef = this.dialog.open(EditImageDialogComponent, {
      width: '600px',
      data: {
        selectedImage: $event.content,
      },
    });
    this.filePicker.reset();
    this.dialogRef.afterClosed().subscribe((image: any) => {
      if (image != undefined) {
        this.profilePicture = image;
      }
    });
  }
}
