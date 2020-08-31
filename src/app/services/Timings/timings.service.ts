import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserRide } from 'src/app/modals/UserRide.modal';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TimingsService {

  constructor(private httpClient:HttpClient) { }



timings(userRide:UserRide[]) {
  let headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  let options = {
    headers: headers,
    body: userRide
  }
  

  return this.httpClient.delete(environment.api + '/userRide/deleteTimings/', options);
}

}
