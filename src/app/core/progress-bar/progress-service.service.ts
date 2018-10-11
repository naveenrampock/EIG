import {ExceptionService} from '../exception/exception.service';
import {SpinnerService} from '../spinner/spinner.service';
import {HttpRequestConstants} from '../provider/http-request-header.provider';
import {CONFIG} from '../config/config';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import { CONFIG} from './core/';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Rx';
import { Http } from '@angular/http';



let url = CONFIG.dicom;
@Injectable()
export class ProgressServiceService {

  constructor(private _http: Http,private _httpRequestOptions: HttpRequestConstants,
    private _spinnerService: SpinnerService,
    private _exceptionService: ExceptionService){}
 
  activate: (file?:any,id?:any) => void;

  public uploadFile(files: Array<File>, id, uName):any {

    let progress:Subject<any> = new Subject<any>();

    let request:Observable<any> = Observable.create(observer => {
      let xhr: XMLHttpRequest = new XMLHttpRequest();
      let formData: FormData = new FormData();
      formData.append("userName", uName);
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
      xhr.setRequestHeader('Authorization', 'bearer ');
      xhr.setRequestHeader("userid", id)
      xhr.send(formData);

    });

    request['progress'] = (progressObserver:(value)=>any) =>{
      progressObserver(progress);
      return request;
    };
    return request;
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

  rejectDicom(insId, uploadId, sUrl) {
    // let body={instanceId:insId,uploadId:id,serverUrl:sUrl}
    this._spinnerService.show();
    return this._http
      .delete(`${url.deleteDicom}/upload/${uploadId}`, this._httpRequestOptions.RequestOptions)
      .map(response => response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide())
  }
}
