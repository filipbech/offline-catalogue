import { Component } from '@angular/core';
import { ProductsService } from './products.service';

@Component({
	selector:'category-list',
	template:`
		<h1>Categories</h1>
		<ul>
			<li *ngFor="let category of categories">
				<a [routerLink]="['category/',category.url]">{{category.title}}</a>
			</li>
		</ul>
		list of categories here... 
	`
})
export class CategoryListComponent {

	categories:any[];

	ngOnInit() {
		this.categories = this.productsService.getCategories();
	}

	constructor(private productsService: ProductsService) {}
}