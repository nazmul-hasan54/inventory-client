import { Routes } from '@angular/router';
import {LoginComponent} from './modules/auth/features/login/login.component';
import {ProductListComponent} from './modules/product/pages/list/product-list.component';
import {LayoutComponent} from './modules/layout/layout.component';
import {authGuard} from './guards/auth.guard';

export const routes: Routes = [
  // { path: 'login', component: LoginComponent },
  // { path: 'products', component: ProductListComponent },
  // { path: '', redirectTo: 'login', pathMatch: 'full' }
  { path: 'login', component: LoginComponent },
  { path: 'register', loadComponent: () =>
      import('./modules/auth/features/register/register.component').then(m => m.RegisterComponent)
  },

  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      { path: 'products', component: ProductListComponent },
      { path: 'orders', loadComponent: () =>
          import('./modules/order/pages/list/order-list.component').then(m => m.OrderListComponent)
      },
    ]
  },

  { path: '**', redirectTo: '' }
];
