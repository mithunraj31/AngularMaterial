import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/AuthService';
import { UserService } from 'src/app/services/UserService';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  passwordForm: FormGroup;
  progress = false;
  successPasswordChange: boolean;
  constructor(private auth: AuthService,
    private userService: UserService,
    private _snackBar: MatSnackBar) { }
  firstName;
  lastName;
  role;
  passwordError: boolean = false;
  changeError = null;
  ngOnInit() {
    this.initializeLoginForm();
    this.firstName = this.auth.getFirstName();
    this.lastName = this.auth.getLastName();
    this.role = this.auth.getRole();
  }

  initializeLoginForm() {
    this.passwordForm = new FormGroup({
      "oldPassword": new FormControl("", [
        Validators.required,
      ]),
      "newPassword": new FormControl("", [
        Validators.required
      ]),
      "confirmPassword": new FormControl("", [
        Validators.required
      ])

    })
  }
  onSubmit() {
    this.progress = true;
    this.passwordError = false;
    if (this.passwordForm.value.newPassword != this.passwordForm.value.confirmPassword) {
      this.passwordError = true;
      this.progress = false;
    } else {
      this.userService.updatePassword(this.passwordForm.value).subscribe(success => {
        this.successPasswordChange = true;
        this.progress = false;
        this.openSnackBar("Your password has been changed successfully!", "ok");
        // this.passwordForm.reset();
        this.passwordForm.markAsPristine();
        this.passwordForm.markAsUntouched();
        this.passwordForm.updateValueAndValidity();
        this.changeError = null;
      }, error => {
        if (error && error.status ) {
          if(error.status == 401){
          this.changeError = 401;
        } else if(error.status == 400) {
          this.changeError = 400;
        }
        } else {
          this.changeError = 500;
        }
        this.progress = false;
      })
      this.passwordError = false;
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }


}
