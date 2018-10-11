import { data } from '../core/resource/resource';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { CanActivatedAuthGuard } from '../core/security-guard/auth.guard';
import { PatientInfoComponent } from './patient-info/patient-info.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { AuditLogComponent } from './audit-logs/audit-logs.component';
import { UserDeviceComponent } from './user-device/user-device.component'

const userRoutes: Routes = [
    {
        path: '', component: UserComponent,
        children: [
            { path: '', component: UserSettingsComponent },
            { path: 'settings', component: UserSettingsComponent, canActivate: [CanActivatedAuthGuard], data: { role: [3] } },
            { path: 'patient-list', component: PatientListComponent, canActivate: [CanActivatedAuthGuard], data: { role: [3] } },
            { path: 'patient-info', component: PatientInfoComponent, canActivate: [CanActivatedAuthGuard], data: { role: [3] } },
            { path: 'audit-logs', component: AuditLogComponent, canActivate: [CanActivatedAuthGuard], data: { role: [3] } },
            { path: 'user-device', component: UserDeviceComponent, canActivate: [CanActivatedAuthGuard], data: { role: [3] } },
            { path: 'patient-info/:id', component: PatientInfoComponent, canActivate: [CanActivatedAuthGuard], data: { role: [3] } },
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(userRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
    ]
})

export class UserRoutingModule { }
