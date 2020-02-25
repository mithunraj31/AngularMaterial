import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';


@Component({
  selector: 'app-forcast',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['forcast.component.scss'],
  templateUrl: 'forcast.component.html'
})
export class ForcastComponent implements OnInit{
 
  ngOnInit() {

  }
 
}
