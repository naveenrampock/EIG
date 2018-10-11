import { Component, OnInit, Input } from '@angular/core';
import { DicomService } from '../../../dicom/dicom.service';

@Component({
  selector: 'app-dicom-more-info',
  templateUrl: './dicom-more-info.component.html',
  styleUrls: ['./dicom-more-info.component.css']
})
export class DicomMoreInfoComponent implements OnInit {
  @Input() moreInfo: any;
  constructor(private dicom: DicomService) { }

  ngOnInit() {
    let userIds = { userIds: this.moreInfo.UploadedBy + ',' + this.moreInfo.UpdatedBy + ',' + this.moreInfo.Owner }
    this.dicom.getUserNameById(userIds)
      .subscribe((res) => {
        console.log(res)
        res.Body.Data.forEach(
          r => {
            if (r.Id == this.moreInfo.UploadedBy) {
              this.moreInfo.UploadedBy = r.FirstName + " " + r.LastName;
              console.log(this.moreInfo.UploadedBy)
            }
            if (r.Id == this.moreInfo.UpdatedBy) {
              this.moreInfo.UpdatedBy = r.FirstName + " " + r.LastName;
            }
            if (r.Id == this.moreInfo.Owner) {
              this.moreInfo.Owner = r.FirstName + " " + r.LastName;
            }
          })
      })
  }

}
