import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { ISpinnerState, SpinnerService } from './spinner.service';

const ACTIVE_CLASS = 'is-active';

@Component({
  selector: 'spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})

export class SpinnerComponent implements OnDestroy, OnInit {
  visible = false;
  private _spinnerStateChanged: Subscription;
  constructor(private _spinnerService: SpinnerService) { }
  ngOnInit() {
    this._spinnerStateChanged = this._spinnerService.spinnerState
      .subscribe((state: ISpinnerState) => this.visible = state.show);
  }
  ngOnDestroy() {
    this._spinnerStateChanged.unsubscribe();
  }
}