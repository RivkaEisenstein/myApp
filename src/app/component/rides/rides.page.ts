import { Component, OnInit, ModuleWithComponentFactories } from '@angular/core';
import { RidesService } from '../../services/Rides/rides.service';
import { Ride } from '../../modals/Ride.modal';
import { UserRideService } from '../../services/UserRide/user-ride.service';
import { from, observable, Observable } from 'rxjs';
import { User } from 'src/app/modals/User.modal';
import { UserRide } from 'src/app/modals/UserRide.modal';
import { AlertController, IonButton, IonDatetime, ModalController } from '@ionic/angular';
import { Time, DatePipe, getLocaleDateTimeFormat } from '@angular/common';
import { NgModel } from '@angular/forms';
import { TimeRide } from 'src/app/modals/TimeRide';
import { Router } from '@angular/router';
import { RidePage } from '../ride/ride.page';

@Component({
  selector: 'app-rides',
  templateUrl: './rides.page.html',
  styleUrls: ['./rides.page.scss'],
})

export class RidesPage implements OnInit {
  rides: Ride[] = []
  avg: any[] = [];
  currentUser: User = JSON.parse(localStorage.getItem("user"));
  listChildren: User[] = this.currentUser.Children;
  listUsersRegister: UserRide[] = [];
  isTrue: boolean[] = [false, false];
  currentTime: Date;
  lineTimeChoose: number;
  degel = 0;
  listRidesRegister: Ride[] = [];
  listUser: User[] = [];
  degel1 = 0;
  count = 0;
  rideAvg: boolean[] = [false, false];
  usersRideAvg: UserRide[] = [];
  date: Date = new Date();
  age: number = 10;
  kindAge:string="Children";

  constructor(
    private ridesService: RidesService,
    private userRideService: UserRideService,
    private alertController: AlertController,
    private router: Router,
    public modalController: ModalController
  ) { }

  ngOnInit() {
    this.getRides();
  }

  changAge(degel: number) {
    if (degel == 1) { this.kindAge = "Children" }
    else if(degel==2){ this.kindAge = "Adults" }
    else{this.kindAge="Express"}
  }


  async navigate(rideId: number) {
    // this.router.navigateByUrl('/ride/' + rideId)
    const modal = await this.modalController.create({
      component: RidePage,
      cssClass: 'my-custom-class',
      componentProps: {
        'rideId': rideId
      },
      swipeToClose: true,
      presentingElement: await this.modalController.getTop()
    });
    return await modal.present();

  }

  getAvg() {
    this.ridesService.getAvg(this.rides).subscribe(res => {
      console.log('avg', res);
      for (let i = 0; i < this.rides.length; i++) {
        this.rides[i].Avg = res[i];
        console.log(res[i])
        // =new Date()+(res[i])//date with hours

        // var hours = Math.abs(res[i]. - new Date().getHours()) / 3600000


        console.log(this.rides[i].Avg);
        console.log();
        // this.rides[i].Avg=new Date(this.rides[i].Avg.getTime()-new Date().getTime());
        console.log(this.rides[i].Avg);
        // setInterval(() => {
        //   this.rides[i].Avg.setSeconds(this.rides[i].Avg.getSeconds()-1)

        // }, 10000)



      }
    })


  }

  getArrTime(rideId: number) {
    this.rides.forEach(element => {
      element.TimeEvening = [];
    });
    this.ridesService.getArrTime(rideId).subscribe(res => {
      for (let i = 0; i < res.length; i++) {
        var timeRide: TimeRide = new TimeRide();
        timeRide.TimeRideId = res[i].TimeRideId;
        timeRide.TimeStart = res[i].TimeStart;
        timeRide.Mone = res[i].Mone;
        timeRide.RideId = res[i].RideId;
        this.rides[res[i].RideId - 1].TimeEvening.push(timeRide);
      }
      console.log(res);
    })
  }

  divideKindAge() {    
    this.rides.forEach(element => {
      if (element.AgeUser <= 10) { element.KindAge = "Children" }
      else if(element.AgeUser>10 && element.AgeUser<20){ element.KindAge = "Adults" }
      else {
        element.KindAge="Express"
      }
    });
  }

  getRides() {
    this.ridesService.getRides().subscribe(rides => {
      this.rides = rides;
      this.rides.forEach(element => {
        element.TimeEvening = [];
      });
      console.log(this.rides);
      this.getAvg();
      this.initRideAvg();
      this.divideKindAge();
    }, err => {
      console.log(err);
    })
  }

  async alerSumSeetes(sumPlaces: number, ride: Ride) {
    var options = {
      cssClass: 'my-custom-class',
      header: 'Hellow ' + this.currentUser.UserName + '.',
      subHeader: 'In this ride has ' + sumPlaces + ' seetes',
      message: 'Are you want to divide the register to two groups? ',
      inputs: [],
      buttons: []
    };

    options.buttons.push({
      text: 'OK',
      handler: () => {
        this.pushChildrenTwoGroups(sumPlaces, ride);
      },
    })
    options.buttons.push({
      text: 'Cancel',
      handler: () => {
      }
    })

    if (sumPlaces >= this.listUsersRegister.length) {
      options.buttons.push({
        text: 'register in one group',
        handler: () => {
          this.listUsersRegister.forEach(element => {
            element.CurrentTime = ride.TimeEvening[this.lineTimeChoose + 1].TimeStart;
          });
          this.registerRide(ride);
        }
      })
    }

    let alert = this.alertController.create(options);
    (await alert).present();
  }

  pushChildrenTwoGroups(numberSeetesStayed: number, ride: Ride) {
    let numberSeets = this.listUsersRegister.length - numberSeetesStayed;
    let numRegister = numberSeetesStayed;
    for (let j = this.lineTimeChoose + 1; j < ride.TimeEvening.length; j++) {
      if (this.rides[ride.RideId - 1].NumberSeets - ride.TimeEvening[j].Mone >= numberSeets) {
        for (let i = 0; i < numberSeets; i++) {
          this.listUsersRegister[numRegister].CurrentTime = ride.TimeEvening[j].TimeStart;
          numRegister++;
        }
        this.registerRide(ride);
      }
      else {
        let mone = ride.TimeEvening[j].Mone;
        for (let i = ride.TimeEvening[j].Mone; mone < ride.NumberSeets; i++, mone++)
          if (numberSeets != 0) {
            this.listUsersRegister[numRegister].CurrentTime = ride.TimeEvening[j].TimeStart;
            numberSeets--;
            numRegister++;
          }
      }
    }
    let listUsersRegisterLength = this.listUsersRegister.length;
    for (let i = numRegister; i < listUsersRegisterLength; i++) {
      this.listUsersRegister.pop();
      this.count--;
    }
    this.registerRide(ride);
  }

  as() {
    debugger;
  }

  async pushChildren(ride: Ride) {
    if (ride.TimeEvening.length > 0) {
      let numberSeetesStayed = this.rides[ride.RideId - 1].NumberSeets - this.rides[ride.RideId - 1].TimeEvening[this.lineTimeChoose].Mone;
      for (let i = 0; i <= this.listChildren.length; i++) {
        if (this.isTrue[i] == true) {
          var childrenUserRide: UserRide = new UserRide();
          childrenUserRide.RideId = ride.RideId;
          if (i == 0) { childrenUserRide.UserId = this.currentUser.UserId; }
          else { childrenUserRide.UserId = this.listChildren[i - 1].UserId; }
          if (this.currentTime) { childrenUserRide.CurrentTime = this.currentTime; }
          else { childrenUserRide.CurrentTime = this.rides[ride.RideId - 1].TimeEvening[0].TimeStart, console.log(this.rides[ride.RideId - 1].TimeEvening[0].TimeStart) }
          this.listUsersRegister.push(childrenUserRide);
          this.isTrue[i] = false;
        }
      }
      if (this.listChildren.length < 1) {
        var childrenUserRide: UserRide = new UserRide();
        childrenUserRide.RideId = ride.RideId;
        childrenUserRide.UserId = this.currentUser.UserId;
        if (this.currentTime) { childrenUserRide.CurrentTime = this.currentTime; }
        else { childrenUserRide.CurrentTime = this.rides[ride.RideId - 1].TimeEvening[0].TimeStart, console.log(this.rides[ride.RideId - 1].TimeEvening[0].TimeStart) }
        this.listUsersRegister.push(childrenUserRide);
      }
      console.log('mon', this.rides[ride.RideId - 1].TimeEvening[this.lineTimeChoose].TimeStart);
      if (numberSeetesStayed < this.listUsersRegister.length) {
        console.log(numberSeetesStayed);
        this.alerSumSeetes(numberSeetesStayed, ride);
      }
      else {
        this.registerRide(ride);
      }
    }
  }

  async a() {
    var options = {
      component: RidePage,
      cssClass: 'my-custom-class'
    };


    let alert = this.alertController.create(options);
    (await alert).present();
  }

  async alertTime(ride: Ride) {
    let longListChildren = 0;
    var options = {
      header: 'Hellow ' + this.currentUser.UserName + '.',
      cssClass: 'my-custom-class',
      message: '',
      buttons: []
    };
    let i = 0;
    this.listUser.forEach(element => {
      if (element == null) {
        i++;
      }
    });
    if (i < this.count && this.listUser.length > 1) {
      console.log(this.count);
      options.message = 'The register falies because'
      this.listUser.forEach(element => {
        if (element != null) { options.message += ' ,' + element.UserName }
      });
      options.message += ' have another ride in this time, Are you want to register the other children'
      options.buttons.push({
        text: 'OK',
        handler: () => {
          this.isTrue = [];
          let i = 0;
          this.listUser.forEach(element => {
            if (element == null) {
              this.isTrue[i] = true;
            }
            else { this.isTrue[i] = false; }
            i++;
          }
          );
          this.pushChildren(ride);
        }

      });
      options.buttons.push({
        text: 'Cancel',
        handler: () => {
        }
      });
    }
    else { options.message = 'The register falied because you have another ride in this time' }
    const alert = await this.alertController.create(options)
    await alert.present();
  }

  registerRide(ride: Ride) {
    this.degel1 = 0; this.count = 0;
    this.count = this.listUsersRegister.length;
    console.log(this.listUsersRegister);
    if (this.listUsersRegister.length > 0) {
      this.userRideService.registerRide(this.listUsersRegister).subscribe(res => {
        console.log(res);
        this.listUser = res;
        this.listUser.forEach(element => {
          if (element == null) {
            this.degel1++;
          }
        });
        if (this.count > this.degel1) {
          this.alertTime(ride);
        }
        else { this.presentAlertRegisterSuccesfull(); }
      }, err => {
        console.log(err);
      })
    }
    this.listUsersRegister = [];
  }

  checkBoxPress(i) {
    if (this.isTrue[i + 1] == true) {
      this.isTrue[i + 1] = false;
    }
    else {
      this.isTrue[i + 1] = true;
    }
  }

  async presentAlertRegisterSuccesfull() {
    const alert = await this.alertController.create({
      header: 'Hellow ' + this.currentUser.UserName + '.',
      cssClass: 'my-custom-class',
      message: 'The register moved successful.',

    });

    await alert.present();
  }

  async presentAlertRegister(ride: Ride) {
    this.getArrTime(ride.RideId);
    for (let isTrue = 0; isTrue < this.isTrue.length; isTrue++) {
      this.isTrue[isTrue] = false;
    }
    var options = {
      cssClass: 'my-custom-class', header: 'Hellow ' + this.currentUser.UserName, message: '', inputs: [], buttons: []
    };

    if (this.currentUser.NumberChildren > 1) {
      if (this.currentUser.Age >= ride.AgeUser) {
        options.inputs.push({
          name: 'value1', type: 'checkbox', label: this.currentUser.UserName, value: 'checkbox2', handler: () => {
            this.checkBoxPress(-1);
          },
        })
      }
      for (let i = 0; i < this.currentUser.Children.length; i++) {
        if (this.currentUser.Children[i].Age >= ride.AgeUser) {
          options.inputs.push({
            name: 'value1', type: 'checkbox', label: this.currentUser.Children[i].UserName, value: 'checkbox2', handler: () => {
              this.checkBoxPress(i);
            },
          })
        }
      }
      if (options.inputs.length == 0) {
        options.message = 'There is no one in that his age suit to current ride.'
      }
      else {
        options.message = 'Enter your children that you want register them:';
        options.inputs.push({
          type: 'checkbox',
          label: 'Choose prefer time:',
          cssClass: 't',
          handler: () => {
            this.chooseTime(ride, this.isTrue);
          }
        })
      }
    }
    else {
      if (this.currentUser.Age >= ride.AgeUser) {
        options.inputs.push({
          type: 'checkbox',
          label: 'Choose prefer time:',
          cssClass: 't',
          handler: () => {
            this.chooseTime(ride, this.isTrue);
          }
        })

      }
      else {
        options.message = 'There is no one in that his age suit to current ride.'

      }
    }
    if (options.inputs.length >= 1) {
      options.buttons.push({

        text: 'Register', cssClass: 'Agree',
        handler: () => {
          this.pushChildren(ride);
        }
      },
        {
          text: 'Cancel', role: 'cancel',// cssClass: 'Agree',// 
          handler: () => {
            this.isTrue = [];
          }
        })
    }
    let alert = this.alertController.create(options);
    (await alert).present();
  }

  async chooseTime(ride: Ride, isTrue: boolean[]) {
    console.log(isTrue);
    var options = {
      message: '',
      inputs: [],
      buttons: []
    }
    if (this.rides[ride.RideId - 1].TimeEvening.length < 1) {
      options.message = 'The activity of the ride over'
    }
    let j = 0;
    for (let i = 0; i < this.rides[ride.RideId - 1].TimeEvening.length; i++) {
      options.inputs.push({
        name: 'value1', type: 'radio', label: this.rides[ride.RideId - 1].TimeEvening[i].TimeStart, value: 'radio2', handler: () => {
          this.currentTime = this.rides[ride.RideId - 1].TimeEvening[i].TimeStart, this.lineTimeChoose = i; console.log(i)
        }
      })
    }
    // this.rides[ride.RideId - 1].TimeEvening.forEach(element => {
    //   options.inputs.push({
    //     name: 'value1', type: 'radio', label: element.TimeStart, value: 'radio2', handler: () => { debugger;
    //       this.currentTime = element.TimeStart, this.lineTimeChoose = j ; console.log(j)}
    //   })
    // });

    options.buttons.push({
      text: 'OK'
    })
    let alert = this.alertController.create(options);
    (await alert).present();
  }

  //register with list and avg

  addToList(ride: Ride) {
    for (let isTrue = 0; isTrue < this.isTrue.length; isTrue++) {
      this.isTrue[isTrue] = false;
    }
    console.log(this.isTrue)
    console.log(this.rideAvg);
    if (this.rideAvg[ride.RideId - 1] == false) {
      this.rideAvg[ride.RideId - 1] = true;
      if (this.listChildren.length > 0) { this.alertWithChildren(ride); }
      else {
        var userRide: UserRide = new UserRide();
        userRide.RideId = ride.RideId;
        userRide.UserId = this.currentUser.UserId;
        userRide.TimeVP = new Date();
        console.log(userRide.CurrentTime);
        this.usersRideAvg.push(userRide);
        console.log(this.usersRideAvg);
      }
    }
    else { this.rideAvg[ride.RideId - 1] = false }
  }

  getNameUser(userId: number) {
    let degel = 0; let name: string;
    this.listChildren.forEach(element => {
      if (element.UserId == userId) {
        degel = 1;
        name = element.UserName;
      }
    });

    if (degel == 0) {
      return this.currentUser.UserName;
    } else { return name }
  }

  async alertListRegisterSuccesfull(res: UserRide[]) {
    var options = {
      cssClass: 'my-custom-class', header: 'Hellow ' + this.currentUser.UserName, message: 'The queuee of rides:', inputs: [], buttons: []
    };

    res.forEach(element => {
      var name = this.getNameUser(element.UserId);
      options.buttons.push({
        text: name + '. Ride: ' + element.RideId + '  Time: ' + element.CurrentTime, cssClass: 'Agree',
        handler: (data) => {
          this.router.navigate(['/my-rides']);
        }
      })
    });
    let alert = this.alertController.create(options);
    (await alert).present();
  }

  registerListRides() {
    console.log(this.usersRideAvg);
    this.ridesService.registerListRides(this.usersRideAvg).subscribe(res => {
      console.log(res);

      this.alertListRegisterSuccesfull(res);
      this.usersRideAvg = res;
      this.usersRideAvg = [];
      // this.router.navigate(['/my-rides']);
    })
  }

  initRideAvg() {

    for (let i = 0; i < this.rides.length; i++) {
      this.rideAvg[i] = false;
    }
  }

  async alertWithChildren(ride: Ride) {

    var options = {
      cssClass: 'my-custom-class', header: 'Hellow ' + this.currentUser.UserName, message: '', inputs: [], buttons: []
    };

    if (this.currentUser.Age >= ride.AgeUser) {
      options.inputs.push({
        name: 'value1', type: 'checkbox', label: this.currentUser.UserName, value: 'checkbox2', checked: false, handler: (data) => {
          console.log(data.value1);
          this.checkBoxPress(-1);
        },
      })
    }
    for (let i = 0; i < this.currentUser.Children.length; i++) {
      if (this.currentUser.Children[i].Age >= ride.AgeUser) {
        options.inputs.push({
          name: 'value1', type: 'checkbox', label: this.currentUser.Children[i].UserName, checked: false, value: 'checkbox2', handler: (data) => {
            this.checkBoxPress(i);
          },
        })
      }
    }
    if (options.inputs.length == 0) {
      options.message = 'There is no one in that his age suit to current ride.'
    }
    else {
      options.message = 'Enter your children that you want register them:';
    }
    if (options.inputs.length >= 1) {
      options.buttons.push({

        text: 'OK', cssClass: 'Agree',
        handler: (data) => {

          this.pushChildrenInList(ride);
        }
      },
        {
          text: 'Cancel', role: 'cancel',// cssClass: 'Agree',// 
          handler: () => {

          }
        })
    }
    let alert = this.alertController.create(options);
    (await alert).present();
  }

  pushChildrenInList(ride: Ride) {
    console.log(this.isTrue);
    for (let i = 0; i < this.isTrue.length; i++) {
      if (this.isTrue[i] == true) {
        var childrenUserRide: UserRide = new UserRide();
        childrenUserRide.RideId = ride.RideId;
        if (i == 0) { childrenUserRide.UserId = this.currentUser.UserId; }
        else { childrenUserRide.UserId = this.listChildren[i - 1].UserId; }
        childrenUserRide.CurrentTime = new Date();
        childrenUserRide.TimeVP = new Date();
        this.usersRideAvg.push(childrenUserRide);
        // this.rideAvg[i] = false;
      }
    }
    console.log(this.usersRideAvg);

  }
}