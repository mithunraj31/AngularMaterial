import { Router } from '@angular/router';
import { LoginUser } from './../../models/LoginUser';
import { AuthService } from 'src/app/auth/AuthService';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError = null;
  progress = false;
  constructor(private authService: AuthService,
    private router: Router, ) { }

  ngOnInit() {
    this.checkAlreadyLoggedIn();
    this.initializeLoginForm();
  }

  checkAlreadyLoggedIn(){
    console.log(this.authService.isAuthenticated());
    if(this.authService.isAuthenticated()){
      this.router.navigate(['/']);
    }
  }

  initializeLoginForm() {
    this.loginForm = new FormGroup({
      "email": new FormControl("", [
        Validators.required, Validators.email
      ]),
      "password": new FormControl("", [
        Validators.required
      ])

    })
  }
  onSubmit() {
    if (this.loginForm.valid) {
      this.progress = true;
      const user: LoginUser = {
        "email": this.loginForm.value.email,
        "password": this.loginForm.value.password
      }
      this.authService.login(user).subscribe(result => {
        this.authService.setSession(result);
        console.log(result);
        this.router.navigate(['/']);
      },
        error => {
          if(error.error.status==401) {
            this.loginError = "Invalid credentials!";
          } else {
            this.loginError = "Somthing went wrong! Please try again later.";
          }
          console.log(error);
          this.progress = false;
        })

      console.log(this.loginForm.value)
    }
  }

  getErrorMessage(attribute: string) {
    //return this.customerForm.get(attribute).hasError('required') ? 'You must enter a value':'' ;
    switch (attribute) {
      case "email":
        return this.loginForm.get(attribute).hasError('required') ? 'Email cannot be empty' :
          this.loginForm.get(attribute).hasError('email') ? 'Please Enter a valid email.' : '';
        break;

      case "password":
        return this.loginForm.get(attribute).hasError('required') ? 'Password Cannot be empty' : '';

      default:
        return this.loginForm.get(attribute).hasError('required') ? 'You must enter a value' : '';
        break;
    }
  }
}
