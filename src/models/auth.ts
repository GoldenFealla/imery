export enum Auth {
  Pending,
  Authenticated,
  Unauthenticated,
}

export type AuthState = Auth.Pending | Auth.Authenticated | Auth.Unauthenticated;

export type LoginForm = {
  email: string;
  password: string;
};
