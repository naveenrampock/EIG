import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { ToastService } from '../../core/toast/toast.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable()
export class ExceptionService {

  constructor(private router: Router, private toastService: ToastService) { }
  catchBadResponse: (errorResponse: any) => Observable<any> = (errorResponse: any) => {
    let res = <Response>errorResponse;
    if (res.status === 400) {
      if (res.status) {
        return Observable.throw(res.statusText);
      }
    }
    else if (res.status === 404) {
      if (res.status) {
        return Observable.throw(res.statusText);
      }
    }
    else if (res.status == 401) {
      this.toastService.activate("Unauthorized! Please login again")
      setTimeout(() => {
        Cookie.delete('userType');
        Cookie.delete('userID');
        Cookie.delete('token');
     //   this.router.navigate(['/login']);
      }, 2500)
    }
    else if (res.status == 403) {
      this.toastService.activate("Token Expired! Please login again")
      setTimeout(() => {
        Cookie.delete('userType');
        Cookie.delete('userID');
        Cookie.delete('token');
        this.router.navigate(['/login']);
      }, 2500)
    }
    else {
      let err = res.json();
      if (err.error) {
        return Observable.throw(err.error);
      }
      let emsg = err ?
        (err.error ? err.error : JSON.stringify(err)) :
        (res.statusText || 'unknown error');
      this.toastService.activate(`Oops! Something went wrong! Please contact system administrator. `);
      return Observable.of();
    }

  }
}