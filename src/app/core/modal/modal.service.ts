import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {  CONFIG,SpinnerService,ExceptionService } from '../../core/';
import {  HttpRequestConstants,PageLabel } from '../../core/';

@Injectable()
export class ModalService {
            constructor(private _http: Http,
                        private _httpRequestOptions: HttpRequestConstants,
                        private _spinnerService: SpinnerService,
                        private _exceptionService: ExceptionService) { }

  activate: (message?: string, cancel?:boolean, title?: string,) => Promise<boolean>;

}
