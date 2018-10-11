import { Component, OnInit } from '@angular/core';
import { ModalService } from './modal.service';

import { Router, ActivatedRoute } from '@angular/router';
import { CONFIG, PageLabel } from '../../core/';
import { EmitService } from '../../core/emit/emit.service';
import { Observable, Subscription } from 'rxjs/Rx';

const KEY_ESC = 27;

@Component({
  selector: 'modal-confirm',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  public formFields: any;
  private PageLabel: any;
  private sub: Subscription;
  private Serach_Text: string;
  private pageLabel: any;
  public _defaults = {
    title: 'confirmationMessage',
    message: 'Do you want to cancel your changes?',
    cancelText: 'Cancel',
    okText: 'OK'
  };
  title: string;
  message: string;
  okText: string;
  cancelText: string;
  negativeOnClick: (e: any) => void;
  positiveOnClick: (e: any) => void;
  isActive:boolean = false;

  private _modalElement: any;
  private _cancelButton: any;
  private _okButton: any;

  constructor(private modalService: ModalService,
              private router: Router,
              private route: ActivatedRoute,
              private emitService: EmitService) {
    modalService.activate = this.activate.bind(this);
  }

  activate(message = this._defaults.message, cancel = this._defaults.cancelText, title = this._defaults.title,) {
    this.title = title;
    this.message = message;
    this.okText = this._defaults.okText;
    if(cancel){
    this.cancelText = this._defaults.cancelText;
  }
  else{
    this.cancelText = null;
  }
    this.isActive = true;

    let promise = new Promise<boolean>((resolve, reject) => {
      this.negativeOnClick = (e: any) => resolve(false);
      this.positiveOnClick = (e: any) => resolve(true);
      this._show();
    });

    return promise;
  }

  ngOnInit() {

         this._modalElement = document.getElementById('confirmationModal');
    this._cancelButton = document.getElementById('cancelButton');
    this._okButton = document.getElementById('okButton');
  }

  private _show() {
    document.onkeyup = null;

    if (!this._modalElement || !this._cancelButton || !this._okButton) return;

    this._modalElement.style.opacity = 0;
    this._modalElement.style.zIndex = 9999;

    this._cancelButton.onclick = ((e: any) => {
      e.preventDefault();
      if (!this.negativeOnClick(e)) this._hideDialog()
      this.isActive = false;
    });

    this._okButton.onclick = ((e: any) => {
      e.preventDefault();
      if (!this.positiveOnClick(e)) this._hideDialog()
      this.isActive = false;
    });

    this._modalElement.onclick = () => {
      this._hideDialog();
      return this.negativeOnClick(null);
    };

    document.onkeyup = (e: any) => {
      if (e.which == KEY_ESC) {
        this._hideDialog();
        return this.negativeOnClick(null);
      }
    };

    this._modalElement.style.opacity = 1;
  }

  private _hideDialog() {
    document.onkeyup = null;
    this._modalElement.style.opacity = 0;
    window.setTimeout(() => this._modalElement.style.zIndex = 0, 400);
    this.isActive = false;
  }
}
