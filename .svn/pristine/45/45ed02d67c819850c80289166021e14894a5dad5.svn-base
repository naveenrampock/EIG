import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../core/modal/index';
import { AdminService } from '../admin.service';
import { Http } from '@angular/http/src/http';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Cookie } from 'ng2-cookies/ng2-cookies';


@Component({
  selector: 'app-multi-lingual-master',
  templateUrl: './multi-lingual-master.component.html',
  styleUrls: ['./multi-lingual-master.component.css']
})
export class MultiLingualMasterComponent implements OnInit {

  public multiLangData:Array<any>=[];
  public addBoilerData:Array<any>=[];
  lookUpMaster: FormGroup;
  displayDialog: boolean = false;
  languageFrom:FormGroup;
  display: boolean = false;
  public languageDrp:Array<any>=[];
  langId:any;
  path:any;
  public firstName = Cookie.get('firstName')
  public lastName = Cookie.get('lastName') 
  filesToUpload: Array<File> = [];
  saveFormData:any;

  constructor( private modalService: ModalService,
  private _adminService: AdminService, private _FB: FormBuilder) { }


  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    // this.product.photo = fileInput.target.files[0]['name'];
  }

  public upload(e){
    if(e.value.Id==null){
    let data = this.filesToUpload[0];
    this.saveFormData = e.value
    this.saveLanguage(this.saveFormData,this.path)
    // this._adminService.uploadAvatar(data).subscribe((Response)=>{
    //   this.path = Response[0].path
    // this.saveFormData = e.value
    // this.saveLanguage(this.saveFormData,this.path)
    // })
  }
  else{
    this.saveFormData = e.value
    this.editlanguage(this.saveFormData,this.path)
    // let data = this.filesToUpload[0];
    // this._adminService.uploadAvatar(data).subscribe((Response)=>{
    //   this.path = Response[0].path
    //   this.saveFormData = e.value
    //   this.editlanguage(this.saveFormData,this.path)
    // })
  }

  }

  private saveLanguage(saveFormData,path){
    let data = saveFormData
    data.path = path
    this._adminService.saveLanguage(data).subscribe((response)=>{

    })
  }

  ngOnInit() {
this.BuildForm();
this.languageForm();
     this.getlanguageDrp();
     this.getMultilingualList();
     this.getBoilerPlatesList("82");
     this.langId=82;
       this.languageFrom.controls['languageDrp'].valueChanges.subscribe((value) => {
         console.log(value)
         this.langId=value;
     this.getBoilerPlatesList(value);   
   
 
});

  }

  languageForm(){
    this.lookUpMaster = this._FB.group({
      Id: [0],
      Name: [],
      Description: [],
  
    })
  }

  showDialogToAdd() {
    this.displayDialog = true;
    this.lookUpMaster.reset();
    // this.lookUpMaster.get('StatusId').setValue(true);
  }

   BuildForm() {
    this.languageFrom = this._FB.group({
       languageDrp:['82'],
      
    })
  }
  saveOneRec(mData){
    
     let data={
      "Multilingual": {
      "CreatedBy":"1",
        "LangId":this.langId,
        "BoilerPlates":[mData] 
    }
    }   
   this.saveCommonData(data)
  }
  save(mData){
    let data={
      "Multilingual": {
      "CreatedBy":"1",
        "LangId":this.langId,
        "BoilerPlates": mData
    }
    }  
  this.saveCommonData(data) 
  }

  saveCommonData(data){
     this._adminService.saveMultilingual(data)
    .subscribe((data)=>{
      
      this.getMultilingualList();
    })
  }
  
 getMultilingualList() {
    this._adminService.getMultilingualList().subscribe((resp) => {
      this.multiLangData = resp.Body.Data;
    })
  }

  getBoilerPlatesList(langId){
    this._adminService.getBoilerPlates(langId).subscribe((resp) => {
      
      this.addBoilerData = resp;
    })
  }

  getlanguageDrp(){
     this._adminService.getlanguageDrp().subscribe((resp) => {
      this.languageDrp = resp;
    })
  }


    showDialog() {
        this.display = true;
    }

close(){
  console.log("asdf")
}

myUploader(event) {
  console.log(event);
   let uploadedFiles=[];
  for(let file of event.files) {
   
            uploadedFiles.push(file);
        }
          console.log( uploadedFiles,uploadedFiles[0].size)
    //event.files == files to upload
}


delete(file: any){
  let path = file
  this._adminService.deletelanguageFile(path)
  .subscribe((response)=>{
    console.log(response)
  })
}

editlanguage(saveFormData,path){
  let data = saveFormData
  data.path = path
  this._adminService.editlanguageFile(data).subscribe((response)=>{
    console.log("ME")
  })
}

edit(sRow) {
 
  this.displayDialog = true;
  this.lookUpMaster.patchValue({
    Id: sRow.Id,
    Name: sRow.Name,
    Description: sRow.Description,
  });
  
}
}
