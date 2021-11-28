import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, Observable, switchMap } from 'rxjs';
import { ProductCategory } from 'src/app/models/product-category';
import { ProductCategoriesService } from 'src/app/services/product-categories.service';
import { ActionConfirmDialogComponent } from '../dialogs/action-confirm-dialog/action-confirm-dialog.component';

@Component({
  selector: 'product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.scss'],
})
export class ProductCategoriesComponent implements OnInit {
  categories$: Observable<ProductCategory[]>;
  showLoader = true;
  dialogRef: any = null;

  constructor(
    private toastrService: ToastrService,
    private dialog: MatDialog,
    private categoriesService: ProductCategoriesService,
    private spinner: NgxSpinnerService
  ) {
    this.categories$ = this.categoriesService.categories$;
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
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

  removeProductCategory(category: ProductCategory) {
    this.dialogRef = this.dialog.open(ActionConfirmDialogComponent, {
      width: '550px',
      closeOnNavigation: true,
      data: {
        title: `Confirm remove category`,
        messageLine1: `Are you sure you want to remove ${category.title}`,
        successText: 'Remove',
      },
    });

    this.dialogRef
      .afterClosed()
      .pipe(
        switchMap((res: boolean) => {
          if (res) {
            this.spinner.show();
            return this.categoriesService.removeProductCategory(category._id);
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
              'Product category removed successfully'
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
