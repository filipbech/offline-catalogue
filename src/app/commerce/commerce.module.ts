import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BasketService } from './basket.service';
import { MiniBasketComponent } from './mini-basket.component';

import { BasketComponent } from './basket.component';

@NgModule({
  declarations: [
    MiniBasketComponent,
    BasketComponent
  ],
  imports: [
  	CommonModule,
    RouterModule
  ],
  providers: [ 
    BasketService
  ],
  exports: [
    MiniBasketComponent, 
    BasketComponent
  ]
})
export class CommerceModule { }
