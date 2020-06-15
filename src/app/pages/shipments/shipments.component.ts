import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-shipments',
  templateUrl: './shipments.component.html',
  styleUrls: ['./shipments.component.scss']
})
export class ShipmentsComponent implements OnInit {

  arrivedSub;
  tabIndex = 0;
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.arrivedSub = this.route.params.subscribe(params => {
      if (params.id == 'arrived' || params.arrived == 'arrived') {
        this.tabIndex = 1;

      }
    });
  }
  tabClick(event) {
    if (event.index == 0){

      this.router.navigate(['shipments']);
    } else if (event.index == 1) {
      this.router.navigate(['shipments/arrived']);
    }
  }
}
