import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-orders-container',
  templateUrl: './orders-container.component.html',
  styleUrls: ['./orders-container.component.scss']
})
export class OrdersContainerComponent implements OnInit {
  fulfillSub;
  tabIndex = 0;
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.fulfillSub = this.route.params.subscribe(params => {
      if (params['id'] == 'fulfilled' || params['fulfilled'] == 'fulfilled') {
        this.tabIndex = 1;

      }
    });
  }
  tabClick(event) {
    if (event.index == 0){

      this.router.navigate(['orders']);
    } else if (event.index == 1) {
      this.router.navigate(['orders/fulfilled']);
    }
  }

}
