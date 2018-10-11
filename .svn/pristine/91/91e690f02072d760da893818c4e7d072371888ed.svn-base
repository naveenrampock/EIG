import { Component, OnInit, Output,OnDestroy, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { AdminService } from '../admin.service';
import { Message } from 'primeng/components/common/api';
import { CONFIG } from './../../core/config/config';
import { RefreshService } from './../../core/dataservice/refresh.service'

@Component({
  selector: 'app-sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  styleUrls: ['./sidebar-nav.component.css']
})
export class SidebarNavComponent implements OnInit {

  @Output() saveCallback: EventEmitter<any> = new EventEmitter();
  isSuperAdmin: boolean = false;
  imgUrl: any ;
  userType=Cookie.get('userType');
  // image:any  = Cookie.get('profilePic');
  private local:any=CONFIG.url;
  // uID = Cookie.get('userID');
  uID:any;
  msgs: Message[] = [];
  loginUserEditProfile:boolean;

  constructor(private router: Router, private refresh:RefreshService, private _adminService: AdminService) { }

  ngOnInit() {
    if (Cookie.get('userType') == '1') {
      this.isSuperAdmin = true
    }
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
    
    // this.imgUrl = this.image;
  }

  public imageEvent(event) {
    const fileSelected: File = event.target.files[0];
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imgUrl = event.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);
    this._adminService.uploadFile(fileSelected, this.uID)
      .subscribe((response) => {
        console.log("+++++++++++++++++++++++++++")
        console.log(this.loginUserEditProfile)
        if (response.success) {
          if(this.loginUserEditProfile == true){
          this.imgUrl = this.local.concat(response.profilepath)
      this.refresh.changeMessage(this.imgUrl)
      Cookie.delete('profilePic')
      Cookie.set('profilePic', this.imgUrl)
      this.showSuccess(response.message);
          }else{
          this.showSuccess(response.message);
          }
        }
      })
      

      
  }

  validateUpload(event) {
    var _validFileExtensions = ["image/jpeg", "image/png", "image/jpg"];
    let ext = event.target.files[0].type;
    let imgSize = event.target.files[0].size;
    // if ((_validFileExtensions.indexOf(ext) == -1) || imgSize > '5000000') {
    //   this.showError('Invalid file(Max size 500kb and allowed file types are jpeg, png');
    // } else {
    this.imageEvent(event)
    // }
  }

  patientinfo() {
    this.router.navigate(['/admin/patient-info', Cookie.get('UserUId')])
  }

  showSuccess(msg) {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success', detail: msg });
  }

  showError(msg) {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Error Message', detail: msg });
  }

}
