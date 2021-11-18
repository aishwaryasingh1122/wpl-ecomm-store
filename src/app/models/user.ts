export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  isVerified: boolean;
  role: number;
  createdAt: string;
}

export interface UserLoginParams {
  email: string;
  password: string;
}

export interface UserRegisterParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AssignUserRoleParams {
  userId: string;
  role: number;
}
