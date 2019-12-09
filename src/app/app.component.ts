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
  languages = [
    { code: 'en', label: 'English'},
    { code: 'ja', label: 'Japanese'},
  ];
  constructor(@Inject(LOCALE_ID) public localeId: string, private authService: AuthService) {}

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn();
  }
}
