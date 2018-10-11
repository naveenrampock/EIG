import { Injectable, Inject } from '@angular/core'
import { CaseManagementService } from './case-management.service';
// import { Subject } from 'rxjs/Subject';



@Injectable()

export class CaseManagementUtilService {
    // private notify = new Subject<any>();
    constructor(private caseManagementService: CaseManagementService) { }

    getCaselist(param) {
        return this.caseManagementService.getCaseList(param).map(res => {
            return res.caselist;
            // return res.caselist.map(cs => {
            //     console.log(cs);
            //     return cs;
            // });
        })
    }

    // notifyObservable$ = this.notify.asObservable();

    // public notifyVidyoComp(data: any) {
    //     console.log(data);
    //     this.notify.next(data);
    // }
}