import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import * as io from 'socket.io-client';
import { CONFIG } from '../core/config/config';
 let  base_URL = CONFIG.chat.base;

@Injectable()
export class SocketService {
  private BASE_URL = base_URL;

  private socket;
  constructor() { }
  /* 
    * Method to connect the users to socket
    */
  connectSocket(userId: string) {
    this.socket = io(this.BASE_URL, { query: `userId=${userId}` });
  }

  /* 
 * Method to emit the add-messages event.
 */
  sendMessage(message: any): void {
    this.socket.emit('add-message', message);
  }

  /* 
  * Method to emit the logout event.
  */
  logout(userId): any {

    this.socket.emit('logout', userId);

    let observable = new Observable(observer => {
      this.socket.on('logout-response', (data) => {
        observer.next(data);
      });

      return () => {
        
        
        this.socket.disconnect(userId);
      };
    })
    return observable;
  }

  /* 
  * Method to receive add-message-response event.
  */
  receiveMessages(): any {
    let observable = new Observable(observer => {
      this.socket.on('add-message-response', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  /* 
  * Method to receive chat-list-response event.
  */
  getChatList(userId: string,pageNumber:any,maxItemPerPage): any {
    const _params =  { 
       userId:userId,
       pageNumber: pageNumber
       ,maxItemPerPage : maxItemPerPage
    }
    this.socket.emit('chat-list', _params);

    let observable = new Observable(observer => {
      this.socket.on('chat-list-response', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }
}
