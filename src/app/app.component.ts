import { Router } from '@angular/router';
import { Component, Inject, LOCALE_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth/AuthService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mbel-client';
  isLoggedIn$: Observable<boolean>;
  
  constructor( private authService: AuthService, private router:Router) {}
  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn();
  }
}
