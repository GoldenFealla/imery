import { Routes } from '@angular/router';

import { Main } from '@pages/main/main';
import { Login } from '@pages/login/login';

// Main children
import { Upload } from '@pages/main/pages/upload/upload';
import { Galleries } from '@pages/main/pages/galleries/galleries';
import { NotFound } from '@pages/not-found/not-found';

// Guards
import { guestGuard } from '@guards/guest-guard';

export const routes: Routes = [
  {
    path: '',
    component: Main,
    children: [
      { path: 'upload', component: Upload },
      { path: 'galleries', component: Galleries },
    ],
  },
  { path: 'login', component: Login, canActivate: [guestGuard] },
  { path: '**', component: NotFound },
];
