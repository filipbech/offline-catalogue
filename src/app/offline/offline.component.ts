import { Component } from '@angular/core';

import { OfflineService } from './offline.service';

@Component({
  selector: 'offline',
  template: `
	Status (online/offline): {{(isOnline | async) ? 'online' : 'offline' }} - 
	<span *ngIf="downloaded | async">downloaded - <button (click)="clearDownload();">clear</button></span>
	<button *ngIf="!(downloaded | async) && isOnline" (click)="initiateDownload()">Download</button>
  `
})
export class OfflineComponent {

	isOnline = this.offlineService.isOnlineChanges;
	downloaded = this.offlineService.downloadedChanges;;

	initiateDownload() {
		this.offlineService.download();
	}
	clearDownload() {
		this.offlineService.clear();
	}

	ngOnInit() {


	}

	constructor(private offlineService: OfflineService) { }
}