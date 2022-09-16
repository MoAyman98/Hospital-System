import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators'
import { loginResponse } from '../_models/loginResponse';
import { register } from '../_models/register';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = "http://127.0.0.1:8000/api/";
  private currentUserSource = new ReplaySubject<string>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: any){
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: loginResponse) => {
        const user = response;
        if (user) {
          localStorage.setItem("Token", JSON.stringify(user.token));
          this.currentUserSource.next(user.token);
        }
        return user;
      })
    )
  }

  register(model: register) {
    return this.http.post(this.baseUrl + 'register', model);
  }
  // .pipe(
  //   map((user : Token) => {
  //     if (user) {
  //       localStorage.setItem("user",JSON.stringify(user.token));
  //       this.currentUserSource.next(user.token);
  //     }
  //   })
  // )

  setCurrentUser(user: string) {
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('Token');
    this.currentUserSource.next(null);
  }

}
