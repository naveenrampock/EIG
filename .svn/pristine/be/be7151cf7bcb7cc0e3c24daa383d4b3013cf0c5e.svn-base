import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivatedAuthGuard } from '../core/security-guard/auth.guard';
import { MessageComponent } from './message.component';

const messageRoutes: Routes = [
  { path: '', component: MessageComponent }
]

@NgModule({
  imports: [RouterModule.forChild(messageRoutes)],
  exports: [RouterModule]
})

export class MessageRoutingModule { }