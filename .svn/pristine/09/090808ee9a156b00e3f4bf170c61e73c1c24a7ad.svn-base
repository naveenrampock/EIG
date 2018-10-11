import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { CONFIG, SpinnerService, ExceptionService, HttpRequestConstants, ResponseService } from '../core/';
import { Observable } from 'rxjs/Observable';
//import { Contacts } from './contact-data-model'

let url = CONFIG.apiUrls;

@Injectable()
export class PatientService {

  constructor(private _http: Http,
              private _httpRequestOptions: HttpRequestConstants,
              private _spinnerService: SpinnerService,
              private _exceptionService: ExceptionService,
            ) { }

            savePatientInfo(data: any) {
                let body = JSON.stringify(data);
                this._spinnerService.show();
                return this._http.post(`${url.addPatientInfo}`, body, this._httpRequestOptions.RequestOptions)
                  .map((response: Response) => <any>response.json())
                  .catch(this._exceptionService.catchBadResponse)
                  .finally(() => this._spinnerService.hide());
              }
              getPatientInfoById(uId: any) {
                this._spinnerService.show();
                return this._http.get(`${url.getPatientInfo}/${uId}`, this._httpRequestOptions.RequestOptions)
                  .map((response: Response) => <any>response.json())
                  .catch(this._exceptionService.catchBadResponse)
                  .finally(() => this._spinnerService.hide());
              }

              getPatientGuarantorInfoById(pId: any) {
                this._spinnerService.show();
                return this._http.get(`${url.getPatientGuarantorInfo}/${pId}`, this._httpRequestOptions.RequestOptions)
                  .map((response: Response) => <any>response.json())
                  .catch(this._exceptionService.catchBadResponse)
                  .finally(() => this._spinnerService.hide());
              }

              editPatientGuarantorInfo(data:any) {
                let body = JSON.stringify(data);
                this._spinnerService.show();
                return this._http.put(`${url.editPatientGuarantorInfo}`, body, this._httpRequestOptions.RequestOptions)
                  .map((response: Response) => <any>response.json())
                  .catch(this._exceptionService.catchBadResponse)
                  .finally(() => this._spinnerService.hide());
              }

              addPatientGuarantorInfo(data: any) {
                let body = JSON.stringify(data);
                this._spinnerService.show();
                return this._http.post(`${url.addPatientGuarantorInfo}`, body, this._httpRequestOptions.RequestOptions)
                  .map((response: Response) => <any>response.json())
                  .catch(this._exceptionService.catchBadResponse)
                  .finally(() => this._spinnerService.hide());
              }

              deletePatientGuarantorInfo(data:any) {
                let body = JSON.stringify(data);
                this._spinnerService.show();
                return this._http.put(`${url.deletePatientGuarantorInfo}`,body, this._httpRequestOptions.RequestOptions)
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

              editPatientInsuranceInfo(data: any) {
                let body = JSON.stringify(data);
                this._spinnerService.show();
                return this._http.put(`${url.editPatientInsuranceInfo}`, body, this._httpRequestOptions.RequestOptions)
                  .map((response: Response) => <any>response.json())
                  .catch(this._exceptionService.catchBadResponse)
                  .finally(() => this._spinnerService.hide());
              }

              addPatientInsuranceInfo(data: any) {
                let body = JSON.stringify(data);
                this._spinnerService.show();
                return this._http.post(`${url.addPatientInsuranceInfo}`, body, this._httpRequestOptions.RequestOptions)
                  .map((response: Response) => <any>response.json())
                  .catch(this._exceptionService.catchBadResponse)
                  .finally(() => this._spinnerService.hide());
              }

              deletePatientInsuranceInfo(data:any) {
                let body = JSON.stringify(data);
                this._spinnerService.show();
                return this._http.put(`${url.deletePatientInsuranceInfo}`,body, this._httpRequestOptions.RequestOptions)
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

              editPatientEmergencyContact(data:any) {
                let body = JSON.stringify(data);
                this._spinnerService.show();
                return this._http.put(`${url.editPatientEmergencyContact}`, body, this._httpRequestOptions.RequestOptions)
                  .map((response: Response) => <any>response.json())
                  .catch(this._exceptionService.catchBadResponse)
                  .finally(() => this._spinnerService.hide());
              }

              addPatientEmergencyContact(data: any) {
                let body = JSON.stringify(data);
                this._spinnerService.show();
                return this._http.post(`${url.addPatientEmergencyContact}`, body, this._httpRequestOptions.RequestOptions)
                  .map((response: Response) => <any>response.json())
                  .catch(this._exceptionService.catchBadResponse)
                  .finally(() => this._spinnerService.hide());
              }

              deletePatientEmergencyContact(data:any) {
                let body = JSON.stringify(data);
                this._spinnerService.show();
                return this._http.put(`${url.deletePatientEmergencyContact}`,body, this._httpRequestOptions.RequestOptions)
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
            

        }