import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
declare var window: any, VC: any, $: any, VCUtils: any;
import { CaseManagementService } from '../../case-management.service';
import { Subscription } from 'rxjs/Subscription';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-videorenderer',
  templateUrl: './videorenderer.component.html',
  styleUrls: ['./videorenderer.component.css']
})
export class VideorendererComponent implements OnInit {
  leftUser: any;
  joinedUser: any;
  messages = [];
  webrtcInitializeAttempts: any;
  hideOptions: boolean = false;
  onSendMessage(arg0: any): any {
    throw new Error("Method not implemented.");
  }
  isLoading: boolean;
  isConnectionError: boolean;
  isCallConnected: boolean = false;
  chatMessage: any;
  participant: any;
  notifications: string;
  @Input() vidyoAppoint: any;
  loadAPI: Promise<{}>;
  vidyoConnector: any;
  cameras = {};
  microphones = {};
  speakers = {};
  cameraPrivacy = false;
  microphonePrivacy = false;
  @Output() closeVidyoCont: EventEmitter<any> = new EventEmitter();
  private subscription: Subscription;
  userId = Cookie.get('Id');
  messageInput: { value: string, isError: string } = { value: '', isError: '' };
  configParams = {};
  webrtcExtensionPath: any;
  firstName = Cookie.get('firstName');
  constructor(private caseManagementService: CaseManagementService, private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.loadVidyoClientLibrary(true, false);
    window.onVidyoClientLoaded = (status) => {
      console.log('ready');
      console.log(VCUtils);
      switch (status.state) {
        case "READY":
          if (VCUtils.params.webrtc === "true") {
            ++this.webrtcInitializeAttempts;
            if (status.hasOwnProperty("downloadPathWebRTCExtensionFirefox"))
              this.webrtcExtensionPath = status.downloadPathWebRTCExtensionFirefox;
            else if (status.hasOwnProperty("downloadPathWebRTCExtensionChrome"))
              this.webrtcExtensionPath = status.downloadPathWebRTCExtensionChrome;
          }
          this.createVidyo(VC, VCUtils.params.webrtc, this.webrtcExtensionPath, this.configParams);
          break;
        case "RETRYING":     // The library operating is temporarily paused
          break;
        case "FAILED":       // The library operating has stopped
          break;
        case "FAILEDVERSION":
          status.plugInVersion; // The Version of the plugin currently installed
          status.jsVersion;     // The Version of the Javascript library loaded
          break;
        case "NOTAVAILABLE": // The library is not available
          break;
      }
      return true; // Return true to reload the plugins if not available
    }
  }

  //Creating vidyo
  createVidyo(VC, webrtc, webrtcExtensionPath, configParams) {
    window.onresize = () => {
      this.ShowRenderer(this.vidyoConnector);
    };

    VC.CreateVidyoConnector({
      viewId: "renderer",  // Div ID where the composited video will be rendered
      viewStyle: "VIDYO_CONNECTORVIEWSTYLE_Default", // Visual style of the composited renderer
      remoteParticipants: 15, // Maximum number of participants to render
      logFileFilter: "error",
      logFileName: "",
      userData: ""
    }).then((vc) => {
      this.notifications = "Create success";
      console.log(this.notifications, vc)
      this.vidyoConnector = vc;
      this.ShowRenderer(vc);
      this.registerDeviceListeners(vc, this.cameras, this.microphones, this.speakers);
      // this.handleDeviceChange(vidyoConnector, cameras, microphones, speakers);
      this.handleParticipantChange(vc);
      // this.handleSharing(vidyoConnector, webrtc, webrtcExtensionPath);
      if (vc) {
        this.startCall();
      }
      this.changeDetectorRef.detectChanges();
    }).catch(function (error) {
      this.notifications = error + 'Error in the vidyo call';
    });
  }

  ShowRenderer(vidyoConnector) {
    var rndr = document.getElementById('renderer');
    vidyoConnector.ShowViewAt("renderer", rndr.offsetLeft, rndr.offsetTop, rndr.offsetWidth, rndr.offsetHeight);
  }

  registerDeviceListeners(vidyoConnector, cameras, microphones, speakers) {
    // Map the "None" option (whose value is 0) in the camera, microphone, and speaker drop-down menus to null since
    // a null argument to SelectLocalCamera, SelectLocalMicrophone, and SelectLocalSpeaker releases the resource.
    cameras[0] = null;
    microphones[0] = null;
    speakers[0] = null;

    // Handle appearance and disappearance of camera devices in the system
    vidyoConnector.RegisterLocalCameraEventListener({
      onAdded: function (localCamera) {
        // New camera is available
        $("#cameras").append("<option value='" + window.btoa(localCamera.id) + "'>" + localCamera.name + "</option>");
        cameras[window.btoa(localCamera.id)] = localCamera;
      },
      onRemoved: function (localCamera) {
        // Existing camera became unavailable
        $("#cameras option[value='" + window.btoa(localCamera.id) + "']").remove();
        delete cameras[window.btoa(localCamera.id)];
      },
      onSelected: function (localCamera) {
        // Camera was selected/unselected by you or automatically
        if (localCamera) {
          $("#cameras option[value='" + window.btoa(localCamera.id) + "']").prop('selected', true);
        }
      },
      onStateUpdated: function (localCamera, state) {
        // Camera state was updated
      }
    }).then(function () {
      console.log("RegisterLocalCameraEventListener Success");
    }).catch(function () {
      console.error("RegisterLocalCameraEventListener Failed");
    });

    // Handle appearance and disappearance of microphone devices in the system
    vidyoConnector.RegisterLocalMicrophoneEventListener({
      onAdded: function (localMicrophone) {
        // New microphone is available
        $("#microphones").append("<option value='" + window.btoa(localMicrophone.id) + "'>" + localMicrophone.name + "</option>");
        microphones[window.btoa(localMicrophone.id)] = localMicrophone;
      },
      onRemoved: function (localMicrophone) {
        // Existing microphone became unavailable
        $("#microphones option[value='" + window.btoa(localMicrophone.id) + "']").remove();
        delete microphones[window.btoa(localMicrophone.id)];
      },
      onSelected: function (localMicrophone) {
        // Microphone was selected/unselected by you or automatically
        if (localMicrophone)
          $("#microphones option[value='" + window.btoa(localMicrophone.id) + "']").prop('selected', true);
      },
      onStateUpdated: function (localMicrophone, state) {
        // Microphone state was updated
      }
    }).then(function () {
      console.log("RegisterLocalMicrophoneEventListener Success");
    }).catch(function () {
      console.error("RegisterLocalMicrophoneEventListener Failed");
    });

    // Handle appearance and disappearance of speaker devices in the system
    vidyoConnector.RegisterLocalSpeakerEventListener({
      onAdded: function (localSpeaker) {
        // New speaker is available
        $("#speakers").append("<option value='" + window.btoa(localSpeaker.id) + "'>" + localSpeaker.name + "</option>");
        speakers[window.btoa(localSpeaker.id)] = localSpeaker;
      },
      onRemoved: function (localSpeaker) {
        // Existing speaker became unavailable
        $("#speakers option[value='" + window.btoa(localSpeaker.id) + "']").remove();
        delete speakers[window.btoa(localSpeaker.id)];
      },
      onSelected: function (localSpeaker) {
        // Speaker was selected/unselected by you or automatically
        if (localSpeaker)
          $("#speakers option[value='" + window.btoa(localSpeaker.id) + "']").prop('selected', true);
      },
      onStateUpdated: function (localSpeaker, state) {
        // Speaker state was updated
      }
    }).then(function () {
      console.log("RegisterLocalSpeakerEventListener Success");
    }).catch(function () {
      console.error("RegisterLocalSpeakerEventListener Failed");
    });
  }

  handleParticipantChange(vidyoConnector) {
    vidyoConnector.RegisterParticipantEventListener({
      onJoined: (participant) => {
        console.log(participant);
        this.getParticipantName(participant, function (name) {
          $("#participantStatus").html("" + name + " Joined");
        });
      },
      onLeft: (participant) => {
        this.getParticipantName(participant, function (name) {
          $("#participantStatus").html("" + name + " Left");
        });
      },
      onDynamicChanged: (participants) => {
        // Order of participants changed
      },
      onLoudestChanged: (participant, audioOnly) => {
        this.getParticipantName(participant, function (name) {
          $("#participantStatus").html("" + name + " Speaking");
        });
      }
    }).then(() => {
      console.log("RegisterParticipantEventListener Success");
    }).catch(() => {
      console.error("RegisterParticipantEventListener Failed");
    });
  }
  getParticipantName(participant, cb) {
    if (!participant) {
      cb("Undefined");
      return;
    }

    if (participant.name) {
      cb(participant.name);
      return;
    }

    participant.GetName().then(function (name) {
      cb(name);
    }).catch(function () {
      cb("GetNameFailed");
    });
  }


  connectorDisconnected(connectionStatus, message) {
    $("#connectionStatus").html(connectionStatus);
    $("#message").html(message);
    $("#participantStatus").html("");
    $("#joinLeaveButton").removeClass("callEnd").addClass("callStart");
    $('#joinLeaveButton').prop('title', 'Join Conference');
  }
  // To join a video conference call Connect method
  joinCall(userParams) {
    if (userParams.discussionRoom.indexOf(" ") != -1 || userParams.discussionRoom.indexOf("@") != -1) {
      console.error("Connect call aborted due to invalid Resource ID");
      this.connectorDisconnected("Disconnected", "");
      $("#error").html("<h3>Failed due to invalid Resource ID" + "</h3>");
      return;
    }
    this.vidyoConnector.Connect({
      host: "prod.vidyo.io",  // Server name, for most production apps it will be prod.vidyo.io
      token: userParams.genToken,  // Add generated token 
      displayName: userParams.displayName,  // Display name
      resourceId: userParams.discussionRoom, // Room name
      onSuccess: () => {
        console.log("vidyoConnector.Connect : onSuccess callback received");
        this.notifications = "Connected";
        this.isCallConnected = true;
        // this.partcipateUsers();
        this.ShowRenderer(this.vidyoConnector);
        this.changeDetectorRef.detectChanges();
      },
      onFailure: (reason) => {
        this.isCallConnected = false;
        this.notifications = "Connection failed";
        // Failed
        console.error("vidyoConnector.Connect : onFailure callback received");
        this.connectorDisconnected("Failed", "");
        $("#error").html("<h3>Call Failed: " + reason + "</h3>");
      },
      onDisconnected: (reason) => {
        this.notifications = "Disconnected";
        this.isCallConnected = false;
        console.log("vidyoConnector.Connect : onDisconnected callback received");
        this.connectorDisconnected("Disconnected", "Call Disconnected: " + reason);
        this.ShowRenderer(this.vidyoConnector);
        this.changeDetectorRef.detectChanges();
      }
    }).then((status) => {
      this.isLoading = false;
      if (status) {
        this.handlePaticipants(this.vidyoConnector);
        this.receiveMessage(this.vidyoConnector);
        this.changeDetectorRef.detectChanges();
      } else {
        this.isConnectionError = true;
        console.error("ConnectCall Failed");
      }
    }).catch(() => {
      this.isConnectionError = true;
      this.isLoading = false;
      console.error("ConnectCall Failed");
    });
  }

  loadVidyoClientLibrary(webrtc, plugin) {
    let configParams = { webrtcLogLevel: '' }
    // If webrtc, then set webrtcLogLevel
    var webrtcLogLevel = "";
    if (webrtc) {
      configParams.webrtcLogLevel = 'info';
      // Set the WebRTC log level to either: 'info' (default), 'error', or 'none'
      if (configParams.webrtcLogLevel === 'info' || configParams.webrtcLogLevel === 'error' || configParams.webrtcLogLevel == 'none')
        webrtcLogLevel = '&webrtcLogLevel=' + configParams.webrtcLogLevel;
      else
        webrtcLogLevel = '&webrtcLogLevel=info';
    }

    //We need to ensure we're loading the VidyoClient library and listening for the callback.
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://static.vidyo.io/4.1.24.9/javascript/VidyoClient/VidyoClient.js?onload=onVidyoClientLoaded&webrtc=' + webrtc + '&plugin=' + plugin + webrtcLogLevel;
    document.getElementsByTagName('head')[0].appendChild(script);
    console.log(script.src);
  }
  // public loadScript() {
  //   var isFound = false;
  //   var scripts = document.getElementsByTagName("script")
  //   for (var i = 0; i < scripts.length; ++i) {
  //     if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes("loader")) {
  //       isFound = true;
  //     }
  //   }

  //   if (!isFound) {
  //     var dynamicScripts = ["https://static.vidyo.io/4.1.15.7/javascript/VidyoClient/VidyoClient.js?onload=onVidyoClientLoaded&webrtc="];

  //     for (var i = 0; i < dynamicScripts.length; i++) {
  //       let node = document.createElement('script');
  //       node.src = dynamicScripts[i];
  //       node.type = 'text/javascript';
  //       node.async = false;
  //       node.charset = 'utf-8';
  //       document.getElementsByTagName('head')[0].appendChild(node);
  //     }

  //   }
  // }
  minimize() {
    $("#VidyoConference").hide();
    $("#body").css('overflow', 'initial');
    $("#body").css('padding-right', '0px');
    $(".modal-backdrop.show").css('opacity', '1');
    $(".modal-backdrop.show").css('position', 'relative');
    $("#minimize").show();
  }

  maximize() {
    $("#minimize").hide();
    $("#VidyoConference").show();
    $("#body").css('overflow', 'hidden');
    $("#body").css('padding-right', '17px');
    $(".modal-backdrop.show").css('opacity', '17px');
  }


  // $(".vidyoclose").click(function() {
  //   $("#body").css('overflow', 'initial');
  // });
  // $(".dismissminimize").click(function() {
  //   $("#minimize").hide();
  // });

  startCall() {
    console.log(this.vidyoAppoint);
    let appointment = this.vidyoAppoint
    let dur = appointment.AppointmentDuration;
    var params;
    let duration = parseInt(dur) * 60;
    console.log(duration);
    let appData = { AppointmentTitle: appointment.AppointmentTitle, userName: this.firstName, AppDuration: duration, appoitmentStatus: 1, appointmentCreatedBy: appointment.AppointmentCreatedBy, Id: appointment.Id || appointment.AppointmentId }
    this.caseManagementService.startAppointment(appData).subscribe(res => {
      let dRoom = appointment.AppointmentTitle.replace(/\s/g, '').toUpperCase();
      console.log(dRoom);
      params = { discussionRoom: dRoom, displayName: this.firstName, genToken: res.Body.Data.token }
    },
      error => { console.error('Error') },
      () => {
        this.notifications = 'Connecting...';
        this.joinCall(params);
      }
    )
  }


  handlePaticipants(vidyoConnector) {
    vidyoConnector.RegisterParticipantEventListener(
      {
        onJoined: (participant) => {
          console.log('Joined', participant);
          this.onAddUser({ id: participant.id, name: participant.name });
          console.log(this.onAddUser.name + 'ssssssssssssssssssssssss');
        },
        onLeft: (participant) => {
          console.log('Left', participant);
          this.onRemoveUser({ id: participant.id, name: participant.name });
          console.log(this.onRemoveUser + 'reeeeeeeeeeeeeeeee')
        },
        onDynamicChanged: (participants, cameras) => { /* Ordered array of participants according to rank */ },
        onLoudestChanged: (participant, audioOnly) => { /* Current loudest speaker */ }
      }
    ).then(() => {
      console.log("RegisterParticipantEventListener Success");
    }).catch(() => {
      console.error("RegisterParticipantEventListener Failed");
    });
  }
  onAddUser(joineeObj) {
    this.joinedUser = joineeObj;
    setTimeout(() => {
      this.joinedUser = null;
    }, 1000);

  }
  onRemoveUser(lefteeObj) {
    this.leftUser = lefteeObj;
    setTimeout(() => {
      this.leftUser = null;
    }, 1000);
  }
  disconnectCall() {
    this.notifications = 'Disconnecting...';
    if (this.vidyoAppoint.AppointmentCreatedBy == this.userId) {
      let message = '{ "type": "Control", "subType": "DisconnectAll", "message": "Disconnecting All from the call"}';
      this.vidyoConnector.SendChatMessage({ message });
    }
    this.vidyoConnector.Disconnect();
  }

  // disconnectCall() {
  //   this.vidyoConnector.Disconnect();
  //   this.notifications = "DisConnecting..";
  //   console.log(this.vidyoConnector);
  // }


  receiveMessage(vidyoConnector) {
    vidyoConnector.RegisterMessageEventListener({
      onChatMessageReceived: (participant, chatMessage) => {
        console.log(participant, chatMessage);
        try {
          var jsonObject = JSON.parse(chatMessage.body); // verify that json is valid
          console.log(jsonObject + "Received a valid Json")

          if (jsonObject.type === "Control") {
            if (jsonObject.subType === "DisconnectAll") {
              vidyoConnector.Disconnect();
              this.notifications = 'Disconnected';
              this.isCallConnected = false;
              this.connectorDisconnected('Disconnected', 'Organizer Disonnected the video conference...! ');
              this.changeDetectorRef.detectChanges();
            }
          }
          else if (jsonObject.type === "PublicChat") {
            this.messages.push({ id: participant.id, name: participant.name, content: jsonObject.message, userID: participant.userId, time: new Date(chatMessage.timestamp) });
            console.log(this.messages);
            this.changeDetectorRef.detectChanges();
          }
          else if (jsonObject.type === "IndividualChat" &&
            jsonObject.targetId === jsonObject.id) {
            console.log("Received private message from - " + participant.name);
            console.log("Message - " + chatMessage.body);
          }
        }
        catch (e) {
          console.log("Did not receive a valid Json: " + e);
        }
      }
    }).then(() => {
      console.log("RegisterParticipantEventListener Success");
    }).catch(() => {
      console.error("RegisterParticipantEventListener Failed");
    });
  }

  /* Send chat message */
  sendChat() {
    console.log('send chat', this.isCallConnected);
    console.log(this.vidyoConnector);
    if (!(this.vidyoConnector && true)) {
      alert('You are not connected to Group chat yet!');
    }
    else {
      if (this.messageInput.value.trim()) {
        let message = '{ "type": "PublicChat", "subType": "groupChat", "message": "' + this.messageInput.value + '" }';
        console.log(message);
        this.vidyoConnector.SendChatMessage({ message });
        // this.messages.push({ id: null, name: this.firstName, content: this.messageInput.value });
        this.messageInput.value = '';
      }
    }
  }

  disable() {
    console.log(this.isCallConnected)
    if (this.isCallConnected) {
      if (this.vidyoAppoint.AppointmentCreatedBy == this.userId) {
        let appointment = this.vidyoAppoint;
        let appData = { AppointmentTitle: appointment.AppointmentTitle, userName: this.firstName, appoitmentStatus: 2, appointmentCreatedBy: appointment.AppointmentCreatedBy, Id: appointment.Id || appointment.AppointmentId }
        this.caseManagementService.startAppointment(appData).subscribe(res => {
          console.log(res);
        },
          error => { console.error('Error') },
          () => {
            $('#VidyoConference').modal('hide');
            this.disconnectCall();
            this.vidyoConnector.Disable();
            this.closeVidyoCont.emit('');
          }
        )
      } else {
        this.vidyoConnector.Disconnect();
      }
    } else {
      $('#VidyoConference').modal('hide');
      this.vidyoConnector.Disable();
      this.closeVidyoCont.emit('');
    }
  }

  toggleOptions() {
    this.hideOptions = !this.hideOptions;
  }
}
