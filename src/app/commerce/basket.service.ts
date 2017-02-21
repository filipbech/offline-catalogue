import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../products/products.service';
import { ServiceWorkerService } from '../offline/serviceworker.service';

import * as localForage from 'localforage';


@Injectable()
export class BasketService {

	private basket: IProduct[] = [];

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

		this.save().then(_=> {
			this.basketSubject.next(this.basket);
		});
	}

	public sendOrder() {
		localForage.setItem('order',this.basket).then(_ => {
			this.serviceWorkerService.requestSync('sendOrder');
			return Promise.resolve();
		})
		.then(_=> {
			this.basket = [];
			return this.save().then(_=> {
				this.basketSubject.next(this.basket);
			});
		});
		
	}

	private save() {
		return localForage.setItem('basket', this.basket);
	}

	constructor(private serviceWorkerService: ServiceWorkerService) {
		localForage.getItem('basket').then((basket:any) => {
			if(!basket) { basket = []; }
			this.basket = basket;
			this.basketSubject.next(this.basket);
		});
	}
}

