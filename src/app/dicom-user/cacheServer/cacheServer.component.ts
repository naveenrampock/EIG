import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http/src/http';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Cookie } from 'ng2-cookies/src/services/cookie';
import { Response } from '@angular/http/src/static_response';
import { CacheServer } from '../dicom-data-modal';
import { DicomService } from '../dicom.service';

@Component({
  selector: 'app-cacheServer',
  templateUrl: './cacheServer.component.html',
  styleUrls: ['./cacheServer.component.css']
})

export class CacheServerComponent implements OnInit {

  public cacheServerLists:CacheServer[];
  public cacheServerFormBuilder: FormGroup;
  public displayDialog: boolean = false;
  public cacheSearchList: any;
  private _id:any;

    constructor(private dicomtService: DicomService,
                private formbuilder: FormBuilder,
              ){}
    
      ngOnInit() {
        this.getCacheServerList();
        this.cacheServerForm();
        }

        private getCacheServerList(){
          this.dicomtService.getCacheServerList()
          .subscribe(cacheServerLists => {
            this.cacheServerLists = cacheServerLists.Body.Data[0];
          })
        }

        public showDialogToAdd() {
          this.displayDialog = true;
          this.cacheServerFormBuilder.reset();
          this.cacheServerFormBuilder.get('StatusId').setValue(true);
        }

        private cacheServerForm(){
          let cacheServerName = '';
          let folderPath = '';
          let maxStorageSize = '';
          let usedStorageSize = '';
          let cacheServerId = null
          this.cacheServerFormBuilder = this.formbuilder.group({
            cacheServerName : [cacheServerName],
            folderPath : [folderPath],
            maxStorageSize : [maxStorageSize],
            usedStorageSize : [usedStorageSize],
            cacheServerId : [cacheServerId]
          })
        }

        public addNewCacheServer(){
          let cacheServerData = this.cacheServerFormBuilder.value
          if(cacheServerData.cacheServerId == null){
          this.dicomtService.addNewCacheServer(cacheServerData)
          .subscribe(response =>{
            this.getCacheServerList()
          })
        }
        else{
          this.dicomtService.editCacheServer(cacheServerData)
          .subscribe(response =>{
            this.getCacheServerList()
          })
        }
        this.displayDialog = false;
        }

        public editSelectedCacheServer(cacheServerData){
          let serverData = cacheServerData;
          this._id = serverData.Id
          this.cacheServerFormBuilder.patchValue({
            cacheServerId: cacheServerData.Id,
            cacheServerName: cacheServerData.Name,
            folderPath: cacheServerData.FolderPath,
            maxStorageSize: cacheServerData.MaxStorageSize,
            usedStorageSize: cacheServerData.UsedStorageSize
          });
          this.displayDialog = true;
        }

        public deleteSelectedServer(cacheServerList){
          let cacheServerId = {cacheServerId:cacheServerList.Id}
          this.dicomtService.deleteCacheServer(cacheServerId)
          .subscribe(response =>{
            this.getCacheServerList()
        })
      }
  
}
  