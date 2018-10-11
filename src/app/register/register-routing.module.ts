import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register.component';
import { CanActivatedAuthGuard } from '../core';

const routes: Routes = [
  { path: '', component: RegisterComponent, canActivate: [CanActivatedAuthGuard], data: { role: [0]} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
