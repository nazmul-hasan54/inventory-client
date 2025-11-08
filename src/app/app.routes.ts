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
      {
        path: 'product/add',
        loadComponent: () => import('./modules/product/pages/create/product-create.component')
          .then(m => m.ProductCreateComponent)
      },
      {
        path: 'product/edit/:id',
        loadComponent: () => import('./modules/product/pages/create/product-create.component')
          .then(m => m.ProductCreateComponent)
      },
      { path: 'orders', loadComponent: () =>
          import('./modules/order/pages/list/order-list.component').then(m => m.OrderListComponent)
      },
      { path: 'order/add', loadComponent: () =>
          import('./modules/order/pages/create/order-create.component').then(m => m.OrderCreateComponent)
      },
      { path: 'order/view/:id', loadComponent: () =>
          import('./modules/order/pages/view/order-view.component').then(m => m.OrderViewComponent)
      },
    ]
  },

  { path: '**', redirectTo: '' }
];
