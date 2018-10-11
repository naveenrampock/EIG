import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { last } from 'rxjs/operator/last';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
   // styleUrls: ['./log.component.css'],
   // providers: [LogService]
  })

  export class UserProfileComponent{

    constructor(public formbuilder: FormBuilder) { }
    
        ngOnInit(){
           
          }
  }