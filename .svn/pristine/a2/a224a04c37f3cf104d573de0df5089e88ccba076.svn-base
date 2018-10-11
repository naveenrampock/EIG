import { Headers, RequestOptions } from '@angular/http';
import { Injectable, Provider } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class HttpRequestConstants {

      public devicetype = 'web';
      get RequestOptions(): RequestOptions {

            let contentHeaders = new Headers();
            let params = new HttpParams();
            contentHeaders.append('Accept', 'application/json');
            contentHeaders.append('Content-Type', 'application/json');
            contentHeaders.append('Authorization', Cookie.get('token'));
            contentHeaders.append('UserId', Cookie.get('Id'));
            contentHeaders.append('UserType', Cookie.get('userType'));
            contentHeaders.append('DeviceType', this.devicetype);

            return new RequestOptions({ headers: contentHeaders });

      }

      requestOptionsWithQueryParams(params: any) {
            let requestOptions = this.RequestOptions;         
            requestOptions.params = params;
            return requestOptions;
      }

      RequestXmlOptions() {
            let contentHeaders = new Headers();
            contentHeaders.append('Accept', 'application/x-www-form-urlencoded');
            contentHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
            return new RequestOptions({ headers: contentHeaders });
      }
}

