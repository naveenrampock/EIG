import { Component, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Http, Response, Headers } from '@angular/http';
import { UserService } from '../user.service';


@Component({
  selector: 'app-user-device',
  providers: [Location, { provide: LocationStrategy, useClass: PathLocationStrategy }],
  templateUrl: './user-device.component.html',
  styleUrls: ['./user-device.component.css']
})
export class UserDeviceComponent implements OnInit {
  public myLocation;
  public List = [];
  profileForm: FormGroup;
  delRow: any;
  uID = Cookie.get('userID');
  userId: any;
  isDeviceType: any;
  products: any;

  constructor(private http: Http, private _userService: UserService) { }

  ngOnInit() {
    this.getUserDeviceById();
  }

  getUserDeviceById() {
    this._userService.getUserDeviceById(this.uID).subscribe(resp => {
      this.List = resp;
    })
  }

  deleteDeviceId(deviceList) {
    var guidId = deviceList.Guid;
    var id = deviceList.UserId;
    this._userService.deleteDeviceId(guidId, id).subscribe(res => {
      if (guidId == Cookie.get('DeviceUID')) {
        Cookie.delete('DeviceUID')
      }
      this.ngOnInit()
    })
  }

}
