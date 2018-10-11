import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { CONFIG, SpinnerService, ExceptionService, HttpRequestConstants } from "../core";

let emrUrl = CONFIG.emrUrl;
let contact = CONFIG.apiUrls.contact;
@Injectable()

export class EmrService {

  constructor(
    private http: Http,
    private spinnerService: SpinnerService,
    private exceptionService: ExceptionService,
    private httpRequestConstants: HttpRequestConstants
  ) { }

  getDropDown(params) {
    this.spinnerService.show()
    return this.http.get(`${emrUrl.emrdropdown}`, { params: { Ids: params.Id, Description: params.desc } })
      .map((response: Response) => <any>response.json())
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide())
  }
  getSourceTypeDropDown(categoryCode) {
    this.spinnerService.show()
    return this.http.get(`${CONFIG.apiUrls.getPatientDropdownData}`, { params: { categoryCode: categoryCode } })
      .map((response: Response) => <any>response.json())
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide())
  }
















  // Appointment services starts here
  getEmrAppointmentListBy(param) {
    this.spinnerService.show()
    return this.http.get(`${emrUrl.emrAppointment}`, { params: param })
      .map((response: Response) => <any>response.json())
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide())
  }
  deleteEmrAppointmentListBy(dparam) {
    let Id = dparam.Id;
    this.spinnerService.show()
    return this.http.delete(`${emrUrl.emrAppointment}/${Id}`, this.httpRequestConstants.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide())
  }

  addEmrAppointmentListBy(aparam) {
    let body = JSON.stringify(aparam);
    this.spinnerService.show()
    return this.http.post(`${emrUrl.emrAppointment}`, body, this.httpRequestConstants.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide())
  }
  updateEmrAppointmentListBy(aparam) {
    let body = JSON.stringify(aparam);
    this.spinnerService.show()
    return this.http.put(`${emrUrl.emrAppointment}`, body, this.httpRequestConstants.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide())
  }
  // Appointment services ends here

  // Encounter services starts here
  getEmrEncounterListBy(encParam) {
    this.spinnerService.show();
    return this.http.get(`${emrUrl.emrEncounter}`, { params: encParam })
      .map((response: Response) => <any>response.json())
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide())
  }
  deleteEncounterById(dparam) {
    this.spinnerService.show()
    return this.http.delete(`${emrUrl.emrEncounter}/${dparam}`, this.httpRequestConstants.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide())
  }

  addEmrEncounter(aparam) {
    let body = JSON.stringify(aparam);
    this.spinnerService.show()
    return this.http.post(`${emrUrl.emrEncounter}`, body, this.httpRequestConstants.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide())
  }
  updateEmrEncounter(uparam) {
    let body = JSON.stringify(uparam);
    this.spinnerService.show()
    return this.http.put(`${emrUrl.emrEncounter}`, body, this.httpRequestConstants.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide())
  }
  // Encouter Services ends here

  // CarePlan services starts here
  getEmrCarePlanList(carParam) {
    this.spinnerService.show();
    return this.http.get(`${emrUrl.emrCarePlan}`, { params: carParam })
      .map((response: Response) => <any>response.json())
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide())
  }
  deleteCarePlanById(dparam) {
    this.spinnerService.show()
    return this.http.delete(`${emrUrl.emrCarePlan}/${dparam}`, this.httpRequestConstants.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide())
  }

  addEmrCarePlan(aparam) {
    let body = JSON.stringify(aparam);
    this.spinnerService.show()
    return this.http.post(`${emrUrl.emrCarePlan}`, body, this.httpRequestConstants.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide())
  }
  updateEmrCarePlan(uparam) {
    let body = JSON.stringify(uparam);
    this.spinnerService.show()
    return this.http.put(`${emrUrl.emrCarePlan}`, body, this.httpRequestConstants.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide())
  }

  // Care Plan ends here

  // Procedure services starts here
  getEmrProcedureList(carParam) {
    this.spinnerService.show();
    return this.http.get(`${emrUrl.emrProcedure}`, { params: carParam })
      .map((response: Response) => <any>response.json())
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide())
  }
  deleteProcedureById(dparam) {
    this.spinnerService.show()
    return this.http.delete(`${emrUrl.emrProcedure}/${dparam}`, this.httpRequestConstants.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide())
  }

  addEmrProcedure(aparam) {
    let body = JSON.stringify(aparam);
    this.spinnerService.show()
    return this.http.post(`${emrUrl.emrProcedure}`, body, this.httpRequestConstants.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide())
  }
  updateEmrProcedure(uparam) {
    let body = JSON.stringify(uparam);
    this.spinnerService.show()
    return this.http.put(`${emrUrl.emrProcedure}`, body, this.httpRequestConstants.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide())
  }

  // Procedure Services ends here

  //  CCD Export Details
  getExportCcdDetails(param) {
    this.spinnerService.show()
    return this.http.get(`${emrUrl.emrexportCcd}`, { params: param })
      .map((response: Response) => <any>response.json())
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide())
  }

  // CCR Export Details
  
  getExportCcrDetails(param) {
    this.spinnerService.show()
    return this.http.get(`${emrUrl.emrExportCcr}`, { params: param })
      .map((response: Response) => <any>response.json())
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide())
  }




























  // Allergy
  getEmrAllergy(param) {
    this.spinnerService.show()
    return this.http.get(`${emrUrl.emrAllergy}`, { params: param })
      .map((response: Response) => <any>response.json())
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide())
  }

  addEmrAllergy(aparam) {
    let body = JSON.stringify(aparam);
    this.spinnerService.show()
    return this.http.post(`${emrUrl.emrAllergy}`, body, this.httpRequestConstants.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide())
  }

  updateEmrAllergy(eparam) {
    let body = JSON.stringify(eparam);
    this.spinnerService.show()
    return this.http.put(`${emrUrl.emrAllergy}`, body, this.httpRequestConstants.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide())
  }

  deleteEmrAllergy(dparam) {
    this.spinnerService.show()
    return this.http.delete(`${emrUrl.emrAllergy}/${dparam}`, this.httpRequestConstants.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide())
  }

  // Immunization
  getEmrImmunization(param) {
    this.spinnerService.show()
    return this.http.get(`${emrUrl.emrImmunization}`, { params: param })
      .map((response: Response) => <any>response.json())
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide())
  }

  addEmrImmunization(aparam) {
    let body = JSON.stringify(aparam);
    this.spinnerService.show()
    return this.http.post(`${emrUrl.emrImmunization}`, body, this.httpRequestConstants.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide())
  }

  updateEmrImmunization(eparam) {
    let body = JSON.stringify(eparam);
    this.spinnerService.show()
    return this.http.put(`${emrUrl.emrImmunization}`, body, this.httpRequestConstants.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide())
  }

  deleteEmrImmunization(delId, userId) {
    this.spinnerService.show()
    return this.http.delete(`${emrUrl.emrImmunization}/${delId}`, this.httpRequestConstants.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide())
  }

  // Device
  getEmrDevice(param) {
    this.spinnerService.show()
    return this.http.get(`${emrUrl.emrDevice}`, { params: param })
      .map((response: Response) => <any>response.json())
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide())
  }

  addEmrDevice(aparam) {
    let body = JSON.stringify(aparam);
    this.spinnerService.show()
    return this.http.post(`${emrUrl.emrDevice}`, body, this.httpRequestConstants.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide())
  }

  updateEmrDevice(eparam) {
    let body = JSON.stringify(eparam);
    this.spinnerService.show()
    return this.http.put(`${emrUrl.emrDevice}`, body, this.httpRequestConstants.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide())
  }

  deleteEmrDevice(delId, userId) {
    this.spinnerService.show()
    return this.http.delete(`${emrUrl.emrDevice}/${delId}`, this.httpRequestConstants.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide())
  }

  // Observation
  getEmrObservation(param) {
    this.spinnerService.show()
    return this.http.get(`${emrUrl.emrObservation}`, { params: param })
      .map((response: Response) => <any>response.json())
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide())
  }

  addEmrObservation(aparam) {
    let body = JSON.stringify(aparam);
    this.spinnerService.show()
    return this.http.post(`${emrUrl.emrObservation}`, body, this.httpRequestConstants.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide())
  }

  updateEmrObservation(eparam) {
    let body = JSON.stringify(eparam);
    this.spinnerService.show()
    return this.http.put(`${emrUrl.emrObservation}`, body, this.httpRequestConstants.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide())
  }

  deleteEmrObservation(delId, userId) {
    this.spinnerService.show()
    return this.http.delete(`${emrUrl.emrObservation}/${delId}`, this.httpRequestConstants.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide())
  }

  // Medication Statement
  getEmrMedicationStatement(param) {
    this.spinnerService.show()
    return this.http.get(`${emrUrl.emrMedicationStatement}`, { params: param })
      .map((response: Response) => <any>response.json())
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide())
  }

  addEmrMedicationStatement(aparam) {
    let body = JSON.stringify(aparam);
    this.spinnerService.show()
    return this.http.post(`${emrUrl.emrMedicationStatement}`, body, this.httpRequestConstants.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide())
  }

  updateEmrMedicationStatement(eparam) {
    let body = JSON.stringify(eparam);
    this.spinnerService.show()
    return this.http.put(`${emrUrl.emrMedicationStatement}`, body, this.httpRequestConstants.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide())
  }

  deleteEmrMedicationStatement(delId, userId) {
    this.spinnerService.show()
    return this.http.delete(`${emrUrl.emrMedicationStatement}/${delId}`, this.httpRequestConstants.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide())
  }

  // Patient Info

  getEmrPatientBasicInfo(param) {
    this.spinnerService.show()
    return this.http.get(`${emrUrl.emrPatientBasicInfo}`, { params: param })
      .map((response: Response) => <any>response.json())
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide())
  }

  addEmrPatientBasicInfo(aparam) {
    let body = JSON.stringify(aparam);
    this.spinnerService.show()
    return this.http.post(`${emrUrl.emrPatientBasicInfo}`, body, this.httpRequestConstants.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide())
  }

  updateEmrPatientBasicInfo(eparam) {
    let body = JSON.stringify(eparam);
    this.spinnerService.show()
    return this.http.put(`${emrUrl.emrPatientBasicInfo}`, body, this.httpRequestConstants.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide())
  }

  deleteEmrPatientBasicInfo(delId, userId) {
    this.spinnerService.show()
    return this.http.delete(`${emrUrl.emrPatientBasicInfo}/${delId}`, this.httpRequestConstants.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide())
  }
























  // Condition API
  getCondition(param) {
    this.spinnerService.show()
    return this.http.get(`${emrUrl.emrCondition}`, { params: param })
      .map((response: Response) => <any>response.json())
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide())
  }

  insertCondition(params) {
    this.spinnerService.show()
    return this.http.post(`${emrUrl.emrCondition}`, params, this.httpRequestConstants.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide())
  }

  updateCondition(params) {
    this.spinnerService.show()
    return this.http.put(`${emrUrl.emrCondition}`, params, this.httpRequestConstants.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide())
  }

  deleteCondition(delId, userId) {
    this.spinnerService.show()
    return this.http.delete(`${emrUrl.emrCondition}/${delId}`, this.httpRequestConstants.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide())
  }

  // Diagnostic  report
  getDiagnosticList(param) {
    this.spinnerService.show()
    return this.http.get(`${emrUrl.emrDiagnostic}`, { params: param })
      .map((response: Response) => <any>response.json())
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide())
  }


  insertDiagnostic(params) {
    this.spinnerService.show()
    return this.http.post(`${emrUrl.emrDiagnostic}`, params, this.httpRequestConstants.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide())
  }

  updateDiagnostic(params) {
    this.spinnerService.show()
    return this.http.put(`${emrUrl.emrDiagnostic}`, params, this.httpRequestConstants.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide())
  }

  deleteDiagnostic(delId) {
    this.spinnerService.show()
    return this.http.delete(`${emrUrl.emrDiagnostic}/${delId}`, this.httpRequestConstants.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide())
  }

  //CCD module
  getCcdList(param) {
    this.spinnerService.show()
    return this.http.get(`${emrUrl.ccd}`, { params: param })
      .map((response: Response) => <any>response.json())
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide())
  }

  uploadFile(evt, id, description, notes) {
    this.spinnerService.show();

    let formData: FormData = new FormData();
    const files: Array<File> = evt;

    console.log(files);
    for (let i = 0; i < files.length; i++) {
      formData.append("doc", files[i], files[i]['name']);
      formData.append("notes", notes);
      formData.append("description", description);
      formData.append("recordType", 'CCD');
    }

    let headers = new Headers();

    headers.append('Authorization', 'bearer ');
    headers.append("UserId", id)
    let options = new RequestOptions({ headers: headers });
    return this.http.post(`${emrUrl.ccd}`, formData, options)
      .map((response: Response) => <any>response.json())
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide());
  }

  // Get Totalcount

  getTotalcount(param) {
    this.spinnerService.show()
    return this.http.get(`${emrUrl.emrTotalcount}`, { params: param })
      .map((response: Response) => <any>response.json())
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide())
  }

  getMyContacts(id, contactType, pageno, contactIds, userId) {
    let param = {
      userGuID: id,
        contactType: contactType,
        pageNumber: pageno,
        maxItemsPerPage: 10,
        contactIds: contactIds,
        userId: userId,
    }

    this.spinnerService.show();
    return this.http.get(`${contact}`, this.httpRequestConstants.requestOptionsWithQueryParams(param))
        .map((response: Response) => <any>response.json())
        .catch(this.exceptionService.catchBadResponse)
        .finally(() => this.spinnerService.hide());
}

getTotalMedication() {
  this.spinnerService.show()
  return this.http.get(`${emrUrl.emrMedicationLink}`)
    .map((response: Response) => <any>response.json())
    .catch(this.exceptionService.catchBadResponse)
    .finally(() => this.spinnerService.hide())
}


















}
