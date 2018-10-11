import { Component, OnInit, ViewChild } from '@angular/core';
import { EmrService } from '../emr.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { FormGroup } from '@angular/forms';
import { EmrNavigationComponent } from '../emr-navigation/emr-navigation.component';


@Component({
  selector: 'app-allergy',
  templateUrl: './allergy.component.html',
  styleUrls: ['./allergy.component.css']
})
export class AllergyComponent implements OnInit {

  public isShowAllergyDetails: boolean = false;
  public tableHeaders: Array<any> = [];
  public listEmrAllergy: Array<any> = [];
  public selectedAllergy: any;
  private userId = Cookie.get('Id');
  public msgs: any[];
  public totalcount: any;
  public press: boolean = false;
  public alpha: string = "";
  private pageNo: number = 0;
  @ViewChild(EmrNavigationComponent) emrNavigation: EmrNavigationComponent;

  constructor(private emrService: EmrService) {

  }

  ngOnInit() {
    this.tableHeaders = ['ClinicalStatus', 'VerificationStatus', 'Type', 'Category', 'Criticality', 'Code', 'Recorder'];
  }

  public showAllergyDetails() {
    this.selectedAllergy = null;
    this.isShowAllergyDetails = true;
  }

  public showAllergyListingPage(evt) {
    this.isShowAllergyDetails = false;
  }

  public editAllergy(data, mode) {
    this.selectedAllergy = { data, mode };
    this.isShowAllergyDetails = true;
  }

  public deleteAllergy(delItem) {
    this.emrService.deleteEmrAllergy(delItem.Id)
      .subscribe(res => {
        if (res.Header.Success) {
          this.showSuccess(res.Header.Message);
          this.listEmrAllergy.splice(this.listEmrAllergy.indexOf(delItem), 1);
          this.getEmrAllergyList();
        }
      })
  }

  public searchCheck(evt) {
    evt.length > 0 ? this.press = true :
      setTimeout(() => {
        this.press = false
      }, 400);
  }

  public loadLazy(LazyLoadEvent) {
    const count = (LazyLoadEvent.first + 10) / 10;
    this.pageNo = Math.ceil(count);
    if (LazyLoadEvent.sortField) {
      this.sort(LazyLoadEvent.sortField, LazyLoadEvent.sortOrder);
    }
    else {
      this.getEmrAllergyList();
    }
  }

  private showSuccess(msg) {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success', detail: msg });
  }

  private sort(fieldName: string, order: number) {
    this.listEmrAllergy.sort((row1, row2) => {
      const val1 = row1[fieldName];
      const val2 = row2[fieldName];
      if (val1 === val2) {
        return 0;
      }
      let result = -1;
      if (val1 > val2) {
        result = 1;
      }
      if (order < 0) {
        result = -result;
      }
      return result;
    });
  }

  private getEmrAllergyList() {
    let params = { 'Id': this.userId, PageNo: this.pageNo, PageSize: 10 }
    this.emrService.getEmrAllergy(params)
      .subscribe(allergyLists => {
        this.listEmrAllergy = allergyLists.Body.Data.Items;
        this.totalcount = allergyLists.Body.Data.TotalItemCount;
      })
    this.emrNavigation.getTotalList();
  }
}
