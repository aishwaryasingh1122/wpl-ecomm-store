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

export const USER_ENTITIES: NavItem[] = [];

export const ADMIN_ENTITIES: NavItem[] = [
  {
    path: '/account/admin/users',
    title: 'User Management',
    type: 'parent',
    icontype: 'people',
  },
];
