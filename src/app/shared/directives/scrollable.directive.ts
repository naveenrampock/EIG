import { Directive,HostListener,EventEmitter,Output,ElementRef } from '@angular/core';

@Directive({
  selector: '[scrollable]'
})
export class ScrollableDirective {

  @Output() scrollPosition = new EventEmitter()

  constructor(public elf:ElementRef) { }

  @HostListener('window:scroll', ['$event'])
  onScroll(event){
    try {
  
      let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
      let max = document.documentElement.scrollHeight;

        // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
        if(pos == max )   {
        //Do your action here
        this.scrollPosition.emit('bottom')
      }  

    }catch(err){
      console.log("In catch of directive");
    }
  }

}
