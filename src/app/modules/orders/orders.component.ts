import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Order } from 'src/app/models/order';
import { OrdersService } from 'src/app/services/orders.service';
import { sortBy } from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  orders$: Observable<Order[]>;
  showLoader = true;

  constructor(
    private ordersService: OrdersService,
    private router: Router,
    private toastrService: ToastrService
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
    this.ordersService.getOrdersForUser().subscribe({
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
}
