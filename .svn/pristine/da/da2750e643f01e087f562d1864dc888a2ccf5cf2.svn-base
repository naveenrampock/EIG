import { Component, OnInit } from '@angular/core';
import { ActivationService } from './activation.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.css']
})
export class ActivationComponent implements OnInit {
  isActive:boolean = false;
  message:any ="";
  constructor(private _activationService: ActivationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params);
      let data = {
        activationCode: params.activationCode,
        userId: params.userId
      };
      this._activationService.activateAccount(data).subscribe(res => {
        if(res.Header.Success === true){
          this.message = res.Body.Data;
          this.isActive = true;
        }
        else{
          this.message = res.Header.Message;
          this.isActive = false;
        }
      })
    })
  }

}
