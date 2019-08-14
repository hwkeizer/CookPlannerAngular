import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { Router } from '@angular/router';
import { AlertService, alertType } from 'src/app/service/alert/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private router: Router) { }

  ngOnInit() {
    window.localStorage.removeItem('loggedInAccount')
    this.loginForm = this.formBuilder.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }
    const loginPayload = {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value
    }
    this.authenticationService.login(loginPayload).subscribe(
      data => {
        this.alertService.alert("Aanmelding succesvol", alertType.success);
        this.router.navigate(['home'])
      },
      error => {
        this.alertService.alert("Aanmelding mislukt", alertType.error);
      }
    )
  }

  get username() {return this.loginForm.get('username');}
  get password() {return this.loginForm.get('password');}

}
