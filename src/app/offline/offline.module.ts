import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { OfflineComponent } from './offline.component';

import { OfflineService } from './offline.service';
import { ServiceWorkerService } from './serviceworker.service';


@NgModule({
  declarations: [
    OfflineComponent
  ],
  imports: [
  	CommonModule,
  	RouterModule
  ],
  providers: [
    OfflineService,
    ServiceWorkerService
  ],
  exports: [
    OfflineComponent
  ]
})
export class OfflineModule { }
