import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ImdbMainComponent } from './imdb-main/imdb-main.component';
import { ShowDataComponent } from './show-data/show-data.component';
import { InsertDataComponent } from './insert-data/insert-data.component';

@NgModule({
  declarations: [
    AppComponent,
    ImdbMainComponent,
    ShowDataComponent,
    InsertDataComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
