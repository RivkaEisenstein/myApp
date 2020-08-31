// import { Injectable } from '@angular/core';
// import { AngularFireMessaging } from '@angular/fire/messaging';
// import { BehaviorSubject } from 'rxjs'
// import { HttpClient } from '@angular/common/http';
// @Injectable({
//   providedIn: 'root'
// })
// export class MessagingService {

//   currentMessage = new BehaviorSubject(null);
//   constructor(private angularFireMessaging: AngularFireMessaging, private http: HttpClient) {
//     this.angularFireMessaging.messaging.subscribe(
//       (_messaging) => {
//         _messaging.onMessage = _messaging.onMessage.bind(_messaging);
//         _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
//       }
//     )
//   }
//   requestPermission() {
//     this.angularFireMessaging.requestToken.subscribe(
//       (token) => {
//         //יש לשמור את הטוקן במסד הנתונים 
//         console.log(token);

//         debugger;
//       },
//       (err) => {
//         console.error('Unable to get permission to notify.', err);
//       }
//     );
//   }

//   receiveMessage() {
//     debugger;
//     this.angularFireMessaging.messages.subscribe(
//       (payload) => {
//         debugger;
//         console.log("new message received. ", payload);
//         this.currentMessage.next(payload);
//       },
//       (err) => {
//         console.log("error: ", err);
//         debugger;
//       })
//   }
// }



