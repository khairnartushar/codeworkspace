import {
    Directive,
    ElementRef,
    HostListener,
    Input
} from "@angular/core";


@Directive({
    selector: "[numeric]"
})
export class NumericDirective {

    @Input('integers') 
    integers: number = 5;
    
    @Input('decimalSeparator') 
    decimalSeparator = '.';
    
    @Input('decimals') 
    decimals: number = 0;    
    
    @Input('enableMinusPlusOperator') 
    enableMinusPlusOperator = false;
    
    private invalidEndChars = ['+', '-', this.decimalSeparator];

    private check(value: any): boolean {   
        let regExp;     
        if (this.decimals == 0) {
            if (this.enableMinusPlusOperator) {
                regExp = '^(([+-])|([+-]{0,1}[0-9]{1,' + this.integers + '}))$';
            } else {
                regExp = '^[0-9]{1,' + this.integers + '}$'; 
            }            
        } else {            
            if (this.enableMinusPlusOperator) {
                regExp = '^(([+-])|([+-]{0,1}[0-9]{1,' + this.integers + '}(\\' + this.decimalSeparator + '[0-9]{0,' + this.decimals + '}){0,1}))$';
            } else {
                regExp = '^([0-9]{1,' + this.integers + '}(\\' + this.decimalSeparator + '[0-9]{0,' + this.decimals + '}){0,1})$';
            }                        
        }        
        return String(value).match(new RegExp(regExp)) != undefined;
    }

    private lastCheck() {
        setTimeout(() => {   
            let currentValue = String(this.el.nativeElement.value);
            this.invalidEndChars.forEach(invalidChar => {
                if (currentValue.endsWith(invalidChar)) {                
                    this.el.nativeElement.value = currentValue.replace(invalidChar, '');
                }   
            });                     
        });
    }

    private run(oldValue) {
        setTimeout(() => {    
            let currentValue: string = this.el.nativeElement.value;
            if (currentValue !== '' && !this.check(currentValue)) {                
                this.el.nativeElement.value = oldValue;
            }            
        });
    }

    constructor(private el: ElementRef) {}

    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        this.run(this.el.nativeElement.value);
    }

    @HostListener('paste', ['$event'])
    onPaste(event: ClipboardEvent) {
        this.run(this.el.nativeElement.value);
    }

    @HostListener('focusout')
    onBlur() {
        this.lastCheck();
    }

}
