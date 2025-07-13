import { Routes } from '@angular/router';

export const productRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/product-list/product-list').then(
        (m) => m.ProductListComponent
      ),
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./pages/product-form/product-form').then(
        (m) => m.ProductFormComponent
      ),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./pages/product-form/product-form').then(
        (m) => m.ProductFormComponent
      ),
  },
];
