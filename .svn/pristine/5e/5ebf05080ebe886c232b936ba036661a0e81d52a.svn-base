import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { CONFIG, SpinnerService, ExceptionService, HttpRequestConstants, ResponseService } from '../core/';
import { Observable } from 'rxjs/Observable';
import { Cookie } from 'ng2-cookies/src/services/cookie';
//import { Contacts } from './contact-data-model'

let url = CONFIG.apiUrls;

@Injectable()
export class UserProfileService {

  constructor(private _http: Http,
    private _httpRequestOptions: HttpRequestConstants,
    private _spinnerService: SpinnerService,
    private _exceptionService: ExceptionService,
  ) { }

  getUserProfileDetailsById(uID: any) {
    this._spinnerService.show();
    return this._http.get(`${url.userProfile}/${uID}`, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  saveSettings(data: any, uID: any) {
    data.new.userGuID = data.new.userIdentifier;
    let body = JSON.stringify(data);
    this._spinnerService.show();
    return this._http.put(`${url.userProfile}`, body, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  uploadFile(file: File, uId) {
    this._spinnerService.show();
    let formData: FormData = new FormData();
    formData.append('photo', file, file.name);
    let headers = new Headers();
    headers.append('UserId', Cookie.get('Id'));
    headers.append('UserType', Cookie.get('userType'));
    headers.append('Authorization', Cookie.get('token'));
    headers.append('DeviceType', 'web');
    let options = new RequestOptions({ headers: headers });
    return this._http.post(`${url.fileUpload}/${uId}`, formData, options)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }


  getUserProfileLinkedAccount(uid: any) {
    this._spinnerService.show();
    return this._http.get(`${url.userProfileLinkedAccount}/${uid}`, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  addUserProfileLinkedAccount(data: any) {
    data.userGuID = data.userIdentifier;
    let body = JSON.stringify(data);
    this._spinnerService.show();
    return this._http.post(`${url.userProfileLinkedAccount}`, body, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  deleteUserProfileLinkedAccount(data: any) {
    this._spinnerService.show();
    data.userGuID = data.uId
    let param = data
    return this._http.delete(`${url.userProfileLinkedAccount}`, this._httpRequestOptions.requestOptionsWithQueryParams(param))
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

}