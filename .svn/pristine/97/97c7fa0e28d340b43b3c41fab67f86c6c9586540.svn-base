import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { CanActivatedAuthGuard } from '../core/index'
const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    //data: { role: [1, 2, 3] },
    // canActivate: [CanActivatedAuthGuard],
    children: [

      { path: 'home', loadChildren: './../launchpage/launchpage.module#LaunchpageModule', canActivate: [CanActivatedAuthGuard], data: { role: [1, 2, 3] } },
      { path: 'admin', loadChildren: './../admin/admin.module#AdminModule', canActivate: [CanActivatedAuthGuard], data: { role: [1, 2] } },
      { path: 'user', loadChildren: './../user/user.module#UserModule', canActivate: [CanActivatedAuthGuard], data: { role: [3] } },
      //{ path: 'register', redirectTo: '/register', pathMatch: 'full' },
      { path: 'contact', loadChildren: './../contact/contact.module#ContactModule', canActivate: [CanActivatedAuthGuard], data: { role: [1, 2, 3] } },
      { path: 'message', loadChildren: './../message/message.module#MessageModule', canActivate: [CanActivatedAuthGuard], data: { role: [1, 2, 3] } },
      { path: 'my-health', loadChildren: './../my-health/my-health.module#MyHealthModule', canActivate: [CanActivatedAuthGuard], data: { role: [1, 2, 3] } },
      { path: 'case-management', loadChildren: './../case-management/case-management.module#CaseManagementModule', canActivate: [CanActivatedAuthGuard], data: { role: [3] } },
      { path: 'dicom', loadChildren: './../dicom/dicom.module#DicomModule', canActivate: [CanActivatedAuthGuard], data: { role: [1, 2] } },
      { path: 'admin-case-management', loadChildren: './../admin-case-management/admin-case-management.module#AdminCaseManagementModule', canActivate: [CanActivatedAuthGuard], data: { role: [1, 2] } },
      { path: 'dicomUser', loadChildren: './../dicom-user/dicomuser.module#DicomUserModule', canActivate: [CanActivatedAuthGuard], data: { role: [3] } },
      { path: 'attachments', loadChildren: './../attachments/attachments.module#AttachmentsModule', canActivate: [CanActivatedAuthGuard], data: { role: [1, 2, 3] } },
      { path: 'emr', loadChildren: './../emr/emr.module#EmrModule', canActivate: [CanActivatedAuthGuard], data: { role: [1, 2, 3] } },
      { path: 'userProfile', loadChildren: './../user-profile/user-profile.module#UserProfileModule', canActivate: [CanActivatedAuthGuard], data: { role: [1, 2, 3] } },
      { path: 'userSettings', loadChildren: './../user-settings/user-settings.module#UserSettingsModule', canActivate: [CanActivatedAuthGuard], data: { role: [1, 2, 3] } },
      { path: 'auditLogs', loadChildren: './../logs/logs.module#LogsModule', canActivate: [CanActivatedAuthGuard], data: { role: [1, 2, 3] } },
      { path: 'invitation', loadChildren: './../invitation/invitation.module#InvitationModule', canActivate: [CanActivatedAuthGuard], data: { role: [1, 2, 3] } },
      { path: 'environment', loadChildren: './../environment/environment.module#EnvironmentModule', canActivate: [CanActivatedAuthGuard], data: { role: [1, 2, 3] } },
      
      { path: 'patient', loadChildren: './../patient/patient.module#PatientModule', canActivate: [CanActivatedAuthGuard], data: { role: [1, 2, 3] } },
     
      
      //{ path: '**', redirectTo: '/login', pathMatch: 'full' },
      //{ path: 'activation', redirectTo: '/activation', pathMatch: 'full' },
      //{ path: '', redirectTo: '/login', pathMatch: 'full' },
    ]
  },


];

@NgModule({
  imports: [
    RouterModule.forChild(homeRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})

export class HomeRoutingModule { }
