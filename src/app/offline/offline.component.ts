import { Component } from '@angular/core';

import { OfflineService } from './offline.service';
import { Observable } from 'rxjs'; 

@Component({
  selector: 'offline',
  template: `Status (online/offline): {{(isOnline | async) ? 'online' : 'offline' }} - 
	<span *ngIf="downloaded | async">downloaded</span>
	<button *ngIf="!(downloaded | async) && (isOnline | async)" (click)="initiateDownload()">Download</button>
  `
})
export class OfflineComponent {

	isOnline: Observable<boolean> = this.offlineService.isOnlineChanges;
	downloaded: Observable<boolean> = this.offlineService.downloadedChanges;

	initiateDownload() {
		this.offlineService.download();
	}
	clearDownload() {
		this.offlineService.clear();
	}

	constructor(private offlineService: OfflineService) { }
}
