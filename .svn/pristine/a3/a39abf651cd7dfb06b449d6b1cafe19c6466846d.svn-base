import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { CONFIG, SpinnerService, ExceptionService, HttpRequestConstants } from "../core";
import { Cookie } from "ng2-cookies/ng2-cookies";

let caseUrl = CONFIG.caseUrl;
let contact = CONFIG.apiUrls.contact;
let dicomUrl = CONFIG.dicom;
let attachment = CONFIG.fileAttachments;

@Injectable()

export class CaseManagementService {
    constructor(
        private _http: Http,
        private _spinnerService: SpinnerService,
        private _exceptionService: ExceptionService,
        private _httpRequestConstants: HttpRequestConstants
    ) { }

    saveNewCase(caseData) {
        let body = JSON.stringify(caseData);
        this._spinnerService.show();
        return this._http
            .post(`${caseUrl.case}`, body, this._httpRequestConstants.RequestOptions)
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

    updateCase(caseUp) {
        let body = JSON.stringify(caseUp);
        this._spinnerService.show();
        return this._http
            .put(`${caseUrl.case}`, body, this._httpRequestConstants.RequestOptions)
            .map((response: Response) => <any>response.json())
            .catch(this._exceptionService.catchBadResponse)
            .finally(() => this._spinnerService.hide())
    }

    getCaseList(param) {
        this._spinnerService.show();
        return this._http
            .get(`${caseUrl.caseList}`, this._httpRequestConstants.requestOptionsWithQueryParams(param))
            .map((response: Response) => <any>response.json())
            .catch(this._exceptionService.catchBadResponse)
            .finally(() => this._spinnerService.hide())
    }

    getMyCaseList(userID) {
        this._spinnerService.show();
        return this._http
            .get(`${attachment.getMyCaseList}/${userID}`, this._httpRequestConstants.RequestOptions)
            .map((response: Response) => <any>response.json())
            .catch(this._exceptionService.catchBadResponse)
            .finally(() => this._spinnerService.hide())
    }

    insertCaseList(attachedData) {
        this._spinnerService.show()
        return this._http
            .post(`${caseUrl.caseDocument}`, attachedData, this._httpRequestConstants.RequestOptions)
            .map((response: Response) => <any>response.json())
            .catch(this._exceptionService.catchBadResponse)
            .finally(() => this._spinnerService.hide())
    }

    addComments(comments: any) {
        let cBody = JSON.stringify(comments);
        this._spinnerService.show()
        return this._http
            .post(`${caseUrl.comments}`, comments, this._httpRequestConstants.RequestOptions)
            .map((response: Response) => <any>response.json())
            .catch(this._exceptionService.catchBadResponse)
            .finally(() => this._spinnerService.hide())
    }

    updateComments(updteComnts: any) {
        this._spinnerService.show();
        let upBody = JSON.stringify(updteComnts);
        return this._http
            .put(`${caseUrl.comments}`, upBody, this._httpRequestConstants.RequestOptions)
            .map((response: Response) => <any>response.json())
            .catch(this._exceptionService.catchBadResponse)
            .finally(() => this._spinnerService.hide())
    }

    getCommentsByCaseId(caseId: any, pageNo, pageSize) {
        let param = { 'caseId': caseId, 'pageNo': pageNo, 'pageSize': pageSize }
        this._spinnerService.show();
        return this._http
            .get(`${caseUrl.comments}`, this._httpRequestConstants.requestOptionsWithQueryParams(param))
            .map((response: Response) => <any>response.json())
            .catch(this._exceptionService.catchBadResponse)
            .finally(() => this._spinnerService.hide())
    }

    deleteComments(commentDetails) {
        // let userID = commentDetails.uId;
        let commentId = commentDetails.commentId;
        this._spinnerService.show();
        return this._http
            .delete(`${caseUrl.comments}/${commentId}`,
                this._httpRequestConstants.RequestOptions)
            .map((response: Response) => <any>response.json())
            .catch(this._exceptionService.catchBadResponse)
            .finally(() => this._spinnerService.hide())
    }

    getMyContacts(id, contactType, pageno, contactIds, userID) {
        let param = {
            userGuID: id,
            contactType: contactType,
            pageNumber: pageno,
            maxItemsPerPage: 10,
            contactIds: contactIds,
            userID: userID,
        }

        this._spinnerService.show();
        return this._http.get(`${contact}`, this._httpRequestConstants.requestOptionsWithQueryParams(param))
            .map((response: Response) => <any>response.json())
            .catch(this._exceptionService.catchBadResponse)
            .finally(() => this._spinnerService.hide());
    }

    getAllContacts(id, contactType) {
        this._spinnerService.show();
        return this._http.get(`${contact}/${id}/${contactType}`, this._httpRequestConstants.RequestOptions)
            .map((response: Response) => <any>response.json())
            .catch(this._exceptionService.catchBadResponse)
            .finally(() => this._spinnerService.hide());
    }

    getIvnitedCaseDetails(userID, pageNo, pageSize) {
        this._spinnerService.show();
        let params: any = { 'userID': userID, 'pageNo': pageNo, 'pageSize': pageSize, 'invitee': 'inviteeDetails' };
        return this._http
            .get(`${caseUrl.caseList}`, this._httpRequestConstants.requestOptionsWithQueryParams(params))
            .map((response: Response) => <any>response.json())
            .catch(this._exceptionService.catchBadResponse)
            .finally(() => this._spinnerService.hide())
    }

    // updateInCaseStatus(status: any) {
    //     let sts = JSON.stringify(status)
    //     this._spinnerService.show();
    //     return this._http
    //         .put(`${caseUrl.invitedCaseStaus}`, sts, this._httpRequestConstants.RequestOptions)
    //         .map((response: Response) => <any>response.json())
    //         .catch(this._exceptionService.catchBadResponse)
    //         .finally(() => this._spinnerService.hide())
    // }

    updateInvitee(invitees: any) {
        let invitee = JSON.stringify(invitees);
        this._spinnerService.show();
        return this._http
            .put(`${caseUrl.caseInvitee}`, invitee, this._httpRequestConstants.RequestOptions)
            .map((response: Response) => <any>response.json())
            .catch(this._exceptionService.catchBadResponse)
            .finally(() => this._spinnerService.hide())
    }
    deleteInvitee(invitees: any) {
        let delInvitee = invitees;
        this._spinnerService.show();
        return this._http
            .delete(`${caseUrl.caseInvitee}`, this._httpRequestConstants.requestOptionsWithQueryParams(delInvitee))
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

    caseFileUpload(file, userID, caseId, comments) {
        this._spinnerService.show();
        let formData: FormData = new FormData();
        const files: Array<File> = file;
        for (let i = 0; i < files.length; i++) {
            formData.append("photo[]", files[i], files[i]['name']);
        }
        formData.append("Comments", comments ? comments : null);
        let headers = new Headers();
        headers.append('authorization', Cookie.get('token'));

        // xhr.setRequestHeader('Content-Type', 'application/json');
        headers.append("userID", userID)
        headers.append('UserType', Cookie.get('userType'))
        headers.append('devicetype', 'web')

        let options = new RequestOptions({ headers: headers });
        return this._http.post(`${CONFIG.fileAttachments.uploadFile}/${userID}`, formData, options)
            .map((response: Response) => <any>response.json())
            .catch(this._exceptionService.catchBadResponse)
            .finally(() => this._spinnerService.hide());
    }
    /* commented by pruthvi */
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

    deleteCaseDocBy(docId) {
        this._spinnerService.show();
        return this._http
            .delete(`${caseUrl.caseDocument}/${docId}`, this._httpRequestConstants.RequestOptions)
            .map((response: Response) => <any>response.json())
            .catch(this._exceptionService.catchBadResponse)
            .finally(() => this._spinnerService.hide())
    }


    // commentFileUpload(file, uId, caseId) {
    //     this._spinnerService.show();
    //     let formData: FormData = new FormData();
    //     const files: Array<File> = file;
    //     for (let i = 0; i < files.length; i++) {
    //         formData.append("file", files[i], files[i]['name']);
    //     }
    //     let headers = new Headers();
    //     headers.append('Authorization', 'bearer ');
    //     let options = new RequestOptions({ headers: headers });
    //     return this._http.post(`${caseUrl.commentsFile}/${uId}/${caseId}`, formData, options)
    //         .map((response: Response) => <any>response.json())
    //         .catch(this._exceptionService.catchBadResponse)
    //         .finally(() => this._spinnerService.hide());
    // }

    //get dicom list
    // getDicomList(data) {
    //     return this._http
    //         .post(`http://10.0.0.93:4000/api/Gateway/DICOM/list`, data, this._httpRequestConstants.RequestOptions)
    //         .map(response => response.json())
    //         .catch(this._exceptionService.catchBadResponse)
    //         .finally(() => this._spinnerService.hide());
    // }

    getDicomList(data) {
        this._spinnerService.show();
        return this._http
            .get(`${CONFIG.dicom.getDicomList}`, this._httpRequestConstants.requestOptionsWithQueryParams(data))
            .map(response => response.json())
            .catch(this._exceptionService.catchBadResponse)
            .finally(() => this._spinnerService.hide());
    }

    // Add dicom to the case 

    addCaseDicom(data) {
        let body = JSON.stringify(data);
        this._spinnerService.show();
        return this._http
            .post(`${caseUrl.caseDicom}`, body, this._httpRequestConstants.RequestOptions)
            .map((response: Response) => <any>response.json())
            .catch(this._exceptionService.catchBadResponse)
            .finally(() => this._spinnerService.hide())
    }

    addAppointment(aData) {
        let body = JSON.stringify(aData);
        this._spinnerService.show();
        return this._http.post(`${caseUrl.caseAppntmnt}`, body, this._httpRequestConstants.RequestOptions)
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
    getInvitedAppointmentsBy(data) {
        this._spinnerService.show();
        return this._http
            .get(`${caseUrl.caseInvitedAppntmnt}`, this._httpRequestConstants.requestOptionsWithQueryParams(data))
            .map((response: Response) => <any>response.json())
            .catch(this._exceptionService.catchBadResponse)
            .finally(() => this._spinnerService.hide())
    }

    deleteAppointments(params) {
        this._spinnerService.show();
        return this._http.delete(`${caseUrl.caseAppntmnt}`, this._httpRequestConstants.requestOptionsWithQueryParams(params))
            .map((response: Response) => <any>response.json())
            .catch(this._exceptionService.catchBadResponse)
            .finally(() => this._spinnerService.hide())
    }

    acceptAppointment(acc) {
        this._spinnerService.show();
        let body = JSON.stringify(acc)
        return this._http.put(`${caseUrl.acceptAppointment}`, body, this._httpRequestConstants.RequestOptions)
            .map((response: Response) => <any>response.json())
            .catch(this._exceptionService.catchBadResponse)
            .finally(() => this._spinnerService.hide())
    }

    rejectAppointment(acc) {
        this._spinnerService.show();
        let body = JSON.stringify(acc)
        return this._http.put(`${caseUrl.rejectAppointment}`, body, this._httpRequestConstants.RequestOptions)
            .map((response: Response) => <any>response.json())
            .catch(this._exceptionService.catchBadResponse)
            .finally(() => this._spinnerService.hide())
    }

    viewAppointmentDetailsBy(apptId) {
        this._spinnerService.show();
        return this._http.get(`${caseUrl.viewApptDetails}`, this._httpRequestConstants.requestOptionsWithQueryParams(apptId))
            .map((response: Response) => <any>response.json())
            .catch(this._exceptionService.catchBadResponse)
            .finally(() => this._spinnerService.hide())
    }

    startAppointment(data) {
        this._spinnerService.show();
        let body = JSON.stringify(data);
        return this._http.put(`${caseUrl.appointmentStatus}`, body, this._httpRequestConstants.RequestOptions)
            .map((response: Response) => response.json())
            .catch(this._exceptionService.catchBadResponse)
            .finally(() => this._spinnerService.hide())
    }

    getUserConfigurationById(uID: any) {
        this._spinnerService.show();
        return this._http.get(`${CONFIG.apiUrls.getUserConfigurations}/${uID}`, this._httpRequestConstants.RequestOptions)
            .map((response: Response) => <any>response.json())
            .catch(this._exceptionService.catchBadResponse)
            .finally(() => this._spinnerService.hide());
    }
    getCaseDashboardDetails(userID: any, userType: any) {
        this._spinnerService.show();
        return this._http.get(`${caseUrl.caseDashboard}/${userID}/${userType}`, this._httpRequestConstants.RequestOptions)
            .map((response: Response) => <any>response.json())
            .catch(this._exceptionService.catchBadResponse)
            .finally(() => this._spinnerService.hide());
    }

    viewAttachments(data) {
        this._spinnerService.show();
        return this._http
            .get(`${attachment.viewAttachment}`, this._httpRequestConstants.requestOptionsWithQueryParams(data))
            .map((response: Response) => <any>response.json())
            .catch(this._exceptionService.catchBadResponse)
            .finally(() => this._spinnerService.hide())
    }

    removeCaseInvitedData(data) {
        let body = data;
        this._spinnerService.show();
        return this._http
            .put(`${CONFIG.caseUrl.removeInvited}`, body, this._httpRequestConstants.RequestOptions)
            .map(response => response.json())
            .catch(this._exceptionService.catchBadResponse)
            .finally(() => this._spinnerService.hide());
    }
}