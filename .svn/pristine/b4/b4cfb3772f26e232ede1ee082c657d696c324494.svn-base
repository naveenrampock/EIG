import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogsComponent } from './logs.component';
import { CanActivatedAuthGuard } from '../core/index';
import { AuditLogComponent } from './audit-logs/audit-logs.component';
// import { PatientInfoComponent } from './patient-info/patient-info.component';
// import { UserInfoComponent } from './user-info/user-info.component';

const logs: Routes = [
  {
    path: '',
    component: LogsComponent,
    //data: { role: [1, 2, 3] },
    // canActivate: [CanActivatedAuthGuard],
    children: [
       { path: '', component: AuditLogComponent },
    //    { path: 'patient-info', component: PatientInfoComponent, canActivate: [CanActivatedAuthGuard], data: { role: [3] } },
    //    { path: 'patient-info/:id', component: PatientInfoComponent, canActivate: [CanActivatedAuthGuard], data: { role: [3] } },
       
    //   { path: 'my-health-history', component: MyHealthHistoryComponent },
    //   { path: 'my-lifestyle', component: MyLifestyleComponent },
    //   { path: 'my-family-health-history', component: MyFamilyHealthHistoryComponent }
    ]
  },
 

];

@NgModule({
  imports: [
    RouterModule.forChild(logs)
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})

export class LogsRoutingModule { }
