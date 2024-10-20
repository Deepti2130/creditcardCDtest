import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCreditcard]'
})
export class CreditcardDirective implements OnInit{

  constructor(
    private _eleRef : ElementRef,
    private _rendrer : Renderer2
  ) { }

  ngOnInit(): void {
  this.creditcarderror()
  }

  @HostListener('keyup',['$event'])
  validatecreditcard(eve:Event){

    // console.log(eve.target as HTMLInputElement)
   //it gives value with there space
    let inputcontrol = (eve.target as HTMLInputElement)

    let val = inputcontrol.value.replace(/\s+/g,"")

    console.log(val, val.length)

    //if we required maximum length or character i.e 16
    if(val.length > 16){
      val = val.substring(0,16)
    }

    //if we cant use special character then follow the condition

    // console.log( /[^\d]/.test(val))
    if(/[^\d]/.test(val)){
      inputcontrol.nextElementSibling?.classList.remove('d-none')
    }else{
      inputcontrol.nextElementSibling?.classList.add('d-none')
    }

    //the chunk value also show on UI hence follow the steps so we need a varial to store the value and then set it

    let formatedvalue = this.formatcreditcardval(val)

    inputcontrol.value = formatedvalue

  }


  formatcreditcardval(data:string):string{
    let chunkArr = []
    for(let i=0; i < data.length; i+=4){
      chunkArr.push(data.slice(i, i+4))
    }
    return chunkArr.join(" ")
  }

  creditcarderror(){
    let para = document.createElement('para')

    para.className = "text-danger d-none"

    para.innerHTML='<strong>please enter valid card details</strong>'

    // this._eleRef.nativeElement.parentElement.append(para)

    this._rendrer.appendChild(this._eleRef.nativeElement.parentElement, para)
  }

}


