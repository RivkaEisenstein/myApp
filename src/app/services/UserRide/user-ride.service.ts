import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserRide } from '../../modals/UserRide.modal';
import { User } from 'src/app/modals/User.modal';
// import { RequestOptions } from ' @angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserRideService {

  constructor(
    private HttpClient: HttpClient
  ) { }

  getUserRides(user: User): Observable<object[]> {
    console.log(user);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = {
      headers: headers,
      body: user
    }
    return this.HttpClient.post<object[]>(environment.api + '/userRide/getUserRides', user);
  }

  deleteRegister(userRide: UserRide) {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = {
      headers: headers,
      body: userRide
    }
    return this.HttpClient.delete(environment.api + '/userRide/deleteRegister/', options);
  }

  userRideDeleteService(userRide:UserRide[]) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = {
      headers: headers,
      body: userRide
    }

    return this.HttpClient.delete(environment.api + '/api/userRide', options);
  }

  registerRide(listUsersRegister: UserRide[]):Observable<User[]> {

    return this.HttpClient.post<User[]>(environment.api + '/userRide/' + 'registerRide/', listUsersRegister);
  }

}
