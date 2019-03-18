import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private loggedInAccountSubject: BehaviorSubject<Account>;
  public loggedInAccount: Observable<Account>;

  constructor(private http: HttpClient) {
    this.loggedInAccountSubject = new BehaviorSubject<Account>(JSON.parse(window.localStorage.getItem('loggedInAccount')));
    this.loggedInAccount = this.loggedInAccountSubject.asObservable();
   }

   baseUrl: string = environment.serverUrl;

   login(loginPayload): Observable<any> {
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
     return this.http.post<any>(this.baseUrl + 'register', registrationPayload);
   }
}
