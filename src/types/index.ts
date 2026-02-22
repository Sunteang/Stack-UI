export interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

export interface RoleRow {
  id: string | number;
  roleName: string;
  status: string;
  createdOn: string;
  createdBy: string;
}

export interface Option {
  label: string;
  value: string;
}

export interface Account {
    id: string;
    email: string;
    name: string;
    position: string;
}

export interface User {
    id: string;
    email: string;
    name: string;
    authorities: string[];
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface MenuItem {
    id: string;
    name: string;
    path: string;
    icon?: string;
    children?: MenuItem[];
}

export interface ApiResponse {
  trace_id?: string;
  message: string;
  error_code: string;
  message_type: string;
  source?: string;
  dev_error_code?: string;
  dev_message?: string;
  display_mode?: string;
  alert_type?: string;
  status: string;
  data?: any;
}