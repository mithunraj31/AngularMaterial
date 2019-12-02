import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/AuthService';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  lastName: string;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn();
    this.lastName = this.authService.getLastName();
  }
  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }

}
