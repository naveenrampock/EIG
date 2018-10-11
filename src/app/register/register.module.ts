import { NgModule } from '@angular/core';
import { RegisterComponent } from './register.component';
import { RegisterRoutingModule } from './register-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/components/dialog/dialog';
import { CommonModule } from '@angular/common';
import { RegisterService } from '../register/register.service';
import { GrowlModule } from 'primeng/components/growl/growl';
import { ValidationService } from '../core/validation/validation.service';
import { SharedModule } from './../shared/shared.module';
import {InputMaskModule} from 'primeng/inputmask';
// import { DeviceDetectorModule } from 'ngx-device-detector';
// import { TwitterService } from 'ng2-twitter';


@NgModule({
    declarations: [RegisterComponent],
    imports: [RegisterRoutingModule,InputMaskModule, GrowlModule,FormsModule, ReactiveFormsModule, SharedModule, DialogModule, CommonModule, //DeviceDetectorModule.forRoot()
    ],
    exports: [],
    providers: [RegisterService, ValidationService]
})

export class RegisterModule {

}
