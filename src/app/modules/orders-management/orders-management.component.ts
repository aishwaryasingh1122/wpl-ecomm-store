import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { sortBy } from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { Observable, map, switchMap, EMPTY } from 'rxjs';
import { ORDER_STATUS } from 'src/app/constants';
import { Order } from 'src/app/models/order';
import { OrdersService } from 'src/app/services/orders.service';
import { ActionConfirmDialogComponent } from '../dialogs/action-confirm-dialog/action-confirm-dialog.component';

@Component({
  selector: 'orders-management',
  templateUrl: './orders-management.component.html',
  styleUrls: ['./orders-management.component.scss'],
})
export class OrdersManagementComponent implements OnInit {
  orders$: Observable<Order[]>;
  showLoader = true;
  dialogRef: any;

  orderStatusFilterControl: FormControl = new FormControl('', []);

  constructor(
    private ordersService: OrdersService,
    private router: Router,
    private toastrService: ToastrService,
    private dialog: MatDialog
  ) {
    this.orders$ = this.ordersService.orders$.pipe(
      map((orders: Order[]) => {
        if (orders && orders.length > 0) {
          orders = sortBy(orders, 'createdAt').reverse();
        }
        return orders;
      })
    );
  }

  ngOnInit(): void {
    this.ordersService.getAllOrders().subscribe({
      next: (res: boolean) => {
        this.showLoader = false;
        if (!res) {
          this.toastrService.error(
            'Failed to fetch orders for user.',
            'Someting went wrong. Try again!'
          );
        }
      },
      error: (err) => {
        this.showLoader = false;
        this.toastrService.error(err, 'Someting went wrong. Try again!');
      },
    });
  }

  viewOrderDetails(orderId: string) {
    this.router.navigate([`/orders/details/${orderId}`]);
  }

  updateOrderStatus(orderId: string, status: ORDER_STATUS) {
    this.dialogRef = this.dialog.open(ActionConfirmDialogComponent, {
      width: '550px',
      closeOnNavigation: true,
      data: {
        title: `Confirm update order status`,
        messageLine1: `Are you sure you want to set order status to: ${status}.`,
        successText: 'Update Status',
      },
    });

    this.dialogRef
      .afterClosed()
      .pipe(
        switchMap((res: boolean) => {
          if (res) {
            return this.ordersService.updateOrderStatus(orderId, status);
          }
          return EMPTY;
        })
      )
      .subscribe({
        next: (res: boolean) => {
          if (res) {
            this.toastrService.success('Order status updated successfully!');
          } else {
            this.toastrService.error(
              'Failed to update order status.',
              'Something went wrong. Try again!'
            );
          }
        },
        error: (err: any) => {
          this.toastrService.error(err, 'Something went wrong. Try again!');
        },
      });
  }
}
