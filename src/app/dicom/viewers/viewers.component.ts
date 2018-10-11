import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http/src/http';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Cookie } from 'ng2-cookies/src/services/cookie';
import { Response } from '@angular/http/src/static_response';
// import { Viewers } from '../dicom-data-modal';
import { DicomService } from '../dicom.service';

@Component({
  selector: 'app-viewers',
  templateUrl: './viewers.component.html',
  styleUrls: ['./viewers.component.css']
})

export class ViewersComponent implements OnInit {


  public viewerLists:any;
  public viewerFormBuilder: FormGroup;
  public displayDialog: boolean = false;
  public cacheSearchList: any;
  private _id:any;

    constructor(private dicomtService: DicomService,
                private formbuilder: FormBuilder,
              ){}
    
      ngOnInit() {
        this.getViewersList();
        this.viewerForm();
        }

        private getViewersList(){
          this.dicomtService.getViewersList()
          .subscribe(viewerLists => {
            this.viewerLists = viewerLists.Body.Data[0];
          })
        }

        public showDialogToAdd() {
          this.displayDialog = true;
          this.viewerFormBuilder.reset();
          this.viewerFormBuilder.get('StatusId').setValue(true);
        }

        private viewerForm(){
          let type = '';
          let url = '';
          let description = '';
          let encryptiontype = '';
          let credential = '';
          let id = null
          this.viewerFormBuilder = this.formbuilder.group({
            type : [type],
            url : [url],
            description : [description],
            encryptiontype : [encryptiontype],
            credential : [credential],
            id : [id]
          })
        }

        public addNewCacheServer(){
          let viewerData = this.viewerFormBuilder.value
          if(viewerData.id == null){
          this.dicomtService.addViewer(viewerData)
          .subscribe(response =>{
            this.getViewersList()
          })
        }
        else{
          this.dicomtService.editViewers(viewerData)
          .subscribe(response =>{
            this.getViewersList()
          })
        }
        this.displayDialog = false;
        }
       
   
        public editSelectedCacheServer(viewerData){
          let data = viewerData;
          this._id = data.Id
          this.viewerFormBuilder.patchValue({
            id: viewerData.Id,
            type: viewerData.Type,
            url: viewerData.Url,
            description: viewerData.Discription,
            encryptiontype: viewerData.UrlEncryptionType,
            credential: viewerData.UrlCredential
          });
          this.displayDialog = true;
        }

        public deleteSelectedServer(viewerList){
          
          this.dicomtService.deleteViewer(viewerList.Id)
          .subscribe(response =>{
            this.getViewersList()
        })
      }

      cancel(){
        this.displayDialog = false
      }

}
  