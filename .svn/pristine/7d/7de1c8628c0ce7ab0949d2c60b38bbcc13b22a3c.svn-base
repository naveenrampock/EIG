import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyHealthComponent } from './my-health.component';
import { MyHealthRoutingModule } from './my-health.routing.module'
import { Router } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { MyHealthHistoryComponent } from './my-health-history/my-health-history.component'
import { MyLifestyleComponent } from './my-lifestyle/my-lifestyle.component'
import { ReactiveFormsModule } from '@angular/forms';
import { MyHealthService } from  './my-health.service';
import { MyFamilyHealthHistoryComponent } from './my-family-health-history/my-family-health-history.component'
import {CalendarModule} from 'primeng/primeng';
import {MultiSelectModule} from 'primeng/multiselect';
import { GrowlModule } from 'primeng/components/growl/growl';

@NgModule({
  imports: [
    CommonModule,
    MyHealthRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    CalendarModule,
    MultiSelectModule,
    GrowlModule
  ],
  declarations: [
    MyHealthComponent,
    MyHealthHistoryComponent,
    MyLifestyleComponent,
    MyFamilyHealthHistoryComponent,
    
  ],
  exports: [ 
   
  ],
  providers: [MyHealthService]
})

export class MyHealthModule { }