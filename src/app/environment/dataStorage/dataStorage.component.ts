import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http/src/http';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Cookie } from 'ng2-cookies/src/services/cookie';
import { Response } from '@angular/http/src/static_response';
// import { DataStorage } from '../dicom-data-modal';
import { EnvironmentService } from '../environment.service';


@Component({
  selector: 'app-dataStorage',
  templateUrl: './dataStorage.component.html',
  styleUrls: ['./dataStorage.component.css']
})

export class DataStorageComponent implements OnInit {

   
  public dataStroageLists:any;
  public dataStorageFormBuilder: FormGroup;
  public displayDialog: boolean = false;
  public cacheSearchList: any;
  private _id:any;

    constructor(private dicomtService: EnvironmentService,
                private formbuilder: FormBuilder,
              ){}
    
      ngOnInit() {
        this.getDataStorageList();
        this.dataStorageForm();
        }

        private getDataStorageList(){
          this.dicomtService.getDataStorageList()
          .subscribe(dataStroageLists => {
            this.dataStroageLists = dataStroageLists.Body.Data[0];
          })
        }

        public showDialogToAdd() {
          this.displayDialog = true;
          this.dataStorageFormBuilder.reset();
          this.dataStorageFormBuilder.get('StatusId').setValue(true);
        }

        private dataStorageForm(){
          let name = '';
          let path = '';
          let type = '';
          let credential = '';
          let viewerId = null;
          let cacheServerId = null;
          let id = null;
          this.dataStorageFormBuilder = this.formbuilder.group({
            name : [name],
            path : [path],
            type : [type],
            credential : [credential],
            viewerId : [viewerId],
            cacheServerId : [cacheServerId],
            id : [id]
          })
        }

        public addNewDataStorage(){
          let dataStorageData = this.dataStorageFormBuilder.value
          if(dataStorageData.id == null){
          this.dicomtService.addNewDataStorage(dataStorageData)
          .subscribe(response =>{
            this.getDataStorageList()
          })
        }
        else{
          this.dicomtService.editDataStorage(dataStorageData)
          .subscribe(response =>{
            this.getDataStorageList()
          })
        }
        this.displayDialog = false;
        }

        public editSelectedDataStorage(dataStorageData){
          let storageData = dataStorageData;
          this._id = storageData.Id
          this.dataStorageFormBuilder.patchValue({
            id: dataStorageData.Id,
            name: dataStorageData.Name,
            path: dataStorageData.Path,
            type: dataStorageData.Type,
            credential: dataStorageData.Credential,
            viewerId:dataStorageData.ViewerId,
            cacheServerId:dataStorageData.CacheServerIds,

          });
          this.displayDialog = true;
        }

        public deleteSelectedDataStorage(dataStorageData){
          this.dicomtService.deleteDataStorage(dataStorageData.Id)
          .subscribe(response =>{
            this.getDataStorageList()
        })
      }

      cancel(){
        this.displayDialog = false
      }
}
  