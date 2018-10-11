// import { DialogModule, FileUploadModule, SharedModule } from 'primeng/primeng';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DicomComponent } from './dicom.component';
import {  DicomuserRoutingModule } from './dicomuser.routing.module';
import { DicomService } from './dicom.service';

import {CacheServerComponent} from './cacheServer/cacheServer.component';
import {DataStorageComponent} from './dataStorage/dataStorage.component';
import {ViewersComponent} from './viewers/viewers.component';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CacheFilterPipe } from './cacheServer/cacheServer.pipe';
// import { DataListModule } from 'primeng/datalist';
import { AssignedDicomComponent } from './assigned-dicom/assigned-dicom.component';
import { SharedDicomComponent } from './shared-dicom/shared-dicom.component';
import { OthersSharedDicomComponent } from './others-shared-dicom/others-shared-dicom.component';
import { GrowlModule } from 'primeng/components/growl/growl';
import { DataListModule } from 'primeng/components/datalist/datalist';
import {FileUploadModule} from 'primeng/fileupload';
import { DialogModule } from 'primeng/components/dialog/dialog';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { MoreInformationComponent } from './more-information/more-information.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
// import { NgProgressModule } from 'ngx-progressbar';




@NgModule({
  imports: [
   CommonModule, DicomuserRoutingModule,DialogModule,DataTableModule,DataListModule,
  FormsModule, ReactiveFormsModule ,GrowlModule,FileUploadModule,CalendarModule,SharedModule,HttpClientModule
],
  declarations: [DicomComponent, AssignedDicomComponent, SharedDicomComponent,
     OthersSharedDicomComponent,CacheServerComponent,DataStorageComponent,ViewersComponent,CacheFilterPipe, MoreInformationComponent],
 
 providers: [DicomService]
})
export class DicomUserModule { }
