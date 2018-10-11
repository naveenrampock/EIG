import { Component, OnInit, Provider, EventEmitter, Output } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, ActivatedRoute, Params } from '@angular/router';
import { AuthService, CONFIG } from '../core/index'
import { TranslateService } from '@ngx-translate/core';
import { AdminService } from '../admin/admin.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { log } from 'util';
import { RefreshService } from './../core/dataservice/refresh.service'

declare var $;

@Component({
  selector: 'hws-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [AdminService]
})

export class HeaderComponent {
  public languageDrp: Array<any> = [];
  //uID = Cookie.get('userID');
  userType = Cookie.get('userType');
  lastName = Cookie.get('lastName')
  firstName = Cookie.get('firstName')
  public accountId: any;
  public header: any;
  profilePic: any;
  public languageList: Array<any> = [];
  public list: Array<any> = [];
  public result: Array<any> = [];
  hideMenu = false;
  checkImage: any;
  selctedLang: any;
  deplomentFile = CONFIG.url + 'Deployment_Instructions_eImageEnvironment v7.0.doc';

  @Output() toggle: EventEmitter<any> = new EventEmitter();
  constructor(private router: Router, private refresh: RefreshService, private _route: ActivatedRoute, private authService: AuthService,
    private translate: TranslateService, private _adminService: AdminService

  ) {
    translate.setDefaultLang(localStorage.getItem("lng_ls"));

    // translate.addLangs(['en', 'rs', 'ch', 'sp', 'gr']);
    translate.addLangs(this.result)
    // translate.setDefaultLang('en');

    //const browserLang = translate.getBrowserLang();
    // translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }

  ngOnInit() {
    this.selctedLang = localStorage.getItem("lng_ls");
    this.getlanguageDrp();
    this._route.params.forEach((params: Params) => {
      let currentUrl = window.location.href;
      /* Coming from email invite, get project hash from the url */
      let data = Cookie.get('profilePic')
      this.refresh.changeMessage(data)
      if (currentUrl.includes("dicomUser") || currentUrl.includes("case-management") || currentUrl.includes("emr")) {

        this.hideMenu = true;

      } else {
        this.hideMenu = false;
      }

      // see also 

    });

    this.router.events.subscribe((val: NavigationStart) => {
      let currentUrl = window.location.href;

      /* Coming from email invite, get project hash from the url */

      if (val instanceof NavigationStart) {
        if (val.url.includes("dicomUser") || val.url.includes("case-management") || val.url.includes("emr")) {

          this.hideMenu = true;

        } else {
          this.hideMenu = false;
        }
      }
      // see also 

    });
    this.changeLanguage()
    this.accountId = localStorage.getItem('accountId_ls');
    this.header = Cookie.get('userType');
    // this.profilePic = Cookie.get('profilePic');
    this.refresh.currentMessage.subscribe(message => this.profilePic = message)
    // this.profilePic = this.refresh.getTestFunction()
    console.log(this.profilePic)
    if (this.profilePic == null || this.profilePic == "") {
      this.profilePic = "assets/images/user.jpg"
    }
  }

  private changeLanguage() {
    this._adminService.getLanguage().subscribe((resp) => {
      this.languageList = resp.Body.Data;

      this.result = this.languageList.map(a => a.Name);
      this.translate.addLangs(this.result)
      //  this.translate.setDefaultLang('en');
      // const browserLang = this.translate.getBrowserLang();
      // this.translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    })
  }

  toggleMenu() {
    $("#wrapper").toggleClass("active");
    this.toggle.emit(this.header);
  }

  logout() {
    Cookie.delete('token');
    Cookie.delete('userType');
    Cookie.delete('userID');
    Cookie.delete('profilePic');
    Cookie.delete('Id');
    Cookie.delete('AdminPatientId');
    Cookie.delete('PatientId');
    this.router.navigate(['/login']);
    window["location"].reload();
    localStorage.clear();
  }

  switchLanguage(language: string) {
    const obj = { browserLanguage: language, userGuID: Cookie.get('userID') };
    console.log(obj);

    this._adminService.setBrowserLanguage({ browserLanguage: language, userGuID: Cookie.get('userID') }).subscribe((resp) => {
      localStorage.setItem('lng_ls', language);
      this.translate.use(language);
    });

  }

  navigateAdmin() {
    if (Cookie.get('userType') == '1' || Cookie.get('userType') == '2') {
      this.router.navigate(['/admin/settings']);
    } else {
      this.router.navigate(['/user/settings']);
    }
  }

  getlanguageDrp() {
    this._adminService.getlanguageDrp().subscribe((resp) => {
      this.languageDrp = resp;
    })
  }

  navigate() {
    alert("MYHEALTH")
    this.router.navigate(['/my-health'])
  }

  savePatientId() {
    this.router.navigate(['/user/patient-info/', Cookie.get('PatientId')])
  }

}
