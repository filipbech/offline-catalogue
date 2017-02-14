import { Component } from '@angular/core';
import { BasketService } from './basket.service';

@Component({
	selector:'basket',
	template:`
		<h1>Basket</h1>
		
		<ul>
			<li *ngFor="let product of basket|async">
				<a [routerLink]="['/products/',product.id]">{{product.title}} ({{product.count}} stk)</a>
			</li>
		</ul>

		<button (click)="send()">Send and empty basket</button>

	`
})
export class BasketComponent {

	public basket = this.basketService.basketChange$;

	public send() {
		this.basketService.sendOrder();
	}

	constructor(private basketService: BasketService) {}
}