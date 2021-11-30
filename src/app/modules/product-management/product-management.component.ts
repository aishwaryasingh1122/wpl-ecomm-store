import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, Observable, switchMap } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import { ActionConfirmDialogComponent } from '../dialogs/action-confirm-dialog/action-confirm-dialog.component';

@Component({
  selector: 'product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss'],
})
export class ProductManagementComponent implements OnInit {
  products$: Observable<Product[]>;
  showLoader = true;
  dialogRef: any = null;

  showDeletedProducts: FormControl = new FormControl(false, []);

  constructor(
    private toastrService: ToastrService,
    private dialog: MatDialog,
    private productsService: ProductsService,
    private spinner: NgxSpinnerService
  ) {
    this.products$ = this.productsService.products$;
  }

  ngOnInit(): void {
    this.loadData();
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
  }

  toggleProductAvailability(product: Product) {
    this.dialogRef = this.dialog.open(ActionConfirmDialogComponent, {
      width: '550px',
      closeOnNavigation: true,
      data: {
        title: `Confirm ${product.isDeleted ? 'restore' : 'remove'} product`,
        messageLine1: `Are you sure you want to ${
          product.isDeleted ? 'restore' : 'remove'
        } ${product.name} ?`,
        successText: `${product.isDeleted ? 'Restore' : 'Remove'}`,
      },
    });

    this.dialogRef
      .afterClosed()
      .pipe(
        switchMap((res: boolean) => {
          if (res) {
            this.spinner.show();
            return this.productsService.toggleProductAvailability(product._id);
          }
          return EMPTY;
        })
      )
      .subscribe({
        next: (res: boolean) => {
          this.spinner.hide();
          if (res) {
            this.toastrService.success(
              '',
              `Product ${
                product.isDeleted ? 'removed' : 'restored'
              } successfully!`
            );
          }
        },
        error: (err: string) => {
          this.spinner.hide();
          this.toastrService.error(err, 'Something went wrong.');
        },
      });
  }
}
