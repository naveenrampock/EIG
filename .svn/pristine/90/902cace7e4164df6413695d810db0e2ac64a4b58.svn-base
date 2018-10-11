import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Message } from 'primeng/primeng';
import { Router } from '@angular/router';
import { EmrService } from '../../emr.service';

@Component({
  selector: 'app-ccd-details',
  templateUrl: './ccd-details.component.html',
  styleUrls: ['./ccd-details.component.css']
})
export class CcdDetailsComponent implements OnInit {
  @Input() ccdDetails: any;
  @Output() goListingPage: EventEmitter<any> = new EventEmitter();
  uID = Cookie.get('userID');
  id = Cookie.get('Id');
  uType = Cookie.get('userType');
  uploadedFiles: Array<any> = [];
  filesToUpload: Array<File> = [];
  msgs: any[];
  description :any;
  notes:any;
  private validFileExtensions = ["text/xml", "application/xml"];

  constructor(private service: EmrService) { }

  ngOnInit() {
  }

  backToListing() {
    console.log('back off');
    this.goListingPage.emit('');
  }

  fileChangeEvent(fileInput: any, form) {

    console.log(fileInput);

    if (fileInput.files.some(f => this.validFileExtensions.indexOf(f.type) == -1)) {
      console.log(`Invalid file Added `);
      this.showError("Invalid file Added")
    } else {
      console.log('success',fileInput.files);
      this.upload(fileInput.files, form)
    }

  }

  upload(evt, form) {
    
    this.service.uploadFile(evt, this.id,this.description,this.notes)
      .subscribe((response) => {
        this.filesToUpload = [];
      })
  }

  showError(msg) {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Error Message', detail: msg });
  }
  showSuccess(msg) {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success', detail: msg });
  }
}
