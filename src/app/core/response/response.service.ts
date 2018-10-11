import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable() 
export class ResponseService {
    constructor(){ }  
        
    /* Handle http response */
    handleSuccess(response: Response) {
        let body = response.json();
        return body || {};
    }

    /* Handle http errors */
    handleError(error: any) {
        return Observable.throw(error);
    }
    /* Handle http errors json object */
    handleErrorResponse(error:any){
        return Observable.throw(error.json());
    }
}