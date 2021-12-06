import { HttpErrorResponse } from '@angular/common/http';
import { CartItem } from './models/cart';
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
  CATEGORIES: {
    GET_CATEGORIES: '/api/product-category',
  },
  CART: {
    GET_CART: '/api/account/cart',
    CLEAR_CART: '/api/account/cart',
    SET_ITEM_TO_CART: '/api/account/cart',
  },
  ADDRESSES: {
    GET_ADDRESSES_FOR_USER: '/api/account/addresses',
    ADD_NEW_ADDRESS: '/api/account/addresses',
    EDIT_ADDRESS: '/api/account/addresses/:addressId',
    DELETE_ADDRESS: '/api/account/addresses/:addressId',
  },
  ORDERS: {
    GET_ORDERS_FOR_USER: '/api/account/orders',
    CREATE_ORDER: '/api/account/orders',
    GET_ORDER_BY_ID: '/api/account/orders/:orderId',
  },
  ADMIN: {
    USERS: {
      GET_ALL: '/api/account/admin/users',
      ASSIGN_ROLE: '/api/account/admin/assign-role/:userId/:role',
      TOGGLE_ACCOUNT: '/api/account/admin/toggle-account/:userId',
    },
    CATEGORIES: {
      ADD_CATEGORY: '/api/account/admin/product-category',
      REMOVE_CATEGORY: '/api/account/admin/product-category/:categoryId',
    },
    PRODUCTS: {
      ADD_PRODUCT: '/api/account/admin/product',
      UPDATE_QUANTITY: '/api/account/admin/product/update-quantity/:productId',
      TOGGLE_AVAILABILITY:
        '/api/account/admin/product/toggle-availability/:productId',
    },
    ORDERS: {
      GET_ALL_ORDERS: '/api/account/admin/orders',
      UPDATE_ORDER_STATUS:
        '/api/account/admin/orders/update-status/:orderId/:status',
    },
  },
};

export const handleHTTPError = (err: HttpErrorResponse) => {
  if (err.status == 400) {
    throw err.error.msg;
  }
  throw err;
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
    path: '/cart/checkout',
    title: 'Checkout',
    type: 'child',
    icontype: 'keyboard_backspace',
  },
  {
    path: '/cart',
    title: 'Your Cart',
    type: 'parent',
    icontype: 'shopping_cart',
  },
  {
    path: '/orders',
    title: 'Your Orders',
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
  {
    path: '/order-management',
    title: 'Orders Management',
    type: 'parent',
    icontype: 'receipt',
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

export enum UPDATE_QUANTITY {
  DECREMENT,
  INCREMENT,
}

export const getCartTotal = (productData: CartItem[]): number => {
  let cartTotal = 0;
  productData?.forEach((item: CartItem) => {
    cartTotal += (item.product?.rate || 1) * item.quantity;
  });

  return cartTotal;
};

export enum ORDER_STATUS {
  'CANCELLED',
  'NEW',
  'PROCESSING',
  'DISPATCHED',
  'COMPLETED',
}
