import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-shared-info',
  templateUrl: './shared-info.component.html',
  styleUrls: ['./shared-info.component.css']
})
export class SharedInfoComponent implements OnInit {
  emergencyContactInfo: any;
  insuranceInfo: {};
  guarantorInfo: {};
  patientInfo: {};
  @Input() selUserId: any;
  relations: any;
  ethnicOrgin: any;
  race: any;
  pContcats: any;
  mStatus: any;
  gender: any;
  patientId: number;
  uID = Cookie.get('userID');
  isGuarantorTab: boolean = true;
  isInsuranceTab: boolean = true;
  isEmergencyTab: boolean = true;
  constructor(private _fb: FormBuilder, private _contactService: ContactService) { }

  ngOnInit() {
    this.getPatientDropdownData();
    this.getPateintBasicInfo();
  }

  getPateintBasicInfo() {
    this._contactService.getSharedPatientInfo(this.selUserId).subscribe(resp => {
      let res = resp[0];
      this.patientId = res ? res.Id : null;
      this.patientInfo = res;
      if (res) {
        let gender = this.gender.find(gen => gen.StatusId === res.Sex);
        let marriedStatus = this.mStatus.find(ms => ms.StatusId == res.MaritalStatus);
        let race = this.race.find(rc => rc.StatusId === res.Race);
        let eOrgin = this.ethnicOrgin.find(eo => eo.StatusId === res.EthnicOrigin)
        this.patientInfo['Sex'] = gender ? gender.Description : 'NA';
        this.patientInfo['MaritalStatus'] = marriedStatus ? marriedStatus.Description : 'NA';
        this.patientInfo['EthnicOrigin'] = eOrgin ? eOrgin.Description : 'NA';
        this.patientInfo['Race'] = race ? race.Description : 'NA';
      }
    })
  }

  getGuarantorInfo() {
    if (this.isGuarantorTab && this.patientId) {
      this._contactService.getSharedGurantorInfo(this.patientId).subscribe(resp => {
        let res = resp[0];
        console.log(res);
        this.guarantorInfo = res;
        console.log(res);
        this.isGuarantorTab = false;
        if(res){
          let gender = this.gender.find(gen => gen.StatusId === res.Sex);
          let marriedStatus = this.mStatus.find(ms => ms.StatusId == res.MaritalStatus);
          let relation = this.relations.find(rc => rc.StatusId === res.Relationship);
          this.guarantorInfo['Sex'] = gender ? gender.Description : 'NA';
          this.guarantorInfo['MaritalStatus'] = marriedStatus ? marriedStatus.Description : 'NA';
          this.guarantorInfo['Relationship'] = relation ? relation.Description : 'NA';
        }
      })
    }
  }

  getSharedInsuranceInfo() {
    if (this.isInsuranceTab && this.patientId) {
      this._contactService.getSharedInsuranceInfo(this.patientId).subscribe(resp => {
        let res = resp[0];
        this.insuranceInfo = res;
        this.isInsuranceTab = false;
        if (res) {
          let gender = this.gender.find(gen => gen.StatusId === res.Sex);
          let relation = this.relations.find(rl => rl.StatusId == res.Relationship);
          this.insuranceInfo['Sex'] = gender ? gender.Description : 'NA';
          this.insuranceInfo['Relationship'] = relation ? relation.Description : 'NA';
        }
      });
    }
  }

  getEmergencyContact() {
    if (this.isEmergencyTab && this.patientId) {
      this._contactService.getSharedEmergencyContact(this.patientId).subscribe(resp => {
        let res = resp[0];
        this.emergencyContactInfo = res;
        this.isEmergencyTab = false;
        if (res) {
          let relation = this.relations.find(rl => rl.StatusId == res.Relationship);
          this.emergencyContactInfo['Relationship'] = relation ? relation.Description : 'NA';
        }
      });
    }
  }

  getPatientDropdownData() {
    this._contactService.getPatientDropdownData().subscribe(resp => {
      let res = resp;
      this.gender = res.filter(res => {
        return res.Code == 'Gender';
      });
      this.mStatus = res.filter(res => {
        return res.Code == 'MS';
      });
      this.pContcats = res.filter(res => {
        return res.Code == 'PC';
      });
      this.race = res.filter(res => {
        return res.Code == 'Race';
      });
      this.ethnicOrgin = res.filter(res => {
        return res.Code == 'EO';
      });
      this.relations = res.filter(res => {
        return res.Code == 'FM';
      });
    });
  }
}
