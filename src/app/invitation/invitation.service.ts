import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { CONFIG, SpinnerService, ExceptionService, HttpRequestConstants, ResponseService } from '../core/';
import { Observable } from 'rxjs/Observable';
//import { Contacts } from './contact-data-model'

let url = CONFIG.apiUrls;

@Injectable()
export class InvitationService {

  constructor(private _http: Http,
              private _httpRequestOptions: HttpRequestConstants,
              private _spinnerService: SpinnerService,
              private _exceptionService: ExceptionService,
            ) { }

            sendInvatation(data: any) {
              let body = JSON.stringify(data);
              this._spinnerService.show();
              return this._http.post(`${url.sendInvatation}`, body, this._httpRequestOptions.RequestOptions)
                .map((response: Response) => <any>response.json())
                .catch(this._exceptionService.catchBadResponse)
                .finally(() => this._spinnerService.hide());
            }
            
        }