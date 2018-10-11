import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { CONFIG, SpinnerService, ExceptionService, HttpRequestConstants, ResponseService } from '../core/';
import { Observable } from 'rxjs/Observable';
//import { Contacts } from './contact-data-model'

let myHealthHistory = CONFIG.apiUrls.myHealthHistory;
let saveMyHealthHistory = CONFIG.apiUrls.saveHealthHistory;
let myid = CONFIG.apiUrls.userId;
let myLifeStyle = CONFIG.apiUrls.myLifeStyle;
let saveMyLifeStyle = CONFIG.apiUrls.saveMyLifeStyle;
let familyData = CONFIG.apiUrls.familyData;
let saveMyFamilyHealthHistory = CONFIG.apiUrls.saveMyFamilyHealthHistory;
let myFamilyHealthHistory = CONFIG.apiUrls.myFamilyHealthHistory;
let invite = CONFIG.apiUrls.invite;


@Injectable()
export class MyHealthService {

  constructor(private _http: Http,
    private _httpRequestOptions: HttpRequestConstants,
    private _spinnerService: SpinnerService,
    private _exceptionService: ExceptionService,
  ) { }

  getMyHealthHistoryById(id) {
    this._spinnerService.show();
    return this._http.get(`${myHealthHistory}/${id}`, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  getMyFamilyHealthHistoryById(id) {
    this._spinnerService.show();
    return this._http.get(`${myFamilyHealthHistory}/${id}`, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  getMyLifeStyleById(id) {
    this._spinnerService.show();
    return this._http.get(`${myLifeStyle}/${id}`, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  getId(id) {
    this._spinnerService.show();
    return this._http.get(`${myid}/${id}`, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  getFamilyMembers() {
    this._spinnerService.show();
    return this._http.get(`${familyData}`, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  saveMyHealthHistory(data) {
    data.new.userGuID = data.new.UId;
    let body = data;
    this._spinnerService.show();
    return this._http
      .put(`${saveMyHealthHistory}`, body, this._httpRequestOptions.RequestOptions)
      .map(response => response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());

  }

  saveMyFamilyHealthHistory(data) {
    data.new.userGuID = data.new.UId;
    let body = data;
    this._spinnerService.show();
    return this._http
      .put(`${saveMyFamilyHealthHistory}`, body, this._httpRequestOptions.RequestOptions)
      .map(response => response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  saveMyLifeStyle(data) {
    data.new.userGuID = data.new.UId;
    let body = data;
    this._spinnerService.show();
    return this._http
      .put(`${saveMyLifeStyle}`, body, this._httpRequestOptions.RequestOptions)
      .map(response => response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }
}