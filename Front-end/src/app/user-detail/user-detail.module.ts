import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDetailComponent } from './user-detail.component';
import { SharingModule } from '../Shared/sharing/sharing.module';


@NgModule({
  declarations: [
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    SharingModule
  ]
})
export class UserDetailModule { }
