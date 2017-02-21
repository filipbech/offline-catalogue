import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from './products.service';

import { IProduct } from './products.service';

import { BasketService } from '../commerce/basket.service';

@Component({
  selector: 'product-detail',
  template: `
  <div *ngIf="product">
	<h1>{{product?.title}}</h1>
	<img [src]="'assets/'+product?.id+'.jpg'" alt="" style="width:100px; height:100px; margin-right:10px; float:left;" [alt]="'image for ' + product?.title"/>
	<p>{{product?.desc}}</p>
	<p>{{product?.price}}</p>
	<button (click)="buy();">Buy</button><br/><br/>
	<a [routerLink]="['']">back</a>
  </div>
  <div *ngIf="error">{{error}}</div>
  `
})
export class ProductDetailComponent {

	product:IProduct;
	error:string;

	buy() {
		this.basketService.addToBasket(this.product);
	}

	ngOnInit() {
		this.activatedRoute.params
			.map(params => params['id'])
			.switchMap(id => this.productsService.getProductById(id))
			.subscribe(product => {
				if(product) {
					this.product = product;
				} else {
					this.error = "Product is not available (not downloaded)";
				}
			})
			
	}

	constructor(private activatedRoute: ActivatedRoute,
				private productsService: ProductsService,
				private basketService: BasketService
	) { }
}
