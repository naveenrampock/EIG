import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactComponent } from '../contact/contact.component'
import { ContactListingComponent } from './contact-listing/contact-listing.component'
import { CanActivatedAuthGuard } from '../core/index'
const contactRoutes: Routes = [
  {
    path: '',
    component: ContactComponent,
    //data: { role: [1, 2, 3] },
    // canActivate: [CanActivatedAuthGuard],
    children: [
      { path: '', component: ContactListingComponent },
    ]
  },
 

];

@NgModule({
  imports: [
    RouterModule.forChild(contactRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})

export class ContactRoutingModule { }
