import { Component, OnInit, Input } from '@angular/core';
import { DicomService } from '../dicom.service';

@Component({
  selector: 'app-more-information',
  templateUrl: './more-information.component.html',
  styleUrls: ['./more-information.component.css']
})
export class MoreInformationComponent implements OnInit {

  @Input() moreInfo:any;
  constructor(private dicom: DicomService) { }

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
    console.log(this.moreInfo);
  }

}
