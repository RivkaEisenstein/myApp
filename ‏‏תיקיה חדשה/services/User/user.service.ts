import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../modals/User.modal';
import { environment } from 'src/environments/environment';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Route } from '@angular/compiler/src/core';


@Injectable({
  providedIn: 'root'
})
export class UserService{

  currentUser: User = new User();
  constructor(
    private httpClient: HttpClient,
    private alertController: AlertController,
    private UserService: UserService,
    private router: Router
  ) { }



  getUser(currentUser: User): Observable<User> {
    return this.httpClient.post<User>(environment.api + '/user' + '/login', currentUser);
  }



}
