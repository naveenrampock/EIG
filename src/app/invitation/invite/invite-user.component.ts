import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { last } from 'rxjs/operator/last';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { InvitationService } from '../invitation.service';
import { Router, NavigationEnd, NavigationStart, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-invite-user',
    templateUrl: './invite-user.component.html',
    styleUrls: ['./invite-user.component.css']
   // styleUrls: ['./log.component.css'],
   // providers: [LogService]
  })

  export class InviteUserComponent{

    msgs: any;
    inviteEmail: { emailId: string, valid: boolean, errorMsg: string } = { emailId: '', valid: false, errorMsg: '' };
    uID = Cookie.get('userID');
    profilePic = Cookie.get('profilePic');
    isShowInvite: boolean = false;
    // patientId = Cookie.get('PatientId');
    Id = Cookie.get('Id');

    constructor( private _FB: FormBuilder,
                 private _userService: InvitationService,
                 private router: Router,private _route: ActivatedRoute
                ) { }


                sendInvitation(email: any) {
                    this.inviteEmail.valid = this.validateEmail(email);
                    if (!this.inviteEmail.valid) {
                      this.inviteEmail.errorMsg = 'Please enter valid Email Id';
                    }
                    else {
                      let data = { email: email, userID: Cookie.get('userID') };
                      this._userService.sendInvatation(data).subscribe(res => {
                        let resp = res.Body.Data;
                        if (resp) {
                          if(resp == "The Email_Id you provided is already a part of medicamind application"){
                            // this.showLogout("Token is expired. Please login again");
                           this.showError("The Email_Id you provided is already a part of medicamind application")
                            
                          }else{
                          this.showSuccess("Invitation has been sent successfully.");
                          this.isShowInvite = false;
                          this.inviteEmail.emailId = '';
                          this.inviteEmail.errorMsg = '';
                          }
                        }
                      })
                    }
                  }

                  validateEmail(email) {
                    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return re.test(String(email).toLowerCase());
                  }

 showSuccess(msg) {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success', detail: msg });
  }

  showError(msg){
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Error Message', detail: msg });
  }

  showLogout(msg) {
    
      
 
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Error Message', detail: msg });

    Cookie.delete('token');
    Cookie.delete('userType');
    Cookie.delete('userID');
    Cookie.delete('profilePic');
    Cookie.delete('Id');
    Cookie.delete('AdminPatientId');
    Cookie.delete('PatientId');
    this.router.navigate(['/login']);
    window["location"].reload();
  


  }

  inviteScreen() {
    this.isShowInvite = true;
  }

  disable(){
    this.isShowInvite = false;
  }
  

            }