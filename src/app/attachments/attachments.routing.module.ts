import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AttachmentsComponent } from './attachments.component';
import { CanActivatedAuthGuard } from '../core';

const routes: Routes = [
  { path: '', component: AttachmentsComponent ,canActivate: [CanActivatedAuthGuard], data: { role: [1, 2, 3] }}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})
export class AttachmentsRoutingModule { }
