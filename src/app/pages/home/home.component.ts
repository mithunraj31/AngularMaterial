import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  languages = [
    { code: 'en', label: 'English'},
    { code: 'ja', label: 'Japanese'},
  ];
  constructor(@Inject(LOCALE_ID) protected localeId: string) {}

  ngOnInit() {
  }

}
