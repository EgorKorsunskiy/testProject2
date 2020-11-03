import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { PutDto } from 'src/assets/Interfaces/Dto';
import { Select } from 'src/assets/Interfaces/SelectType';
import { Gender, IUser, Marital_status } from 'src/assets/Interfaces/UserObject';
import { ClassToggleDirective } from '../Directives/class-toggle.directive';
import { MainPageService } from '../Services/main-page.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  public isAllFields:boolean = true;
  public genderSelect:Select[] = [
    {value:'Male'},
    {value:'Female'}
  ]
  public maritalStatusSelect:Select[] = [
    {value:'Married'},
    {value:'Widowed'},
    {value:'Separated'},
    {value:'Divorced'},
    {value:'Single'}
  ]
  public maritalStatusSelectedValue:Marital_status;
  public genderSelectedValue:Gender;
  public $users:Observable<IUser[]>;
  public user_id:string;
  public changeObject:PutDto = {};

  constructor(private _router:Router, private _activatedRoute:ActivatedRoute, private _mainPageService:MainPageService) { }

  ngOnInit(): void {

    this._activatedRoute.paramMap.subscribe(params => {
      this.user_id = params.get('id')
    })

    let url:string = `http://localhost:3000/users/getOne/${this.user_id}`;

    this._mainPageService.MakeGetRequestOne(url).subscribe(data => {
      let users:IUser[] = [];
      users.push(data);

      this.$users = of(users);
      this.genderSelectedValue = data.gender;
      this.maritalStatusSelectedValue = data.marital_status;
    },
    error => {
      alert('Something went wrong!' + error)
    })
  }

  deleteUser(id:number):void{
    if(!confirm('Are you sure?')) return;

    let url = `http://localhost:3000/users/delete/${id}`;

    this._mainPageService.MakeDeleteRequest(url);
    this._router.navigate(['/'])
  }

  toggleEditButtons(target:HTMLButtonElement, buttons:ClassToggleDirective[]):void{
    if(!this.isAllFields){
      alert('You do not filled all of the fields!');
      return;
    }

    buttons.forEach(el => {
      el.classToggle('hidden')
    })

    if(target.innerText == 'Edit'){
      target.innerText = 'Accept';
    }
    else{
      target.innerText = 'Edit';
      let url: string = 'http://localhost:3000/users/patch';
      this._mainPageService.MakePatchRequest(url, JSON.stringify(this.changeObject));
      this.changeObject = {};
    }
  }

  toggleInputP(p:ClassToggleDirective, input:ClassToggleDirective):void{
    p.classToggle('hidden');
    input.classToggle('hidden');
  }

  changeButtonValue(name:ClassToggleDirective, info:ClassToggleDirective, button:ClassToggleDirective, input:ClassToggleDirective=null):void{
    let inputValue = this.isInput(input)?
    input.thisElement().value:
    this.genderOrMaritalStatus(input)?
    this.genderSelectedValue:
    this.maritalStatusSelectedValue;

    let elementValue = button.toggleSymbol();

    this.isAllFields = false;

    if(elementValue == 'check_mark'){
      if(!inputValue){
        alert('Please enter somesting!');
        this.isAllFields = true;
        return
      }
      
      this.changeInfoText(info, inputValue);

      this.changeObject.user_id = parseInt(this.user_id, 10);
      try{
        this.changeObject.updated_data.push({
          name: name.thisElement().innerText.slice(0,-3),
          value: inputValue
        })
      }
      catch{
      this.changeObject.updated_data = [{
          name: name.thisElement().innerText.slice(0,-3),
          value: inputValue
      }] 
    }
    finally{
      this.isAllFields = true;
    }
    }
  }

  changeInfoText(info:ClassToggleDirective, value:string):void{
    info.thisElement().innerText = value;
  }
  
  isInput(target:ClassToggleDirective):boolean{
    try{
      target.thisElement();
      return true
    }
    catch{
      return false
    }
  }

  genderOrMaritalStatus(target):boolean{
    if(target == 'Male' || target == 'Female'){
      return true;
    }
    return false;
  }
}
