import { HttpErrorResponse } from '@angular/common/http';
import { NavItem } from './models/nav-item';

export const API_CONFIG = {
  USER: {
    LOGIN: '/api/user/login',
    REGISTER: '/api/user/register',
    VERIFY_ACCOUNT: '/api/user/verify/:userId',
    GET_SESSION: '/api/account/user-session',
  },
};

export const handleHTTPError = (err: HttpErrorResponse) => {
  throw err.error.msg;
};

export const USER_ENTITIES: NavItem[] = [
  {
    path: '/account/products',
    title: 'Products',
    type: 'parent',
    icontype: 'store',
  },
  {
    path: '/account/orders/details',
    title: 'Order Details',
    type: 'child',
    icontype: 'keyboard_backspace',
  },
  {
    path: '/account/orders',
    title: 'Orders',
    type: 'parent',
    icontype: 'receipt',
  },
];

export const ADMIN_ENTITIES: NavItem[] = [
  {
    path: '/account/users',
    title: 'User Management',
    type: 'parent',
    icontype: 'people',
  },
];
