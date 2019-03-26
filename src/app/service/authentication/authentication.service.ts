import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Account } from 'src/app/model/Account';
import { JwtAuthResponse } from 'src/app/model/JwtAuthResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private loggedInAccountSubject: BehaviorSubject<JwtAuthResponse>;
  public loggedInAccount: Observable<JwtAuthResponse>;

  constructor(private http: HttpClient) {
    this.loggedInAccountSubject = new BehaviorSubject<JwtAuthResponse>(JSON.parse(window.localStorage.getItem('loggedInAccount')));
    this.loggedInAccount = this.loggedInAccountSubject.asObservable();
   }

   baseUrl: string = environment.serverUrl;

   login(loginPayload) {
     return this.http.post<any>(this.baseUrl + 'login', loginPayload)
      .pipe(map(
        data => {
          if (data && data.result.tokenType === 'Bearer') {
            window.localStorage.setItem('loggedInAccount', JSON.stringify(data.result));
            this.loggedInAccountSubject.next(data.result);
          }
          return data;
        }
      ));
   }

   logout() {
     window.localStorage.removeItem('loggedInAccount');
     this.loggedInAccountSubject.next(null);
   }

   register(registrationPayload): Observable<any> {
     return this.http.post<any>(this.baseUrl + 'account/register', registrationPayload);
   }

   getAccountList() {
     return this.http.get<any>(this.baseUrl + 'account/list');
   }

   deleteAccount(account: Account) {
     return this.http.delete<any>(this.baseUrl + 'account/delete/' + account.id);
   }
}
