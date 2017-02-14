import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductListComponent } from './products/product-list.component';
import { ProductDetailComponent } from './products/product-detail.component';
import { CategoryListComponent } from './products/category-list.component';

import { BasketComponent } from './commerce/basket.component';


const appRoutes: Routes = [
  {
    path: '',
    component: CategoryListComponent
  },
  {
    path: 'products/:id',
    component: ProductDetailComponent
  },
  {
    path: 'category/:product',
    component: ProductListComponent
  },
  {
    path: 'basket',
    component: BasketComponent
  },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);