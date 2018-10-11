import {Directive, ElementRef, EventEmitter, OnInit, Output} from "@angular/core";

@Directive({
  selector: '[appScrollEnd]'
})
export class ScrollEndDirective implements OnInit {

  @Output()
  appScrollEnd = new EventEmitter<void>();

  constructor(private element: ElementRef) {
  }

  ngOnInit(): void {
    let nativeElement = this.element.nativeElement;
    nativeElement.addEventListener('scroll', () => {
      if (nativeElement.scrollTop + nativeElement.clientHeight >= nativeElement.scrollHeight) {
        this.appScrollEnd.emit();
      }
    });
  }
}
