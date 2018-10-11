import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { CONFIG, SpinnerService, ExceptionService, HttpRequestConstants } from "../core";
let caseUrl = CONFIG.caseUrl;
let user = CONFIG.apiUrls;
let dicomUrl = CONFIG.dicom;
let attachment = CONFIG.fileAttachments;
let emr = CONFIG.emrUrl;

@Injectable()

export class LaunchPageService {
    constructor(
        private _http: Http,
        private _spinnerService: SpinnerService,
        private _exceptionService: ExceptionService,
        private _httpRequestConstants: HttpRequestConstants
    ) { }

    getCaseDashboardDetails(userId: any, userType: any) {
        // this._spinnerService.show();
        return this._http.get(`${caseUrl.caseDashboard}/${userId}/${userType}`, this._httpRequestConstants.RequestOptions)
            .map((response: Response) => <any>response.json())
            .catch(this._exceptionService.catchBadResponse)
            .finally(() => this._spinnerService.hide());
    }
    getDicomDashboardDetails() {
        this._spinnerService.show();
        return this._http.get(`${dicomUrl.dicomDashboard}`, this._httpRequestConstants.RequestOptions)
            .map((response: Response) => <any>response.json())
            .catch(this._exceptionService.catchBadResponse)
            .finally(() => this._spinnerService.hide());
    }
    getUsersDashboardDetails() {
        this._spinnerService.show();
        return this._http.get(`${user.userDashboard}`, this._httpRequestConstants.RequestOptions)
            .map((response: Response) => <any>response.json())
            .catch(this._exceptionService.catchBadResponse)
            .finally(() => this._spinnerService.hide());
    }

    getuserNotifications() {
        this._spinnerService.show();
        return this._http.get(`${user.userNotifications}`, this._httpRequestConstants.RequestOptions)
            .map((response: Response) => <any>response.json())
            .catch(this._exceptionService.catchBadResponse)
            .finally(() => this._spinnerService.hide());
    }

    getuserActivitiess() {
        this._spinnerService.show();
        return this._http.get(`${user.userActivities}`, this._httpRequestConstants.RequestOptions)
            .map((response: Response) => <any>response.json())
            .catch(this._exceptionService.catchBadResponse)
            .finally(() => this._spinnerService.hide());
    }
    getEMRDashboardDetails() {
        this._spinnerService.show();
        return this._http.get(`${emr.emrDashboard}`, this._httpRequestConstants.RequestOptions)
            .map((response: Response) => <any>response.json())
            .catch(this._exceptionService.catchBadResponse)
            .finally(() => this._spinnerService.hide());
    }

    getFileDashboard() {
        this._spinnerService.show();
        return this._http.get(`${dicomUrl.fileDashboard}`, this._httpRequestConstants.RequestOptions)
            .map((response: Response) => <any>response.json())
            .catch(this._exceptionService.catchBadResponse)
            .finally(() => this._spinnerService.hide());
    }
}


