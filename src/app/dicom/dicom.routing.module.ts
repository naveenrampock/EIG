import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DicomComponent } from './dicom.component';
import { CanActivatedAuthGuard } from '../core';
// import {CacheServerComponent} from './cacheServer/cacheServer.component';
// import {DataStorageComponent} from './dataStorage/dataStorage.component';
// import {ViewersComponent} from './viewers/viewers.component';
import { SharedDicomComponent } from './shared-dicom/shared-dicom.component';
import { OthersSharedDicomComponent } from './others-shared-dicom/others-shared-dicom.component';

const dicomRoutes: Routes = [
  {
    path: '', component: DicomComponent, canActivate: [CanActivatedAuthGuard], data: { role: [1, 2, 3] },
    
  },
  // {
  //   path: 'cacheServer', component: CacheServerComponent, canActivate: [CanActivatedAuthGuard], data: { role: [1, 2, 3] }
  // },
  // {
  //   path: 'dataStorage', component: DataStorageComponent, canActivate: [CanActivatedAuthGuard], data: { role: [1, 2, 3] }
  // },
  // {
  //   path: 'viewers', component: ViewersComponent, canActivate: [CanActivatedAuthGuard], data: { role: [1, 2, 3] }
  // },
  {
    path: 'share', component: SharedDicomComponent , canActivate: [CanActivatedAuthGuard], data: { role: [1, 2, 3]}
  },
  {
    path: 'sharedToMe', component: OthersSharedDicomComponent , canActivate: [CanActivatedAuthGuard], data: { role: [1, 2, 3]}
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(dicomRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})

export class DicomRoutingModule { }
