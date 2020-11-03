import { Component, ElementRef, OnInit } from '@angular/core';
import { Select } from 'src/assets/Interfaces/SelectType';
import { Gender, Marital_status } from 'src/assets/Interfaces/UserObject';
import { ClassToggleDirective } from '../Directives/class-toggle.directive';

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.css']
})
export class AddUserFormComponent implements OnInit {


  public firstName:string;
  public lastName:string;
  public job:string;
  public maritalStatusValue:Marital_status;
  public maritalStatus:Select[] = [
    {value:'Married'},
    {value:'Widowed'},
    {value:'Separated'},
    {value:'Divorced'},
    {value:'Single'}
  ];
  public adress:string;
  public genderValue:Gender;
  public gender:Select[] = [
    {value:'Male'},
    {value:'Female'}
  ]
  public hobby:string;

  constructor() { }

  ngOnInit(): void {
  }

  checkForm(first_name:string,last_name:string,job:string,marital_status:Marital_status,adress:string,gender:Gender,hobby:string, OkButton:ClassToggleDirective,WrongButton:ClassToggleDirective):void{

    for(let el of [...arguments]){
      if(!el){
        return;
      }
    }

    if(OkButton.thisElement().classList.contains('hidden')){
      OkButton.classToggle('hidden');
      WrongButton.classToggle('hidden');
    }
  }

}
