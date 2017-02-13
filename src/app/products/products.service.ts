import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

import { OfflineService } from '../offline/offline.service';
import { ServiceWorkerService } from '../offline/serviceworker.service';

import 'rxjs/add/operator/do';
import 'rxjs/add/observable/forkJoin';

export interface IProduct {
	title:string;
	price:string;
	stock:boolean;
	id:number;
	desc:string;
}

@Injectable()
export class ProductsService {

	private _categories = [
		{url:'priskup', title:'Priskup', feed:'http://www.json-generator.com/api/json/get/caZonyRNFe'},
		{url:'blomster', title:'Blomster', feed:'http://www.json-generator.com/api/json/get/cbbkqVOIMO'},
		{url:'frugt-og-groent', title:'Frugt og grønt', feed:'http://www.json-generator.com/api/json/get/bUmPrizYde'},
		{url:'koed-og-fisk', title:'Kød og fisk', feed:'http://www.json-generator.com/api/json/get/cppXzHXnci'},
		{url:'koel', title:'Køl', feed:'http://www.json-generator.com/api/json/get/cfhBldjbJu'},
		{url:'frost', title:'Frost', feed:'http://www.json-generator.com/api/json/get/bZPsUKBlki'},
		{url:'kolonial', title:'Kolonial', feed:'http://www.json-generator.com/api/json/get/cpeXgneQZe'},
		{url:'vin', title:'Vin', feed:'http://www.json-generator.com/api/json/get/bVvqEVQkoi'},
		{url:'drikkevarer', title:'Drikkevarer', feed:'http://www.json-generator.com/api/json/get/cqaTnsuOZK'},
		{url:'slik-og-snacks', title:'Slik og snaks', feed:'http://www.json-generator.com/api/json/get/bQDhLYfWxu'},
		{url:'pleje', title:'Pleje', feed:'http://www.json-generator.com/api/json/get/bPGxTLHwgO'},
		{url:'alt-til-hus-og-hjem', title:'Alt til hus og hjem', feed:'http://www.json-generator.com/api/json/get/cqyyNvnznm'}
	];

	private _categoryProducts;

	public getCategories() {
		return this._categories;
	}

	public getProductsByCategory(url):Observable<IProduct[]> {
		if(this._categoryProducts[url]) {
			return Observable.of(this._categoryProducts[url]);
		}
		return this.http.get(this._categories.find(cat => cat.url == url).feed)
			.map(res=>res.json())
			.do(feed => {
				this._categoryProducts[url] = feed;
				localStorage.setItem('categoryProducts', JSON.stringify(this._categoryProducts))
			})
			.catch(err => {
				console.log('error in getter',err);
				return Observable.of([]);
			})
	}

	public download() {

		return Observable.forkJoin(...this._categories.map(cat => {
				return this.getProductsByCategory(cat.url)
			}))
			.do((categories) => {
				const list = (categories as any).reduce((acc, category) => { 
					category.forEach(product => { 
						acc.push('/assets/' + product.id + '.jpg');
					}); 
					return acc;
				}, []);
				this.serviceWorkerService.postMessage({ message:'download', list })
					.then(res => {
						alert('images cached');
					})
			});

	}
	public clear() {
		this._categoryProducts = {};
		localStorage.removeItem('categoryProducts');
	}

	public getProductById(id):IProduct {
		for (let key in this._categoryProducts) {
			for (let prod of this._categoryProducts[key]) {
				if(prod.id == id) {
					return prod;
				}
			}
		}
		return null;
	}

	constructor(private http: Http,
				private offlineService: OfflineService,
				private serviceWorkerService: ServiceWorkerService) {

		this._categoryProducts = JSON.parse(localStorage.getItem('categoryProducts')) || {};

		if(Object.keys(this._categoryProducts).length === this._categories.length) { 
			this.offlineService.setDownloaded(true);
		}

	}
}