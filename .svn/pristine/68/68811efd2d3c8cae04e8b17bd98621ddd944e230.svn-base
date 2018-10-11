import { Component, OnInit } from '@angular/core';
import { DicomService } from '../dicom.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Message } from 'primeng/primeng';
declare var $;

@Component({
  selector: 'app-shared-dicom',
  templateUrl: './shared-dicom.component.html',
  styleUrls: ['./shared-dicom.component.css']
})
export class SharedDicomComponent implements OnInit {
  dicomList: Array<any> = [];
  uID = Cookie.get('userID');
  id = Cookie.get('Id');
  private userList: any;
  private StudyPk:any;
  private checkboxInvitee: Array<any> = [];
  msgs: Message[] = [];
    constructor(private dicom: DicomService) { }

  ngOnInit() {
    this.getContacts();
    this.getSharedDicom();
  }
  getStudyId(sPk, invitees) {
    this.StudyPk = sPk;
    this.getContacts(invitees);
   
  }
  getSharedDicom() {
    var userID = parseInt(this.id);
    this.dicom.userSharedDicomList(userID)
      .subscribe((res) => {
        console.log(res);
        this.dicomList = res.Body.Data.dicomList;
        // let list = res.body.data.dicomList;
        // let sharedList=list.map(s =>this.userList.find(b => b.Id == s.InviteeId)).filter(l=>!!l)
      //  console.log("rse",sharedList)
      
    
  })

}

showSuccess(msg) {
  this.msgs = [];
  this.msgs.push({ severity: 'success', summary: 'Success', detail: msg });
}

deleteDicom(del) {
  console.log(del)
  this.dicom.delDicom(del)
    .subscribe((res) => {
      this.showSuccess(res.Header.message);
      this.getSharedDicom();
      console.log(res);
    })
}

unshareDicom(StudyPk,shareId){
  let data={userId:this.id,studyPk:this.StudyPk,invitees:this.checkboxInvitee.toString()}
  this.dicom.userUnShareDicom(data)
  .subscribe((res)=>{
    console.log(res);
    this.showSuccess(res.Header.message);
    $('#dicomUser').modal('hide');
    this.getSharedDicom();
  })
}

unShareCheckboxInvitee(evt, id) {
  if (!evt) {
    this.checkboxInvitee.push(id);
    console.log(this.checkboxInvitee);
  }  else {
    this.checkboxInvitee.splice(this.checkboxInvitee.indexOf(id), 1);
    console.log(this.checkboxInvitee);
  }
}

shareDicom(){
  let data={userId:this.id,studyPk:this.StudyPk,invitees:this.checkboxInvitee.toString()}
  this.dicom.shareDicom(data)
  .subscribe((res)=>{
     console.log(res);
     $('#dicomUser').modal('hide');
     this.showSuccess(res.Header.message);
    
  })
}

selectCheckboxInvitee(evt, id) {
  if (evt) {
    this.checkboxInvitee.push(id);
    console.log(this.checkboxInvitee);
  } else {
    this.checkboxInvitee.splice(this.checkboxInvitee.indexOf(id), 1);
    console.log(this.checkboxInvitee);
  }
}

getUserList(ids,StudyPk){
 
  this.dicom.getUserList(ids)
  .subscribe((res)=>{
    this.userList=res.body.data;
    this.StudyPk=StudyPk
    console.log(res);
  })
}

getContacts(invitees?) {
  this.dicom.getMyContacts(this.uID,0,1,10,this.id)
    .subscribe((res) => {
     
      // this.sharedDicom();
      this.userList = res.body.data.Item;
      if(invitees){
        let inviteeIds=invitees.split(",")
         
        this.userList.forEach(r=>{
          inviteeIds.forEach(i => {
           if(i==r.Id ){
            r.isChecked=true;
            r.isDisabled=true;
          }
        })
      })
  }
      
     
    })
}
}
