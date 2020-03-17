import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { ForecastService } from 'src/app/services/ForecastService';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-forcast',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['forcast.component.scss'],
  templateUrl: 'forcast.component.html'
})
export class ForcastComponent implements OnInit, OnDestroy{
  constructor(){
    
  }

  ngOnInit() {
  }
  ngOnDestroy(){
  }
 
}
