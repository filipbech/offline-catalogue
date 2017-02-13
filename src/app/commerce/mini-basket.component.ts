import { Component } from '@angular/core';

import { BasketService } from './basket.service';

@Component({
	selector:'mini-basket',
	template:`Kurv: <button (click)="send()">Send kurv ({{(basket | async).length}} produkter)</button>`
})
export class MiniBasketComponent {
	
	public basket = this.basketService.basketChange$;

	public send() {
		this.basketService.sendOrder();
	}

	constructor(private basketService: BasketService) {}

}