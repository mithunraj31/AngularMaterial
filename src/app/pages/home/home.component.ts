import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  
  ngOnInit() {
    const isIEOrEdge = /msie\s|trident\/|edge\//i.test(window.navigator.userAgent);
  }
}
