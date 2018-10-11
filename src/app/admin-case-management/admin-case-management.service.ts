import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { CONFIG, SpinnerService, ExceptionService, HttpRequestConstants } from "../core";

let caseUrl = CONFIG.caseUrl;
let contact = CONFIG.apiUrls.contact;
let dicomUrl = CONFIG.dicom;
let attachment = CONFIG.fileAttachments;
@Injectable()

export class AdminCaseManagementService {
    constructor(
        private _http: Http,
        private _spinnerService: SpinnerService,
        private _exceptionService: ExceptionService,
        private _httpRequestConstants: HttpRequestConstants
    ) { }

    getCaseList(param) {
        this._spinnerService.show();
        return this._http
            .get(`${caseUrl.caseList}`, this._httpRequestConstants.requestOptionsWithQueryParams(param))
            .map((response: Response) => <any>response.json())
            .catch(this._exceptionService.catchBadResponse)
            .finally(() => this._spinnerService.hide())
    }
    getAllContacts(id, contactType, pageno, userID, contactIds) {
        let data = {
            userGuID: id,
            contactType: contactType,
            pageNumber: pageno,
            maxItemsPerPage: 1000,
            userID: userID,
            contactIds: contactIds
        }
        return this._http
            .get(`${CONFIG.apiUrls.contact}`, this._httpRequestConstants.requestOptionsWithQueryParams(data))
            .map((response: Response) => <any>response.json())
            .catch(this._exceptionService.catchBadResponse)
            .finally(() => this._spinnerService.hide());
    }

    // getDocumentsByCaseId(caseId: number) {
    //     this._spinnerService.show();
    //     return this._http
    //         .get(`${caseUrl.caseFile}/${caseId}`, this._httpRequestConstants.RequestOptions)
    //         .map((response: Response) => <any>response.json())
    //         .catch(this._exceptionService.catchBadResponse)
    //         .finally(() => this._spinnerService.hide())
    // }

    getDocumentsByDocId(docId) {
        this._spinnerService.show();
        return this._http
            .get(`${attachment.getAttachmentCaselist}/${docId}`, this._httpRequestConstants.RequestOptions)
            .map((response: Response) => <any>response.json())
            .catch(this._exceptionService.catchBadResponse)
            .finally(() => this._spinnerService.hide())
    }
    closeCase(cases) {
        let clCase = JSON.stringify(cases)
        this._spinnerService.show();
        return this._http
            .put(`${caseUrl.caseStaus}`, clCase, this._httpRequestConstants.RequestOptions)
            .map((response: Response) => <any>response.json())
            .catch(this._exceptionService.catchBadResponse)
            .finally(() => this._spinnerService.hide())
    }
    getAppointmentsBy(caseId) {
        let param: any = caseId;
        this._spinnerService.show();
        return this._http
            .get(`${caseUrl.caseAppntmnt}`, this._httpRequestConstants.requestOptionsWithQueryParams(param))
            .map((response: Response) => <any>response.json())
            .catch(this._exceptionService.catchBadResponse)
            .finally(() => this._spinnerService.hide())
    }
    postCase(caseInvite) {
        let body = JSON.stringify(caseInvite);
        this._spinnerService.show();
        return this._http
            .post(`${caseUrl.case}`, body, this._httpRequestConstants.RequestOptions)
            .map((response: Response) => <any>response.json())
            .catch(this._exceptionService.catchBadResponse)
            .finally(() => this._spinnerService.hide())
    }

    getSingleUser(name) {
        this._spinnerService.show();
        return this._http
            .get(`${CONFIG.apiUrls.getSingleUser}/${name}`, this._httpRequestConstants.RequestOptions)
            .map(response => response.json())
            .catch(this._exceptionService.catchBadResponse)
            .finally(() => this._spinnerService.hide())
    }

    getDicomList(data) {
        this._spinnerService.show();
        return this._http
            .get(`${CONFIG.dicom.getDicomList}`, this._httpRequestConstants.requestOptionsWithQueryParams(data))
            .map(response => response.json())
            .catch(this._exceptionService.catchBadResponse)
            .finally(() => this._spinnerService.hide());
    }
}