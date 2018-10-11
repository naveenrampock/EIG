import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { CONFIG, SpinnerService, ExceptionService, HttpRequestConstants, ResponseService } from '../core/';
import { Observable } from 'rxjs/Observable';
let url = CONFIG.apiUrls;

@Injectable()

export class RegisterService {
    constructor(private _http: Http,
        private _httpRequestOptions: HttpRequestConstants,
        private _spinnerService: SpinnerService,
        private _exceptionService: ExceptionService,
    ) { }

    registerUser(data: any) {
        let body = data;
        this._spinnerService.show();
        return this._http
            .post(`${url.userRegister}`, body, this._httpRequestOptions.RequestOptions)
            .map(response => response.json())
            .catch(this._exceptionService.catchBadResponse)
            .finally(() => this._spinnerService.hide());
    }

}