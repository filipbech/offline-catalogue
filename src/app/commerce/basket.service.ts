import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../products/products.service';

@Injectable()
export class BasketService {

	private basket: IProduct[] = [];

	private basketSubject = new BehaviorSubject(this.basket);
	public basketChange$ = this.basketSubject.asObservable();

	public addToBasket(item:IProduct) {
		this.basket = [...this.basket, Object.assign({}, item)];
		this.basketSubject.next(this.basket);
	}

	public sendOrder() {
		alert('sending order with '+ this.basket.length+' products. (check console)');
		console.log(JSON.stringify(this.basket));
		this.basket = [];
		this.basketSubject.next(this.basket);
	}

}

