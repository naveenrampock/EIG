import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DicomComponent } from './dicom.component';
import { DicomRoutingModule } from './dicom.routing.module';
import { DicomService } from './dicom.service';
import {FileUploadModule} from 'primeng/fileupload';
import {DialogModule} from 'primeng/dialog';
// import {CacheServerComponent} from './cacheServer/cacheServer.component';
// import {DataStorageComponent} from './dataStorage/dataStorage.component';
// import {ViewersComponent} from './viewers/viewers.component';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CacheFilterPipe } from './cacheServer/cacheServer.pipe';
import { DataListModule } from 'primeng/datalist';
import { AssignedDicomComponent } from './assigned-dicom/assigned-dicom.component';
import { SharedDicomComponent } from './shared-dicom/shared-dicom.component';
import { OthersSharedDicomComponent } from './others-shared-dicom/others-shared-dicom.component';
import { GrowlModule } from 'primeng/components/growl/growl';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { MoreInformationComponent } from './more-information/more-information.component';
import { SharedModule } from '../shared/shared.module';
import {AutoCompleteModule} from 'primeng/autocomplete';



@NgModule({
  imports: [
   CommonModule, DicomRoutingModule,FileUploadModule,DialogModule,DataTableModule,DataListModule,
  FormsModule, ReactiveFormsModule ,GrowlModule,CalendarModule,SharedModule,AutoCompleteModule
],
  declarations: [DicomComponent, AssignedDicomComponent, SharedDicomComponent,
     OthersSharedDicomComponent,CacheFilterPipe, MoreInformationComponent],
 
 providers: [DicomService]
})
export class DicomModule { }
