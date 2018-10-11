import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { EmrService } from '../emr.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientDropDown, PatientSelectDropdown } from './patient.models';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  public errorPop: string = '';
  public emptyDropdown: any = '';
  public emrPatientdetailsForm: FormGroup;
  public CommunicationdetailsForm: FormGroup;
  public msgs: any[] = [];
  public IsHidden: boolean = false;
  public patientDropdown: PatientDropDown = <PatientDropDown>{};
  public patientSelectDropdown: PatientSelectDropdown = <PatientSelectDropdown>{};
  public patientId: any;
  public listPatientInfo: any;
  public dateTime = new Date();
  public errorsave: string = "";
  public error: string = "";
  public selectedCountry: any;
  public contactIndex: any;
  public selectedLanguage: any = [];
  public selectedPreferred: any = '';
  private userId = Cookie.get('Id');

  constructor(private FB: FormBuilder, private emrService: EmrService, private router: Router) {
    this.dateTime.setDate(this.dateTime.getDate());
  }

  ngOnInit() {
    this.patientFormInit();
    this.getPateintBasicInfo();
    this.allDropDown();
  }

  public patientFormInit() {
    //Add
    this.emrPatientdetailsForm = this.FB.group({
      Id: 0,
      CreatedBy: this.userId,
      FirstName: [null, Validators.required],
      MiddleName: null,
      LastName: [null, Validators.required],
      Gender: ['', Validators.required],
      BirthDate: [null, Validators.required],
      MaritalStatus: ['', Validators.required],
      Telecom: this.FB.group({ Cell: null, Work: null, Home: null }),
      Address: this.FB.group({ Line1: null, Line2: null, City: null, State: null, Country: null }),
      Communicationx: this.FB.array([]),
      GeneralPractitioner: null,
      ManagingOrganization: null,
      Deceased: null,
      User_Id: this.userId,
      Active: true,
      MultipleBirth: null,
      Photo: null,
      Animal: null,
      Species: null,
      Breed: null,
      GenderStatus: null,
      Link: null,
      Other: null,
      Type: null,
      UpdatedBy: this.userId
    });
    if (this.patientId) {
      this.getPateintBasicInfo();
    } else {
      this.preventCommunicationEmpty();
    }
  }

  public saveEmrPatient() {
    let addParams = this.emrPatientdetailsForm.value;
    let isValidComm = 0;
    let isDuplicate = false;
    for (let comm of addParams.Communicationx) {
      let duplicateLang = addParams.Communicationx.filter(lang => lang.Language == comm.Language);
      if (duplicateLang.length > 1) {
        isDuplicate = true;
        this.errorPop = ""
      }
      if (comm.Preferred == 289) {
        isValidComm = isValidComm + 1;
        this.errorsave = "";
      }
    }
    if (isValidComm != 1) {
      this.errorsave = "Atleast one language must be preferred"
      return this.errorsave;
    }
    if (isDuplicate) {
      this.errorPop = "Duplicate Languages are not allowed";
      return this.errorPop;
    }
    addParams.Communicationx = JSON.stringify(addParams.Communicationx);
    addParams.Address = JSON.stringify(addParams.Address);
    addParams.Telecom = JSON.stringify(addParams.Telecom);
    addParams.BirthDate = new DatePipe('en').transform(addParams.BirthDate, 'yyyy-MM-dd HH:mm:ss');
    this.emrService.addEmrPatientBasicInfo(addParams).subscribe(res => {
      if (res.Header.Success == true) {
        this.successMessagePopup(res);
      }
    })
  }

  public updateEmrPatient() {
    let updateParams = this.emrPatientdetailsForm.value;
    let isDuplicate = false;
    let isValidComm = 0;
    for (let comm of updateParams.Communicationx) {
      console.log(comm.Preferred)
      let duplicateLang = updateParams.Communicationx.filter(lang => lang.Language == comm.Language);
      if (duplicateLang.length > 1) {
        isDuplicate = true;
        this.errorPop = ""
      }
      if (comm.Preferred == 289) {
        isValidComm = isValidComm + 1;
        this.error = "";
      }
    }
    if (isValidComm != 1) {
      this.error = "Only one preferred language is allowed"
      return this.error;
    }
    if (isDuplicate) {
      this.errorPop = "Duplicate Languages are not allowed";
      return this.errorPop;
    } else {
      this.errorPop = "";
    }
    updateParams.Communicationx = JSON.stringify(updateParams.Communicationx);
    updateParams.Address = JSON.stringify(updateParams.Address);
    updateParams.Telecom = JSON.stringify(updateParams.Telecom);
    updateParams.BirthDate = new DatePipe('en').transform(updateParams.BirthDate, 'yyyy-MM-dd HH:mm:ss');
    this.emrService.updateEmrPatientBasicInfo(updateParams).subscribe(res => {
      this.successMessagePopup(res);
    })
  }

  public initializeAllDropDown(data) {
    this.patientDropdown = <PatientDropDown>{
      language: data.filter(r => r.CategoryId == '176'),
      country: data.filter(r => r.CategoryId == '177')
    }
  }

  public searchDropDown(Id, desc, index) {
    let params = { Id: Id, desc: desc }
    this.emrService.getDropDown(params)
      .subscribe((res) => {
        this.IsHidden = true;
        this.contactIndex = index;
        var data = res.Body.Data.filter(
          item => item.Description.toLowerCase().indexOf(desc.toLowerCase()) == 0
        );
        if (data == '') {
          this.msgs = [{ severity: 'error', summary: 'Error Message', detail: 'There is no values for this character, please enter other character' }];
        }
        this.initializeAllDropDown(data)
      })
  }

  public getValue(item, cntrl) {
    this.IsHidden = false;
    if (item.CategoryId == 177) {
      this.selectedCountry = item.Description;
    }
    if (item.CategoryId == 176) {
      this.selectedLanguage.push(item)
      this.Communicationx.at(cntrl).get('Language').setValue(item.Description)
    }
  }

  public addCommunicationDetails() {
    this.Communicationx.push(this.createCommunicationInformation());
  }

  public deleteCommunicationDetails(i) {
    this.Communicationx.removeAt(i);
  }


  public preventCommunicationEmpty() {
    if (!this.Communicationx.length) {
      let group = this.createCommunicationInformation();
      group.reset();
      this.emrPatientdetailsForm.setControl('Communicationx', this.FB.array([group]));
    }
  }

  public get Communicationx(): FormArray {
    return <FormArray>this.emrPatientdetailsForm.controls['Communicationx'];
  }
  private createCommunicationInformation() {
    return this.FB.group({
      Language: [''],
      Preferred: [''],
      Communication: ['']
    });
  }

  private getPateintBasicInfo() {
    let params = { 'Id': this.userId }
    this.emrService.getEmrPatientBasicInfo(params).subscribe(pateintBasicInfoLists => {
      this.listPatientInfo = pateintBasicInfoLists.Body.Data[0];
      this.patientId = pateintBasicInfoLists.Body.Data[0][0].Id;
      this.listPatientInfo.map(dv => {
        dv.Address = JSON.parse(dv.Address);
      })
      this.listPatientInfo.map(dv => {
        dv.Telecom = JSON.parse(dv.Telecom);
      })
      let res = pateintBasicInfoLists.Body.Data[0][0];
      this.emrPatientdetailsForm.patchValue({
        Id: res.Id,
        FirstName: res.FirstName,
        MiddleName: res.MiddleName,
        LastName: res.LastName,
        Gender: res.Gender,
        BirthDate: res.BirthDate ? new Date(res.BirthDate) : null,
        MaritalStatus: res.MaritalStatus,
        Telecom: res.Telecom,
        Address: res.Address,
        GeneralPractitioner: res.GeneralPractitioner,
        ManagingOrganization: res.ManagingOrganization
      });
      this.Communicationx.controls = [];
      for (let lang of JSON.parse(this.listPatientInfo[0].Communication)) {
        let group = this.createCommunicationInformation();
        group.get('Language').setValue(lang.Language);
        group.get('Preferred').setValue(lang.Preferred);
        this.Communicationx.push(group);
      }
      this.preventCommunicationEmpty()
    })
  }

  private showSuccess(msg) {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success', detail: msg });
  }

  private successMessagePopup(res) {
    if (res.Header.Success) {
      this.showSuccess(res.Header.Message)
      setTimeout(() => {
        this.getPateintBasicInfo();
      }, 1000);
    }
  }

  private allDropDown() {
    let params = { Id: "37,140,30", desc: null }
    this.emrService.getDropDown(params)
      .subscribe((res) => {
        console.log(res.Body.Data)
        this.initializeSelectDropDown(res.Body.Data);
      })
  }

  private initializeSelectDropDown(data) {
    this.patientSelectDropdown = <PatientSelectDropdown>{
      gender: data.filter(r => r.CategoryId == '140'),
      marital: data.filter(r => r.CategoryId == '37'),
      preferred: data.filter(r => r.CategoryId == '30'),
    }
  }

}

