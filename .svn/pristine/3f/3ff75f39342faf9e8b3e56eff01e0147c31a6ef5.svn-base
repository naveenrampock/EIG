import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CaseManagementService } from '../../case-management.service';
declare var $;

@Component({
  selector: 'app-edit-case',
  templateUrl: './edit-case.component.html',
  styleUrls: ['./edit-case.component.css']
})
export class EditCaseComponent implements OnInit {
  editedValue: any;
  msgs: any[];
  @Input() editedCase: any;
  @Output() closeEditWndw: EventEmitter<any> = new EventEmitter();
  constructor(private caseManagementService: CaseManagementService) { }

  ngOnInit() {
    $('#EditCase').modal('show');
    console.log(this.editedCase);
  }
  //edit a Case open pop up and display the values

  showCasebutton(editedCase) {
    editedCase.isEdited = true;
    this.editedValue = editedCase;
  }
  cancelEdit(editedCase) {
    $('#EditCase').modal('hide');
    editedCase.isEdited = false;
    this.closeEditWndw.emit(editedCase);
    if (!editedCase.isEdited) {
      this.editedCase = this.editedValue;
    }
  }

  savEditedCase(editedCase) {
    if (editedCase.CaseName.trim() == '' || editedCase.CaseDescription.trim() == '') {
      editedCase.errorMsg = 'Case name or Case Description cannot be empty';
      setTimeout(() => {
        editedCase.errorMsg = ''
      }, 5000);
    }
    else {
      let caseData = { caseId: editedCase.Id, caseName: editedCase.CaseName, caseDescription: editedCase.CaseDescription, status: editedCase.CaseStatus, uId: editedCase.caseCreatedBy, inviteeId: null };
      this.caseManagementService.updateCase(caseData).subscribe(res => {
        if (res.Header.Success) {
          $('#EditCase').modal('hide');
          this.showSuccess(res.Body.Message);
        }
      },
        error => console.error(error),
        () => {
          editedCase.isEdited = false;
          setTimeout(() => {
            this.closeEditWndw.emit(editedCase);
          }, 500);

        }
      )
    }
  }

  showSuccess(msg) {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success', detail: msg });
  }
}
