import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserSettingsComponent } from './user-settings.component';
import { CanActivatedAuthGuard } from '../core/index'
import { UserConfigurationComponent } from './user-configuration-settings/user-configuration.component';
import { UserNotificationComponent } from './user-notification-settings/user-notification.component';
import { UserSecurityComponent } from './user-security-settings/user-security.component';
import { UserDeviceComponent } from './user-device/user-device.component';


const userSettings: Routes = [
  {
    path: '',
    component: UserSettingsComponent,
    //data: { role: [1, 2, 3] },
    // canActivate: [CanActivatedAuthGuard],
    children: [
      { path: '', component: UserSecurityComponent },
      { path: 'user-configuration', component: UserConfigurationComponent },
      { path: 'user-notification', component: UserNotificationComponent },
      { path: 'user-security', component: UserSecurityComponent },
      { path: 'user-device-list', component: UserDeviceComponent }

    ]
  },


];

@NgModule({
  imports: [
    RouterModule.forChild(userSettings)
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})

export class UserSettingsRoutingModule { }
