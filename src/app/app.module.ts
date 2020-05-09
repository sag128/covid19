import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from  '@angular/common/http'
import {ButtonModule} from '@syncfusion/ej2-angular-buttons';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { PageService, SortService, FilterService,ToolbarService,TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import { CommonModule } from '@angular/common';
import { GridAllModule } from '@syncfusion/ej2-angular-grids';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ButtonModule,
    DropDownListAllModule,
    CommonModule,
    GridAllModule
  ],
  providers: [PageService,SortService,FilterService,ToolbarService,TreeGridModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
