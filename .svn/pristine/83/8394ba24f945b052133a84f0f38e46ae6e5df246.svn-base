import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { CONFIG, SpinnerService, ExceptionService, HttpRequestConstants, ResponseService } from '../core/';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { Contacts } from './contact-data-model';
import { contactModel } from './contact-data-model';




let contact = CONFIG.apiUrls.contact;
let sharedData = CONFIG.apiUrls.sharedData;
let contactType = CONFIG.apiUrls.contactTypeNew;
let accept = CONFIG.apiUrls.contactStatusAccept;
let contactStatusReject = CONFIG.apiUrls.contactStatusReject;
let disconnect = CONFIG.apiUrls.delete;
let invite = CONFIG.apiUrls.invite;
let url = CONFIG.apiUrls;
let searchContact = CONFIG.apiUrls.searchContact;
let data = 'assets/i18n/sp.json'

@Injectable()
export class ContactService {

  constructor(private _http: Http,
    private _httpRequestOptions: HttpRequestConstants,
    private _spinnerService: SpinnerService,
    private _exceptionService: ExceptionService,
  ) { }


  // getContacts(id, contactType,pageno,contactIds):Observable<Array<contactModel>> {
  //   let param = {
  //     id:id,
  //     contactType:contactType,
  //     pageNumber:pageno,
  //     maxItemsPerPage:10,
  //     contactIds:contactIds
  //   }

  //   this._spinnerService.show();
  //   return this._http.post(`${contact}`,param, this._httpRequestOptions.RequestOptions)
  //     .map((response:Response)=>this.handleResponse(response))
  //     .catch(this._exceptionService.catchBadResponse)
  //     .finally(() => this._spinnerService.hide());
  // }

  getCountries(query, userIdentifier) {
    console.log(userIdentifier);

    let param = {
      search: query,
      userGuID: userIdentifier
    }
    return this._http.get(`${searchContact}`, this._httpRequestOptions.requestOptionsWithQueryParams(param))
      .map(res => <any[]>res.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  getContacts(id, contactType, pageno, contactIds, userId): Observable<Array<contactModel>> {
    console.log(id, userId);

    let param: any = {
      userGuID: id,
      contactType: contactType,
      pageNumber: pageno,
      maxItemsPerPage: 10,
      contactIds: contactIds,
      userID: userId,
    }

    this._spinnerService.show();

    return this._http.get(`${contact}`, this._httpRequestOptions.requestOptionsWithQueryParams(param))
      .map((response: Response) => this.handleResponse(response))
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }
  getUserSharedDetailsById(data) {
    let param: any = {
      userGuID: data.id,
      moduleName: data.moduleName
    }

    this._spinnerService.show();

    return this._http.get(`${sharedData}`, this._httpRequestOptions.requestOptionsWithQueryParams(param))
      .map((response: Response) => this.handleResponse(response))
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  getContactType() {
    this._spinnerService.show();
    return this._http.get(`${contactType}`, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  acceptRequest(data) {
    data.userGuID = data.userId;
    let body = data;
    this._spinnerService.show();
    return this._http
      .put(`${accept}`, body, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => this.handleResponse(response))
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  rejectRequest(data) {
    data.userGuID = data.userId;
    let body = data;
    this._spinnerService.show();
    return this._http
      .put(`${contactStatusReject}`, body, this._httpRequestOptions.RequestOptions)
      .map(response => response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  disconnect(data) {
    data.userGuID = data.userId;
    let body = data;
    this._spinnerService.show();
    return this._http
      .put(`${disconnect}`, body, this._httpRequestOptions.RequestOptions)
      .map(response => response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  inviteRequest(data: any) {
    data.userGuID = data.userId;
    let body = data;
    this._spinnerService.show();
    return this._http
      .put(`${invite}`, body, this._httpRequestOptions.RequestOptions)
      .map(response => response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  getSharedPatientInfo(uId: any) {
    this._spinnerService.show();
    return this._http.get(`${url.getSharedPatientInfo}/${uId}`, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }
  getSharedGurantorInfo(pId: any) {
    this._spinnerService.show();
    return this._http.get(`${url.getSharedGurantorInfo}/${pId}`, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }
  getSharedInsuranceInfo(pId: any) {
    this._spinnerService.show();
    return this._http.get(`${url.getSharedInsuranceInfo}/${pId}`, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }
  getSharedEmergencyContact(pId: any) {
    this._spinnerService.show();
    return this._http.get(`${url.getSharedEmergencyContact}/${pId}`, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }
  getPatientDropdownData() {
    this._spinnerService.show();
    return this._http.get(`${url.getPatientDropdownData}`, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }


  handleResponse(response: Response): any {

    let res = response.json();
    if (res['Header']['Success'] && res['Header']['Status'] == 200) {

      if (res['Body']['Data']['Item'])
        return res['Body']['Data'];
      if (res['Body']['Data'])
        return res['Header'];
    } else
      return Observable.throw(res['Header']);

  }

  removeCaseIvitedData(data) {
    let body = data;
    this._spinnerService.show();
    return this._http
      .put(`${CONFIG.caseUrl.removeInvited}`, body, this._httpRequestOptions.RequestOptions)
      .map(response => response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }



}
