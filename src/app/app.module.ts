import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { UserListComponent } from './user-list/user-list.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ToasterModule, ToasterService} from 'angular2-toaster';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    Ng2SearchPipeModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    ToasterModule.forRoot(),


  ],
  providers: [ToasterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
