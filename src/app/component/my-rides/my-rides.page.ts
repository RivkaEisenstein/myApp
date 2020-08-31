import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/modals/User.modal';
import { UserRideService } from '../../services/UserRide/user-ride.service';
import { Ride } from 'src/app/modals/Ride.modal';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { UserRide } from 'src/app/modals/UserRide.modal';
import { IonNav } from '@ionic/angular';
import { TimingsService } from 'src/app/services/Timings/timings.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-rides',
  templateUrl: './my-rides.page.html',
  styleUrls: ['./my-rides.page.scss'],
})
export class MyRidesPage implements OnInit {

  userRides: Array<object> = [];
  listChildren: User[] = JSON.parse(localStorage.getItem("user")).Children;
  currentUser: User = JSON.parse(localStorage.getItem("user"));
  userRide: UserRide[] = [];


  constructor(private userRideService: UserRideService,
    private alertController: AlertController,
    public actionSheetController:ActionSheetController,
    private timingsService: TimingsService,
    private router:Router) { }


  ngOnInit() {  
    this.getUserRides();
    if(this.listChildren)
    {this.listChildren.push(this.currentUser);}
  }

  getUserRides() {
    let user: User = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    this.userRideService.getUserRides(user).subscribe(res => {
      this.userRides = res;
      console.log(this.userRides);
    })
  }

  async presentActionSheet(userRide:UserRide) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
         this.presentAlertDelete(userRide);
        }
      }, {
        text: 'Edit ride',
        icon: 'add-circle-outline',
        handler: () => {
          this.router.navigate(['/rides'])
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  navigateRides(){
this.router.navigate(['/rides'])
  }

  async alert(userRide: UserRide[]) {
    const alert = await this.alertController.create({
      header: 'Hellow ' + this.currentUser.UserName + '.',
      cssClass: 'my-custom-class',
      message: 'You have timing',
      buttons: [{
        text: 'OK',
        handler: () => {
          this.timing(userRide);
        }
      },
      {
        text: 'Cancel register',
        handler: () => {
          this.timing(userRide);
        }
      }]
    });

    await alert.present();
  }

  timing(userRide) {
    this.timingsService.timings(userRide).subscribe(res => {
      console.log(res);
    })
  }

  async presentAlertDelete(userRide: UserRide) {
    var options = {
      cssClass: 'my-custom-class',
      header: 'Hellow ' + this.currentUser.UserName,
      message: '',
      inputs: [],
      buttons: [
        {
          text: 'Agree',
          handler: () => {
            this.deleteRegister(userRide);
          }
        },
        {
          text: 'Cancel', role: 'cancel',
        }
      ]
    };

    options.message = 'Are you sure that you want to delete register? '
    
    let alert = this.alertController.create(options);
    (await alert).present();

  }

  deleteRegister(userRide: UserRide) {
    this.userRide.push(userRide);
    var currentUser: User = JSON.parse(localStorage.getItem("user"));
    this.userRideService.userRideDeleteService(this.userRide).subscribe(res => {
      console.log("res");
      this.ngOnInit();
    }, err => {
      console.log(err);
    });
  }
}
