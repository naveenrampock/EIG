import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnvironmentComponent } from './environment.component';
import { CanActivatedAuthGuard } from '../core/index';
// import { AuditLogComponent } from './audit-logs/audit-logs.component';
// import { PatientInfoComponent } from './patient-info/patient-info.component';
// import { UserInfoComponent } from './user-info/user-info.component';
import {CacheServerComponent} from './cacheServer/cacheServer.component';
import {DataStorageComponent} from './dataStorage/dataStorage.component';
import {ViewersComponent} from './viewers/viewers.component';


const environment: Routes = [
  {
    path: '',
    component: EnvironmentComponent,
    data: { role: [1, 2, 3] },
    canActivate: [CanActivatedAuthGuard],
    children: [

        {
            path: 'cacheServer', component: CacheServerComponent, canActivate: [CanActivatedAuthGuard], data: { role: [1, 2, 3] }
          },
          {
            path: 'dataStorage', component: DataStorageComponent, canActivate: [CanActivatedAuthGuard], data: { role: [1, 2, 3] }
          },
          {
            path: 'viewers', component: ViewersComponent, canActivate: [CanActivatedAuthGuard], data: { role: [1, 2, 3] }
          },

    //    { path: '', component: AuditLogComponent },
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
    RouterModule.forChild(environment)
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})

export class EnvironmentRoutingModule { }
