
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LookupmasterComponent } from './lookupmaster/lookupmaster.component';
import { LogComponent } from './logs/logs.component';
import { MultiLingualMasterComponent } from './multi-lingual-master/multi-lingual-master.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { AdminManagementComponent } from './admin-management/admin-management.component';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin.routing.module';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import {TooltipModule} from 'primeng/components/tooltip/tooltip';
// import { AdminService } from '../admin/admin.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule }from 'primeng/components/dialog/dialog';
import { AdminService } from './admin.service';
import { SharedModule } from '../shared/shared.module';
import { EmailNotificationsComponent } from './email-notifications/email-notifications.component';
import { UserDefaultComponent } from './user-default/user-default.component';
import { ProfileComponent } from './profile/profile.component';
// import { FileUploadModule } from 'primeng/fileupload';
import { SidebarNavComponent } from './sidebar-nav/sidebar-nav.component';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { GrowlModule } from 'primeng/components/growl/growl';
import {SearchFilterPipe } from './user-management/search.pipe';
import { PatientInfoComponent } from './patient-info/patient-info.component';
import { UserService } from './../user/user.service';
import {CalendarModule} from 'primeng/calendar';
import { AdminDefaultComponent } from './admin-default/admin-default.component';
import {InputMaskModule} from 'primeng/inputmask';


@NgModule({
  imports: [
    CommonModule, AdminRoutingModule, DataTableModule, 
    DialogModule, ConfirmDialogModule, FormsModule, 
    ReactiveFormsModule, SharedModule, TooltipModule,
    GrowlModule,CalendarModule,InputMaskModule
  ],
  declarations: [LookupmasterComponent, SearchFilterPipe, LogComponent, MultiLingualMasterComponent, DashboardComponent,
     SettingsComponent, UserManagementComponent, AdminManagementComponent,
      AdminComponent, EmailNotificationsComponent, SidebarNavComponent, ProfileComponent,UserDefaultComponent,PatientInfoComponent,AdminDefaultComponent],
  providers: [AdminService,ConfirmationService,UserService]
})
export class AdminModule { }
