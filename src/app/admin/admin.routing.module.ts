import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { SettingsComponent } from './settings/settings.component';
import { MultiLingualMasterComponent } from './multi-lingual-master/multi-lingual-master.component';
import { LookupmasterComponent } from './lookupmaster/lookupmaster.component';
import { EmailNotificationsComponent } from './email-notifications/email-notifications.component';
import { LogComponent } from './logs/logs.component';
import { CanActivatedAuthGuard } from '../core/security-guard/auth.guard';
import { UserManagementComponent } from './user-management/user-management.component';
import { AdminManagementComponent } from './admin-management/admin-management.component';
import { ProfileComponent } from './profile/profile.component';
import { UserDefaultComponent } from './user-default/user-default.component';
import { PatientInfoComponent } from './patient-info/patient-info.component';
import { AdminDefaultComponent } from './admin-default/admin-default.component';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', component: SettingsComponent, canActivate: [CanActivatedAuthGuard] },
      { path: 'settings', component: SettingsComponent, canActivate: [CanActivatedAuthGuard], data: { role: [1, 2] } },
      { path: 'admin-multilingual', component: MultiLingualMasterComponent, canActivate: [CanActivatedAuthGuard], data: { role: [1, 2] } },
      { path: 'lookup-master', component: LookupmasterComponent, canActivate: [CanActivatedAuthGuard] , data: { role: [1, 2] }},
      { path: 'logs', component: LogComponent, data: { role: [1, 2] } },
      {
        path: 'email-notifications', component: EmailNotificationsComponent,
        canActivate: [CanActivatedAuthGuard], data: { role: [1, 2] }
      },
      { path: 'userManagement', component: UserManagementComponent, canActivate: [CanActivatedAuthGuard], data: { role: [1, 2] } },
      { path: 'adminManagement', component: AdminManagementComponent, canActivate: [CanActivatedAuthGuard], data: { role: [1] } },
      { path: "profile/:Id", component: ProfileComponent, canActivate: [CanActivatedAuthGuard], data: { role: [1, 2] } },
      { path: "userDefault", component: UserDefaultComponent, canActivate: [CanActivatedAuthGuard], data: { role: [1, 2] } },
      { path: "patient-info/:Id", component: PatientInfoComponent, canActivate: [CanActivatedAuthGuard], data: { role: [1, 2] } },
      { path: "adminDefault", component: AdminDefaultComponent, canActivate: [CanActivatedAuthGuard], data: { role: [1] } },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})

export class AdminRoutingModule { }
