import { Component, OnInit  } from '@angular/core';
// import { AdminService } from '../admin.service';
// import {List,copyList} from './logs-model-class'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { last } from 'rxjs/operator/last';
import { UserService } from '../user.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-logs',
  templateUrl: './audit-logs.component.html',
  styleUrls: ['./audit-logs.component.css']
 // styleUrls: ['./log.component.css'],
 // providers: [LogService]
})
export class AuditLogComponent {

    public List:any;
    private uId = Cookie.get('userID');
    private type:string='PUT';

    constructor(private userService: UserService,public formbuilder: FormBuilder) { }

    ngOnInit(){
        this.getService();
      }

      private getService(){
        this.userService.getList(this.uId,this.type)
        .subscribe(List => {
          this.List = List.Body.Data;
        })
      }
}