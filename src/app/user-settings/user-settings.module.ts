import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSettingsComponent } from './user-settings.component';
import { UserSettingsRoutingModule } from './user-settings.routing.module'
import { Router } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { UserSettingsService } from './user-settings.service';
import { CalendarModule } from 'primeng/primeng';
import { MultiSelectModule } from 'primeng/multiselect';
import { GrowlModule } from 'primeng/components/growl/growl';
import { UserConfigurationComponent } from './user-configuration-settings/user-configuration.component';
import { UserNotificationComponent } from './user-notification-settings/user-notification.component';
import { UserSecurityComponent } from './user-security-settings/user-security.component';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { ValidationService } from '../core/validation/validation.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { UserDeviceComponent } from './user-device/user-device.component';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/components/fileupload/fileupload';
import { AutoCompleteModule } from 'primeng/primeng';
import { DialogModule } from 'primeng/components/dialog/dialog';
import { DataTableModule } from 'primeng/components/datatable/datatable';


@NgModule({
  imports: [
    CommonModule,
    UserSettingsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    CalendarModule,
    MultiSelectModule,
    GrowlModule,
    FormsModule,
    ConfirmDialogModule,
    TableModule,
    FileUploadModule,
    AutoCompleteModule,
    DialogModule,
    DataTableModule
  ],
  declarations: [
    UserSettingsComponent,
    UserConfigurationComponent,
    UserNotificationComponent,
    UserSecurityComponent,
    UserDeviceComponent
  ],
  exports: [

  ],
  providers: [UserSettingsService, ConfirmationService, ValidationService]
})

export class UserSettingsModule { }