import { Component, OnInit, ViewChild } from '@angular/core';
import { EmrService } from '../emr.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { EmrNavigationComponent } from '../emr-navigation/emr-navigation.component';

@Component({
  selector: 'app-medication-statement',
  templateUrl: './medication-statement.component.html',
  styleUrls: ['./medication-statement.component.css']
})
export class MedicationStatementComponent implements OnInit {
  @ViewChild (EmrNavigationComponent) emrnavigation : EmrNavigationComponent;
  public isShowMedicationDetails: boolean = false;
  public tableHeaders : string[];
  public listEmrMedicationStatement: Array<any> = [];
  public selectedMedication: any;
  private userId = Cookie.get('Id');
  public msgs: any[];
  public totalcount: any;
  public press: boolean = false;
  public alpha: string ="";
  private pageNo: number = 0;

  constructor(private emrService: EmrService) { }

  ngOnInit() {
    this.tableHeaders = ['Source Type', 'Source ID', 'Creater', 'Based On', 'Part Of', 'Context', 'Status', 'Action']
  //  this.listEmrMedicationStatement = [{"SourceType":"2","SourceID":"0","CreatedBy":"915","BasedOn":"based","PartOf":"Part Of","Context":"Context","Status":"Status"},{"SourceType":"1","SourceID":"0","CreatedBy":"15","BasedOn":"based1","PartOf":"Part Of1","Context":"Context1","Status":"2"}]
  }
  
  public showMedicationDetails() {
    this.selectedMedication = null;
    this.isShowMedicationDetails = true;
  }

  public showMedicationListingPage(evt) {
    this.isShowMedicationDetails = false;
  }
  
  public editMedication(data, mode) {
    this.selectedMedication =  { data, mode };
    this.isShowMedicationDetails = true;
  }

  public deleteMedication(delItem) {
    console.log(delItem)
    this.emrService.deleteEmrMedicationStatement(delItem.Id,this.userId)
      .subscribe(res => {
        if (res.Header.Success) {
          this.showSuccess(res.Header.Message);
          this.listEmrMedicationStatement.splice(this.listEmrMedicationStatement.indexOf(delItem), 1);
          this.getEmrMedicationList();
        }
      })
 }

  public loadLazy(LazyLoadEvent) {
    const count = (LazyLoadEvent.first + 10) / 10;
    this.pageNo = Math.ceil(count);
    this.getEmrMedicationList();
 }

  private showSuccess(msg) {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success', detail: msg });
  }

  private getEmrMedicationList() {
    let params = { 'Id': this.userId, PageNo:this.pageNo, PageSize: 10 }
    this.emrService.getEmrMedicationStatement(params)
      .subscribe(medicationLists => {
        this.listEmrMedicationStatement= medicationLists.Body.Data.Items;
        this.totalcount = medicationLists.Body.Data.TotalItemCount;
        console.log(this.listEmrMedicationStatement);
      })
    this.emrnavigation.getTotalList();
  }

  searchCheck(evt) {
    console.log(evt)
    evt.length > 0 ? this.press = true :
      setTimeout(() => {
        this.press = false
      }, 400);
  }
}


