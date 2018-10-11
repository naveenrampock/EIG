import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { CONFIG } from '../config/config';
import { SpinnerService } from '../../../app/core/spinner/spinner.service';
import { ExceptionService } from '../../../app/core/exception/exception.service';
import { ResponseService } from '../../../app/core/response/response.service';
import { HttpRequestConstants } from '../../../app/core/provider/http-request-header.provider';
import { Cookie } from 'ng2-cookies/ng2-cookies';

let loginUrl = CONFIG.apiUrls.loginUrl;
let forgotUrl = CONFIG.apiUrls.forgotPassword;
let singleSignOnUrl = CONFIG.apiUrls.SingleSignOnUrl;
let deviceID = Cookie.get('DeviceUID');


@Injectable()
export class AuthService {
  private isLoggedIn: boolean = false;
  private loggedInUserType: any;
  private userId: any;
  imgUrl = '../../../assets/images/avatars/User.png';
  constructor(
    private spinnerService: SpinnerService,
    private exceptionService: ExceptionService,
    private response: ResponseService,
    private http: Http,
    private router: Router,
    private httpRequestConstants: HttpRequestConstants
    ) { }


  doLogin(object: any) {
    this.spinnerService.show();
    return this.http.post(loginUrl, object)
      .map((response: Response) => {
        let resp = response.json();
        if (resp.Header.Success == true && resp.Body.Data != null && resp.Body.Data != 'undefined') {
          this.getLogin(resp.Body.Data.userType, resp.Body.Data.token, resp.Body.Data.userID, resp.Body.Data.profilePic, resp.Body.Data.id, resp.Body.Data.email, resp.Body.Data.accountID,resp.Body.Data.firstName,resp.Body.Data.lastName,resp.Body.Data.dataStoredId);
        }
        return resp;
      }).catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide());
  }

  doSingleSignOn(object: any) {
    this.spinnerService.show();
    return this.http.post(singleSignOnUrl, object)
      .map((response: Response) => {
        let resp = response.json();
        if (resp.Header.Success == true && resp.Body.Data != null && resp.Body.Data != 'undefined') {
          this.getLogin(resp.Body.Data.userType, resp.Body.Data.token, resp.Body.Data.userID, resp.Body.Data.profilePic, resp.Body.Data.id, resp.Body.Data.email, resp.Body.Data.accountID,resp.Body.Data.firstName,resp.Body.Data.lastName,resp.Body.Data.dataStoredId);
        }
        return resp;
      }).catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide());
  }

  forgotPassword(data: any) {
    this.spinnerService.show();
    return this.http.post(forgotUrl, data)
      .map((response: Response) => {
        let resp = response.json();
        return resp;
      }).catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide());
  }

  getLogin(userType, token, uID, profilePic, Id, email, accountID, firstName, lastName,dataStoredId) {
    Cookie.set('token', token);
    Cookie.set('userType', userType);
    Cookie.set('userID', uID, 1);
    Cookie.set('Id', Id, 1);
    Cookie.set('email', email, 1);
    Cookie.set('accountID', accountID);
    Cookie.set('lastName',lastName)
    Cookie.set('firstName',firstName)
    Cookie.set("dataStoredId",dataStoredId)
    if (profilePic) {
      Cookie.set('profilePic', CONFIG.url + profilePic, 1);
    }
    Cookie.set('isUserDeviceValid', 'false',999999999);
  }
}

