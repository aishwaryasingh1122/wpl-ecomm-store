import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, Observable, switchMap } from 'rxjs';
import { ORDER_STATUS } from 'src/app/constants';
import { Order } from 'src/app/models/order';
import { User } from 'src/app/models/user';
import { OrdersService } from 'src/app/services/orders.service';
import { UserService } from 'src/app/services/user.service';
import { ActionConfirmDialogComponent } from '../../dialogs/action-confirm-dialog/action-confirm-dialog.component';

@Component({
  selector: 'order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  order$: Observable<Order>;
  user$: Observable<User>;
  dialogRef: any = null;

  orderStatusColor = {
    CANCELLED: 'text-danger',
    NEW: 'text-primary',
    PROCESSING: 'text-info',
    DISPATCHED: 'text-info',
    COMPLETED: 'text-success',
  };
  constructor(
    private ordersService: OrdersService,
    private userService: UserService,
    private dialog: MatDialog,
    private toastrService: ToastrService
  ) {
    this.order$ = this.ordersService.order$;
    this.user$ = this.userService.user$;
  }

  ngOnInit(): void {}

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
