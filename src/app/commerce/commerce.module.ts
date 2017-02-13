import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { BasketService } from './basket.service';
import { MiniBasketComponent } from './mini-basket.component';


@NgModule({
  declarations: [
    MiniBasketComponent
  ],
  imports: [
  	CommonModule,
  ],
  providers: [ 
    BasketService
  ],
  exports: [
    MiniBasketComponent
  ]
})
export class CommerceModule { }
