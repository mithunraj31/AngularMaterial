import { ForecastService } from './../../../services/ForecastService';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { timeout, takeUntil} from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ProductForecastService } from 'src/app/services/ProductForecastService';

@Component({
  selector: 'app-product-forecast',
  templateUrl: './product-forecast.component.html',
  styleUrls: ['./product-forecast.component.scss']
})
export class ProductForecastComponent implements OnInit, OnDestroy {
  progress: boolean = false;
  unsub = new Subject();
  constructor(private forecastService: ForecastService) { }

  ngOnInit() {
    this.getForecastdata();
  }
  ngOnDestroy(){
    this.unsub.next();
    this.unsub.complete();
  }

  getForecastdata() {
    this.progress = true;
    const test = this.forecastService.getProductForecast().pipe(takeUntil(this.unsub))
    .subscribe(result => {
      console.log(result);
      this.progress = false;
      console.log(this.progress);
    }, error => {
      this.progress = false;
      console.log(error);
    })

  }
}
