import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { Router } from '@angular/router';
import { HeaderComponent, FooterComponent } from './../layouts/index'
import { HomeRoutingModule } from './home.routes.module'
// import { HomeService } from './home.service';
import { SharedModule } from './../shared/shared.module';




@NgModule({
  imports: [CommonModule, HomeRoutingModule, SharedModule],
  declarations: [HomeComponent, HeaderComponent, FooterComponent],
  exports: [ HeaderComponent, FooterComponent],
  providers: []

})
export class HomeModule {

}
