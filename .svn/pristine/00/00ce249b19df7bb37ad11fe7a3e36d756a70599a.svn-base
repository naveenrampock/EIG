import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {
  isLogin:boolean = false;
  public emrImportDetailsForm: FormGroup;
  isShowImportDetails:boolean = false;
  constructor(private FB: FormBuilder) { }

  ngOnInit() {
    this.importDetailsFormInit()
  }
  
  openlogin() {
    console.log("working");
    this.isLogin = true;
  }

  importDetailsFormInit() {
    this.emrImportDetailsForm = this.FB.group({ 
      UserName: ['',Validators.required],
      Password: ['',Validators.required],
      URL: ['',Validators.required]
    })
  }

  importLogin() {
    console.log(this.emrImportDetailsForm.value);
    this.isShowImportDetails = true;
    this.isLogin = false;
  }
}
