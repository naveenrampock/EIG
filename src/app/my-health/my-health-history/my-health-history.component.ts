import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http/src/http';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MyHealthService } from '../my-health.service'
import { Cookie } from 'ng2-cookies/src/services/cookie';
import { Response } from '@angular/http/src/static_response';
import { CalendarModule } from 'primeng/primeng';
import * as moment from 'moment';

@Component({
  selector: 'app-my-health-history',
  templateUrl: './my-health-history.component.html',
  styleUrls: ['./my-health-history.component.css']
})
export class MyHealthHistoryComponent implements OnInit {

  public model;
  uID = Cookie.get('userID');
  private _id:any;
  public BirthControlDetails:any = null;
  public ProcedureType:any = null;
  public ProcedureHospital:any = null;
  public ProcedureDoctor:any = null;
  public MedicationDetails:any = null;
  public AllergyDetails:any = null;
  public LastMenstrualCycleDt: any=null;
  public ProcedureDate:any = null;
  msgs: any;
  public lang: any;
  public fm: string = "yy-mm-dd";
  public minDate: Date;
  public surgeryType:any=0;
  public surgeryErrorMessage:any;
  public hospitalType:any=0;
  public hospitalErrorMessage:any;
  public dateType:any=0;
  public dateErrorMessage:any
  public medicineType:any=0;
  public medicineErrorMessage = "Blank space not allowed.This field is manditory";
  public allergiesType:any = 0;
  public procedureDoctorType:any=0;
  public procedureHospitalType:any=0;
  public procedureSurgeryType:any=0;
  public procedureDateType:any=0;
  public allergiesErrorMessage = "Blank space not allowed.This field is manditory";;
  public birthControlType:any=0;
  public birthControlErrorMessage = "Blank space not allowed.This field is manditory";
  public procedureDoctorErrorMessage = "Blank space not allowed.This field is manditory";
  public procedureHospitalErrorMessage = "Blank space not allowed.This field is manditory";
  public procedureTypeErrorMessage = "Blank space not allowed.This field is manditory";
  public procedureDateErrorMessage = "Blank space not allowed.This field is manditory";
  private _isCheckSaveValidation:any=0;
  private new = {};
  private old = {};
  public maxDateValue:any = new Date();
  
  constructor(public _myHealthService : MyHealthService) { 
 
  }


  ngOnInit() {
    this.minDate = new Date();
    this.getModel();
    this.getId();
    this.calenderData();
  }

  private calenderData(){
    this.lang = {
      firstDayOfWeek: 0,
      dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      dayNamesShort: ["Sun", "Пон", "Tue", "Wed", "Thu", "Fri", "Sat"],
      dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    }
  }

  getModel(){
    this.model = {
      IsPregnant: 0,
      IsBreastFeeding: 0,
      IsUsingBirthControl: 0,
      IsAnyProcedures: 0,
      IsAnyMedication: 0,
      IsAnyAllergies: 0,
    };
  }
  

  public focus(evt){
    if(this.fm == "yy.mm.dd"){
    this.fm = "yy-mm-dd";
    setTimeout(() =>{
        evt.target.value = evt.target.value.replace(/\./g,"-");
    });
    }
    else if(this.fm == "yy/mm/dd"){
        this.fm = "yy-mm-dd";
    setTimeout(() =>{
        evt.target.value = evt.target.value.replace(/\//g,"-");
        
    });
    }
  }

  public cal(evt) {
    if (evt.indexOf("/") > -1) {
      this.fm = "yy/mm/dd";
    } else if (evt.indexOf(".") > -1) {
      this.fm = "yy.mm.dd"; 
    } else if (evt.indexOf("-") > -1)
    { this.fm = "yy-mm-dd" }

  }

  private getId(){
    this._myHealthService.getId(this.uID)
    .subscribe((response)=>{
      this._id = response[0].Id
      this.getMyHealthHistory(this._id);
    })
  }

  private getMyHealthHistory(id){
    this._myHealthService.getMyHealthHistoryById(id)
    .subscribe((response)=>{
      if(response.Body.Data==null){
        this.getModel()
      }
      else{
      this.old = response.Body.Data;
      this.model = {
        IsPregnant: response.Body.Data.IsPregnant,
        IsBreastFeeding: response.Body.Data.IsBreastFeeding,
        IsUsingBirthControl: response.Body.Data.IsUsingBirthControl,
        IsAnyProcedures: response.Body.Data.IsAnyProcedures,
        IsAnyMedication: response.Body.Data.IsAnyMedication,
        IsAnyAllergies: response.Body.Data.IsAnyAllergies,
    };
    this.AllergyDetails = response.Body.Data.AllergyDetails,
    this.BirthControlDetails = response.Body.Data.BirthControlDetails,
    this.MedicationDetails = response.Body.Data.MedicationDetails,
    this.ProcedureDoctor = response.Body.Data.ProcedureDoctor,
    this.ProcedureHospital = response.Body.Data.ProcedureHospital,
    this.ProcedureType = response.Body.Data.ProcedureType;
    
    if(response.Body.Data.LastMenstrualCycleDt == null){
      this.ProcedureDate = null
    }
    else{
      let data = moment(response.Body.Data.LastMenstrualCycleDt).format('YYYY-MM-DD')
      this.LastMenstrualCycleDt = data;
    }

    if(response.Body.Data.ProcedureDate == null){
      this.ProcedureDate = null
    }
    else{
    let proceduredata = moment(response.Body.Data.ProcedureDate).format('YYYY-MM-DD')
    this.ProcedureDate = proceduredata
    }
  }
    })
    
  }

  save(){
    let data = this.model;
    data.UId = this.uID;
    data.PatientID = this._id;
    data.BirthControlDetails = this.BirthControlDetails;
    data.ProcedureType = this.ProcedureType;
    data.ProcedureHospital = this.ProcedureHospital;
    data.ProcedureDoctor = this.ProcedureDoctor;
    data.ProcedureDate = moment(this.ProcedureDate).format('YYYY-MM-DD')
    data.MedicationDetails = this.MedicationDetails;
    data.AllergyDetails = this.AllergyDetails;
    if(this.LastMenstrualCycleDt == null){
      data.LastMenstrualCycleDt = this.LastMenstrualCycleDt
    }
    else{
    data.LastMenstrualCycleDt = moment(this.LastMenstrualCycleDt).format('YYYY-MM-DD');
    }
    if(this.model.IsUsingBirthControl == 1){
      if(this.BirthControlDetails == null || this.BirthControlDetails.trim().length == 0){
        
      this.birthControlErrorMessage = "Blank space not allowed.This field is manditory";
      this.birthControlType = 1
    }
    else{
      let tempBirthControl;
      tempBirthControl = parseInt(this.BirthControlDetails);
      if(isNaN(tempBirthControl)){
        if(this.BirthControlDetails.trim().length == 0 ){
        this.birthControlType = 1;
        this._isCheckSaveValidation = 1;
        this.birthControlErrorMessage = "Blank space not allowed.This field is manditory";
      }
      else {
        this.birthControlType = 0;
        this._isCheckSaveValidation = 0;
        this.birthControlErrorMessage = "";
      }
    }
   
    else{
      this.birthControlType = 1;
      this._isCheckSaveValidation = 1;
      this.birthControlErrorMessage = "Numbers not allowed";
    }
  }
  }
  else if(this.model.IsUsingBirthControl == 0){
    this._isCheckSaveValidation = 0;
    this.birthControlType = 0;
    this.birthControlErrorMessage = ""
    data.BirthControlDetails = null;
  }
  else{
    this._isCheckSaveValidation = 0;
    this.birthControlType = 0;
    this.birthControlErrorMessage = ""
  }


  if(this.model.IsAnyMedication == 1){
    if(this.MedicationDetails == null || this.MedicationDetails.trim().length == 0){
    this.medicineErrorMessage = "Blank space not allowed.This field is manditory";
    this.medicineType = 1;
  }
  else{
    let tempMedicationDetail;
    tempMedicationDetail = parseInt(this.MedicationDetails);
    if(isNaN(tempMedicationDetail)){
      if(this.MedicationDetails.trim().length == 0 ){
      this.medicineType = 1;
      this._isCheckSaveValidation = 1;
      this.medicineErrorMessage = "Blank space not allowed.This field is manditory";
    }
    else {
      this.medicineType = 0;
      this._isCheckSaveValidation = 0;
      this.medicineErrorMessage = "";
    }
  }
 
  else{
    this.medicineType = 1;
    this._isCheckSaveValidation = 1;
    this.medicineErrorMessage = "Numbers not allowed";
  }
}
}
else if(this.model.IsAnyMedication == 0){
  this._isCheckSaveValidation = 0;
  this.medicineType = 0;
  this.medicineErrorMessage = "";
  data.MedicationDetails = null;
}
else{
  this._isCheckSaveValidation = 0;
  this.medicineType = 0;
  this.medicineErrorMessage = ""
}



if(this.model.IsAnyAllergies == 1){
  if(this.AllergyDetails == null || this.AllergyDetails.trim().length == 0){
  this.allergiesErrorMessage = "Blank space not allowed.This field is manditory";
  this.allergiesType = 1;
}
else{
  let tempAllergieDetail;
  tempAllergieDetail = parseInt(this.AllergyDetails);
  if(isNaN(tempAllergieDetail)){
    if(this.AllergyDetails.trim().length == 0 ){
    this.allergiesType = 1;
    this._isCheckSaveValidation = 1;
    this.allergiesErrorMessage = "Blank space not allowed.This field is manditory";
  }
  else {
    this.allergiesType = 0;
    this._isCheckSaveValidation = 0;
    this.allergiesErrorMessage = "";
  }
}

else{
  this.allergiesType = 1;
  this._isCheckSaveValidation = 1;
  this.allergiesErrorMessage = "Numbers not allowed";
}
}
}
else if(this.model.IsAnyAllergies == 0){
  this._isCheckSaveValidation = 0;
  this.allergiesType = 0;
  this.allergiesErrorMessage = ""
  data.AllergyDetails = null
}
else{
this._isCheckSaveValidation = 0;
this.allergiesType = 0;
this.allergiesErrorMessage = ""
}




if(this.model.IsAnyProcedures == 1){
  if(this.ProcedureDoctor == null || this.ProcedureDoctor.trim().length == 0){
  this.procedureDoctorErrorMessage = "Blank space not allowed.This field is manditory";
  this.procedureDoctorType = 1;
}
else{
  let tempProcedureDoctorDetail;
  tempProcedureDoctorDetail = parseInt(this.ProcedureDoctor);
  if(isNaN(tempProcedureDoctorDetail)){
    if(this.ProcedureDoctor.trim().length == 0 ){
    this.procedureDoctorType = 1;
    this._isCheckSaveValidation = 1;
    this.procedureDoctorErrorMessage = "Blank space not allowed.This field is manditory";
  }
  else {
    this.procedureDoctorType = 0;
    this._isCheckSaveValidation = 0;
    this.procedureDoctorErrorMessage = "";
  }
}

else{
  this.procedureDoctorType = 1;
  this._isCheckSaveValidation = 1;
  this.procedureDoctorErrorMessage = "Numbers not allowed";
}
}
}

else if(this.model.IsAnyProcedures == 0){
  this._isCheckSaveValidation = 0;
  this.procedureDoctorType = 0;
  this.procedureDoctorErrorMessage = ""
  data.ProcedureDoctor = null
}

else{
this._isCheckSaveValidation = 0;
this.procedureDoctorType = 0;
this.procedureDoctorErrorMessage = ""
}


if(this.model.IsAnyProcedures == 1){
  if(this.ProcedureHospital == null || this.ProcedureHospital.trim().length==0){
  this.procedureHospitalErrorMessage = "Blank space not allowed.This field is manditory";
  this.procedureHospitalType = 1;
}
else{
  let tempProcedureHospitalDetail;
  tempProcedureHospitalDetail = parseInt(this.ProcedureHospital);
  if(isNaN(tempProcedureHospitalDetail)){
    if(this.ProcedureHospital.trim().length == 0 ){
    this.procedureHospitalType = 1;
    this._isCheckSaveValidation = 1;
    this.procedureHospitalErrorMessage = "Blank space not allowed.This field is manditory";
  }
  else {
    this.procedureHospitalType = 0;
    this._isCheckSaveValidation = 0;
    this.procedureHospitalErrorMessage = "";
  }
}

else{
  this.procedureHospitalType = 1;
  this._isCheckSaveValidation = 1;
  this.procedureHospitalErrorMessage = "Numbers not allowed";
}
}
}

else if(this.model.IsAnyProcedures == 0){
  this._isCheckSaveValidation = 0;
  this.procedureHospitalType = 0;
  this.procedureHospitalErrorMessage = ""
  data.ProcedureHospital = null;
}

else{
this._isCheckSaveValidation = 0;
this.procedureHospitalType = 0;
this.procedureHospitalErrorMessage = ""
}


if(this.model.IsAnyProcedures == 1){
  if(this.ProcedureType == null || this.ProcedureType.trim().length == 0){
  this.procedureTypeErrorMessage = "Blank space not allowed.This field is manditory";
  this.procedureSurgeryType = 1;
}
else{
  let tempProcedureTypeDetail;
  tempProcedureTypeDetail = parseInt(this.ProcedureType);
  if(isNaN(tempProcedureTypeDetail)){
    if(this.ProcedureType.trim().length == 0 ){
    this.procedureSurgeryType = 1;
    this._isCheckSaveValidation = 1;
    this.procedureTypeErrorMessage = "Blank space not allowed.This field is manditory";
  }
  else {
    this.procedureSurgeryType = 0;
    this._isCheckSaveValidation = 0;
    this.procedureTypeErrorMessage = "";
  }
}

else{
  this.procedureSurgeryType = 1;
  this._isCheckSaveValidation = 1;
  this.procedureTypeErrorMessage = "Numbers not allowed";
}
}
}

else if(this.model.IsAnyProcedures == 0){
  this._isCheckSaveValidation = 0;
  this.procedureSurgeryType = 0;
  this.procedureTypeErrorMessage = "";
  data.ProcedureType = null;
}

else{
this._isCheckSaveValidation = 0;
this.procedureSurgeryType = 0;
this.procedureTypeErrorMessage = ""
}


if(this.model.IsAnyProcedures == 1){
  if(this.ProcedureDate == null){
  this.procedureDateErrorMessage = "Blank space not allowed.This field is manditory";
  this.procedureDateType = 1;
}
else{
  this._isCheckSaveValidation = 0;
  this.procedureDateType = 0;
  this.procedureDateErrorMessage = ""
  }

}
else if(this.model.IsAnyProcedures == 0){
  this._isCheckSaveValidation = 0;
  this.procedureDateType = 0;
  this.procedureDateErrorMessage = ""
  data.ProcedureDate = null;
}

data.applicationAction = 'Update My Health History'
data.createdFor = null
this.new = data

let myHealthHistory = {new:this.new,old:this.old}

if(this.procedureDateErrorMessage=="" && this.procedureDoctorErrorMessage=="" && 
this.procedureHospitalErrorMessage=="" && this.procedureTypeErrorMessage=="" && 
this.medicineErrorMessage=="" && this.allergiesErrorMessage==""
 && this.birthControlErrorMessage==""){
  this._myHealthService.saveMyHealthHistory(myHealthHistory)
      .subscribe((response)=>{
        this.msgs = [{ severity: 'success', summary: 'Success', detail: 'My Health History Saved Succesfully' }];
        
})
 }


}


cancel(){
  this.getMyHealthHistory(this._id);
}



}
