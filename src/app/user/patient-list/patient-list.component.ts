import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  patientLists: any;
  uID = Cookie.get('userID');
  constructor(private _userService: UserService, private router: Router) { }

  ngOnInit() {
    this.getPatientListId();
  }

  getPatientListId() {
    this._userService.getPatientListId(this.uID).subscribe(resp => {
      this.patientLists = resp;
    });
  }

  editPatientInfo(patientList: any) {
    let patientId = patientList.Id;
    console.log(patientList);
    this.router.navigate(['/user/patient-info', patientId]);
  }
}
