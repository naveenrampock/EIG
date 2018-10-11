import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogsComponent } from './logs.component';
import { AuditLogComponent } from './audit-logs/audit-logs.component';
import { LogsRoutingModule } from './logs.routing.module'
import { Router } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LogsService } from  './logs.service';
import {CalendarModule} from 'primeng/primeng';
import {MultiSelectModule} from 'primeng/multiselect';
import { GrowlModule } from 'primeng/components/growl/growl';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import {TooltipModule} from 'primeng/components/tooltip/tooltip';


@NgModule({
  imports: [
    CommonModule,
    LogsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    CalendarModule,
    MultiSelectModule,
    GrowlModule,
    DataTableModule,
    TooltipModule
  ],
  declarations: [
    LogsComponent,
    AuditLogComponent
  ],
  exports: [ 
   
  ],
  providers: [LogsService]
})

export class LogsModule { }