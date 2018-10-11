import { Component, OnInit  } from '@angular/core';
import { AdminService } from '../admin.service';
import {List,copyList} from './logs-model-class'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { last } from 'rxjs/operator/last';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
 // styleUrls: ['./log.component.css'],
 // providers: [LogService]
})
export class LogComponent {
  title:any;
  dataList:any;
  List:List[];
  // public mediaHeaderFormBuilder: FormGroup;
  id:any=0;
  private dataCOPY: copyList = new copyList();

  hero:any;
  a:any
  b:any

  oldNew:any

  constructor(private adminService: AdminService,public formbuilder: FormBuilder) { }

  ngOnInit(){
    
    this.getService();
    this.form();
  }

  private form(){
    
     let NewName = false;
    if(this.id > 0){

    }
   
  }

  private getService(){
    this.adminService.getList()
    .subscribe(List => {
      this.List = List;
      console.log(this.List)
    })
  }

  save(event){
    let a = event
    this.adminService.addTask(a)
    .subscribe(task=>{
      this.List.push(task)
      
    })
  }

  update(event){
    let b = event
    this.adminService.update(b)
    .subscribe(task=>{
      this.List.push(task)
    })
  }

  

  select(e,i){
    this.a = e.OldValue
    // this.b = e.NewValue
    this.hero = e
    console.log("HERO")
    console.log(this.hero)
  }

  saveData(e){
     this.dataCOPY.ActionType = this.hero.ActionType
    this.dataCOPY.CreatedBy = this.hero.CreatedBy
    this.dataCOPY.CreatedDate = "2018-01-25 06:02:23"
    this.dataCOPY.ModuleId = this.hero.ModuleId
    this.dataCOPY.OldValue = this.hero.OldValue
    this.dataCOPY.NewValue = e
    let data = this.dataCOPY
    data.NewValue = e
    this.adminService.update(data)
    .subscribe(task=>{
      this.List.push(task)
    })
    console.log(data)
    window.location.reload();
    
  }
}
