import { Component } from '@angular/core';

import { BasketService } from './basket.service';

@Component({
	selector:'mini-basket',
	template:`<a [routerLink]="['basket']">Se kurv ({{basketCount}} produkter)</a>`
})
export class MiniBasketComponent {
	
	public basketCount:number = 0;

	ngOnInit(){
		this.basketService.basketChange$.subscribe(basket => {
			this.basketCount = basket.reduce((acc, product)=>{ return acc+product.count },0);
		});
	}

	constructor(private basketService: BasketService) {}

}