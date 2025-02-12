@Directive({
  selector: '[cursorToEnd]'
})
export class CursorToEnd {

 constructor(private elRef: ElementRef, @Self() private readonly ionInput: IonInput) { 
  //console.log("CursorToEnd", elRef)
    
  }
 
 @HostListener('focus', ['$event'])
 onKeyDown(event: any) {
   let length = String(this.elRef.nativeElement.value).length;
   console.log("On focus", length);
 }

 @HostListener('keydown', ['$event'])
 onkeypress(event: any) {
   //this.ionInput.ionChange.subscribe(()=> {
     
     let length = String(this.elRef.nativeElement.value).length;
      this.ionInput.getInputElement().then((ele: HTMLInputElement) => {
/*       this.ionInput.inputmode = 'decimal'*/
      ele.type = 'text';
      this.elRef.nativeElement.type = 'text' 
      console.log(ele.type) 
      ele.setSelectionRange(length, length);
      //this.ionInput.fireFocusEvents = true;
      ele.type = 'number';
      this.elRef.nativeElement.type = 'number'
      this.ionInput.setFocus();
       console.log(ele.type) 
    })
 // });
 }


ngOnInit(): void {

    this.ionInput.ionFocus.subscribe(()=> {
      const length = String(this.elRef.nativeElement.value).length;

      this.ionInput.getInputElement().then((ele: HTMLInputElement) => {
        ele.type = 'text';
        this.elRef.nativeElement.type = 'text'
        console.log(ele.type) 
        ele.setSelectionRange(length, length);
        this.ionInput.fireFocusEvents = true;
        ele.type = 'number';
        this.elRef.nativeElement.type = 'number'
        this.ionInput.setFocus();
         console.log(ele.type) 
      })
    });

   this.ionInput.ionChange.subscribe(()=> {
     
   let length = String(this.elRef.nativeElement.value).length;
   this.ionInput.getInputElement().then((ele: HTMLInputElement) => {
     this.ionInput.inputmode = 'numeric'
     ele.type = 'text';
     this.elRef.nativeElement.type = 'text'
     console.log(ele.type) 
     ele.setSelectionRange(length, length);
     this.ionInput.fireFocusEvents = true;
     ele.type = 'number';
     this.elRef.nativeElement.type = 'number'
     this.ionInput.setFocus();
      console.log(ele.type) 
   })
   });
  }

}
