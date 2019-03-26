import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Account } from 'src/app/model/Account';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';

@Component({
  selector: 'app-account-create',
  templateUrl: './account-create.component.html',
  styleUrls: ['./account-create.component.css']
})
export class AccountCreateComponent implements OnInit {

  createForm: FormGroup;
  account: Account;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  onSubmit() {
    this.account = this.createForm.value;
    this.authenticationService.register(this.account).subscribe(
      data => {
        this.router.navigate(['account-list']);
      },
      error => {
        alert(error);
      }
    )
  }

  get username() {return this.createForm.get('username');}
  get password() {return this.createForm.get('password');}
  get role() {return this.createForm.get('role');}
}
