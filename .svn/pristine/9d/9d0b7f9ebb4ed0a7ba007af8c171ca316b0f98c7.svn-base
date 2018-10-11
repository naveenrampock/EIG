import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { PatientService } from '../patient.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ValidationService } from '../../core/validation/validation.service';




@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.css']
})
export class PatientInfoComponent implements OnInit {
  relations: any;
  ethnicOrgin: any;
  race: any;
  pContcats: any;
  mStatus: any;
  gender: any;
  patientId: number;
  emergencyContactForm: FormGroup;
  insuranceInfoForm: FormGroup;
  GuarantorForm: FormGroup;
  patientInfoForm: FormGroup;
  uID = Cookie.get('userID');
  msgs: any;
  emergencyContactInfo: any;
  insuranceInfo: any;
  guarantorInfo: any;
  private new:any
  private old:any
  constructor(private _fb: FormBuilder, private _userService: PatientService, private route: ActivatedRoute, private router: Router, private validationService: ValidationService) { }

  ngOnInit() {
    this.getPatientId();
    this.initPatientInfo();
    this.initInsuranceInfoForm();
    this.getPatientEmergencyContact();
    this.getPatientDropdownData();
    this.initGuarantorInformation();
    this.emergencyContactFormBuilder();
    this.getPatientGuarantorInfo();
    this.getPatientInsuranceInfo();
  }
  showSuccess(msg) {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success', detail: msg });
  }
  getPatientId() {
    this.patientId = +this.route.snapshot.paramMap.get('id');
    console.log(this.patientId);
  }
  initPatientInfo() {
    this.patientInfoForm = this._fb.group({
      UId: this.uID,
      PatientID: [0],
      LastName: [null],
      FirstName: [null],
      MiddleName: [null],
      Sex: [0],
      Birthdate: [null],
      PlaceofBirth: [null],
      Age: [0],
      MaritalStatus: [0],
      Street: [null],
      City: [null],
      State: [null],
      ZipCode: [null],
      HomePhone: [null],
      WorkPhone: [null],
      CellPhone: [null],
      Employer: [null],
      Occupation: [null],
      PreferredContact: [0],
      WAStreet: [null],
      WACity: [null],
      WAState: [null],
      WAZipCode: [null],
      PreferredLanguage: [0],
      EthnicOrigin: [0],
      Race: [0],
      SSN: [0],
      EmailAddress: ['', [ValidationService.emailValidator]],
      IsShared: [0]

    })
    this.patientInfoForm.get('Birthdate').valueChanges.subscribe(res => {
      var today = new Date();
      var birthDate = new Date(res);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      this.patientInfoForm.patchValue({
        Age: age
      })
    })

    if (this.patientId > 0) {
      this.getPateintBasicInfo();
    }

  }
  savePatientInfo() {
    let pData = this.patientInfoForm.value;
    var datePipe = new DatePipe('en');
    pData.Birthdate = datePipe.transform(pData.Birthdate, 'yyyy-MM-dd');
    pData.applicationAction = 'Patient Basic Info'
    pData.createdFor = null
    this.new = pData;
    let data = {new:this.new,old:this.old}
    this._userService.savePatientInfo(data).subscribe(resp => {
      this.showSuccess("Patient Information saved succesfully");
      Cookie.set('PatientId',resp.Body.Data.PatientId)
      if (resp.status) {
        if (this.patientId == 0) {
          setTimeout(() => {
            let pId = resp.newPatientId['PatientId'];
            this.router.navigate(['/user/patient-info', pId]);
          }, 1000);
        }
        else {
          this.getPateintBasicInfo();
        }
      }
    })
  }
  getPateintBasicInfo() { 
    this._userService.getPatientInfoById(this.patientId).subscribe(resp => {
      console.log(resp);
      let res = resp[0];
      this.old = res;
      this.patientInfoForm.patchValue({
        PatientID: res.Id,
        LastName: res.LastName,
        FirstName: res.FirstName,
        MiddleName: res.MiddleName,
        Sex: res.Sex,
        Birthdate:  res.Birthdate? new Date(res.Birthdate): null,
        PlaceofBirth: res.PlaceofBirth,
        Age: res.Age,
        MaritalStatus: res.MaritalStatus,
        Street: res.Street,
        City: res.City,
        State: res.State,
        ZipCode: res.ZipCode,
        HomePhone: res.HomePhone,
        WorkPhone: res.WorkPhone,
        CellPhone: res.CellPhone,
        Employer: res.Employer,
        PreferredContact: res.PreferredContact,
        WAStreet: res.WAStreet,
        WACity: res.WACity,
        WAState: res.WAState,
        WAZipCode: res.WAZipCode,
        PreferredLanguage: res.PreferredLanguage,
        EthnicOrigin: res.EthnicOrigin,
        Race: res.Race,
        SSN: res.SSN,
        EmailAddress: res.EmailAddress,
        IsShared: res.IsShared.data[0],
        Occupation: res.Occupation,
      })
    })
  }

  // Guarantor
  initGuarantorInformation() {
    this.GuarantorForm = this._fb.group({
      itemGuarantor: this._fb.array([])
    });
  }
 
  createGuarantorInformation() {
    return this._fb.group({
      LastName: [null],
      FirstName: [null],
      MiddleName: [null],
      Relationship: [null],
      Sex: [null],
      Birthdate: [null],
      MaritalStatus: [null],
      Age: [null],
      Street: [null],
      City: [null],
      State: [null],
      ZipCode: [null],
      HomePhone: [null],
      UId:this.uID,
      IsShared:0,
      PatientID: this.patientId,
      Id: 0
    });
  }
  
  addGuarantorInformation() {
    const control = <FormArray>this.GuarantorForm.controls['itemGuarantor'];
    control.push(this.createGuarantorInformation());
  }


  getPatientGuarantorInfo() {
    this._userService.getPatientGuarantorInfoById(this.patientId).subscribe(resp => {
      this.guarantorInfo = resp;
      this.old = resp
      this.guarantorInfo.forEach(
      guarant => {
        const control = <FormArray>this.GuarantorForm.get('itemGuarantor')['controls'];
        control.push(this.createGuarantorInformation());
      })
      for (let entry in this.guarantorInfo) {
      this.GuarantorForm.get('itemGuarantor')['controls'][entry].patchValue({
        LastName: this.guarantorInfo[entry].LastName,
        FirstName: this.guarantorInfo[entry].FirstName,
        MiddleName: this.guarantorInfo[entry].MiddleName,
        Relationship: this.guarantorInfo[entry].Relationship,
        Sex: this.guarantorInfo[entry].Sex,
        Birthdate: this.guarantorInfo[entry].Birthdate ? new Date(this.guarantorInfo[entry].Birthdate):null,
        MaritalStatus: this.guarantorInfo[entry].MaritalStatus,
        Age: this.guarantorInfo[entry].Age,
        Street: this.guarantorInfo[entry].Street,
        City: this.guarantorInfo[entry].City,
        State: this.guarantorInfo[entry].State,
        ZipCode: this.guarantorInfo[entry].ZipCode,
        HomePhone: this.guarantorInfo[entry].HomePhone,
        Id:this.guarantorInfo[entry].Id
      })
    }
    })
  }

  savePatientGuarantorInfo(itemguarantor) {
    let birthday = new DatePipe('en')
    itemguarantor.Birthdate = birthday.transform(itemguarantor.Birthdate, 'yyyy-MM-dd');
    let guarantorId = itemguarantor.Id;
    itemguarantor.applicationAction = 'Patient Guarrentor'
    itemguarantor.createdFor = null
    this.new = itemguarantor
    let data = {new:this.new,old:this.old}
    if (guarantorId !== undefined && guarantorId !== null && guarantorId > 0) {
      this._userService.editPatientGuarantorInfo(data).subscribe(res => {
        this.showSuccess("Guarantor Informtion updated succesfully");
        this.ngOnInit();
      })
    } else {
    this._userService.addPatientGuarantorInfo(itemguarantor).subscribe(res => {
      this.showSuccess("Guarantor Information saved succesfully");
      this.ngOnInit()
    })
  }
  }

  deletePatientGuarantorInfo(itemguarantor) {
    var data = {
      Id:itemguarantor.Id,
      UId:this.uID
    } 
    this._userService.deletePatientGuarantorInfo(data).subscribe(res => {
      console.log(res,"delete");
      this.showSuccess("Guarantor Information deleted succesfully");
      this.ngOnInit()
    })
  } 
 
  // Insurance
  initInsuranceInfoForm() {
    this.insuranceInfoForm = this._fb.group({
      itemInsurance: this._fb.array([])
    });
  }
  
  createInsuranceInfo() {
    return this._fb.group({
      LastName: [null],
      FirstName: [null],
      MiddleName: [null],
      Relationship: [null],
      Sex: [null],
      Birthdate: [null],
      Street: [null],
      City: [null],
      State: [null],
      ZipCode: [null],
      HomePhone: [null],
      WorkPhone: [null],
      SSN: [null],
      Employer: [null],
      WAStreet: [null],
      WACity: [null],
      WAState: [null],
      WAZipCode: [null],
      UId:this.uID,
      IsShared:0,
      PatientID: this.patientId,
      Id: 0
    });
  }

  addInsuranceInfo(): void {
    const control = <FormArray>this.insuranceInfoForm.controls['itemInsurance'];
    control.push(this.createInsuranceInfo());
  }

  getPatientInsuranceInfo() {
    this._userService.getPatientInsuranceInfoById(this.patientId).subscribe(resp => {
      this.insuranceInfo = resp;
      this.old = resp;
      this.insuranceInfo.forEach(
        insur => {
          const control = <FormArray>this.insuranceInfoForm.get('itemInsurance')['controls'];
          control.push(this.createInsuranceInfo());
        })
      for  (let entry in this.insuranceInfo) {
      this.insuranceInfoForm.get('itemInsurance')['controls'][entry].patchValue({
        LastName: this.insuranceInfo[entry].LastName,
        FirstName: this.insuranceInfo[entry].FirstName,
        MiddleName: this.insuranceInfo[entry].MiddleName,
        Relationship: this.insuranceInfo[entry].Relationship,
        Sex: this.insuranceInfo[entry].Sex,
        Birthdate: this.insuranceInfo[entry].Birthdate ? new Date(this.insuranceInfo[entry].Birthdate):null,
        Street: this.insuranceInfo[entry].Street,
        City: this.insuranceInfo[entry].City,
        State: this.insuranceInfo[entry].State,
        ZipCode: this.insuranceInfo[entry].ZipCode,
        HomePhone: this.insuranceInfo[entry].HomePhone,
        WorkPhone: this.insuranceInfo[entry].WorkPhone,
        SSN: this.insuranceInfo[entry].SSN,
        Employer: this.insuranceInfo[entry].Employer,
        WAStreet: this.insuranceInfo[entry].WAStreet,
        WACity: this.insuranceInfo[entry].WACity,
        WAState: this.insuranceInfo[entry].WAState,
        WAZipCode: this.insuranceInfo[entry].WAZipCode,
        Id:this.insuranceInfo[entry].Id
      })
    }
    })
  }
  
  savePatientInsuranceInfo(iteminsurance) {
    let iBirthdate = new DatePipe('en')
    iteminsurance.Birthdate = iBirthdate.transform(iteminsurance.Birthdate, 'yyyy-MM-dd');
    let insuranceId = iteminsurance.Id;

    iteminsurance.applicationAction = 'Patient Insurance'
    iteminsurance.createdFor = null
    this.new = iteminsurance
    let data = {new:this.new,old:this.old}
    if (insuranceId !== undefined && insuranceId !== null && insuranceId > 0) {
    this._userService.editPatientInsuranceInfo(data).subscribe(res => {
      this.showSuccess("Insurance Information updated succesfully");
      this.ngOnInit()
    })
   } else {
    this._userService.addPatientInsuranceInfo(iteminsurance).subscribe(res => {
      console.log(res,"add");
      this.showSuccess("Insurance Information saved succesfully");
      this.ngOnInit()
    })
   }
  }

  deletePatientInsuranceInfo(iteminsurance) {
    var data = {
      Id:iteminsurance.Id,
      UId:this.uID
    } 
    this._userService.deletePatientInsuranceInfo(data).subscribe(res => {
      console.log(res,"delete");
      this.showSuccess("Insurance Information deleted succesfully");
      this.ngOnInit()
    })
  }

  // Emergency//
  emergencyContactFormBuilder(){
    this.emergencyContactForm = this._fb.group({
      itemRows: this._fb.array([])
   });
  }
   
   createEmergencyContact() {
    return this._fb.group({
      ContactName: [null],
      Phone: [null],
      Relationship: [null],
      UId: this.uID,
      PatientID: this.patientId,
      IsShared: 0,
      Id: 0
    });
  }

  addEmergencyContact(): void {
    const control = <FormArray>this.emergencyContactForm.controls['itemRows'];
    control.push(this.createEmergencyContact());
  }
  
  getPatientEmergencyContact() {
    this._userService.getPatientEmergencyContactById(this.patientId).subscribe(resp => {
      this.emergencyContactInfo = resp;
      this.old = resp
      this.emergencyContactInfo.forEach(
        emergency => {
          const control = <FormArray>this.emergencyContactForm.get('itemRows')['controls'];
          control.push(this.createEmergencyContact());
        })
      for (let entry in this.emergencyContactInfo) {
        this.emergencyContactForm.get('itemRows')['controls'][entry].patchValue({
          ContactName: this.emergencyContactInfo[entry].ContactName,
          Phone: this.emergencyContactInfo[entry].Phone,
          Relationship: this.emergencyContactInfo[entry].Relationship,
          Id: this.emergencyContactInfo[entry].Id,
        })
      }
    });
  }

  savePatientEmergencyContact(itemrow) {
    let emergencyId = itemrow.Id;
    itemrow.applicationAction = 'Patient Emergency'
    itemrow.createdFor = null
    this.new = itemrow
    let data = {new:this.new,old:this.old}
    if (emergencyId !== undefined && emergencyId !== null && emergencyId > 0) {
      this._userService.editPatientEmergencyContact(data).subscribe(res => {
        this.showSuccess("Emergency Contact updated succesfully");
        this.ngOnInit();
      })
    } else {
      this._userService.addPatientEmergencyContact(itemrow).subscribe(res => {
        this.showSuccess("Emergency Contact saved succesfully");
        this.ngOnInit();
      })
    }
  }
  
  deletePatientEmergencyContact(itemrow) {
    var data = {
      Id:itemrow.Id,
      UId:this.uID
    } 
    this._userService.deletePatientEmergencyContact(data).subscribe(res => {
      this.showSuccess("Emergency Contact deleted succesfully");
      this.ngOnInit()
    })
  }
  
  getPatientDropdownData() {
    this._userService.getPatientDropdownData().subscribe(resp => {
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
