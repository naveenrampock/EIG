import { NgModule } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { CanActivatedAuthGuard } from '../core/security-guard/auth.guard';
import { CaseManagementComponent } from '../case-management/case-management.component';
import { NewCaseComponent } from './new-case/new-case.component';
import { CaseDetailsComponent } from './case-details/open-cases/case-details.component';
import { InvitedCasesComponent } from './case-details/invited-cases/invited-cases.component';



const caseManagementRoutes: Routes = [
  {
    path: '', component: CaseManagementComponent, canActivate: [CanActivatedAuthGuard], data: { role: [1, 2, 3] },
    children: [
      { path: '', component: CaseDetailsComponent },
      { path: 'invited-cases', component: InvitedCasesComponent },
      { path: 'new-case', component: NewCaseComponent },
      { path: 'new-case/:id/:status', component: NewCaseComponent },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(caseManagementRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})

export class CaseManagementRoutingModule { }
