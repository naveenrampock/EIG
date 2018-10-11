import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CONFIG } from '../core/';
// import { HomeService } from './home.service'
import { EmitService } from '../core/emit/emit.service';
//import { LoginServices } from './../login/login.services';
import { AuthService } from '../core/dataservice/auth.service'
import { Directive } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'
import { Cookie } from 'ng2-cookies/ng2-cookies';
declare var $;

@Component({
  selector: 'hws-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userType: string;
  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService, private _sanitizer: DomSanitizer) { }
  ngOnInit() {
    this.userType = Cookie.get('userType');
    console.log(this.userType);
  }
  toggleActive() {
    $("#wrappers").toggleClass("active");
    console.log('bac');
  }
}
