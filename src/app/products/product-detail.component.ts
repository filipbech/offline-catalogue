import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from './products.service';

import { IProduct } from './products.service';

@Component({
  selector: 'product-detail',
  template: `
	<h1>{{product?.title}}</h1>
	<img [src]="product?.img" alt="" style="width:100px; height:100px; margin-right:10px; float:left;" [alt]="'image for ' + product?.title"/>
	<p>{{product?.desc}}</p>
	<p>{{product?.price}}</p>
	<button (click)="buy();">Buy</button><br/><br/>
	<a [routerLink]="['']">back</a>
  `
})
export class ProductDetailComponent {

	product:IProduct;

	buy() {
		alert('currently does nothing');
	}

	ngOnInit() {
		this.activatedRoute.params
			.map(params => params['id'])
			.map(id => this.productsService.getProductById(id))
			.subscribe(product => {
				if(product) {
					this.product = product;
				} else {
					alert('product is not available! did you remember to download?');
				}
			})
			
	}

	constructor(private activatedRoute: ActivatedRoute,
				private productsService: ProductsService
	) { }
}