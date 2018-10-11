import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { CONFIG, SpinnerService, ExceptionService, HttpRequestConstants, ResponseService } from '../core/';
import { Observable } from 'rxjs/Observable';

let url = CONFIG.dicom;
// let urlTest= CONFIG.apiUrls;
// let url="http://localhost:4000/";
@Injectable()
export class DicomService {

  constructor(private _http: Http,
    private _httpRequestOptions: HttpRequestConstants,
    private _spinnerService: SpinnerService,
    private _exceptionService: ExceptionService) { }

  uploadFile(evt, id,uName) {
    this._spinnerService.show();
    let formData: FormData = new FormData();
    const files: Array<File> = evt;
    formData.append("userName",uName );
    console.log(files);
    for (let i = 0; i < files.length; i++) {
      formData.append("photo[]", files[i], files[i]['name']);
    }

    let headers = new Headers();
    headers.append('Authorization', 'bearer ');
    headers.append("UserId", '426');
  
    let options = new RequestOptions({ headers: headers });
    return this._http.post(`${url.dicomUpload}/${id}`, formData, options)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  moveToS3Upload(insId, id, sUrl, serverId) {
    let data = { instanceId: insId, uploadId: id, serverUrl: sUrl, serverId: serverId }

    this._spinnerService.show();
    return this._http
      .post(`${url.uploadS3}`, data, this._httpRequestOptions.RequestOptions)
      .map(response => response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }
  
  getDicomList(data) {
    this._spinnerService.show();
    return this._http
      .get(`${url.getDicomList}`,  this._httpRequestOptions.requestOptionsWithQueryParams(data))
      .map(response => response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  shareDicom(data) {
    this._spinnerService.show();
    return this._http
      .post(`${url.share}`, data, this._httpRequestOptions.RequestOptions)
      .map(response => response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  getSharedIDs(sPk){
    this._spinnerService.show();
    return this._http.get(`${url.getSharedIds}/${sPk}`, this._httpRequestOptions.RequestOptions)
    .map((response: Response) => <any>response.json())
    .catch(this._exceptionService.catchBadResponse)
    .finally(() => this._spinnerService.hide());
  }

  userUnShareDicom(data) {
    this._spinnerService.show();
    return this._http
      .put(`${url.unShare}`, data, this._httpRequestOptions.RequestOptions)
      .map(response => response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }



  delDicom(sPk) {
    this._spinnerService.show();
    return this._http
      .put(`${url.deleteDicom}/delete`,{"StudyPk":sPk}, this._httpRequestOptions.RequestOptions)
      .map(response => response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  getMyContacts(guid, userType,pageSize,pageNumber,userId) {
    this._spinnerService.show();
    var data = { userGuID: guid, contactType: userType,pageNumber: pageNumber,maxItemsPerPage:pageSize,contactIds:null,userId:userId }
    return this._http
    .get(`${CONFIG.apiUrls.contact}`,  this._httpRequestOptions.requestOptionsWithQueryParams(data))
      .map(response => response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());

  }

  assignDicom(data) {
    this._spinnerService.show();
    return this._http
      .put(`${url.assignDicom}`, data, this._httpRequestOptions.RequestOptions)
      .map(response => response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  userSharedDicomList(userId) {
    this._spinnerService.show();
    return this._http
      .get(`${url.getShareList}/${userId}`, this._httpRequestOptions.RequestOptions)
      .map(response => response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  dicomSharedByOthersList(userId) {
    this._spinnerService.show();
    return this._http
      .get(`${url.getothersShareList}/${userId}`, this._httpRequestOptions.RequestOptions)
      .map(response => response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  getUserList(Invitees) {
    this._spinnerService.show();
    return this._http
      .get(`${url.getUserList}/${Invitees}`, this._httpRequestOptions.RequestOptions)
      .map(response => response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  changeUploader(data) {
    this._spinnerService.show();
    return this._http
      .put(`${url.changeUploader}`, data, this._httpRequestOptions.RequestOptions)
      .map(response => response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  

  rejectDicom(insId, id, sUrl) {
    let body = { instanceId: insId, uploadId: id, serverUrl: sUrl }
    this._spinnerService.show();
    return this._http
      .put(`${url.deleteDicom}`, body, this._httpRequestOptions.RequestOptions)
      .map(response => response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide())
  }

  abnormalStatus(status){
   
    this._spinnerService.show();
    return this._http
      .get(`${url.abnormalStatus}/${status}`, this._httpRequestOptions.RequestOptions)
      .map(response => response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide())
  }

    //Cache Server Function
    getCacheServerList() {
      this._spinnerService.show();
      return this._http.get(`${url.getcacheServerList}`, this._httpRequestOptions.RequestOptions)
        .map((response: Response) => <any>response.json())
        .catch(this._exceptionService.catchBadResponse)
        .finally(() => this._spinnerService.hide());
    }
    
  addNewCacheServer(data) {
    let body = data;
    this._spinnerService.show();
    return this._http
      .post(`${url.addNewCacheServer}`, body, this._httpRequestOptions.RequestOptions)
      .map(response => response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  editCacheServer(data) {
    let body = data;
    this._spinnerService.show();
    return this._http
      .put(`${url.editCacheServer}`, body, this._httpRequestOptions.RequestOptions)
      .map(response => response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  deleteCacheServer(id) {
    
    this._spinnerService.show();
    return this._http
    .delete(`${url.deleteCacheServer}/${id}`, this._httpRequestOptions.RequestOptions)
      .map(response => response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }


  
//DataStorage functions

getDataStorageList(){
  this._spinnerService.show();
  return this._http.get(`${url.getdataStorageList}`, this._httpRequestOptions.RequestOptions)
    .map((response: Response) => <any>response.json())
    .catch(this._exceptionService.catchBadResponse)
    .finally(() => this._spinnerService.hide());
}

addNewDataStorage(data){
  let body = data;
  this._spinnerService.show();
  return this._http
    .post(`${url.addNewDataStorage}`, body, this._httpRequestOptions.RequestOptions)
    .map(response => response.json())
    .catch(this._exceptionService.catchBadResponse)
    .finally(() => this._spinnerService.hide());
}

editDataStorage(data){
  let body = data;
  this._spinnerService.show();
  return this._http
    .put(`${url.editDataStorage}`, body, this._httpRequestOptions.RequestOptions)
    .map(response => response.json())
    .catch(this._exceptionService.catchBadResponse)
    .finally(() => this._spinnerService.hide());
}

deleteDataStorage(id){

  this._spinnerService.show();
  return this._http
    .delete(`${url.deleteDataStorage}/${id}`, this._httpRequestOptions.RequestOptions)
    .map(response => response.json())
    .catch(this._exceptionService.catchBadResponse)
    .finally(() => this._spinnerService.hide());
}

//Viewers Function
getViewersList(){
  this._spinnerService.show();
  return this._http.get(`${url.getViewerList}`, this._httpRequestOptions.RequestOptions)
    .map((response: Response) => <any>response.json())
    .catch(this._exceptionService.catchBadResponse)
    .finally(() => this._spinnerService.hide());
}

addViewer(data){
  let body = data;
  this._spinnerService.show();
  return this._http
    .post(`${url.addViewerStorage}`, body, this._httpRequestOptions.RequestOptions)
    .map(response => response.json())
    .catch(this._exceptionService.catchBadResponse)
    .finally(() => this._spinnerService.hide());
}

editViewers(data){
  let body = data;
  this._spinnerService.show();
  return this._http
    .put(`${url.editViewers}`, body, this._httpRequestOptions.RequestOptions)
    .map(response => response.json())
    .catch(this._exceptionService.catchBadResponse)
    .finally(() => this._spinnerService.hide());
}

deleteViewer(id){
  
  this._spinnerService.show();
  return this._http
    .delete(`${url.deleteViewer}/${id}`, this._httpRequestOptions.RequestOptions)
    .map(response => response.json())
    .catch(this._exceptionService.catchBadResponse)
    .finally(() => this._spinnerService.hide());
}

dicomViewer(data){
  this._spinnerService.show();
  return this._http
  .get(`${url.dicomViewer}`, this._httpRequestOptions.requestOptionsWithQueryParams(data))
  .map(response => response.json())
  .catch(this._exceptionService.catchBadResponse)
  .finally(()=> this._spinnerService.hide())
}

getSingleUser(name){
  this._spinnerService.show();
  return this._http
  .get(`${CONFIG.apiUrls.getSingleUser}/${name}`,this._httpRequestOptions.RequestOptions)
  .map(response => response.json())
  .catch(this._exceptionService.catchBadResponse)
  .finally(()=> this._spinnerService.hide())
}

getUserNameById(userIds){
  this._spinnerService.show();
  return this._http
    .get(`${url.getUserNameByIds}`,  this._httpRequestOptions.requestOptionsWithQueryParams(userIds))
    .map(response => response.json())
    .catch(this._exceptionService.catchBadResponse)
    .finally(() => this._spinnerService.hide())
}
}
