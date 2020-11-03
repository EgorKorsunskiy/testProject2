import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharingModule } from '../Shared/sharing/sharing.module';
import { AddUserFormComponent } from './add-user-form.component';



@NgModule({
  declarations: [
    AddUserFormComponent
  ],
  imports: [
    CommonModule,
    SharingModule
  ],
  entryComponents:[
    AddUserFormComponent
  ],
})
export class AddUserFormModule { }
