import { Component, OnInit } from '@angular/core';
import { DicomService } from '../dicom.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';


@Component({
  selector: 'app-others-shared-dicom',
  templateUrl: './others-shared-dicom.component.html',
  styleUrls: ['./others-shared-dicom.component.css']
})
export class OthersSharedDicomComponent implements OnInit {
  dicomList: Array<any> = [];
  uID = Cookie.get('userID');
  id = Cookie.get('Id');
  constructor(private dicom: DicomService) { }

  ngOnInit() {
    this.dicomSharedByOthers();
  }

  dicomSharedByOthers(){
    var userID = parseInt(this.id);
 
    this.dicom.dicomSharedByOthersList(userID)
      .subscribe((res) => {
        console.log(res);
        this.dicomList = res.body.data.dicomList;
      })
 
}
}
