import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
import { ORDER_STATUS } from 'src/app/constants';
import { Order } from 'src/app/models/order';
import { Product } from 'src/app/models/product';

@Pipe({
  name: 'filterOrdersByStatus',
})
export class FilterOrdersByStatusPipe implements PipeTransform {
  constructor() {}

  transform(orders?: Order[], status?: ORDER_STATUS) {
    if (!orders || orders.length == 0 || orders == null || !status) {
      return orders;
    } else {
      return orders.filter((order: Order) => order.status === status);
    }
  }
}
