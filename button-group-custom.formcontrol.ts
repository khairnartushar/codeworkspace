//Angular custom componenet
import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
 selector: 'app-button-group',
 template: `<div class="text-center">
 <div class="btn-group" role="group" aria-label="Basic example">
   <button type="button" [class.active]="action ==='first'" (click)="setAction('first')" class="btn btn-primary">First</button>
   <button type="button" [class.active]="action ==='second'"(click)="setAction('second')"class="btn btn-success">Second</button>
   <button type="button" [class.active]="action ==='third'"(click)="setAction('third')"class="btn btn-info">Third</button>
  
 </div>
</div>
`,
 styleUrls: ['./button-group.component.css'],
 providers:[{
   provide:NG_VALUE_ACCESSOR,
   useExisting:forwardRef(()=>ButtonGroupComponent),
   multi:true
 }]
})
export class ButtonGroupComponent implements ControlValueAccessor {


 private _action:string;
 onchangefn =  (_) => _
 get action(){
   return this._action;
 }


 set action(_action){
   this._action = _action;
  }


 setAction(_action){
   this.action = _action;
   this.onchangefn(this.action);
 }


 writeValue(obj: any): void {
   this.action = obj;
 }


 registerOnChange(fn: any): void {
   this.onchangefn = fn;
 }
 registerOnTouched(fn: any): void {
 
 }
 setDisabledState?(isDisabled: boolean): void {
  }


 constructor() { }


 ngOnInit() {
 }
}





