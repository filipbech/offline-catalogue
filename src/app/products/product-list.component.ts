import { Component } from '@angular/core';
import { ProductsService } from './products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'product-list',
  template: `
	<h1>Products</h1>
	<div *ngIf="loading">LOADING</div>
	<ul>
		<li *ngFor="let product of products | async">
			<a [routerLink]="['/products/',product.id]">{{product.title}}</a>
		</li>
	</ul>
  `
})
export class ProductListComponent {

	products:any;

	loading:boolean = false;

	ngOnInit() {
		this.products = this.activatedRoute.params
			.do(_=> {
				this.loading = true;
			})
			.switchMap(params => {
				return this.productsService.getProductsByCategory(params['product'])
					.do(_=> {
						this.loading = false;
					});
			})
	}

	constructor(private productsService: ProductsService, 
				private activatedRoute: ActivatedRoute
	) {}
}
