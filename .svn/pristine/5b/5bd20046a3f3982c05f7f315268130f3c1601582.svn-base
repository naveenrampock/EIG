import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { CONFIG, SpinnerService, ExceptionService, HttpRequestConstants, ResponseService } from '../core/';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
let  base_URL = CONFIG.chat.base;

@Injectable()
export class HttpService {
 
   private BASE_URL = base_URL;
  constructor(private http: Http, private _httpRequestOptions: HttpRequestConstants) { }
  private headerOptions = new RequestOptions({
    headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' }) 
  });
  
  public userSessionCheck(params) {
    return this.http.post(`${this.BASE_URL}userSessionCheck`, JSON.stringify(params), this._httpRequestOptions.RequestOptions)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || `Server error`));
  }

  public getMessages(params) {
    return this.http.post(`${this.BASE_URL}getMessages`, JSON.stringify(params),  this._httpRequestOptions.RequestOptions)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || `Server error`));
  }

  public deleteMsgs(params){
    // return this.http.delete(`${this.BASE_URL}getMessages`, JSON.stringify(params),  this._httpRequestOptions.RequestOptions)
    return this.http.post(`${this.BASE_URL}deleteMsg`,JSON.stringify(params),  this._httpRequestOptions.RequestOptions)
    .map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || `Server error`));
  }

  public getAllnotification(uId){
     return this.http.get(`${this.BASE_URL}getNotification/${uId}`, this._httpRequestOptions.RequestOptions)
     .map((response : Response ) => response.json())
     .catch((error: any) => Observable.throw(error.json().error || `Server error`));
  }
}
