import { Routes } from '@angular/router';

import { Home } from '@pages/home/home';
import { Upload } from '@pages/upload/upload';
import { Galleries } from '@pages/galleries/galleries';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'home', redirectTo: '' },
  { path: 'upload', component: Upload },
  { path: 'galleries', component: Galleries },
];
