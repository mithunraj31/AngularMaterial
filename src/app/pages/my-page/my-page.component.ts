import { UserService } from 'src/app/services/UserService';
import { AuthService } from 'src/app/auth/AuthService';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.scss']
})
export class MyPageComponent implements OnInit {
  passwordForm: FormGroup;
  progress = false;
  successPasswordChange: boolean;
  constructor(private auth: AuthService,) { }

  role;

  ngOnInit() {
    this.role = this.auth.getRole();
  }

 

}
