import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Message } from 'primeng/primeng';
import { Router } from '@angular/router';
import { EmrService } from '../../emr.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-diagnosticdetail',
  templateUrl: './diagnosticdetail.component.html',
  styleUrls: ['./diagnosticdetail.component.css']
})
export class DiagnosticdetailComponent implements OnInit {

  selectedRole: any;
  selectedStatus: any;
  selectedCode: any;
  selectedCategory: any;
  selectedText: any;
  @Input() diagnosticDetails: any;
  @Output() goListingPage: EventEmitter<any> = new EventEmitter();
  uID = Cookie.get('userID');
  id = Cookie.get('Id');
  uType = Cookie.get('userType');
  diagnosticForm: FormGroup;
  sourceDrp: Array<any> = [];
  roleDrp: Array<any> = [];
  categoryDrp: Array<any> = [];
  statusDrp: Array<any> = [];
  codeDrp: Array<any> = [];
  msgs: any[];
  IsHidden: boolean = false;

  constructor(private _FB: FormBuilder, private service: EmrService) { }

  ngOnInit() {
    this.diagnosticFormData();
    this.getAllDropdowns();
    this.diagnosticForm.get("sourceType").valueChanges.subscribe((val) => {
      if (val == "Imported from hospitalEMR")
        this.diagnosticForm.get("sourceId").enable();
      else
        this.diagnosticForm.get("sourceId").disable();
    });

  }

  diagnosticFormData() {
    if (!this.diagnosticDetails) {
      this.diagnosticForm = this._FB.group({
        patientId: [this.id],
        sourceType: ['', Validators.required],
        sourceId: [{ value: [], disabled: true }],
        createdBy: [this.id],
        basedOn: ['', Validators.required],
        status: ['', Validators.required],
        category: ['', Validators.required],
        code: ['', Validators.required],
        subject: [],
        context: [],
        effective: this._FB.group({ effectiveDateTime: [], effectivePeriod: [] }),
        issued: [],
        PerformerData: this._FB.group({ role: [''], actor: [], performer: [] }),
        specimen: [],
        result: [],
        imageStudy: [],
        image: this._FB.group({ comment: [], link: [],imagex:[] }),
        conclusion: [],
        codedDiagnosis: [],
        presentedForm: [],
        studyPk: []
      });

    } else {
      console.log("else", this.diagnosticDetails.data);
      this.diagnosticForm = this._FB.group({
        patientId: [this.diagnosticDetails.data.Id],
        sourceType: [this.diagnosticDetails.data.SourceType, Validators.required],
        sourceId: [{ value: this.diagnosticDetails.data.SourceId, disabled: true }],
        createdBy: [this.id],
        basedOn: [this.diagnosticDetails.data.BasedOn, Validators.required],
        status: [this.diagnosticDetails.data.Status, Validators.required],
        category: [this.diagnosticDetails.data.Category, Validators.required],
        code: [this.diagnosticDetails.data.Code, Validators.required],
        subject: [this.diagnosticDetails.data.Subject],
        context: [this.diagnosticDetails.data.Context],
        effective: this._FB.group({ effectiveDateTime: [JSON.parse(this.diagnosticDetails.data.Effective).effectiveDateTime], effectivePeriod: [JSON.parse(this.diagnosticDetails.data.Effective).effectivePeriod] }),
        issued: [new Date(this.diagnosticDetails.data.Issued)],
        PerformerData: this._FB.group({ role: [JSON.parse(this.diagnosticDetails.data.Performer).role], actor: [JSON.parse(this.diagnosticDetails.data.Performer).actor], performer: [JSON.parse(this.diagnosticDetails.data.Performer).performer] }),
        specimen: [this.diagnosticDetails.data.Specimen],
        result: [this.diagnosticDetails.data.Result],
        imageStudy: [this.diagnosticDetails.data.ImagingStudy],
        image: this._FB.group({ comment: [JSON.parse(this.diagnosticDetails.data.Image).comment], link: [JSON.parse(this.diagnosticDetails.data.Image).link],imagex: [JSON.parse(this.diagnosticDetails.data.Image).imagex] }),
        conclusion: [this.diagnosticDetails.data.Conclusion],
        codedDiagnosis: [this.diagnosticDetails.data.CodedDiagnosis],
        presentedForm: [this.diagnosticDetails.data.PresentedForm],
        studyPk: [this.diagnosticDetails.data.StudyPk],
        Id: [this.diagnosticDetails.data.Id]
      });
      if (this.diagnosticDetails.mode == 'readOnly') {

        this.diagnosticForm.disable()
      }
      if (this.diagnosticDetails.data.SourceType === "Imported from hospitalEMR") {
        this.diagnosticForm.get("sourceId").enable();
      }
      else {
        this.diagnosticForm.get("sourceId").disable();
      }
    }
  }

  backToListing(evt) {
    console.log('back off');
    this.goListingPage.emit(evt);
  }

  insertDiagnostic(data) {
    console.log(data.effective.effectiveDateTime);
    data.issued = new DatePipe('en').transform(data.issued, 'yyyy-MM-dd ');
    data.effective.effectiveDateTime = new DatePipe('en').transform(data.effective.effectiveDateTime, 'yyyy-MM-dd ');
    this.service.insertDiagnostic(data)
      .subscribe((res) => {
        console.log("sucees")
        this.showSuccess(res.Header.Message);
        setTimeout(() => {
          this.backToListing('getAPI');
        }, 1000);
      })
  }

  updateDiagnostic(data) {
    data.issued = new DatePipe('en').transform(data.issued, 'yyyy-MM-dd ');
    data.effective.effectiveDateTime = new DatePipe('en').transform(data.effective.effectiveDateTime, 'yyyy-MM-dd ');
    this.service.updateDiagnostic(data)
      .subscribe((res) => {
        this.showSuccess(res.Header.Message);
        setTimeout(() => {
          this.backToListing('getAPI');
        }, 1000);
      })
  }

  showSuccess(msg) {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success', detail: msg });
  }

  searchDropDown(Id, desc) {
      let params = { Id, desc: desc }
      this.service.getDropDown(params)
        .subscribe((res) => {
          console.log(res);
          this.IsHidden = true;
          this.sourceDrp = res.Body.Data.filter(r => r.CategoryId == '11');
          this.categoryDrp = res.Body.Data.filter(r => r.CategoryId == '84');
          this.statusDrp = res.Body.Data.filter(r => r.CategoryId == '100');
          this.codeDrp = res.Body.Data.filter(r => r.CategoryId == '103');
          this.roleDrp = res.Body.Data.filter(r => r.CategoryId == '104');
        })
  }

  getAllDropdowns() {
    if (this.diagnosticDetails) {
      this.selectedText = this.diagnosticDetails.data.SourceType;
      this.selectedCategory = this.diagnosticDetails.data.Category;
      this.selectedCode = this.diagnosticDetails.data.Code;
      this.selectedStatus = this.diagnosticDetails.data.Status;
      this.selectedRole = this.diagnosticDetails.data.Performer.role;
    }
  }

  getValue(item) {
    this.IsHidden = false;
    console.log(item);
    if (item.CategoryId == 11) {
      this.selectedText = item.Description;
    }
    if (item.CategoryId == 84) {
      this.selectedCategory = item.Description;
    }
    if (item.CategoryId == 103) {
      this.selectedCode = item.Description;
    }
    if (item.CategoryId == 100) {
      this.selectedStatus = item.Description;
    }
    if (item.CategoryId == 104) {
      this.selectedRole = item.Description;
    }
  }
}
