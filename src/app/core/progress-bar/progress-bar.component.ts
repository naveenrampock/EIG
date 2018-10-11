import { Component, OnInit } from '@angular/core';
import { ProgressServiceService } from './progress-service.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Message } from 'primeng/primeng';

declare var window: any, VC: any, $: any;
@Component({
  selector: 'progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {
  isMinimized: boolean = true;
  uID = Cookie.get('userID');
  id = Cookie.get('Id');
  uploadProgress:any;
  instanceId: any;
  studyId: any;
  series: any;
  image: any;
  private uploadId: any;
  sUrl: any;
  serverId:any;
  display: boolean = false;
  msgs: Message[] = [];

  private _toastElement: any;

  constructor(private progressService: ProgressServiceService) {
    progressService.activate = this.activate.bind(this);
  }

  activate(file:any,id:any) {
   console.log(file)
    this._show(file,id);
  }

  ngOnInit() {
    this._toastElement = document.getElementById('progressBar');
  }

  private _show(file,id) {
    console.log(id);
    var fullName=Cookie.get('firstName')+''+Cookie.get('lastName')
   this.progressService.uploadFile(file, id, fullName)
      .progress(progressObservable=>{
        progressObservable.subscribe(value=>{
          this._toastElement.style.display = 'Block';
          this._toastElement.style.opacity = 1;
          this._toastElement.style.zIndex = 9999;
          this.uploadProgress=value;
          console.log("======================",value);
        })

      })
      .subscribe((response) => {
 
        this.instanceId = response.Body.Data.StudyInstanceId;
        // console.log(response.Data[0].StudyInstanceId.split(','))
        this.studyId = response.Body.Data.StudyId;
        this.series = response.Body.Data.NoOfSeries;
        this.image = response.Body.Data.NoOfImages;
        this.uploadId = response.Body.Data.Id;
        this.sUrl = response.Body.serverUrl;
        this.serverId = response.Body.serverId
        this.display = true;
        // $("#progressBar").modal('hide');
        this._toastElement.style.display = 'none';
        this.showSuccess(response.Header.message);
       
      })

  }

  moveToS3() {
    // this.display = false;
    // this.instanceId='1.3.6.1.4.1.18047.1.11.10021841473447061672';
    this.progressService.moveToS3Upload(this.instanceId, this.uploadId, this.sUrl, this.serverId)
      .subscribe((res) => {
         this.showSuccess(res.Header.message)
        console.log(res.Header.message);
         this.display = false;
        // this.getDicomList();
      })
  }

  removeDicon() {
    this.progressService.rejectDicom(this.instanceId, this.uploadId, this.sUrl)
      .subscribe((res) => {
        this.showSuccess(res.Header.message);
        console.log("deleted ");

        this.display = false;
      })
  }

  showSuccess(msg) {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success', detail: msg });
  }

  private _hide() {
    this._toastElement.style.opacity = 0;
    this._toastElement.style.display = 'none';
    window.setTimeout(() => this._toastElement.style.zIndex = 0, 400);
  }

  minimize() {
    $("#progressBar").hide();
    $("#body").css('overflow', 'initial');
    $("#body").css('padding-right', '0px');
    $(".modal-backdrop.show").css('opacity', '1');
    $(".modal-backdrop.show").css('position', 'relative');
    this.isMinimized = false;
  }

  maximize() {
    this.isMinimized = true;
    $("#progressBar").show();
    $("#body").css('overflow', 'hidden');
    $("#body").css('padding-right', '17px');
    $(".modal-backdrop.show").css('opacity', '17px');
  }
}
