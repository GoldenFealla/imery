import { Routes } from '@angular/router';

import { Main } from '@pages/main/main';
import { Login } from '@pages/login/login';

// Main children
import { Upload } from '@pages/main/pages/upload/upload';
import { Galleries } from '@pages/main/pages/galleries/galleries';
import { Edit } from '@pages/main/pages/edit/edit';

import { NotFound } from '@pages/not-found/not-found';

// Guards
import { guestGuard } from '@guards/guest-guard';
import { authGuard } from '@guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: Main,
    canActivate: [authGuard],
    children: [
      { path: 'upload', component: Upload },
      { path: 'galleries', component: Galleries },
      { path: 'edit/:id', component: Edit },
      { path: 'edit', redirectTo: '/galleries' },
    ],
  },
  { path: 'login', component: Login, canActivate: [guestGuard] },
  { path: '**', component: NotFound },
];
