import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  	<a [routerLink]="['']">Hjem</a>
  	<mini-basket></mini-basket>
  	<offline></offline>
  	<router-outlet></router-outlet>
  `
})
export class AppComponent {}
