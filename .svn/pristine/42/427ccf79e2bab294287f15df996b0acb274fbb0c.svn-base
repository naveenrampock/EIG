import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivationComponent } from './activation.component'
import { CanActivatedAuthGuard } from '../core';

const routes: Routes = [
  { path: '', component: ActivationComponent, canActivate: [CanActivatedAuthGuard], data: { role: [0]} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivationRoutingModule { }
