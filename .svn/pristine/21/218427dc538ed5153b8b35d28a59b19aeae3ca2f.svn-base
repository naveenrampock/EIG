import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sharing-records',
  templateUrl: './sharing-records.component.html',
  styleUrls: ['./sharing-records.component.css']
})
export class SharingRecordsComponent implements OnInit {

  carePlan: Array<any> = [];
  Condition: Array<any> = [];
  Allergy: Array<any> = [];
  Device: Array<any> = [];
  Immunization: Array<any>=[];
  pageNo: number;
  isShowSharingRecords: boolean = false;
  listEmrShare: Array<any> = [];
  constructor() { }

  ngOnInit() {
    this.listEmrShare = [{ "Name": "Martina", "Details": "Immunization", "Invitees": "William/Shane" },
    { "Name": "Frank", "Details": "Condition", "Invitees": "William/Shane" },
    { "Name": "Hanry Levin", "Details": "Allergy", "Invitees": "William/Shane" }
    ];
    this.Allergy = [{ "Criticality": "CRITL", "Patient": "Jason Argonaut", "Substance": "PENICILLIN G", "Reaction": "Confirmed", "Onset": "2012-11-07T00:00:00Z", "Recorder": "MOORE, SEAN" },
    { "Criticality": "CRITL", "Patient": "Jason Argonaut", "Substance": "PENICILLIN G", "Reaction": "Confirmed", "Onset": "2012-11-07T00:00:00Z", "Recorder": "MOORE, SEAN" },
    { "Criticality": "CRITL", "Patient": "Jason Argonaut", "Substance": "PENICILLIN G", "Reaction": "Confirmed", "Onset": "2012-11-07T00:00:00Z", "Recorder": "MOORE, SEAN" },
    { "Criticality": "CRITL", "Patient": "Jason Argonaut", "Substance": "PENICILLIN G", "Reaction": "Confirmed", "Onset": "2012-11-07T00:00:00Z", "Recorder": "MOORE, SEAN" }]

    this.carePlan = [{ "Addresses": "CRITL", "Status": "Active", "Category": "other", "Prohibited": "FALSE", "Goal": "Hemoglobin A1c < 7.0", "code": "CBC AND DIFFERENTIAL" },
    { "Addresses": "CRITL", "Status": "Active", "Category": "other", "Prohibited": "FALSE", "Goal": "Hemoglobin A1c < 7.0", "code": "CBC AND DIFFERENTIAL" },
    { "Addresses": "CRITL", "Status": "Active", "Category": "other", "Prohibited": "FALSE", "Goal": "Hemoglobin A1c < 7.0", "code": "CBC AND DIFFERENTIAL" }]

    this.Condition = [{ "ClinicalStatus": "Active", "VerificationStatus": "Confirmed", "Asserter": "MOORE, SEAN", "Code": "", "category": "", "Severity": "Medium" },
    { "ClinicalStatus": "Active", "VerificationStatus": "Confirmed", "Asserter": "MOORE, SEAN", "Code": "", "category": "", "Severity": "Medium" },
    { "ClinicalStatus": "Active", "VerificationStatus": "Confirmed", "Asserter": "MOORE, SEAN", "Code": "", "category": "", "Severity": "Medium" }]

    this.Device = [{ "Udi": "(17)170324(21)455884315749", "Patient": "Jason Argonaut", "Status ": "Available", "Model": "G754-B", "ExpirationDate": "2017-03-24T00:00:00Z" },
    { "Udi": "(17)170324(21)455884315749", "Patient": "Jason Argonaut", "Status ": "Available", "Model": "G754-B", "ExpirationDate": "2017-03-24T00:00:00Z" },
    { "Udi": "(17)170324(21)455884315749", "Patient": "Jason Argonaut", "Status ": "Available", "Model": "G754-B", "ExpirationDate": "2017-03-24T00:00:00Z" }]
    
    this.Immunization = [{ "Patient": "Jason Argonaut", "Status": "Completed", "WasNotGiven": "False", "VaccineCode": "DTP-Hib-Hep B","LotNumber":"12321","Date":"2016-01-09T00:00:00Z","Site":"Left arm" },
    { "Patient": "Jason Argonaut", "Status": "Completed", "WasNotGiven": "False", "VaccineCode": "DTP-Hib-Hep B","LotNumber":"12321","Date":"2016-01-09T00:00:00Z","Site":"Left arm" },
    { "Patient": "Jason Argonaut", "Status": "Completed", "WasNotGiven": "False", "VaccineCode": "DTP-Hib-Hep B","LotNumber":"12321","Date":"2016-01-09T00:00:00Z","Site":"Left arm" }]
  }


  shareRecord() {
    this.isShowSharingRecords = true;
  }
  
  cancelShare() {
    this.isShowSharingRecords = false;
  }
}
