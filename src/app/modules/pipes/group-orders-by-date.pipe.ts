import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Order, OrderGroup } from 'src/app/models/order';

@Pipe({
  name: 'groupOrdersByDate',
})
export class GroupOrdersByDatePipe implements PipeTransform {
  constructor() {}

  transform(orders: Order[]): OrderGroup[] {
    if (orders) {
      let orderGroups: OrderGroup[] = [];
      for (let order of orders) {
        let formattedDate = moment(order.createdAt).format('MMMM YYYY');

        const orderGroup: OrderGroup = _.find(orderGroups, {
          orderDate: formattedDate,
        });

        if (orderGroup) {
          orderGroup.orders.push(order);
        } else {
          orderGroups.push({
            orderDate: formattedDate,
            orders: [order],
          });
        }
      }

      return orderGroups;
    }
    return [];
  }
}
