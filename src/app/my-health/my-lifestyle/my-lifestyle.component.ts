import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http/src/http';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MyHealthService } from '../my-health.service'
import { Cookie } from 'ng2-cookies/src/services/cookie';
import { Response } from '@angular/http/src/static_response';
import * as moment from 'moment';
//import { parse } from 'path';
// import { Stream } from 'stream';

@Component({
  selector: 'app-my-lifestyle',
  templateUrl: './my-lifestyle.component.html',
  styleUrls: ['./my-lifestyle.component.css']
})
export class MyLifestyleComponent implements OnInit {

  public model;
  private _uID = Cookie.get('userID');
  private _id:any;
  public Height:number = 0;
  public Weight:number = 0;
  public ExceriseHoursperWeek:any = null;
  public PacksPerDay:any = 0;
  public SmokingYears:any = 0;
  public AlcoholType:any = "";
  public DrinksPerWeek:any = 0;
  public WorkYear:any = 0;
  public WorkTotalYears:any = 0;
  public WorkType:any = "";
  public DisabledDate:any=null ;
  public DisabilityName:any = 0;
  public msgs: any;
  public lang: any;
  public fm: string = "yy-mm-dd";
  public minDate: Date;
  public validateWeight:any=0;
  public errorMessageWeight:any="";
  public validateHeight:any=0;
  public errorMessageHeight:any="";
  public validatePerWeek:any=0;
  public errorMessagePerWeek:any="";
  public validatePackPerDay:any=0;
  public errorMessagePackPerDay:any="";
  public validateSmokeYear:any=0;
  public errorMessageSmokeYear:any="";
  public validateDrinkPerWeek:any = 0;
  public errorMessageDrinkPerWeek = ""
  public validateDrinkType:any=0;
  public errorMessageDrinkType:any="";
  public validateToxicWhen:any=0;
  public errorMessageToxicWhen:any="";
  public validateToxicHow:any = 0;
  public errorMessageToxicHow:any = "";
  public validateType:any = 0;
  public errorMessageType = "";
  public validateDisableNameType = 0;
  public errorMessageDisableName = "";
  public validateDate = 0;
  public errorMessageDate = "";
  private new = {};
  private old = {};
  public maxDateValue:any = new Date();
  
  constructor(public _myHealthService : MyHealthService) { 

  }

  ngOnInit() {
    this.minDate = new Date();
    this.getId();
    this.getModel();
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

  private getId(){
    this._myHealthService.getId(this._uID)
    .subscribe((response)=>{
      console.log(response)
      this._id = response[0].Id
      this.getMyLifeStyle(this._id);
    })
  }
  
  getModel(){
    this.model = {
      IsSevenHoursSleep: 0,
      IsExcercise: 0,
      IsYearlyFluShots: 0,
      IsSmoke: 0,
      IsAlcoholic: 0,
      IsRecreationDrugs: 0,
      IsWorkHazardous: 0,
      IsEverDisabled: 0,
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

  private getMyLifeStyle(id){
    this._myHealthService.getMyLifeStyleById(id)
    .subscribe((response)=>{
      if(response.Body.Data==null){
        this.Height=0;
        this.Weight=0;
        this.getModel();
      }else{
      this.old = response.Body.Data;
      this.model = {
        IsSevenHoursSleep: response.Body.Data.IsSevenHoursSleep,
        IsExcercise: response.Body.Data.IsExcercise,
        IsYearlyFluShots: response.Body.Data.IsYearlyFluShots,
        IsSmoke: response.Body.Data.IsSmoke,
        IsAlcoholic: response.Body.Data.IsAlcoholic,
        IsRecreationDrugs: response.Body.Data.IsRecreationDrugs,
        IsWorkHazardous: response.Body.Data.IsWorkHazardous,
        IsEverDisabled: response.Body.Data.IsEverDisabled,
      }
      this.Height = response.Body.Data.Height
      this.Weight = response.Body.Data.Weight
      this.ExceriseHoursperWeek = response.Body.Data.ExceriseHoursperWeek
      this.PacksPerDay = response.Body.Data.PacksPerDay
      this.SmokingYears = response.Body.Data.SmokingYears
      this.AlcoholType = response.Body.Data.AlcoholType
      this.DrinksPerWeek = response.Body.Data.DrinksPerWeek
      this.WorkYear = response.Body.Data.WorkYear;
      this.WorkTotalYears = response.Body.Data.WorkTotalYears;
      this.WorkType = response.Body.Data.WorkType;
      if(response.Body.Data.DisabledDate == null){
        this.DisabledDate = null
      }
      else{
      let data = moment(response.Body.Data.DisabledDate).format('YYYY-MM-DD')
      this.DisabledDate = data
      }
      this.DisabilityName = response.Body.Data.DisabilityName;    
    } 
    })
  }

  public save(){
    let data = this.model;
    data.UId = this._uID;
    data.Id = this._id;
    data.Height = this.Height
    data.Weight = this.Weight
    data.ExceriseHoursperWeek = this.ExceriseHoursperWeek
    data.PacksPerDay = this.PacksPerDay
    data.SmokingYears = this.SmokingYears
    data.AlcoholType = this.AlcoholType
    data.DrinksPerWeek = this.DrinksPerWeek
    data.WorkYear = this.WorkYear
    data.WorkTotalYears = this.WorkTotalYears
    data.WorkType = this.WorkType
    
    if(this.Weight > 1500){

      this.validateWeight = 1;
      this.errorMessageWeight = "Max weight limit in pound is 1500";
    }
    else{
      if(data.Weight == ""){
        data.Weight = null;
        this.validateWeight = 0;
        this.errorMessageWeight = "";
      }
      else{
      this.validateWeight = 0;
      this.errorMessageWeight = "";
      }
    }

    if(this.Height > 11){
      this.validateHeight = 1;
      this.errorMessageHeight = "Max height limit is 11 feet";
    }
    else{
      if(data.Height == ""){
        data.Height = null
        this.validateHeight = 0;
        this.errorMessageHeight = "";
      }
      else{
      this.validateHeight = 0;
      this.errorMessageHeight = "";
      }
    }
    if(this.model.IsExcercise == 1){
      let tempExercise;
      tempExercise = parseInt(this.ExceriseHoursperWeek);
      if(isNaN(tempExercise)){
      if(this.ExceriseHoursperWeek == null || this.ExceriseHoursperWeek.trim().length == 0){
        this.validatePerWeek=1;
        this.errorMessagePerWeek="Blank space not allowed";
      }
    }
    
    else{
      data.ExceriseHoursperWeek = this.ExceriseHoursperWeek;
      this.errorMessagePerWeek = "";
      this.validatePerWeek = 0
    
  }
  }
  if(this.model.IsExcercise == 0){
    this.ExceriseHoursperWeek = null;
    data.ExceriseHoursperWeek = this.ExceriseHoursperWeek;
    this.errorMessagePerWeek = "";
    this.validatePerWeek = 0
  }

  if(this.model.IsSmoke == 1){
    let tempSmoke;
    tempSmoke = parseInt(this.PacksPerDay)
    if(isNaN(tempSmoke)){
      if(this.PacksPerDay == null || this.PacksPerDay.trim().length == 0){
        this.validatePackPerDay=1;
        this.errorMessagePackPerDay = "Blank space not allowed"
      }
    
    }
    else{
      data.PacksPerDay = this.PacksPerDay;
      this.errorMessagePackPerDay = "";
      this.validatePackPerDay = 0;
    }
  }

  if(this.model.IsSmoke == 1){
    let tempSmokeYear;
    tempSmokeYear = parseInt(this.SmokingYears)
    if(isNaN(tempSmokeYear)){
      if(this.SmokingYears == null || this.SmokingYears.trim().length == 0){
        this.validateSmokeYear=1;
        this.errorMessageSmokeYear = "Blank space not allowed"

      }
    
    }
    else{
      data.SmokingYears = this.SmokingYears;
      this.errorMessageSmokeYear = "";
      this.validateSmokeYear = 0;
    }
  }

  if(this.model.IsSmoke == 0){
    this.SmokingYears = null;
    data.SmokingYears = this.SmokingYears;;
    this.errorMessageSmokeYear = "";
    this.validateSmokeYear = 0;
  }

  if(this.model.IsAlcoholic == 1){
    let tempDrinkPerWeek;
    tempDrinkPerWeek = parseInt(this.DrinksPerWeek);
    if(isNaN(tempDrinkPerWeek)){
      if(this.DrinksPerWeek == null || this.DrinksPerWeek.trim().length == 0){
        this.validateDrinkPerWeek = 1;
        this.errorMessageDrinkPerWeek = "Blank space not allowed"
      }
    }
    else{
      data.DrinksPerWeek = this.DrinksPerWeek;
      this.errorMessageDrinkPerWeek = "";
      this.validateDrinkPerWeek = 0
    }
  }

  if(this.model.IsAlcoholic == 0){
    this.DrinksPerWeek = null;
    data.DrinksPerWeek = this.DrinksPerWeek;
    this.errorMessageDrinkPerWeek = "";
    this.validateDrinkPerWeek = 0
  }

    if(this.model.IsAlcoholic == 1){
    let tempDrinkType;
    tempDrinkType = parseInt(this.AlcoholType);
    if(isNaN(tempDrinkType)){
      if(this.AlcoholType == null || this.AlcoholType.trim().length == 0){
        this.validateDrinkType = 1;
        this.errorMessageDrinkType = "Blank space not allowed"
      }
      else if(this.AlcoholType != null || this.AlcoholType.trim().length != 0){
        data.AlcoholType = this.AlcoholType;
        this.errorMessageDrinkType = "";
        this.validateDrinkType = 0
      }
    }
    else if(!isNaN(tempDrinkType)){
      this.validateDrinkType = 1;
      this.errorMessageDrinkType = "Numbers not allowed"
    }
    else{
      data.AlcoholType = this.AlcoholType;
      this.errorMessageDrinkType = "";
      this.validateDrinkType = 0
    }
  }

  if(this.model.IsAlcoholic == 0){
    this.AlcoholType = null;
    data.AlcoholType = this.AlcoholType;
    this.errorMessageDrinkType = "";
    this.validateDrinkType = 0
  }






  if(this.model.IsWorkHazardous == 1){
    let tempToxicWhen;
    tempToxicWhen = parseInt(this.WorkYear);
    if(isNaN(tempToxicWhen)){
      if(this.WorkYear == null || this.WorkYear.trim().length == 0){
        this.validateToxicWhen = 1;
        this.errorMessageToxicWhen = "Blank space not allowed"
      }
    }
    else{
      data.WorkYear = this.WorkYear;
      this.errorMessageToxicWhen = "";
      this.validateToxicWhen = 0
    }
  }

  if(this.model.IsWorkHazardous == 0){
    this.WorkYear = null;
    data.WorkYear = this.WorkYear;
    this.errorMessageToxicWhen = "";
    this.validateToxicWhen = 0
  }




  if(this.model.IsWorkHazardous == 1){
    let tempToxicLong;
    tempToxicLong = parseInt(this.WorkTotalYears);
    if(isNaN(tempToxicLong)){
      if(this.WorkTotalYears == null || this.WorkTotalYears.trim().length == 0){
        this.validateToxicHow = 1;
        this.errorMessageToxicHow = "Blank space not allowed"
      }
    }
    else{
      data.WorkTotalYears = this.WorkTotalYears;
      this.errorMessageToxicHow = "";
      this.validateToxicHow = 0
    }
  }

  if(this.model.IsWorkHazardous == 0){
    this.WorkTotalYears = null;
    data.WorkTotalYears = this.WorkTotalYears;
    this.errorMessageToxicHow = "";
    this.validateToxicHow = 0
  }


  if(this.model.IsWorkHazardous == 1){
    let tempWorkType;
    tempWorkType = parseInt(this.WorkType);
    if(isNaN(tempWorkType)){
      if(this.WorkType == null || this.WorkType.trim().length == 0){
        this.validateType = 1;
        this.errorMessageType = "Blank space not allowed"
      }
      else if(this.WorkType != null || this.WorkType.trim().length != 0){
        data.WorkType = this.WorkType;
        this.errorMessageType = "";
        this.validateType = 0
      }
    }
    else if(!isNaN(tempWorkType)){
      this.validateType = 1;
      this.errorMessageType = "Numbers not allowed"
    }
    else{
      data.WorkType = this.WorkType;
      this.errorMessageType = "";
      this.validateType = 0
    }
  }

  if(this.model.IsWorkHazardous == 0){
    this.WorkType = null;
    data.WorkType = this.WorkType;
    this.errorMessageType = "";
    this.validateType = 0
  }

  if(this.model.IsEverDisabled == 1){
    let tempName;
    tempName = parseInt(this.DisabilityName);
    if(isNaN(tempName)){
      if(this.DisabilityName == null || this.DisabilityName.trim().length == 0){
        this.validateDisableNameType = 1;
        this.errorMessageDisableName = "Blank space not allowed"
      }
      else if(this.DisabilityName != null || this.DisabilityName.trim().length != 0){
        data.DisabilityName = this.DisabilityName;
        this.errorMessageDisableName = "";
        this.validateDisableNameType = 0
      }
    }
    else if(!isNaN(tempName)){
      this.validateDisableNameType = 1;
      this.errorMessageDisableName = "Numbers not allowed"
    }
    else{
      data.DisabilityName = this.DisabilityName;
      this.errorMessageDisableName = "";
      this.validateDisableNameType = 0
    }
  }

  if(this.model.IsEverDisabled == 0){
    this.DisabilityName = null;
    data.DisabilityName = this.DisabilityName;
    this.errorMessageDisableName = "";
    this.validateDisableNameType = 0
  }



  if(this.model.IsEverDisabled == 1){
    if(this.DisabledDate==null){
      this.validateDate = 1;
      this.errorMessageDate = "Blank space not allowed"
    }
    else{
    data.DisabledDate = moment(this.DisabledDate).format('YYYY-MM-DD');
    this.validateDate = 0;
    this.errorMessageDate = ""
    }
  }
  else{
    this.DisabledDate = null
    data.DisabledDate = this.DisabledDate
    this.validateDate = 0;
    this.errorMessageDate = ""
    }
    data.applicationAction = 'Update My Lifestyle'
    data.createdFor = null
    this.new = data;
    let myLifeStyle = {new:this.new,old:this.old}
    if(this.errorMessagePerWeek=="" && this.errorMessageHeight=="" && this.errorMessageWeight == "" && this.errorMessageDate == "" && this.errorMessageDisableName == "" && this.errorMessageType == "" && this.errorMessageToxicHow == "" && this.errorMessageToxicWhen == "" && this.errorMessagePackPerDay=="" && this.errorMessageSmokeYear=="" && this.errorMessageDrinkPerWeek == "" && this.errorMessageDrinkType == ""){
    this._myHealthService.saveMyLifeStyle(myLifeStyle)
    .subscribe((response)=>{
      this.msgs = [{ severity: 'success', summary: 'Success', detail: 'My Lifestyle Saved Succesfully' }];
      
    })
  }
  }

  cancel(){
    this.getMyLifeStyle(this._id);
  }

  onlyNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

}