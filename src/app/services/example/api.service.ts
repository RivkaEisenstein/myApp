import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  api = "http://localhost:56160/user/login";
  items: any;
  headers: string;
  item: any = 3;
  ngOnInit() {

    this.getUsers();
  }
  constructor(private httpClient: HttpClient) { }

  // createItem(item) {
  //   return this.http
  //     .post<Student>(this.base_path, JSON.stringify(item), this.httpOptions)
  //     .pipe(
  //       retry(2),
  //       catchError(this.handleError)
  //     )
  // }

  getUsers() {
    return this.httpClient.post(this.api,{IdUser:1,NameUser:"sd",Password:"1234"})
  }

}

