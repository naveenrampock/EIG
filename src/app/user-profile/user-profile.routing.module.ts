import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile.component';
import { CanActivatedAuthGuard } from '../core/index'
import { UserInfoComponent } from './user-info/user-info.component';

const userProfile: Routes = [
  {
    path: '',
    component: UserProfileComponent,
    //data: { role: [1, 2, 3] },
    // canActivate: [CanActivatedAuthGuard],
    children: [
       { path: '', component: UserInfoComponent },
    //   { path: 'my-health-history', component: MyHealthHistoryComponent },
    //   { path: 'my-lifestyle', component: MyLifestyleComponent },
    //   { path: 'my-family-health-history', component: MyFamilyHealthHistoryComponent }
    ]
  },
 

];

@NgModule({
  imports: [
    RouterModule.forChild(userProfile)
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})

export class UserProfileRoutingModule { }
