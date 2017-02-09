import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { OfflineComponent } from './offline.component';

import { OfflineService } from './offline.service';

@NgModule({
  declarations: [
    OfflineComponent
  ],
  imports: [
  	CommonModule,
  	RouterModule
  ],
  providers: [
    OfflineService
  ],
  exports: [
    OfflineComponent
  ]
})
export class OfflineModule { }
