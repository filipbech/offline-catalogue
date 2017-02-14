import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../products/products.service';
import { ServiceWorkerService } from '../offline/serviceworker.service';

@Injectable()
export class BasketService {

	private basket: IProduct[];

	private basketSubject = new BehaviorSubject(this.basket);
	public basketChange$ = this.basketSubject.asObservable();

	public addToBasket(item:IProduct) {

		const alreadyInBasket = this.basket.filter(product => product.id === item.id)[0];
		if(alreadyInBasket) {
			this.basket = this.basket.slice(0);
			this.basket[this.basket.indexOf(alreadyInBasket)] = Object.assign({}, alreadyInBasket, {count: alreadyInBasket.count + 1 });
		} else {
			this.basket = [...this.basket, Object.assign({}, item, {count: 1} )];
		}

		this.save();
		this.basketSubject.next(this.basket);
	}

	public sendOrder() {
		localStorage.setItem('order',JSON.stringify(this.basket));

		this.serviceWorkerService.requestSync('sendOrder');

		this.basket = [];
		this.save();
		this.basketSubject.next(this.basket);
	}

	private save() {
		localStorage.setItem('basket',JSON.stringify(this.basket));
	}

	constructor(private serviceWorkerService: ServiceWorkerService) {
		this.basket = JSON.parse(localStorage.getItem('basket') || '[]');
		this.basketSubject.next(this.basket);
	}

}

