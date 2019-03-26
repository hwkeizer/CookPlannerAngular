import { Component, OnInit } from '@angular/core';
import { JwtAuthResponse } from 'src/app/model/JwtAuthResponse';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';

@Component({
  selector: 'app-nav-admin',
  templateUrl: './nav-admin.component.html',
  styleUrls: ['./nav-admin.component.css']
})
export class NavAdminComponent implements OnInit {
  loggedInAccount: JwtAuthResponse;
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
