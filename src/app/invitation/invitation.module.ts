import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvitationComponent } from './invitation.component';
import { InviteUserComponent } from './invite/invite-user.component';
import { InvitationRoutingModule } from './invitation.routing.module'
import { Router } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InvitationService } from  './invitation.service';
import {CalendarModule} from 'primeng/primeng';
import {MultiSelectModule} from 'primeng/multiselect';
import { GrowlModule } from 'primeng/components/growl/growl';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
// import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { DialogModule } from 'primeng/components/dialog/dialog';
// import { ValidationService } from '../core/validation/validation.service';


@NgModule({
  imports: [
    CommonModule,
    InvitationRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    CalendarModule,
    MultiSelectModule,
    GrowlModule,
    DataTableModule,
    // ConfirmationService,
    ConfirmDialogModule,
    DialogModule,
    // ValidationService
  ],
  declarations: [
    InvitationComponent,
    InviteUserComponent
  ],
  exports: [ 
   
  ],
  providers: [InvitationService]
})

export class InvitationModule { }