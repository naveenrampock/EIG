import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Message } from 'primeng/primeng';
import { Router } from '@angular/router';
import { EmrService } from '../../emr.service';

@Component({
  selector: 'app-ccrview-details',
  templateUrl: './ccrview-details.component.html',
  styleUrls: ['./ccrview-details.component.css']
})
export class CcrviewDetailsComponent implements OnInit {

  @Input() viewDetails: any;
  @Output() goViewListingPage: EventEmitter<any> = new EventEmitter();
  public patients: any;
  public Encounters: any;
  public Procedure: any;
  public Results: any;
  public VitalSigns: any;
  public MedicationEquipment: any;
  public Care: any;
  public Immunization: any;
  public Medication:any;
  public Allergy:any;
  public emrExportToCCRList: any;
  public Device: any;
  private userId = Cookie.get('Id');
  constructor(private emrservice: EmrService) { }


  ngOnInit() {
    this.getEmrCcrExportList();
    this.patients = [{"name":"Henry Levin , the 7th","Birthdate":"September 24, 1932","Guardian":"Kenneth Ross 17 Daws Road Blue Bell MA 02368 tel:(888)555-1212","MRN":"996-756-495","Sex":"Male","Race":"","Ethnicity":"","Language":"","NextofKin":"Henrietta Levin tel:(999)555-1212","MaritalStatus":""}]
    this.Care = [{"name":"Kenneth Ross","Contact":"17 Daws Rd. Blue Bell MA 02368 tel:(888)555-1212","Relation":"Guarantor"},
    {"name":"Henrietta Levin","Contact":"tel:(999)555-1212","Relation":"Next of Kin"}
  ];
    this.MedicationEquipment = [{ "supply": "Automatic implantable cardioverter/defibrillator", "date": "Nov 1999" },
    { "supply": "Total hip replacement prosthesis", "date": "1998" },
    { "supply": "Wheelchair", "date": "1999" }
    ];
    this.VitalSigns = [{ "date": "Height", "nov": "177 cm","apr":"177 cm" },
    { "date": "Weight", "nov": "86 cm","apr":"88 cm" },
    { "date": "Blood Pressure", "nov": "132/86 mmHg","apr":"145/88 mmHg" },
    ];
    this.Results = [{ "empty": "Hematology", "mar": "","apr":"" },
    { "empty": "HGB (M 13-18 g/dl; F 12-16 g/dl)", "mar": "13.2","apr":"" },
    { "empty": "WBC (4.3-10.8 10+3/ul)", "mar": "6.7","apr":"" },
    { "empty": "PLT (135-145 meq/l)", "mar": "123","apr":"" },
    { "empty": "Chemistry", "mar": "","apr":"" },
    { "empty": "NA (135-145meq/l)", "mar": "","apr":"140" },
    { "empty": "K (3.5-5.0 meq/l)", "mar": "","apr":"4.0" },
    { "empty": "CL (98-106 meq/l)", "mar": "","apr":"130" },
    ];
  }
  
  backToListing() {
    console.log('back off');
    this.goViewListingPage.emit('');
  }
  
  getEmrCcrExportList() {
    let params = { 'Id': this.userId }
    this.emrservice.getExportCcdDetails(params)
      .subscribe(exportCcdLists => {
        this.emrExportToCCRList = exportCcdLists.Body.Data;
        console.log(this.emrExportToCCRList);
        this.Medication = this.emrExportToCCRList.Medication;
        this.Immunization = this.emrExportToCCRList.Immunization;
        this.Device = this.emrExportToCCRList.Device;
        this.Allergy = this.emrExportToCCRList.Allergy;
        this.Encounters = this.emrExportToCCRList.Encounter;
        this.Procedure = this.emrExportToCCRList.Procedure;
        this.Procedure.map(dv => {
          dv.Performed = JSON.parse(dv.Performed);
        })
        this.Encounters.map(dv => {
          dv.Location = JSON.parse(dv.Location);
        })
      })
  }
}
