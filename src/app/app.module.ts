import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing } from './app.routes';
import { AppComponent } from './app.component';

import { ProductsModule } from './products/products.module';
import { OfflineModule } from './offline/offline.module';
import { CommerceModule } from './commerce/commerce.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,

    ProductsModule,
    OfflineModule,
    CommerceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
