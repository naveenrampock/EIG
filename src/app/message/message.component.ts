import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';



/* Importing services starts*/
import { HttpService } from './http.service';
import { ChatService } from './chat.service';
import { SocketService } from './socket.service';
import { Cookie } from 'ng2-cookies/src/services/cookie';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnDestroy {

	/*
	* UI related variables starts
	*/
  private overlayDisplay = false;
  private selectedUserId = null;
  private selectedSocketId = null;
  private selectedUserName = null;
  private isRead: any;
  display: boolean = false;
  private loginId = Cookie.get('userID')
	/* 
	* UI related variables ends
	*/

	/*
	* Chat and message related variables starts
	*/
  private username = null;
  private userId = null;
  private socketId = null;
  private chatListUsers = [];
  public message: any;
  private messages = [];
  private pageNumber: any = 1;
  private maxItemPerPage: any = 10;
  private senderId: any;
  private receiverId: any;
  private Id
  private deleteAll: Array<any> = []
  private receiver;
	/*
	* Chat and message related variables ends
	*/
  /* Email Notification related variables */

  public notificationList: Array<any> = [];
  msgs: any;
  hideElement: boolean = true;

  sLetter: any;



  constructor(
    private chatService: ChatService,
    private socketService: SocketService,
    private route: ActivatedRoute,
    private router: Router,
    private service: HttpService
  ) { }

  hide() {
    this.hideElement = false;
  }
  show() {
    this.hideElement = true;
  }
  loadData(event) {
    //initialize
    this.service.getAllnotification(this.userId)
      .subscribe((res) => {

        this.notificationList = res.notification
      })



  }
  ngOnInit() {
		/*
		* getting userID from URL using 'route.snapshot'
		*/
    // this.userId = this.route.snapshot.params['id'];
    const event = undefined;
    this.userId = localStorage.getItem("userId_ls");
    console.log(this.userId);

    this.loadData(event);

    if (this.userId === '' || typeof this.userId == 'undefined') {
      this.router.navigate(['/']);
    } else {

			/*
			* function to check if user is logged in or not starts
			*/
      this.chatService.userSessionCheck(this.userId, (error, response) => {
        if (error) {
          this.router.navigate(['/']); /* Home page redirection */
        } else {

          this.username = response.username;
          this.overlayDisplay = true;

          /*
      * making socket connection by passing UserId.
      */

          this.socketService.connectSocket(this.userId);

					/*
					* calling method of service to get the chat list.
          */

          this.socketService.getChatList(this.userId, this.pageNumber, this.maxItemPerPage).subscribe(response => {

            this.socketId = response.Body.Data.userinfo.socketid;
            console.log("CHECKING CHAT LIST AND USER INFO")
            console.log(response.Body.Data.userinfo.socketid)
            if (response.Header.Success == true) {

              if (response.Body.Data.singleUser) {


                /* 
                * Removing duplicate user from chat list array.
                */
                if (this.chatListUsers.length > 0) {
                  this.chatListUsers = this.chatListUsers.filter(function (obj) {
                    return obj.UserIdentifier !== response.Body.Data.chatList.UserIdentifier;
                  });
                }

                /* 
                * Adding new online user into chat list array
                */
                this.chatListUsers.push(response.Body.Data.chatList);
                console.log("new chatuser", this.chatListUsers);
              }
              // else if (response.userDisconnected) {
              //   this.chatListUsers = this.chatListUsers.filter(function (obj) {
              //     return obj.socketId !== response.Body.Data.userinfo[0].socketid;
              //   });

              // }
              else {
                /* 
                * Updating entire chatlist if user logs in.
                */
                this.chatListUsers = response.Body.Data.chatList;
              }
            } else {
              alert(`Chat list failure.`);
            }
          });


					/* 
					* subscribing for messages statrts
					*/
          this.socketService.receiveMessages().subscribe(response => {
            if (this.selectedUserId && this.selectedUserId == response.fromUserId) {
              this.messages.push(response);
              setTimeout(() => {
                document.querySelector(`.message-thread`).scrollTop = document.querySelector(`.message-thread`).scrollHeight;
              }, 100);
            }
          });
          /* 
        * subscribing for messages statrts
        */

        }
      });
    }
  }




	/* 
	* Method to select the user from the Chat list starts
	*/
  selectedUser(user): void {
    console.log("from:", this.socketId, "To", user.socketid)
    console.log(this.socketId)
    this.receiver = user.UserIdentifier
    this.selectedUserId = user.UserIdentifier;
    this.selectedSocketId = user.socketid;
    this.selectedUserName = user.FirstName + ' ' + user.LastName;
    this.isRead = 1;

    this.show();
    /* 
		* calling method to get the messages
		*/
    // this.chatService.getMessages({ userId: this.userId, toUserId: user.UserIdentifier },
    //   (error, response) => {
    //     if (!response.error) {
    //      
    //       this.messages = response.messages;
    //     }
    //   });
    this.getMsgs(this.isRead);

  }

  /* 
     * calling method to get the messages
     */
  sortedItems: any
  getMsgs(isRead) {

    this.chatService.getMessages({ userId: this.userId, toUserId: this.selectedUserId, isRead: isRead, paramCreatedTime: null },
      (error, response) => {
        if (error != true) {


          //     this.sortedItems = response.Body.Data.messages.sort((a: any, b: any) =>
          //     new Date(a.CreatedDate).getTime() - new Date(b.CreatedDate).getTime()


          // );

          this.messages = response.Body.Data.messages;
        }
      });
  }
  ngOnDestroy() {
    this.socketService.logout({ userId: this.userId }).subscribe(response => {

      //  this.router.navigate(['/']); /* Home page redirection */
    });
  }

  alphaFilterSerach(alphabet) {
    this.sLetter = alphabet;
  }

  isUserSelected(userId: string): boolean {
    if (!this.selectedUserId) {
      return false;
    }
    return this.selectedUserId === userId ? true : false;
  }

  // del(msg, status) {
  //   let msgData = [];
  //   let Id = msg.Id.toString()
  //   msg.Id = Id
  //   this.isRead = 0
  //   let dt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  //   // let data= status=="all" ? msg : msgData.push(msg);
  //   if (status == "all") {
  //     msgData = msg;
  //   } else {
  //     msgData.push(msg);
  //   }
  //   this.chatService.deleteMsgs({ fromUserId: this.userId, toUserId: this.selectedUserId, msg: msgData },
  //     // this.chatService.deleteMsgs(msgData,
  //     (error, response) => {
  //       if (!response.error) {
  //         
  //         this.messages = response.Body.Data.messages;
  //       }
  //     });
  //     this.getMsgs(this.isRead);
  // }

  del(msg, status) {

    if (msg.length >= 1) {
      // for(let i=0;i<msg.length;i++){
      //   this.deleteAll.push(msg[i].Id);
      // this.Id = this.deleteAll.toString()

      // }
      this.isRead = 0;
      this.senderId = this.loginId;
      this.receiverId = this.receiver;
      this.Id = 'all'
      let params = { senderId: this.senderId, receiverId: this.receiverId, Id: this.Id, loginId: this.loginId }
      this.chatService.deleteMsgs(params, msg),
        // this.chatService.deleteMsgs(msgData,
        (error, response) => {
          if (!response.error) {

            // this.messages = response.Body.Data.messages;
          }
        };
    }
    else {

      this.isRead = 0;
      this.senderId = msg.toUserId;
      this.receiverId = msg.fromUserId;
      this.Id = msg.Id.toString();
      let params = { senderId: this.senderId, receiverId: this.receiverId, Id: this.Id, loginId: this.loginId }
      this.chatService.deleteMsgs(params, (error, response) => {
        if (!response.error) {

          // this.messages = response.Body.Data.messages;
        }
      })
    }
    this.getMsgs(this.isRead);
  }



  sendMessage(event) {

    if (event.keyCode == 13) {

      if (this.message.trim() == "" || this.message.trim() == null) {

      } else {

        if (this.message.trim() == "") {

        } else if (this.userId == '') {
          this.router.navigate(['/']);
        } else if (this.selectedUserId == "" || this.selectedUserId == null) {

        } else {
          this.msgData();

        }
      }
    }

  }


  showDialog() {
    this.display = true;
  }
  msgData() {
    console.log("to", this.socketId + "from", this.selectedSocketId)
    const data = {
      fromUserId: this.userId,
      Message: (this.message).trim(),
      toUserId: this.selectedUserId,
      toSocketId: this.selectedSocketId,
      fromSocketId: this.socketId,
      CreatedDate: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
    }
    this.messages.push(data);
    setTimeout(() => {
      document.querySelector(`.message-thread`).scrollTop = document.querySelector(`.message-thread`).scrollHeight;
    }, 100);

    /* 
    * calling method to send the messages
    */
    this.message = null;
    this.socketService.sendMessage(data);
    this.isRead = 0
    this.getMsgs(this.isRead);
  }

  alignMessage(userId) {
    return this.userId === userId ? false : true;
  }


  logout() {
    this.socketService.logout({ userId: this.userId }).subscribe(response => {
      this.router.navigate(['/']); /* Home page redirection */
    });
  }


}
