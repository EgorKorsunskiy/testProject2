import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appClassToggle]',
  exportAs: 'classToggle'
})
export class ClassToggleDirective {

  constructor(private _elementRef:ElementRef) {}

  classToggle(styleClass:string):void{
    this._elementRef.nativeElement.classList.toggle(styleClass);
  }
  toggleSymbol():string{
    if(this._elementRef.nativeElement.classList.contains('lower_right_pencil')){
      this._elementRef.nativeElement.classList.remove('lower_right_pencil');
      this._elementRef.nativeElement.classList.add('check_mark');
      return 'lower_right_pencil';
    }
    else{
      this._elementRef.nativeElement.classList.add('lower_right_pencil');
      this._elementRef.nativeElement.classList.remove('check_mark');
      return 'check_mark';
    }

  }
  thisElement(){
    return this._elementRef.nativeElement;
  }
}
