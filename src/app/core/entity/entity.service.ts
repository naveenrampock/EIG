import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class EntityService {
  sharedData: any;
  sharedLabel: any;
  clone = (source: {}) => Object.assign({}, source);
  merge = (target: any, ...sources: any[]) => Object.assign(target, ...sources);
  propertiesDiffer = (entityA: {}, entityB: {}) => Object.keys(entityA).find(key => entityA[key] !== entityB[key]);

  processFields(pageLabel: any){

  }

  setSharedData(newValue: any) {
    this.sharedData = newValue;
  }
  getSharedData(): Observable<any> {
    return  Observable.of(this.sharedData );
  }
  setSharedLabel(newValue: any) {
    this.sharedLabel = newValue;
  }
  getSharedLabel(): Observable<any> {
    return  Observable.of(this.sharedLabel );
  }
}