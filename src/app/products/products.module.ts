import { NgModule } from '@angular/core';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { CategoryListComponent } from './category-list.component';

import { ProductsService } from './products.service';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    CategoryListComponent
  ],
  imports: [
  	CommonModule,
  	RouterModule
  ],
  providers: [
  	ProductsService
  ]
})
export class ProductsModule { }
