import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { CONFIG, SpinnerService, ExceptionService, HttpRequestConstants, ResponseService } from '../core/';
import { Observable } from 'rxjs/Observable';
//import { Contacts } from './contact-data-model'

let url = CONFIG.apiUrls;

@Injectable()
export class LogsService {

  constructor(private _http: Http,
              private _httpRequestOptions: HttpRequestConstants,
              private _spinnerService: SpinnerService,
              private _exceptionService: ExceptionService,
            ) { }
            getList(id,type) {
                this._spinnerService.show();
                return this._http.get(`${url.userLogs}/${id}/${type}`, this._httpRequestOptions.RequestOptions)
                  .map((response: Response) => <any>response.json())
                  .catch(this._exceptionService.catchBadResponse)
                  .finally(() => this._spinnerService.hide());
              }
        }