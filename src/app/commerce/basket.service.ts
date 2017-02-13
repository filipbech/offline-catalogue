import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../products/products.service';

@Injectable()
export class BasketService {

	private basket: IProduct[];

	private basketSubject = new BehaviorSubject(this.basket);
	public basketChange$ = this.basketSubject.asObservable();

	public addToBasket(item:IProduct) {
		this.basket = [...this.basket, Object.assign({}, item)];
		this.save();
		this.basketSubject.next(this.basket);
	}

	public sendOrder() {
		console.log(JSON.stringify(this.basket));
		alert('sending order with '+ this.basket.length+' products. (check console)');
		this.basket = [];
		this.save();
		this.basketSubject.next(this.basket);
	}

	private save() {
		localStorage.setItem('basket',JSON.stringify(this.basket));
	}

	constructor() {
		this.basket = JSON.parse(localStorage.getItem('basket') || '[]');
		this.basketSubject.next(this.basket);
	}

}

