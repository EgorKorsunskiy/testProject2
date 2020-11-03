import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { PutDto } from 'src/assets/Interfaces/Dto';
import { Select } from 'src/assets/Interfaces/SelectType';
import { IUser } from 'src/assets/Interfaces/UserObject';
import { AddUserFormComponent } from '../add-user-form/add-user-form.component';
import { ClassToggleDirective } from '../Directives/class-toggle.directive';
import { MainPageService } from '../Services/main-page.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit{
  @ViewChild('addContainer') addContainerEl:ClassToggleDirective;
  @ViewChild('paginator') paginatorEl:ClassToggleDirective;

  public isAllFields:boolean = true;
  public $users:Observable<IUser[]>;
  public $CurrentPageUsers:Observable<IUser[]>;
  public usersCount:number;
  public pageSize:number = 10;
  public pageIndex:number = 1;
  public pageSizeOptions:Array<number> = [5, 10, 25, 100];
  public changeObject:PutDto = {};
  public maritalStatusSelectedValue:string;
  public maritalStatusSelect:Select[] = [
    {value:'Married'},
    {value:'Widowed'},
    {value:'Separated'},
    {value:'Divorced'},
    {value:'Single'}
  ]

  constructor(private _http:HttpClient, private _mainPageService:MainPageService, private _dialog:MatDialog) { }

  ngOnInit(): void {
    let url:string = 'http://localhost:3000/users/getAll';

    this.MakeRequest(url);
  }

  showCreateUserForm():void{
    let dialogRef = this.openWindow();

    dialogRef.afterClosed().subscribe(data => {
      

      let url:string = 'http://localhost:3000/users/create';
      let PostObject:IUser = {
        first_name: data[0],
        last_name:data[1],
        job:data[2],
        marital_status:data[3],
        adress:data[4],
        gender:data[5],
        hobby:data[6]
      }
      this._mainPageService.MakePostRequest(url, JSON.stringify(PostObject))
    })
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

  changeButtonValue(name:ClassToggleDirective, info:ClassToggleDirective, button:ClassToggleDirective, input:ClassToggleDirective, user_id:number):void{
    let inputValue = this.isInput(input)?
    input.thisElement().value:
    this.maritalStatusSelectedValue;
    let elementValue = button.toggleSymbol();

    this.isAllFields = false;

    if(elementValue == 'check_mark'){
      if(!inputValue){
        alert('Please enter somesting!');
        this.isAllFields = true
        return
      }
      
      this.changeInfoText(info, inputValue);

      this.changeObject.user_id = user_id;
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

  isInput(target:ClassToggleDirective):boolean{
    try{
      target.thisElement();
      return true
    }
    catch{
      return false
    }
  }

  MakeRequest(url:string):void{

    this._mainPageService.MakeGetRequestMany(url)
    .subscribe(data => {
      this.$users = of(data);
      this.$CurrentPageUsers = of(this.sliceUsers(data));
      this.usersCount = data.length;
    })
  }

  sliceUsers(data:IUser[]):IUser[]{
    return data.slice((this.pageSize*this.pageIndex)-this.pageSize,this.pageSize*this.pageIndex);
  }

  changeInfoText(info:ClassToggleDirective, value:string):void{
    info.thisElement().innerText = value;
  }

  openWindow():MatDialogRef<AddUserFormComponent>{
    return this._dialog.open(AddUserFormComponent, {
      width: '400px',
      panelClass:'custom-dialog'
    }) 
  }

  changePage(event):void{
    this.pageIndex = event.pageIndex?event.pageIndex:event.pageIndex + 1;
    this.pageSize = event.pageSize;

    this.$users.subscribe(data => {
      this.$CurrentPageUsers = of(this.sliceUsers(data));
    })
  }
}
