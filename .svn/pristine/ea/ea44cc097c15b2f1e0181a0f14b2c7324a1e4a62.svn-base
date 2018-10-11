import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { CONFIG, SpinnerService, ExceptionService, HttpRequestConstants, ResponseService } from '../core/';
import { Observable } from 'rxjs/Observable';
//import { Contacts } from './contact-data-model'

let url = CONFIG.apiUrls;

@Injectable()
export class UserSettingsService {

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

            saveSecuritySettings(data: any, uID: any) {
                let body = JSON.stringify(data);
                this._spinnerService.show();
                return this._http.put(`${url.userSecurity}`, body, this._httpRequestOptions.RequestOptions)
                  .map((response: Response) => <any>response.json())
                  .catch(this._exceptionService.catchBadResponse)
                  .finally(() => this._spinnerService.hide());
              }

              userDeleleAcc(uid,loginId) {
                this._spinnerService.show();
                return this._http.delete(`${url.deactivateDelete}/${uid}/${loginId}`, this._httpRequestOptions.RequestOptions)
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

              saveNotification(data: any, uID: any){
                let body = JSON.stringify(data);
                this._spinnerService.show();
                return this._http.put(`${url.userNotification}`, body, this._httpRequestOptions.RequestOptions)
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

        }