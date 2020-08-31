import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { User } from './modals/User.modal';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private key = 'token';
    errorMessage: string;

    constructor(private httpClient: HttpClient, private router: Router) { }


    login(name: string, tz: string): Observable<string> {
        return this.httpClient.get<string>(environment.api + '/api/token',{params: {name, tz}});

    }

    logout() {
        localStorage.removeItem(this.key);
        this.router.navigate(['/login']);
    }

    GetToken() {
        return localStorage.getItem(this.key);
    }

}