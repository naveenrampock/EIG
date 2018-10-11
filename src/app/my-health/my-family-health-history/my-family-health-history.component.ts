import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http/src/http';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MyHealthService } from '../my-health.service'
import { Cookie } from 'ng2-cookies/src/services/cookie';
import { Response } from '@angular/http/src/static_response';
import {MultiSelectModule} from 'primeng/multiselect';

@Component({
  selector: 'app-my-family-health-history',
  templateUrl: './my-family-health-history.component.html',
  styleUrls: ['./my-family-health-history.component.css']
})

export class MyFamilyHealthHistoryComponent implements OnInit {
  
  public asthma: string[] = [];
  public unexplainedDeath:Array<any> = [];
  public metabolicDisease:Array<any> = [];
  public thyroidDisease:Array<any> = [];
  public diabetes:Array<any> = [];
  public highBloodPressure:Array<any> = [];
  public stroke:Array<any> = [];
  public cysticFibrosis:Array<any> = [];
  public heartDisease:Array<any> = [];
  public sickleCellAnemia:Array<any> = [];
  public cancer:Array<any> = [];
  public elevatedCholesterol:Array<any> = [];
  public seasonalAllergies:Array<any> = [];
  public other:Array<any> = [];
  public familyMemberData:Array<any>=[];
  uID = Cookie.get('userID');
  private _id:any;
  msgs: any;
  private new = {};
  private old = {};

  constructor(public _myHealthService : MyHealthService){}
  
    ngOnInit() {
      this.getId();
      this.getFamilyMemberList();
      }

      private getId(){
        this._myHealthService.getId(this.uID)
        .subscribe((response)=>{
          console.log(response)
          this._id = response[0].Id
          this.getMyFamilyHealthHistory(this._id);
        })
      }

      private getMyFamilyHealthHistory(id){
        this._myHealthService.getMyFamilyHealthHistoryById(id)
        .subscribe((response)=>{
          if(response.Body.Data==null){
            this.asthma = []
            this.unexplainedDeath = []
            this.metabolicDisease = []
            this.thyroidDisease = []
            this.diabetes = []
            this.highBloodPressure = []
            this.stroke =[]
            this.cysticFibrosis = []
            this.heartDisease = []
            this.sickleCellAnemia = []
            this.cancer = []
            this.elevatedCholesterol = []
            this.seasonalAllergies = []
            this.other = []
          }else{
          this.old = response.Body.Data;
          this.asthma = JSON.parse("[" + response.Body.Data.Asthma + "]");
          this.unexplainedDeath = JSON.parse("[" + response.Body.Data.EarlyOrUnexplainedDeath + "]");
          this.metabolicDisease = JSON.parse("[" + response.Body.Data.MetabolicDisease + "]");
          this.thyroidDisease = JSON.parse("[" + response.Body.Data.ThyroidDisease + "]");
          this.diabetes = JSON.parse("[" + response.Body.Data.Diabetes + "]");
          this.highBloodPressure = JSON.parse("[" + response.Body.Data.HighBP + "]");
          this.stroke = JSON.parse("[" + response.Body.Data.Stroke + "]");
          this.cysticFibrosis = JSON.parse("[" + response.Body.Data.CysticFibrosis + "]");
          this.heartDisease = JSON.parse("[" + response.Body.Data.HeartDisease + "]");
          this.sickleCellAnemia = JSON.parse("[" + response.Body.Data.SickleCellAnemia + "]");
          this.cancer = JSON.parse("[" + response.Body.Data.Cancer + "]");
          this.elevatedCholesterol = JSON.parse("[" + response.Body.Data.ElevatedCholesterol + "]");
          this.seasonalAllergies = JSON.parse("[" + response.Body.Data.SeasonalAllergies + "]");
          this.other = JSON.parse("[" + response.Body.Data.Other + "]");
          }
        })
      }

      private getFamilyMemberList(){
        this._myHealthService.getFamilyMembers()
        .subscribe((response)=>{
          this.familyMemberData = response.map(i=> {return{ "label": i.Description, "value": i.StatusId}})
        })
      }

      public changeData(e){
        this.asthma = e.value
      }

      public changeDataCysticFibrosis(e){
        this.cysticFibrosis = e.value
      }

      public changeDataUnexplainedDeath(e){
        this.unexplainedDeath = e.value;
      }

      public changeDataHeartDisease(e){
        this.heartDisease = e.value
      }

      public changeDataMetabolicDisease(e){
        this.metabolicDisease = e.value
      }

      public changeDataSickleCellAnemia(e){
        this.sickleCellAnemia = e.value
      }

      public changeDataThyroidDisease(e){
        this.thyroidDisease = e.value;
      }

      public changeDataCancer(e){
        this.cancer = e.value
      }

      public changeDataDiabetes(e){
        this.diabetes = e.value;
      }

      public changeDataElevatedCholesterol(e){
        this.elevatedCholesterol = e.value
      }

      public changeDataHighBloodPressure(e){
        this.highBloodPressure = e.value
      }

      public changeDataSeasonalAllergies(e){
        this.seasonalAllergies = e.value
      }

      public changeDataStroke(e){
        this.stroke = e.value;
      }

      public changeDataOther(e){
        this.other = e.value;
      }

      public save(){
        let data =  { Asthma:this.asthma,EarlyOrUnexplainedDeath:this.unexplainedDeath,MetabolicDisease:this.metabolicDisease,
                      ThyroidDisease:this.thyroidDisease,Diabetes:this.diabetes,HighBP:this.highBloodPressure,Stroke:this.stroke,
                      CysticFibrosis:this.cysticFibrosis,HeartDisease:this.heartDisease,SickleCellAnemia:this.sickleCellAnemia,
                      Cancer:this.cancer,ElevatedCholesterol:this.elevatedCholesterol,SeasonalAllergies:this.seasonalAllergies,
                      Other:this.other,UId:this.uID,PatientID:this._id,applicationAction :'Update My Family History',createdFor :null};
        console.log(data)

       this.new = data;
       let myFamilyHealth = {new:this.new,old:this.old}
        this._myHealthService.saveMyFamilyHealthHistory(myFamilyHealth)
        .subscribe((response)=>{
          this.msgs = [{ severity: 'success', summary: 'Success', detail: 'My Family Health History Saved Succesfully' }];
          
        })
      }

      cancel(){
        this.getMyFamilyHealthHistory(this._id);
      }

}