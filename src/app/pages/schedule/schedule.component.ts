import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  routesub;
  tabIndex = 0;
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.routesub = this.route.params.subscribe(params => {
      if (params['id'] == 'kitting') {
        this.tabIndex = 1;

      }
    });
  }
  tabClick(event) {
    if (event.index == 0) {

      this.router.navigate(['delivery-schedule']);
    } else if (event.index == 1) {
      this.router.navigate(['delivery-schedule/kitting']);
    }
  }
}
