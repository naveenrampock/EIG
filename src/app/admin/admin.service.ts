import { Injectable } from '@angular/core';
import { List } from './logs/logs-model-class'
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { CONFIG, SpinnerService, ExceptionService, HttpRequestConstants, ResponseService } from '../core/';
import { Observable } from 'rxjs/Observable';
let url = CONFIG.apiUrls;
let upload = 'http://localhost:3000/sms/upload'
@Injectable()
export class AdminService {

  constructor(private _http: Http,
    private _httpRequestOptions: HttpRequestConstants,
    private _spinnerService: SpinnerService,
    private _exceptionService: ExceptionService,
    // private response: ResponseService,
  ) { }


  //Logging Services
  getList(): Observable<List[]> {
    this._spinnerService.show();
    return this._http.get(`${url.logs}`, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }
  //End Logging Service

  // Loopup master Services

  getLookUpMastersList() {
    this._spinnerService.show();
    return this._http.get(`${url.masterLookup}`, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }
  addLookUpMaster(data: any) {
    let body = data;
    this._spinnerService.show();
    return this._http
      .post(`${url.masterLookup}`, body, this._httpRequestOptions.RequestOptions)
      .map(response => response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }
  updateLookUpMaster(data: any) {
    let body = data;
    this._spinnerService.show();
    return this._http
      .put(`${url.lookupUpdate}`, body, this._httpRequestOptions.RequestOptions)
      .map(response => response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }
  deleteLookUpMaster(id) {
    this._spinnerService.show();
    return this._http.delete(`${url.masterLookup}/${id}`, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  getCategoryList() {
    this._spinnerService.show();
    return this._http.get(`${url.categoryDrpDwn}`, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  //   delete(data){
  //     var headers = new Headers();
  //     headers.append('Content-Type','application/json');
  //     return this._http.put('http://localhost:5000/api/delete',JSON.stringify(data),{headers:headers})
  //     .map(res => res.json());
  // }


  // multilingual Services

  getMultilingualList() {
    this._spinnerService.show();
    return this._http.get(`${url.multilingual}`, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  getBoilerPlates(lang) {
    this._spinnerService.show();
    return this._http.get(`${url.multilingual}/${lang}`, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  getlanguageDrp() {
    this._spinnerService.show();
    return this._http.get(`${url.multilingual}/Mdropdown`, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  deletelanguageFile(file) {
    let param = {
      id: file.Id,
      description: file.Description,
      name: file.Name,
      path: file.Path
    }
    this._spinnerService.show();
    return this._http.delete(`${url.deleteLanguage}`, this._httpRequestOptions.requestOptionsWithQueryParams(param))
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  editlanguageFile(data) {
    let body = JSON.stringify(data);
    this._spinnerService.show();
    return this._http.put(`${url.editLanguage}`, body, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());

    // let body = JSON.stringify(data);
    // this._spinnerService.show();
    // return this._http.post(`${url.languageData}`, body, this._httpRequestOptions.RequestOptions)
    //   .map((response: Response) => <any>response.json())
    //   .catch(this._exceptionService.catchBadResponse)
    //   .finally(() => this._spinnerService.hide());
  }

  getLanguage() {
    this._spinnerService.show();
    return this._http.get(`${url.changeLanguage}`, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }
  setBrowserLanguage = (data) => {
    this._spinnerService.show();
    return this._http.put(url.setBrowserLanguage, data, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }
  getEmailLists() {
    this._spinnerService.show();
    return this._http.get(`${url.emailNotifications}`, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }
  resendEmail(data) {
    this._spinnerService.show();
    return this._http.post(`${url.resendEmail}`, data, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  saveMultilingual(data) {
    this._spinnerService.show();
    return this._http.post(`${url.multilingual}`, data, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  // End of multilingual Services


  //admin management services

  getAdminList(uType) {
    this._spinnerService.show();
    return this._http.get(`${url.adminUserListing}${uType}`, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }


  // End of admin management services

  //user management services

  // getUserList(uType) {
  //   this._spinnerService.show();
  //   return this._http.get(`${url.adminUserListing}${uType}`, this._httpRequestOptions.RequestOptions)
  //     .map((response: Response) => <any>response.json())
  //     .catch(this._exceptionService.catchBadResponse)
  //     .finally(() => this._spinnerService.hide());
  // }

  getUserList(userType, maxItemPerPage, pageNumber) {
    let param = {
      id: userType,
      maxItemPerPage: maxItemPerPage,
      pageNumber: pageNumber
    }
    this._spinnerService.show();
    return this._http.get(`${url.adminUserListing}`, this._httpRequestOptions.requestOptionsWithQueryParams(param))
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  getUserListByKey(userType, userName) {
    let param = {
      userType: userType,
      userName: userName
    }
    this._spinnerService.show();
    return this._http.get(`${url.list}`, this._httpRequestOptions.requestOptionsWithQueryParams(param))
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }


  // End of user management services

  //   get user and admin details

  getProfileDetails(id) {
    this._spinnerService.show();
    return this._http.get(`${url.getUserAdmin}/${id}`, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  getUserAdminProfileDetailsById(uID: any) {
    this._spinnerService.show();
    return this._http.get(`${url.userProfile}/${uID}`, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  getUserNotificationDetailsById(uID: any) {
    this._spinnerService.show();
    return this._http.get(`${url.userNotification}/${uID}`, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }
  generateOtpViaEmail(data: any) {
    let body = JSON.stringify(data);
    this._spinnerService.show();
    return this._http.post(`${url.emailOTP}`, body, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  confirmOtpEmail(data: any) {
    let body = JSON.stringify(data);
    this._spinnerService.show();
    return this._http.put(`${url.confirmEmailOTP}`, body, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  confirmOtpSMS(data: any) {
    let body = JSON.stringify(data);
    this._spinnerService.show();
    return this._http.put(`${url.confirmSMSOTP}`, body, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  generateOtpViaSMS(data: any) {
    let body = JSON.stringify(data);
    this._spinnerService.show();
    return this._http.post(`${url.smsOTP}`, body, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }
  saveSettings(data: any, uID: any) {
    let body = JSON.stringify(data);
    this._spinnerService.show();
    return this._http.put(`${url.userProfile}`, body, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  saveSecuritySettings(data: any, uID: any) {
    let body = JSON.stringify(data);
    this._spinnerService.show();
    return this._http.put(`${url.userSecurity}`, body, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  saveNotification(data: any, uID: any) {
    let body = JSON.stringify(data);
    this._spinnerService.show();
    return this._http.put(`${url.userNotification}`, body, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  adminDeactivateAcc(guid) {

    // this._spinnerService.show();
    // return this._http.put(`${url.deactivateDelete}/${guid}/deactivate`, {}, this._httpRequestOptions.RequestOptions)
    //   .map((response: Response) => <any>response.json())
    //   .catch(this._exceptionService.catchBadResponse)
    //   .finally(() => this._spinnerService.hide());
    this._spinnerService.show();
    return this._http.put(`${url.deactivate}`, guid, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }
  adminDeleleAcc(uid, loginId) {

    this._spinnerService.show();
    return this._http.delete(`${url.deactivateDelete}/${uid}/${loginId}`, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  unlockAccount(data: any) {
    this._spinnerService.show();
    return this._http.put(`${url.unlockAccount}`, data, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  sendEmailInvite(email) {
    this._spinnerService.show();
    return this._http.post(`${url.sendInvatation}`, email, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  registerUser(data: any) {

    this._spinnerService.show();
    return this._http
      .post(`${url.createUser}`, data, this._httpRequestOptions.RequestOptions)
      .map(response => response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }
  // end 
  addTask(newTask) {
    console.log(newTask)
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post(`${url}task`, JSON.stringify(newTask), { headers: headers })
      .map(res => res.json());
  }


  update(newTask) {
    console.log(newTask)
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.put(`${url}task`, JSON.stringify(newTask), { headers: headers })
      .map(res => res.json());
  }
  adminConfiguration(data: any) {
    data.userGuID = data.UserId;
    let body = JSON.stringify(data);
    this._spinnerService.show();
    return this._http.post(`${url.adminConfigurations}`, body, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }
  getAdminConfigurationById(uID: any) {
    this._spinnerService.show();
    return this._http.get(`${url.getAdminConfigurations}/${uID}`, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  uploadFile(file: File, uId) {
    this._spinnerService.show();
    let formData: FormData = new FormData();
    formData.append('photo', file, file.name);
    let headers = new Headers();
    headers.append('Authorization', 'bearer ');
    let options = new RequestOptions({ headers: headers });
    return this._http.post(`${url.fileUpload}/${uId}`, formData, options)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }
  //User default Seting

  editUserDefaultConfiguration(data: any) {
    let body = JSON.stringify(data);
    this._spinnerService.show();
    return this._http.put(`${url.editUserDefaultSetting}`, body, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  getUserDefaultSetting() {
    this._spinnerService.show();
    return this._http.get(`${url.getUserDefaultSetting}`, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  userConfiguration(data: any) {
    let body = JSON.stringify(data);
    this._spinnerService.show();
    return this._http.post(`${url.userConfigurations}`, body, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  getUserConfigurationById(uID: any) {
    this._spinnerService.show();
    return this._http.get(`${url.getUserConfigurations}/${uID}`, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  editAdminDefaultAuthorization(data: any) {
    let body = JSON.stringify(data);
    this._spinnerService.show();
    return this._http.put(`${url.editAdminDefaultSetting}`, body, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  getAdminDefaultAuthorization() {
    this._spinnerService.show();
    return this._http.get(`${url.getAdminDefaultSetting}`, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }


  //Admin Deactivates user
  deactivateUser(uid: any) {

    this._spinnerService.show();
    return this._http.put(`${url.deactivate}`, uid, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  activateUser(uid: any) {
    this._spinnerService.show();
    return this._http.post(`${url.activate}`, uid, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }


  uploadAvatar(file) {
    const formData: any = new FormData();
    const files: Array<File> = file

    formData.append("uploads[]", files, files['name']);

    return this._http.post(`${upload}`, formData)
      .map(files => files.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());

  }

  saveLanguage(data) {
    let body = JSON.stringify(data);
    this._spinnerService.show();
    return this._http.post(`${url.languageData}`, body, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

}
