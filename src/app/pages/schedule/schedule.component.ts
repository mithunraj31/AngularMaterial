import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/OrderService';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  routesub;
  tabIndex = 0;
  shukkaCount = 0;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.routesub = this.route.params.subscribe(params => {
      if (params['id'] == 'kitting') {
        this.tabIndex = 1;
      } else if (params['id'] == 'shukka') {
        this.tabIndex = 2;
      }
    });
    this.orderService.getDelayedCount().subscribe((val) => {
      this.shukkaCount = val.count;
    });
  }
  tabClick(event) {
    if (event.index == 0) {

      this.router.navigate(['delivery-schedule']);
    } else if (event.index == 1) {
      this.router.navigate(['delivery-schedule/kitting']);
    } else if (event.index == 2) {
      this.router.navigate(['delivery-schedule/shukka']);
    }
  }
}
