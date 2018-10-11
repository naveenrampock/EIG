import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message.component';
import { MessageRoutingModule } from './message-routing.module';
import { FormsModule } from '@angular/forms';
// import { HttpService } from './http.service';
// import { ChatService } from './chat.service';
// import { SocketService } from './socket.service';
import { ChatService } from '../message/chat.service';
import { HttpService } from '../message/http.service';
import { SocketService } from '../message/socket.service';
import {DialogModule} from 'primeng/dialog';
import {DataListModule} from 'primeng/datalist';
import {DataScrollerModule} from 'primeng/datascroller';
import { SearchPipe } from './search.pipe';
import { ChatOrderPipe } from './chatOrder.pipe';


@NgModule({
  imports: [
    CommonModule,
    MessageRoutingModule,FormsModule,DialogModule,DataListModule,DataScrollerModule
  ],
  declarations: [MessageComponent, SearchPipe, ChatOrderPipe],
  providers:[HttpService,ChatService,SocketService]
})
export class MessageModule { }
