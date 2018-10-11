import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
//import { LoginServices } from './login.services'; 
import { AuthService } from '../core/dataservice/auth.service'
import { LoginRoutingModule } from './login.routes.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ChatService } from '../message/chat.service';
import { HttpService } from '../message/http.service';
import { DialogModule } from 'primeng/components/dialog/dialog';
import { RecaptchaModule } from 'ng-recaptcha';
import { GrowlModule } from 'primeng/components/growl/growl';
import { UserService } from '../user/user.service';




@NgModule({
  imports: [CommonModule, GrowlModule, LoginRoutingModule, FormsModule, ReactiveFormsModule, SharedModule, DialogModule, RecaptchaModule.forRoot()],
  declarations: [LoginComponent],
  exports: [LoginComponent],
  providers: [AuthService,ChatService,HttpService,UserService]
})
export class LoginModule { }    
