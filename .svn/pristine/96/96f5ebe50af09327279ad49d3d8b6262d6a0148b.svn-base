import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { LoginComponent } from './login.component';
import { CanActivatedAuthGuard } from '../core/security-guard/auth.guard';


const loginRoutes: Routes = [
  { path: '', component: LoginComponent, canActivate: [CanActivatedAuthGuard],data:{role:[0]}}
];

@NgModule({
  imports: [
    RouterModule.forChild(loginRoutes)
  ],
  exports: [
    RouterModule
  ],
})
export class LoginRoutingModule { }