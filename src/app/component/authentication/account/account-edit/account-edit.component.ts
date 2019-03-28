import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { Account } from 'src/app/model/Account';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.css']
})
export class AccountEditComponent implements OnInit {

  editForm: FormGroup;
  submitted = false;
  account: Account;
  accountTypes: string[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.accountTypes = this.authenticationService.getAccountTypes();
    this.account = JSON.parse(window.sessionStorage.getItem("editAccount"));
    if (!this.account) {
      alert("Invalid action")
      this.router.navigate(['account-list']);
    }
    window.sessionStorage.removeItem("editAccount");
    this.editForm = this.formBuilder.group({
      username: ['', Validators.required],
      role: ['', Validators.required]
    });
    this.editForm.patchValue(this.account);
  }

  onEdit() {
    this.submitted = true;
    if (this.editForm.invalid) {
      return;
    }

    this.account.username = this.editForm.get('username').value;
    this.account.role = this.editForm.get('role').value;
    this.authenticationService.updateAccount(this.account).subscribe(
      data => {
        this.router.navigate(['account-list']);
      },
      error => {
        alert(JSON.stringify(error));
      }
    )
  }

  get username() {return this.editForm.get('username');}
  get role() {return this.editForm.get('role');}
  
}
