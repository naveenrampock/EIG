import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user.routing.module';
import { UserComponent } from './user.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './user.service';
import { DialogModule } from 'primeng/components/dialog/dialog';
import { ValidationService } from '../core/validation/validation.service';
import { SharedModule } from '../shared/shared.module';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { GrowlModule } from 'primeng/growl';
import { PatientInfoComponent } from './patient-info/patient-info.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import {CalendarModule} from 'primeng/calendar';
import {FileUploadModule} from 'primeng/fileupload';
import { UserSidebarComponent } from './user-sidebar/user-sidebar.component';
import { AuditLogComponent } from './audit-logs/audit-logs.component';
import {TooltipModule} from 'primeng/components/tooltip/tooltip';
import { UserDeviceComponent } from './user-device/user-device.component'


@NgModule({
  imports: [
    CommonModule,TooltipModule, UserRoutingModule, FormsModule, ReactiveFormsModule, DialogModule, SharedModule, ConfirmDialogModule, GrowlModule, DataTableModule, CalendarModule, FileUploadModule
  ],
  declarations: [UserComponent,AuditLogComponent, UserSettingsComponent, PatientInfoComponent, PatientListComponent, UserSidebarComponent,UserDeviceComponent],
  providers: [UserService, ValidationService, ConfirmationService]
})
export class UserModule { }
