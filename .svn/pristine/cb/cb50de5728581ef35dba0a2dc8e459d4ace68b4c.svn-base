import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCaseManagementComponent } from './admin-case-management.component';
import { CanActivatedAuthGuard } from '../core';

let caseRoutes: Routes = [{
    path: '', component: AdminCaseManagementComponent, canActivate: [CanActivatedAuthGuard], data: { role: [1, 2] }
}]

@NgModule({
    imports: [RouterModule.forChild(caseRoutes)],
    exports: [RouterModule]
})

export class AdminCaseManagementRoutingModule {

}