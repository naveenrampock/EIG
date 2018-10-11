import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserProfileRoutingModule } from './user-profile.routing.module'
import { Router } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserProfileService } from  './user-profile.service';
import {CalendarModule} from 'primeng/primeng';
import {MultiSelectModule} from 'primeng/multiselect';
import { GrowlModule } from 'primeng/components/growl/growl';
import { DialogModule } from 'primeng/components/dialog/dialog';
import {InputMaskModule} from 'primeng/inputmask';

@NgModule({
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    CalendarModule,
    MultiSelectModule,
    GrowlModule,
    DialogModule,
    InputMaskModule
  ],
  declarations: [
    UserProfileComponent,
    UserInfoComponent
  ],
  exports: [ 
   
  ],
  providers: [UserProfileService]
})

export class UserProfileModule { }