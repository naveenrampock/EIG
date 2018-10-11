import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnvironmentComponent } from './environment.component';
// import { AuditLogComponent } from './audit-logs/audit-logs.component';
import { EnvironmentRoutingModule } from './environment.routing.module'
import { Router } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EnvironmentService } from  './environment.service';
import {CalendarModule} from 'primeng/primeng';
import {MultiSelectModule} from 'primeng/multiselect';
import { GrowlModule } from 'primeng/components/growl/growl';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import {TooltipModule} from 'primeng/components/tooltip/tooltip';
import {CacheServerComponent} from './cacheServer/cacheServer.component';
import {DataStorageComponent} from './dataStorage/dataStorage.component';
import {ViewersComponent} from './viewers/viewers.component';
import { CacheFilterPipe } from './cacheServer/cacheServer.pipe';
import {DialogModule} from 'primeng/dialog';

@NgModule({
  imports: [
    CommonModule,
    EnvironmentRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    CalendarModule,
    MultiSelectModule,
    GrowlModule,
    DataTableModule,
    TooltipModule,
    DialogModule
  ],
  declarations: [
    EnvironmentComponent,
    CacheServerComponent,
    DataStorageComponent,
    ViewersComponent,
    CacheFilterPipe
    // AuditLogComponent
  ],
  exports: [ 
   
  ],
  providers: [EnvironmentService]
})

export class EnvironmentModule { }