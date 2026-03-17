export enum Auth {
  Pending = 'pending',
  Authenticated = 'authenticated',
  Unauthenticated = 'unauthenticated',
}

export type AuthState = Auth.Pending | Auth.Authenticated | Auth.Unauthenticated;

export type LoginForm = {
  email: string;
  password: string;
};
