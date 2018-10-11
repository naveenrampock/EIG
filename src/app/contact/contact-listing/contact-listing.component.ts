import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service'
import { Http } from '@angular/http/src/http';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { last } from 'rxjs/operator/last';
import { Observable } from 'rxjs/observable';
import { Contacts } from '../contact-data-model';
import { Cookie } from 'ng2-cookies/src/services/cookie';
import { CONFIG } from '../../core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { slice, concat } from 'lodash';
import { Response } from '@angular/http/src/static_response';
import { UserService } from '../../user/user.service';


@Component({
  selector: 'app-contact-listing',
  templateUrl: './contact-listing.component.html',
  styleUrls: ['./contact-listing.component.css']
})
export class ContactListingComponent implements OnInit {

  public allContactList$ = new BehaviorSubject<any>([]);
  public popUpContactList$ = new BehaviorSubject<any>([]);
  public contactSearchList: any;
  public contactAllSearchList: any;
  private _loggedInUserId: any;
  private _contactType: Array<any> = [];
  private _selectedContactType: any = 2;
  public contactContent: any = 1;
  public allContactCount: any;
  public lockRequest: any;
  public contactLength: any;
  private currentPageNo: number = 1;
  private popupPageNumber: number = 1;
  private totalPageNo: number;
  private finished: boolean = false;
  private contactIds: any;
  uID = Cookie.get('userID');
  id = Cookie.get('Id');
  display: boolean = false;
  sharedId: any;
  msgs: any;
  configUrl = CONFIG.url;
  defaultImg = '../../../assets/images/avatars/User.png';
  check: any;
  country: any;
  filteredCountriesSingle: any[];
  countries: any[];
  hide: any = 1;
  private userProfile: {};
  public selectedId:any;

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];

  constructor(public contactService: ContactService, public userService: UserService) { }

  ngOnInit() {
    this.lockRequest = 0;
    this._loggedInUserId = this.uID;
    this.getContactType();
    this.getContactList(this.currentPageNo);

  }
  showDialog(allContact) {
    this.sharedId = allContact.Id;
    console.log(this.sharedId);
    this.display = true;
  }


  private getContactList(pageno) {
    let self = this
    let contactIds = null;
    //   if(self.finished)return;

    this.contactService.getContacts(self._loggedInUserId, self._selectedContactType, pageno, contactIds, this.id)
      .do(allcontactlist => {
        self.currentPageNo = parseInt(allcontactlist['Page']);
        self.totalPageNo = Math.ceil(allcontactlist['TotalPageCount']);
        const newContactList = slice(allcontactlist['Item']);
        const currentList = self.allContactList$.getValue();

        if (self.currentPageNo == self.totalPageNo)
          self.finished = true
        self.allContactList$.next(concat(currentList, newContactList))
      })
      .take(1)
      .subscribe()
  }

  private getContactType() {
    this.contactService.getContactType()
      .subscribe(contactType => {
        this._contactType = contactType.Body.Data
      })
  }


  public selectContact(contact) {
    let i = parseInt(contact)
    if (contact == 0) {
      this.contactContent = 0
      this._selectedContactType = this._contactType[i].StatusId
    }
    else if (contact == 1) {
      this.contactContent = 1;
      this._selectedContactType = this._contactType[i].StatusId
    }
    else if (contact == 3) {
      this.contactContent = 3;
      this._selectedContactType = this._contactType[i].StatusId
    }
    else {
      this.contactContent = 2
      this._selectedContactType = this._contactType[i].StatusId
    }
    this.resetInfiniteScroll();
  }

  public acceptRequest(acceptContact, acceptContactIndex) {
    let self = this;
    let data = { userId: this._loggedInUserId, contactId: acceptContact.Id }
    this.contactService.acceptRequest(data)
      .subscribe((response) => {
        this.removeObjectFromArray(acceptContact, self.allContactList$);
        this.msgs = [{ severity: 'success', summary: 'Request accepted successfully', detail: response.Message }];
      })
  }

  public rejectRequest(rejectContact, rejectContactIndex) {
    let self = this;
    let data = { userId: this._loggedInUserId, contactId: rejectContact.Id }
    this.contactService.rejectRequest(data).subscribe((response) => {
      this.removeObjectFromArray(rejectContact, self.allContactList$);
      this.msgs = [{ severity: 'success', summary: 'Request rejected successfully', detail: response.Message }];
    })
  }




  removeObjectFromArray(data: any, dataList: BehaviorSubject<any>) {
    let roomArr: any[] = dataList.getValue()
    // this.allContactList$.getValue();
    roomArr.forEach((item, index) => {
      if (item === data) { roomArr.splice(index, 1); }
    });
    dataList.next(roomArr);
    //this.allContactList$.next(roomArr);
  }

  public delete(deleteContact, deleteContactIndex) {
    let self = this;
    let data = { userId: this._loggedInUserId, contactId: deleteContact.Id }
    this.contactService.disconnect(data)
      .subscribe((response) => {
        this.removeObjectFromArray(deleteContact, self.allContactList$);
        this.msgs = [{ severity: 'success', summary: 'Contact deleted successfull', detail: response.Message }];
        if (response.Header.Success) {
          this.delteInvited(deleteContact);
        }
      }
      )
  }

  private delteInvited(cnt) {
    let data = { userId: this.id, inviteeId: cnt.Id }
    this.contactService.removeCaseIvitedData(data)
      .subscribe((response) => {
        console.log('deleted invited details')
      })
  }

  public inviteRequest(inviteContact, inviteContactIndex) {
    let self = this;
    this.lockRequest = 1;
    let data = { userId: this._loggedInUserId, contactId: inviteContact.Id }
    this.contactService.inviteRequest(data)
      .subscribe((response) => {
        inviteContact.ContactStatus = 1;
        this.msgs = [{ severity: 'success', summary: 'Invitation send successfully', detail: response.Message }];

      })
    // this.allContact();
  }


  //Triggers when the scroll reaches bottom of the page
  scrollable(e) {
    this.getContactList(this.currentPageNo + 1);
  }

  //reset subject
  resetInfiniteScroll() {
    this.currentPageNo = 1;
    this.finished = false;
    this.allContactList$.next([]);
    this.getContactList(this.currentPageNo);
  }

  allContact() {
    this.contactAllSearchList = null;
    this.hide = 0;
    this.check = true
    this.currentPageNo = 1;
    this.getAllList(this.currentPageNo);
    this.test(this.check);
  }

  private getAllList(pageno) {
    let self = this
    let contactIds = null;
    //   if(self.finished)return;

    this.contactService.getContacts(self._loggedInUserId, 0, pageno, contactIds, this.id)
      .do(popUpContactList => {
        console.log(popUpContactList);
        self.currentPageNo = parseInt(popUpContactList['Page']);
        self.totalPageNo = Math.ceil(popUpContactList['TotalPageCount']);
        const newContactList = slice(popUpContactList['Item']);
        const currentList = self.popUpContactList$.getValue();

        if (self.currentPageNo == self.totalPageNo)
          self.finished = true
        self.popUpContactList$.next(concat(currentList, newContactList))
      })
      .take(1)
      .subscribe()
  }






  test(data) {
    let myImg = document.querySelector('#tester_li');

    let observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (data == true) {
          if (entry.intersectionRatio > 0) {
            console.log('in the view');
            this.popupPageNumber = this.popupPageNumber + 1;
            this.getAllList(this.popupPageNumber)
          }
        }
        else {
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(myImg);

  }



  filterCountrySingle(event) {
    let data = this.country
    let query = this.country;
    let userIdentifier = this.uID
    if (this.country == "") {
      this.filteredCountriesSingle = null;
    }
    else {
      this.contactService.getCountries(query, userIdentifier).subscribe(countries => {
        this.countries = countries.Body
        // this.countries = countries
        this.filteredCountriesSingle = this.filterCountry(query, countries);
        console.log(this.filteredCountriesSingle)
      });
    }
  }

  filterCountry(query, countries: any): any[] {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    var filtered: any[] = [];
    for (let i = 0; i < countries.Body.Data.length; i++) {
      let country = countries.Body.Data[i];

      if (country.FirstName.toLowerCase().indexOf(query.toLowerCase()) == 0 || country.LastName.toLowerCase().indexOf(query.toLowerCase()) == 0 || country.AccountID.toLowerCase().indexOf(query.toLowerCase()) == 0 || country.PrimaryEmailId.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    return filtered;
  }

  makeNull() {
    this.filteredCountriesSingle = null
    this.country = ""
  }

  getUserProfile(userIdentifier: any) {
    
    this.userService.getUserProfileDetailsById(userIdentifier).subscribe((resp) => {
      console.log(resp);
      this.userProfile = resp.Body.Data;
      console.log(this.userProfile);
    });
    console.log(this.userProfile);
  }

  getpatientBasciInfo(Id){
    this.selectedId = null;
    let moduleName = 'patientbasicInfo'
    this.selectedId = Id
    let data = {id:Id,moduleName:moduleName}
    this.contactService.getUserSharedDetailsById(data).subscribe((resp) => {
      console.log(resp);
    
    })

  }

  getGuaranterInfo(){
    let moduleName = 'guranterInformation'
    let data = {id:this.selectedId,moduleName:moduleName}
    this.contactService.getUserSharedDetailsById(data).subscribe((resp) => {
      console.log(resp);
    
    })
  }

  getInsuranceInfo(){
    let moduleName = 'insuranceinformation'
    let data = {id:this.selectedId,moduleName:moduleName}
    this.contactService.getUserSharedDetailsById(data).subscribe((resp) => {
      console.log(resp);
    
    })
  }

  getEmergencyContactInfo(){
    let moduleName = 'emergencyContact'
    let data = {id:this.selectedId,moduleName:moduleName}
    this.contactService.getUserSharedDetailsById(data).subscribe((resp) => {
      console.log(resp);
    
    })
  }

}
