import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'; // This is where your routes are defined
import { AppComponent } from './app.component';
import { BusinessCardListComponent } from './business-card-list/business-card-list.component';
import { BusinessCardAddComponent } from './business-card-add/business-card-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxFileDropModule } from 'ngx-file-drop';

@NgModule({
  declarations: [
    AppComponent,
    BusinessCardListComponent,
    BusinessCardAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,            // For template-driven forms
    ReactiveFormsModule,     // For reactive forms
    HttpClientModule  ,       // To make HTTP calls to your backend
    NgxFileDropModule
  ],
  providers: [],
  bootstrap: [AppComponent] // This is the root component of the app
})
export class AppModule { }
