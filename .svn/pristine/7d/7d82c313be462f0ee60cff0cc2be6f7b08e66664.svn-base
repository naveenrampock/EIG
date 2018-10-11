import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ControlMessagesComponent } from './control-messages.component';

import { TranslateModule } from '@ngx-translate/core';
import { OnlyNumber } from './directives/only-number.directive';
import { ScrollableDirective } from './directives/scrollable.directive';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { ScrollEndDirective } from './directives/scroll-end.directive';
import { CaseConditionDirective } from './directives/case-condition.directive';



@NgModule({
  imports: [CommonModule, TranslateModule],
  declarations: [ControlMessagesComponent, OnlyNumber, ScrollableDirective, ClickOutsideDirective, ScrollEndDirective, CaseConditionDirective],
  exports: [TranslateModule, ControlMessagesComponent, CommonModule, FormsModule, OnlyNumber, ScrollableDirective, ScrollEndDirective, CaseConditionDirective]
})
export class SharedModule { }