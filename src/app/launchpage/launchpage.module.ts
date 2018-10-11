import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaunchpageComponent } from './launchpage.component';
import { LaunchPageRoutingModule } from './launchpage.routing.module';
import { LaunchPageService } from './launchingpage.service';
import { SharedModule } from '../shared/shared.module';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';




@NgModule({
  imports: [
    CommonModule, LaunchPageRoutingModule, SharedModule, 
    Ng2GoogleChartsModule
  ],
  declarations: [LaunchpageComponent],
  providers: [LaunchPageService]
})
export class LaunchpageModule { }
