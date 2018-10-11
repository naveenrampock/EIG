import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { DicomService } from '../dicom.service';

@Component({
  selector: 'app-more-information',
  templateUrl: './more-information.component.html',
  styleUrls: ['./more-information.component.css']
})
export class MoreInformationComponent implements OnInit {
  @Input() moreInfo: any;
  dicomUserData: FormGroup;
  constructor(private _FB: FormBuilder, private dicom: DicomService) { }

  ngOnInit() {

    let userIds = { userIds: this.moreInfo.UploadedBy + ',' + this.moreInfo.UpdatedBy }
    this.dicom.getUserNameById(userIds)
      .subscribe((res) => {
        console.log(res)
        res.Body.Data.forEach(
          r => {
            if (r.Id == this.moreInfo.UploadedBy) {
              this.moreInfo.UploadedBy = r.FirstName+" "+r.LastName;
              console.log(this.moreInfo.UploadedBy)
            }
            if (r.Id == this.moreInfo.UpdatedBy) {
              this.moreInfo.UpdatedBy = r.FirstName+" "+r.LastName;
              console.log(this.moreInfo.UpdatedBy)
            }
          })
      })
   
  }

  dicomData() {
    this.dicomUserData = this._FB.group({
      StudyPK: [''],
      StudyInstanceUID: [''],
      StudyID: [''],
      SeriesNumber: [''],
      StudyDate: [''],
      StudyTime: [''],
      RequestingPhysician: [''],
      RequestedProcedureDescription: [''],
      PerformedProcedureStepStartDate: [''],
      PerformedProcedureStepID: [''],
      Manufacturer: [''],
      StationName: [''],
      SoftwareVersions: [''],
      Model: [''],
      PatientName: [''],
      IssuerOfPatientID: [''],
      PatientBirthTime: [''],
      OtherPatientIDs: [''],
      PatientSize: [''],
      PatientAddress: [''],
      Owner: [''],
      NoOfSeries: [''],
      StorageID: [''],
      StudySizeAfterCompression: [''],
      CreatedBy: [''],
      UpdatedBy: [''],
      StudyDescription: [''],
      ContentDate: [''],
      ContentTime: [''],
      AccessionNumber: [''],
      StudyStatusID: [''],
      ReasonForStudy: [''],
      RequestingService: [''],
      CurrentPatientLocation: [''],
      PerformedProcedureStepStartTime: [''],
      PerformedProcedureStepDescription: [''],

      InstitutionName: [''],
      VersionName: [''],
      AE_Title: [''],
      PatientID: [''],
      PatientBirthDate: [''],
      PatientSex: [''],
      PatientAge: [''],
      PatientWeight: [''],
      UploadedBy: [''],
      IsDeleted: [''],
      NoOfImages: [''],
      StudySizeBeforeCompression: [''],
      LastViewed: [''],
      CreatedDate: [''],
      UpdatedDate: ['']






    })
  }

}
