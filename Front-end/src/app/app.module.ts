import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageModule } from './main-page/main-page.module';
import { MainPageService } from './Services/main-page.service';
import { UserDetailModule } from './user-detail/user-detail.module';
import { AddUserFormComponent } from './add-user-form/add-user-form.component';
import { AddUserFormModule } from './add-user-form/add-user-form.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainPageModule,
    UserDetailModule,
    AddUserFormModule
  ],
  providers:[
    MainPageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
