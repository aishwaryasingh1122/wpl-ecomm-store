import { HttpErrorResponse } from '@angular/common/http';

export const API_CONFIG = {
  USER: {
    LOGIN: '/api/user/login',
    REGISTER: '/api/user/register',
    VERIFY_ACCOUNT: '/api/user/verify/:userId',
  },
};

export const handleHTTPError = (err: HttpErrorResponse) => {
  throw err.error.msg;
};
