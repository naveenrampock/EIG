import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminCaseManagementComponent } from './admin-case-management.component';
import { AdminCaseManagementRoutingModule } from './admin-case-management.routing.module';
import { AdminCaseManagementService } from './admin-case-management.service';
import { FormsModule } from '@angular/forms';
import { AdminEditCaseComponent } from './admin-edit-case/admin-edit-case.component';
import { GrowlModule } from 'primeng/growl';
import { SharedModule } from './../shared/shared.module';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/components/dialog/dialog';
import { DicomMoreInfoComponent } from '../case-management/shared/dicom-more-info/dicom-more-info.component';



@NgModule({
  imports: [
    CommonModule, AdminCaseManagementRoutingModule, FormsModule, GrowlModule, SharedModule, AutoCompleteModule, CalendarModule, DialogModule
  ],
  declarations: [AdminCaseManagementComponent, AdminEditCaseComponent, DicomMoreInfoComponent],
  providers: [AdminCaseManagementService]
})
export class AdminCaseManagementModule { }
