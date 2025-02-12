import { Directive, ElementRef, HostListener, Input } from "@angular/core";
import { NgControl } from "@angular/forms";

@Directive({
  selector: "[appDecimal]",
})
export class DecimalDirective {
  _decimal: any;
  @Input("input-decimal-convert") set decimal(_decimal: any) {
    this._decimal = _decimal || 2;
  }
  constructor(private el: ElementRef, private controlValue: NgControl) {}
  @HostListener("focusout", ["$event"])
  onBlur(event) {
    if (event.target.value != "" && !isNaN(event.target.value)) {
      let value: any;
      if (event.target.value > 9999999) {
        value = Number(event.target.value);
        value = value.toString(); //If it's not already a String
        value = value.slice(0, value.indexOf(".") + 3); //With 3 exposing the hundredths place
        Number(value); //If you need it back as a Number
      } else {
        value = Number(event.target.value).toFixed(this._decimal);
      }
      // event.target.value = value;
      this.controlValue.viewToModelUpdate(value);
      this.controlValue.valueAccessor.writeValue(value);
      this.controlValue.control.setValue(value);
    }
  }
}


  decimalPointABill(event) {
    const pattern = /[0-9.,]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
    let input = <HTMLInputElement>document.getElementById("agencyBillinput");
    if (input.value.length === 7) {
      input.value += ".";
    }
  }
  
  /*
  <ion-input type="text"
                 formControlName="clientBill"
                 appDecimal
                 input-decimal-convert="2"
                 id="clientBillinput"
                 value="a"
                 (keypress)="decimalPointCBill($event)"></ion-input>
  */