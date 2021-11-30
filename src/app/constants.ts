import { HttpErrorResponse } from '@angular/common/http';
import { NavItem } from './models/nav-item';
import { User } from './models/user';

export const API_CONFIG = {
  USER: {
    LOGIN: '/api/user/login',
    REGISTER: '/api/user/register',
    VERIFY_ACCOUNT: '/api/user/verify/:userId',
    GET_SESSION: '/api/account/user-session',
  },
  PRODUCTS: {
    GET_PRODUCTS: '/api/products',
  },
  ADMIN: {
    USERS: {
      GET_ALL: '/api/account/admin/users',
      ASSIGN_ROLE: '/api/account/admin/assign-role/:userId/:role',
      TOGGLE_ACCOUNT: '/api/account/admin/toggle-account/:userId',
    },
    CATEGORIES: {
      GET_ALL: '/api/account/admin/product-category',
      ADD_CATEGORY: '/api/account/admin/product-category',
      REMOVE_CATEGORY: '/api/account/admin/product-category/:categoryId',
    },
    PRODUCTS: {
      ADD_PRODUCT: '/api/account/admin/product',
      UPDATE_QUANTITY: '/api/account/admin/product/update-quantity/:productId',
      TOGGLE_AVAILABILITY:
        '/api/account/admin/product/toggle-availability/:productId',
    },
  },
};

export const handleHTTPError = (err: HttpErrorResponse) => {
  throw err.error.msg;
};

export const USER_ENTITIES: NavItem[] = [
  {
    path: '/products',
    title: 'Products',
    type: 'parent',
    icontype: 'store',
  },
  {
    path: '/orders/details',
    title: 'Order Details',
    type: 'child',
    icontype: 'keyboard_backspace',
  },
  {
    path: '/orders',
    title: 'Orders',
    type: 'parent',
    icontype: 'receipt',
  },
];

export const ADMIN_ENTITIES: NavItem[] = [
  {
    path: '/users',
    title: 'User Management',
    type: 'parent',
    icontype: 'people',
  },
  {
    path: '/product-categories',
    title: 'Categories Management',
    type: 'parent',
    icontype: 'category',
  },
  {
    path: '/product-management',
    title: 'Products Management',
    type: 'parent',
    icontype: 'store',
  },
  {
    path: '/product-management/modify',
    title: 'Products Management',
    type: 'child',
    icontype: 'keyboard_backspace',
  },
];

export const GUEST_USER: User = {
  _id: 'guest',
  firstName: 'Guest',
  lastName: 'User',
  email: 'guest@domain.com',
  isActive: false,
  isVerified: false,
  role: -1,
  createdAt: '',
};
