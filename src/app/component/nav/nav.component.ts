import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {
  loggedInAccount: Account;
  loggedInAccountSubscription: Subscription;

  constructor(private authenticationService: AuthenticationService) {
    this.loggedInAccountSubscription = this.authenticationService.loggedInAccount.subscribe(
      account => {
        this.loggedInAccount = account;
      })
   }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.loggedInAccountSubscription.unsubscribe();
  }

}
