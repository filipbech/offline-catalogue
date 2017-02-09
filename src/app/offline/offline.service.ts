import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Injector } from '@angular/core';
import { ProductsService } from '../products/products.service';

@Injectable()
export class OfflineService {

	private _downloaded = false;

	private set downloaded(value) {
		this._downloaded = value;
		this.downloadedSubject.next(value);
	}
	private get downloaded() {
		return this._downloaded;
	}

	private downloadedSubject = new BehaviorSubject(this.downloaded);
	public downloadedChanges = this.downloadedSubject.asObservable();


	private _isOnline = true;

	private set isOnline(value) {
		this._isOnline = value;
		this.isOnlineSubject.next(value);
	}
	private get isOnline() {
		return this._isOnline;
	}

	private isOnlineSubject = new BehaviorSubject(this.isOnline);
	public isOnlineChanges = this.isOnlineSubject.asObservable(); 


	public setDownloaded(state) {
		this.downloaded = state;
	}

	clear() {
		this.productsService.clear();
		this.downloaded = false;

	}

	download() {
		this.productsService.download()
			.subscribe(_=> {
				alert('data is now cached for offline (only viewed images)');
				this.downloaded = true;
			});
	}

	private productsService:any;

	constructor(private injector: Injector) {
		window.addEventListener('online', _ => {
			this.isOnline = true;
		});
		window.addEventListener('offline', _ => {
			this.isOnline = false;
		});

		setTimeout(_=> {
			this.productsService = this.injector.get(ProductsService);
		},1);

	}
}