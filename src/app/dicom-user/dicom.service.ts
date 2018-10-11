import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { CONFIG, SpinnerService, ExceptionService, HttpRequestConstants, ResponseService } from '../core/';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Rx';
import { Cookie } from 'ng2-cookies/ng2-cookies';

let url = CONFIG.dicom;
// let urlTest= CONFIG.apiUrls;
// let url="http://localhost:4000/";
@Injectable()
export class DicomService {

  constructor(private _http: Http,
    private _httpRequestOptions: HttpRequestConstants,
    private _spinnerService: SpinnerService,
    private _exceptionService: ExceptionService) { }

  // uploadFile(evt, id, uName) {
  //   this._spinnerService.show();

  //   let formData: FormData = new FormData();
  //   const files: Array<File> = evt;
  //   console.log(files);
  //   formData.append("userName", uName);
  //   for (let i = 0; i < files.length; i++) {
  //     formData.append("photo[]", files[i], files[i]['name']);

  //   }

  //   let headers = new Headers();
  //   headers.append('Authorization', 'bearer ');
  //   headers.append("UserId", '426')

  //   let options = new RequestOptions({ headers: headers });
  //   return this._http.post(`${url.dicomUpload}`, formData, options)
  //     .map((response: Response) => <any>response.json())
  //     .catch(this._exceptionService.catchBadResponse)
  //     .finally(() => this._spinnerService.hide());
  // }

  // public uploadFile(files: Array<File>, id, uName):any {

  //   let progress:Subject<any> = new Subject<any>();

  //   let request:Observable<any> = Observable.create(observer => {
  //     let xhr: XMLHttpRequest = new XMLHttpRequest();
  //     let formData: FormData = new FormData();
  //     formData.append("userName", uName);
  //     for (let i = 0; i < files.length; i++) {
  //       formData.append("photo[]", files[i], files[i]['name']);
  //     }

  //     xhr.onreadystatechange = () => {
  //       if (xhr.readyState === 4) {
  //         if (xhr.status === 200) {
  //           observer.next(JSON.parse(xhr.response));
  //           observer.complete();
  //         } else {
  //           observer.error(xhr.response);
  //         }
  //       }
  //     };

  //     xhr.upload.onprogress = (event) => {
  //       progress.next(Math.round(event.loaded / event.total * 100));
  //     };

  //     xhr.open('POST', url.dicomUpload, true);
  //     xhr.setRequestHeader('Authorization', 'bearer ');
  //     xhr.setRequestHeader("UserId", '426')
  //     xhr.send(formData);

  //   });

  //   request['progress'] = (progressObserver:(value)=>any) =>{
  //     progressObserver(progress);
  //     return request;
  //   };
  //   return request;
  // }

  checkFileProcess(userId){
    
    return this._http
      .get(`${url.checkFilePrpcess}`,  this._httpRequestOptions.RequestOptions)
      .map(response => response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  public uploadFile(files: Array<File>, id, uName,dataStorageId):any {

    let progress:Subject<any> = new Subject<any>();

    let request:Observable<any> = Observable.create(observer => {
      let xhr: XMLHttpRequest = new XMLHttpRequest();
      let formData: FormData = new FormData();
      formData.append("userName", uName);
      formData.append("dataStorageId",dataStorageId)
      for (let i = 0; i < files.length; i++) {
        formData.append("photo[]", files[i], files[i]['name']);
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            observer.next(JSON.parse(xhr.response));
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };

      xhr.upload.onprogress = (event) => {
        progress.next(Math.round(event.loaded / event.total * 100));
      };

      xhr.open('POST', url.dicomUpload, true);
      xhr.setRequestHeader('authorization', Cookie.get('token') );
      // xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader("userid", id)
      xhr.setRequestHeader('UserType',Cookie.get('userType'))
      xhr.setRequestHeader('devicetype','web')
      xhr.send(formData);

    });

    request['progress'] = (progressObserver:(value)=>any) =>{
      progressObserver(progress);
      return request;
    };
    return request;
  }

  moveToS3Upload(insId, id, sUrl, serverId,dataStorageId) {
    let data = { instanceId: insId, uploadId: id, serverUrl: sUrl, serverId: serverId ,dataStorageId:dataStorageId}

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
      .get(`${url.getDicomList}`, this._httpRequestOptions.requestOptionsWithQueryParams(data))
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

  getSharedIDs(sPk) {
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

  //Cache Server Function
  getCacheServerList() {
    this._spinnerService.show();
    return this._http.get(`${url.getcacheServerList}`, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  delDicom(sPk) {
    this._spinnerService.show();
    return this._http
      .put(`${url.deleteDicom}/delete`, { "StudyPk": sPk }, this._httpRequestOptions.RequestOptions)
      .map(response => response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  getMyContacts(guid, userType, pageSize, pageno, userId) {
    this._spinnerService.show();
    var data = { userGuID: guid, contactType: userType, pageNumber: pageno, maxItemsPerPage: pageSize, contactIds: null, userId: userId }
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
      .put(`${url.deleteCacheServer}/${id}`, this._httpRequestOptions.RequestOptions)
      .map(response => response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  // rejectDicom(insId,id,sUrl){
  //   let body={instanceId:insId,uploadId:id,serverUrl:sUrl}
  //   this._spinnerService.show();
  //   return this._http
  //   .put(`${url.deleteDicom}`,body,this._httpRequestOptions.RequestOptions)
  //   .map(response => response.json())
  //   .catch(this._exceptionService.catchBadResponse)
  //   .finally(()=> this._spinnerService.hide())
  // }

  rejectDicom(insId, uploadId, sUrl) {
    // let body={instanceId:insId,uploadId:id,serverUrl:sUrl}
    this._spinnerService.show();
    return this._http
      .delete(`${url.deleteDicom}/upload/${uploadId}`, this._httpRequestOptions.RequestOptions)
      .map(response => response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide())
  }

  getAssigned(userid) {
    this._spinnerService.show();
    return this._http
      .get(`${url.getAssignedList}/${userid}`, this._httpRequestOptions.RequestOptions)
      .map(response => response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide())
  }

  getNotAssigned(userid) {
    this._spinnerService.show();
    return this._http
      .get(`${url.getNotAssignedList}/${userid}`, this._httpRequestOptions.RequestOptions)
      .map(response => response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide())
  }


  dicomViewer(data) {
    this._spinnerService.show();
    return this._http
      .get(`${url.dicomViewer}`,  this._httpRequestOptions.requestOptionsWithQueryParams(data))
      .map(response => response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide())
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
