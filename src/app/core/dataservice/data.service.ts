import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HttpRequestConstants } from '../provider/index';
import { SpinnerService } from '../spinner/index'
import { ExceptionService  } from '../exception/index';
import { ResponseService } from '../response/index';
import {TreeModule,TreeNode} from 'primeng/primeng';

@Injectable()
export class DataService {
  
  constructor(private http: Http,
    private spinnerService: SpinnerService,
    private httpRequestOptions: HttpRequestConstants,
    private responseService: ResponseService,
    private exceptionService:ExceptionService
  ) { }   
}