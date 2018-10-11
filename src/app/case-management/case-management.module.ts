import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaseManagementComponent } from './case-management.component';
import { CaseManagementRoutingModule } from './case-management.routing.module';
import { NewCaseComponent } from './new-case/new-case.component';
import { CaseDetailsComponent } from './case-details/open-cases/case-details.component';
import { FormsModule } from '@angular/forms';
import { CaseManagementService } from './case-management.service';
import { GrowlModule } from 'primeng/growl';
import { CaseManagementSidebarComponent } from './case-management-sidebar/case-management-sidebar.component';

import { CaseManagementUtilService } from './case-management-util.service';
import { InvitedCasesComponent } from './case-details/invited-cases/invited-cases.component';
import { CalendarModule } from 'primeng/calendar';

import { AppointmentComponent } from './case-details/open-cases/appointment/appointment.component';
import { InvitedAppointmentsComponent } from './case-details/invited-cases/invited-appointments/invited-appointments.component';
import { VideorendererComponent } from './shared/videorenderer/videorenderer.component'
import { EditCaseComponent } from './shared/edit-case/edit-case.component';
import { AddDicomComponent } from './shared/add-dicom/add-dicom.component';
import { SharedModule } from './../shared/shared.module';
import { DicomMoreInfoComponent } from './shared/dicom-more-info/dicom-more-info.component';
import { DialogModule } from 'primeng/components/dialog/dialog';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { DicomService } from '../dicom/dicom.service';



@NgModule({
  imports: [

    CommonModule, CaseManagementRoutingModule, FormsModule, GrowlModule, CalendarModule, DataTableModule, SharedModule, DialogModule
  ],
  declarations: [CaseManagementComponent, NewCaseComponent, CaseDetailsComponent, CaseManagementSidebarComponent, AddDicomComponent, EditCaseComponent, InvitedCasesComponent, AppointmentComponent, InvitedAppointmentsComponent, VideorendererComponent,

    DicomMoreInfoComponent],
  providers: [CaseManagementService, CaseManagementUtilService, DicomService],
  exports: [DicomMoreInfoComponent]
})
export class CaseManagementModule { }
