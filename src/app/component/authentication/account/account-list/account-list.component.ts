import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {

  accounts: Account[];
  loggedInAccount: Account;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {    
    this.loggedInAccount = JSON.parse(window.localStorage.getItem('loggedInAccount'));
    if (!this.loggedInAccount) {
      this.router.navigate(['login']);
      return;
    }
    this.authenticationService.getAccountList().subscribe(
      data => {
        this.accounts = data.result;
      },
      error => {
        alert(JSON.stringify(error));
      }
    );
  }

  deleteAccount(account) {
    this.authenticationService.deleteAccount(account).subscribe(
      data => {
        this.accounts.splice(this.accounts.indexOf(account), 1);
      },
      error => {
        alert(JSON.stringify(error));
      }
    )
  }

  editAccount(account) {
    window.sessionStorage.removeItem("editAccount");
    window.sessionStorage.setItem("editAccount", JSON.stringify(account));
    this.router.navigate(['account-edit']);
  }

}
