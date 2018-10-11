import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyHealthComponent } from './my-health.component';
import { MyHealthHistoryComponent } from './my-health-history/my-health-history.component'
import { MyLifestyleComponent } from './my-lifestyle/my-lifestyle.component'
import { MyFamilyHealthHistoryComponent } from './my-family-health-history/my-family-health-history.component'
import { CanActivatedAuthGuard } from '../core/index'

const myHealthRoutes: Routes = [
  {
    path: '',
    component: MyHealthComponent,
    //data: { role: [1, 2, 3] },
    // canActivate: [CanActivatedAuthGuard],
    children: [
      { path: '', component: MyHealthHistoryComponent },
      { path: 'my-health-history', component: MyHealthHistoryComponent },
      { path: 'my-lifestyle', component: MyLifestyleComponent },
      { path: 'my-family-health-history', component: MyFamilyHealthHistoryComponent }
    ]
  },
 

];

@NgModule({
  imports: [
    RouterModule.forChild(myHealthRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})

export class MyHealthRoutingModule { }
