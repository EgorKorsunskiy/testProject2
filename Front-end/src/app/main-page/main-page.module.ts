import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { SharingModule } from '../Shared/sharing/sharing.module';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  declarations: [
    MainPageComponent
  ],
  imports: [
    CommonModule,
    SharingModule,
    MatPaginatorModule
  ]
})
export class MainPageModule { }
