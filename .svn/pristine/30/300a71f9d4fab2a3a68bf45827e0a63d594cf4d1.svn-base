import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvitationComponent } from './invitation.component';
import { CanActivatedAuthGuard } from '../core/index'
import { InviteUserComponent } from './invite/invite-user.component';
//import { UserInfoComponent } from './user-info/user-info.component';

const invite: Routes = [
  {
    path: '',
    component: InvitationComponent,
    //data: { role: [1, 2, 3] },
    // canActivate: [CanActivatedAuthGuard],
    children: [
       { path: '', component: InviteUserComponent },
    //   { path: 'my-health-history', component: MyHealthHistoryComponent },
    //   { path: 'my-lifestyle', component: MyLifestyleComponent },
    //   { path: 'my-family-health-history', component: MyFamilyHealthHistoryComponent }
    ]
  },
 

];

@NgModule({
  imports: [
    RouterModule.forChild(invite)
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})

export class InvitationRoutingModule { }
