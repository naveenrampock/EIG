import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientComponent } from './patient.component';
import { PatientInfoComponent } from './patient-info/patient-info.component';
import { PatientRoutingModule } from './patient.routing.module'
import { Router } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PatientService } from  './patient.service';
import {CalendarModule} from 'primeng/primeng';
import {MultiSelectModule} from 'primeng/multiselect';
import { GrowlModule } from 'primeng/components/growl/growl';

@NgModule({
  imports: [
    CommonModule,
    PatientRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    CalendarModule,
    MultiSelectModule,
    GrowlModule
  ],
  declarations: [
    PatientComponent,
    PatientInfoComponent
  ],
  exports: [ 
   
  ],
  providers: [PatientService]
})

export class PatientModule { }