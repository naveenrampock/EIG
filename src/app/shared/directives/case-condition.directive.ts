import { Directive, ElementRef, EventEmitter, OnInit, Output, Input } from "@angular/core";

@Directive({
    selector: '[caseCondition]'
})
export class CaseConditionDirective implements OnInit {

    @Input() caseCondition: any;
    element: any;

    constructor(private elementRef: ElementRef) {
        this.element = this.elementRef.nativeElement;
    }

    ngOnInit() {
        switch (this.caseCondition) {
            case true:
                this.hideElement();
        }
    }

    hideElement() {
        this.element.style.display = 'none';
        console.log(this.element);
    }

    // disableElement(){
    //     this.element.style.cur = 'none';
    // }
}