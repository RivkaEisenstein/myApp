import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ride } from '../../modals/Ride.modal'
import { HttpClient } from '@angular/common/http';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Time } from '@angular/common';
import { TimeRide } from 'src/app/modals/TimeRide';
import { User } from 'src/app/modals/User.modal';
import { AlertController } from '@ionic/angular';
import { UserRide } from 'src/app/modals/UserRide.modal';
import { UserService } from '../../services/User/user.service';

@Injectable({
  providedIn: 'root'
})
export class RidesService implements CanActivate {

  currentUser: User = new User();

  degel: number = 0;
  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private alertController: AlertController,
    private UserService: UserService
  ) { }



  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!localStorage.getItem("user")) {
      {
        this.alertLogin();
        // this.router.navigate(['/login']);
      }
      return false;
    }
    else return true;
  }

  registerListRides(userRides: UserRide[]): Observable<UserRide[]> {
    return this.httpClient.post<UserRide[]>(environment.api + "/userRide" + "/registerListRides", userRides);
  }

  getRides(): Observable<Ride[]> {
    return this.httpClient.get<Ride[]>(environment.api + "/Rides" + "/getAllRides");
  }

  getAvg(rides: Ride[]): Observable<any[]> {

    return this.httpClient.post<any[]>(environment.api + '/Rides/getAvg/', rides);
  }

  getArrTime(rideId: number): Observable<TimeRide[]> {
    return this.httpClient.get<TimeRide[]>(environment.api + '/TimeRides/getAllTimeRides/' + rideId);
  }

  async alertLogin() {
    const alert = await this.alertController.create({
      header: 'LOGIN',
      cssClass: 'my-custom-class',
      inputs: [{
        name: "name",
        type: "text",
        placeholder: "Enter name user"
      }, {
        name: "tz",
        type: "text",
        placeholder: "Enter name tz"
      }],
      buttons: [{
        text: 'ENTER',
        handler: data => {
          this.currentUser.UserName = data.name;
          this.currentUser.Tz = data.tz;
          this.login();
        }
      }]
    });

    await alert.present();
  }

  async alertLoginSuccesfull() {
    const alert = await this.alertController.create({
      header: 'Hellow ' + this.currentUser.UserName + '.',
      cssClass: 'my-custom-class',
      message: 'We hope that you enjoy in our asument'
    });

    await alert.present();
  }

  login() {
    this.UserService.getUser(this.currentUser).subscribe((user: any) => {
      if (user != null) {
        this.currentUser = user;
        console.log(user);
        localStorage.setItem("user", JSON.stringify(this.currentUser));
        this.alertLoginSuccesfull();
        this.router.navigate(['/rides']);
      }
      else {
        this.router.navigate(['/register']);
      }
    });
  }

}
