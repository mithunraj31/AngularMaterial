import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/AuthService';
import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  
  appName = environment.APPNAME;
  isLoggedIn$: Observable<boolean>;
  lastName: string;
  languages = [
    { code: 'en', label: 'English'},
    { code: 'ja', label: 'Japanese'},
  ];
  url = "";
  constructor(@Inject(LOCALE_ID) public localeId: string,
  private authService: AuthService, 
  private router: Router,
  iconRegistry: MatIconRegistry, 
  sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'English',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icon/English.svg'));
      iconRegistry.addSvgIcon(
        'Japanese',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icon/Japanese.svg'));
   }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn();
    this.isLoggedIn$.subscribe((value)=>{
      if(value){

        this.lastName = this.authService.getLastName();
      }
    })
    this.router.events.subscribe(result=>{
        this.url = this.router.url;

    })
  }
  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }

}
