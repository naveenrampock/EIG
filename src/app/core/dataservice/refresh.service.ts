import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HttpRequestConstants } from '../provider/index';
import { SpinnerService } from '../spinner/index'
import { ExceptionService  } from '../exception/index';
import { ResponseService } from '../response/index';
import {TreeModule,TreeNode} from 'primeng/primeng';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { Router } from '@angular/router';
import { CONFIG } from '../config/config';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class RefreshService {

  private test:any;
  
  constructor(private http: Http,
    private spinnerService: SpinnerService,
    private httpRequestOptions: HttpRequestConstants,
    private responseService: ResponseService,
    private exceptionService:ExceptionService
  ) { }   



  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();



  changeMessage(message: string) {
    this.messageSource.next(message)
  }


}