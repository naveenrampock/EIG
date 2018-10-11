import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import { ContactRoutingModule } from './contact.routes.module'
import { Router } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { ContactListingComponent } from './contact-listing/contact-listing.component'
import { ContactService } from './contact.service'
import { ContactFilterPipe } from './contact-listing/contact.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
// import { DialogModule } from 'primeng/components/dialog/dialog';
import { SharedInfoComponent } from './shared-info/shared-info.component';
import { UserService } from '../user/user.service';
import { GrowlModule } from 'primeng/components/growl/growl';
import { DialogModule } from 'primeng/dialog';
import {AutoCompleteModule} from 'primeng/autocomplete';

@NgModule({
  imports: [
    CommonModule,
    ContactRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    CalendarModule,
    DialogModule,
    GrowlModule,
    AutoCompleteModule
  ],
  declarations: [
    ContactComponent,
    ContactListingComponent,
    ContactFilterPipe,
    SharedInfoComponent,

  ],
  exports: [

  ],
  providers: [ContactService, UserService]
})

export class ContactModule { }
