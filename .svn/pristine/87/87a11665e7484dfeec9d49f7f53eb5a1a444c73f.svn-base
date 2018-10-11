import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { CONFIG, SpinnerService, ExceptionService, HttpRequestConstants, ResponseService } from '../core/';
import { Observable } from 'rxjs/Observable';
//import { Contacts } from './contact-data-model'

let url = CONFIG.dicom;

@Injectable()
export class EnvironmentService {

  constructor(private _http: Http,
              private _httpRequestOptions: HttpRequestConstants,
              private _spinnerService: SpinnerService,
              private _exceptionService: ExceptionService,
            ) { }


    //Cache Server Function
    getCacheServerList() {
        this._spinnerService.show();
        return this._http.get(`${url.getcacheServerList}`, this._httpRequestOptions.RequestOptions)
          .map((response: Response) => <any>response.json())
          .catch(this._exceptionService.catchBadResponse)
          .finally(() => this._spinnerService.hide());
      }
      
    addNewCacheServer(data) {
      let body = data;
      this._spinnerService.show();
      return this._http
        .post(`${url.addNewCacheServer}`, body, this._httpRequestOptions.RequestOptions)
        .map(response => response.json())
        .catch(this._exceptionService.catchBadResponse)
        .finally(() => this._spinnerService.hide());
    }
  
    editCacheServer(data) {
      let body = data;
      this._spinnerService.show();
      return this._http
        .put(`${url.editCacheServer}`, body, this._httpRequestOptions.RequestOptions)
        .map(response => response.json())
        .catch(this._exceptionService.catchBadResponse)
        .finally(() => this._spinnerService.hide());
    }
  
    deleteCacheServer(id) {
      
      this._spinnerService.show();
      return this._http
      .delete(`${url.deleteCacheServer}/${id}`, this._httpRequestOptions.RequestOptions)
        .map(response => response.json())
        .catch(this._exceptionService.catchBadResponse)
        .finally(() => this._spinnerService.hide());
    }
  
  
    
  //DataStorage functions
  
  getDataStorageList(){
    this._spinnerService.show();
    return this._http.get(`${url.getdataStorageList}`, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }
  
  addNewDataStorage(data){
    let body = data;
    this._spinnerService.show();
    return this._http
      .post(`${url.addNewDataStorage}`, body, this._httpRequestOptions.RequestOptions)
      .map(response => response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }
  
  editDataStorage(data){
    let body = data;
    this._spinnerService.show();
    return this._http
      .put(`${url.editDataStorage}`, body, this._httpRequestOptions.RequestOptions)
      .map(response => response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }
  
  deleteDataStorage(id){
  
    this._spinnerService.show();
    return this._http
      .delete(`${url.deleteDataStorage}/${id}`, this._httpRequestOptions.RequestOptions)
      .map(response => response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }
  
  //Viewers Function
  getViewersList(){
    this._spinnerService.show();
    return this._http.get(`${url.getViewerList}`, this._httpRequestOptions.RequestOptions)
      .map((response: Response) => <any>response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }
  
  addViewer(data){
    let body = data;
    this._spinnerService.show();
    return this._http
      .post(`${url.addViewerStorage}`, body, this._httpRequestOptions.RequestOptions)
      .map(response => response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }
  
  editViewers(data){
    let body = data;
    this._spinnerService.show();
    return this._http
      .put(`${url.editViewers}`, body, this._httpRequestOptions.RequestOptions)
      .map(response => response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }
  
  deleteViewer(id){
    
    this._spinnerService.show();
    return this._http
      .delete(`${url.deleteViewer}/${id}`, this._httpRequestOptions.RequestOptions)
      .map(response => response.json())
      .catch(this._exceptionService.catchBadResponse)
      .finally(() => this._spinnerService.hide());
  }
          
        }