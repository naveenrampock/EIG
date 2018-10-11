import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { CONFIG, SpinnerService, ExceptionService, HttpRequestConstants, ResponseService } from '../core/';
import { Observable } from 'rxjs/Observable';
import { HttpParams } from '@angular/common/http';
let url = CONFIG.apiUrls;

@Injectable()
export class UserService {

  constructor(private _http: Http,
    private _httpRequestOptions: HttpRequestConstants,
    private _spinnerService: SpinnerService,
    private _exceptionService: ExceptionService,
    // private response: ResponseService,
  ) { }

  getUserProfileDetailsById(uID: any) {
    this._spinnerService.show();
    return this._http.get(`${url.userProfile}/${uID}`, this._httpRequestOptions.RequestOptions)
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
    return this._http.post(`${url.confirmEmailOTP}`, body, this._httpRequestOptions.RequestOptions)
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

  saveUserDevice(data: any) {
    let body = JSON.stringify(data);
    this._spinnerService.show();
    return this._http.post(`${url.saveUserDevice}`, body, this._httpRequestOptions.RequestOptions)
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

  sendInvatation(data: any) {
    let body = JSON.stringify(data);
    this._spinnerService.show();
    return this._http.post(`${url.sendInvatation}`, body, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  userDeactivateAcc(guid) {
    let body = JSON.stringify(guid);
    this._spinnerService.show();
    return this._http.put(`${url.deactivate}`, body, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  userDeleleAcc(guid) {
    this._spinnerService.show();
    return this._http.delete(`${url.deactivateDelete}/${guid}`, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  userConfiguration(data: any) {
    let body = JSON.stringify(data);
    this._spinnerService.show();
    return this._http.put(`${url.userConfigurations}`, body, this._httpRequestOptions.RequestOptions)
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

  //Patient related information
  getPatientListId(uId: any) {
    this._spinnerService.show();
    return this._http.get(`${url.getpatientList}/${uId}`, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }
  getPatientInfoById(uId: any) {
    console.log('USER ID ME', uId);

    this._spinnerService.show();
    return this._http.get(`${url.getPatientInfo}/${uId}`, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }
  savePatientInfo(data: any) {
    data.new.userGuID = data.new.UId;

    let body = JSON.stringify(data);
    console.log('USER ID ME', data);
    this._spinnerService.show();
    return this._http.post(`${url.addPatientInfo}`, body, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }



  getPatientGuarantorInfoById(pId: any) {
    console.log(pId);

    this._spinnerService.show();
    return this._http.get(`${url.getPatientGuarantorInfo}/${pId}`, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  addPatientGuarantorInfo(data: any) {
    data.userGuID = data.UId;
    let body = JSON.stringify(data);
    this._spinnerService.show();
    return this._http.post(`${url.addPatientGuarantorInfo}`, body, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }
  editPatientGuarantorInfo(data: any) {
    data.new.userGuID = data.new.UId;
    let body = JSON.stringify(data);
    this._spinnerService.show();
    return this._http.put(`${url.editPatientGuarantorInfo}`, body, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  deletePatientGuarantorInfo(data: any) {
    data.userGuID = data.UId;

    let body = JSON.stringify(data);
    this._spinnerService.show();
    return this._http.put(`${url.deletePatientGuarantorInfo}`, body, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  getPatientInsuranceInfoById(pId: any) {
    this._spinnerService.show();
    return this._http.get(`${url.getPatientInsuranceInfo}/${pId}`, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  addPatientInsuranceInfo(data: any) {
    data.userGuID = data.UId;
    let body = JSON.stringify(data);
    this._spinnerService.show();
    return this._http.post(`${url.addPatientInsuranceInfo}`, body, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  editPatientInsuranceInfo(data: any) {
    data.new.userGuID = data.new.UId;
    let body = JSON.stringify(data);
    this._spinnerService.show();
    return this._http.put(`${url.editPatientInsuranceInfo}`, body, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  deletePatientInsuranceInfo(data: any) {
    data.userGuID = data.UId;
    let body = JSON.stringify(data);
    this._spinnerService.show();
    return this._http.put(`${url.deletePatientInsuranceInfo}`, body, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  getPatientEmergencyContactById(pId: any) {
    this._spinnerService.show();
    return this._http.get(`${url.getPatientEmergencyContact}/${pId}`, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  addPatientEmergencyContact(data: any) {
    data.userGuID = data.UId;
    let body = JSON.stringify(data);
    this._spinnerService.show();
    return this._http.post(`${url.addPatientEmergencyContact}`, body, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  editPatientEmergencyContact(data: any) {
    data.new.userGuID = data.new.UId;
    let body = JSON.stringify(data);
    this._spinnerService.show();
    return this._http.put(`${url.editPatientEmergencyContact}`, body, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  deletePatientEmergencyContact(data: any) {
    data.userGuID = data.UId;
    let body = JSON.stringify(data);
    this._spinnerService.show();
    return this._http.put(`${url.deletePatientEmergencyContact}`, body, this._httpRequestOptions.RequestOptions)
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

  getList(id, type) {
    this._spinnerService.show();
    return this._http.get(`${url.userLogs}/${id}/${type}`, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  getUserDeviceById(uID: any) {
    this._spinnerService.show();
    return this._http.get(`${url.getUserDevice}/${uID}`, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  deleteDeviceId(guid: any, id: any) {
    //  let body = JSON.stringify(data);
    this._spinnerService.show();
    return this._http.delete(`${url.deleteDeviceId}/${guid}/uid/${id}`, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  getUserDevice(guid: any, userGuid: any) {
    let param = {
      userGuid: userGuid,
      guid: guid
    }

    // this._httpRequestOptions.RequestOptions.params.append(userGuid,userGuid);
    // this._httpRequestOptions.RequestOptions.params.append(guid,guid);

    this._spinnerService.show();

    return this._http.get(`${url.getUserDevice}`, this._httpRequestOptions.requestOptionsWithQueryParams(param))
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  isUserDeviceValid(deviceId: any, userGuid: any) {
    return Observable.create(observer => {
      let _status = false;
      if (deviceId === 'null' || deviceId === null || deviceId === 'undefined' || deviceId === '') {
        _status = false;
        observer.next(_status);
        observer.complete();
      }
      else if ((deviceId != null || deviceId != 'undefined') && deviceId != '') {
        this.getUserDevice(deviceId, userGuid).subscribe(resp => {
          if (resp.length > 0 && resp[0].Guid) {
            _status = true;
            observer.next(_status);
            observer.complete();
          } else {
            _status = false;
            observer.next(_status);
            observer.complete();
          }
        });
      } else {
        _status = true;
        observer.next(_status);
        observer.complete();
      }
    });
  }
  getUserName(email: any) {
    this._spinnerService.show();
    return this._http.get(`${url.forgotUserName}/${email}`, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  saveForgotPwd(data: any) {
    let body = JSON.stringify(data);
    this._spinnerService.show();
    return this._http.put(`${url.savePwd}`, body, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  getForgotPasswordOtp(data: any) {
    let body = JSON.stringify(data);
    this._spinnerService.show();
    return this._http.post(`${url.savePwd}`, body, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }

  sharedPatientInfo(data: any) {
    let body = JSON.stringify(data);
    this._spinnerService.show();
    return this._http.put(`${url.sharedInfo}`, body, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }
}
