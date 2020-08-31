import { Injectable } from '@angular/core';
import { User } from '../../modals/User.modal';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient: HttpClient) { }


  updateName(id:number,currentUser:User):Observable<User>{

   return this.httpClient.put<User>(environment.api+'/api/user', currentUser );
  }

  register(user:User):Observable<User>{
    console.log(user);
    return this.httpClient.post<User>(environment.api + "/api/user", user );

  }
}
