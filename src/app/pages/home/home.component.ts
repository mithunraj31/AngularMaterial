import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddOrderSummeryComponent } from 'src/app/dialogs/add-order-summery/add-order-summery.component';
import { DashboardService } from 'src/app/services/DashboardService';
import { Widget } from 'src/app/models/Widget';
import { ThrowStmt } from '@angular/compiler';
import { CdkDragDrop ,moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  widgets: Widget[] = [];
  widgetData: Widget[] = [];
  constructor(
    public dialog: MatDialog,
    private dashboardService: DashboardService
  ) {

  }
  browser;

  ngOnInit() {
    this.browser = this.getBrowserName();
    this.getWidgets();
  }

  public getBrowserName() {
    const agent = window.navigator.userAgent.toLowerCase()
    switch (true) {
      case agent.indexOf('edge') > -1:
        return 'edge';
      case agent.indexOf('opr') > -1 && !!(<any>window).opr:
        return 'opera';
      case agent.indexOf('chrome') > -1 && !!(<any>window).chrome:
        return 'chrome';
      case agent.indexOf('trident') > -1:
        return 'ie';
      case agent.indexOf('firefox') > -1:
        return 'firefox';
      case agent.indexOf('safari') > -1:
        return 'safari';
      default:
        return 'other';
    }
  }

  public refresh() {
    this.getWidgets();
  }
  public addOrderSummery() {
    // open confimation dialog
    const addOrderSummeryRef = this.dialog.open(AddOrderSummeryComponent, {
      width: '600px',
      disableClose: true
    });
    addOrderSummeryRef.afterClosed().subscribe(result => {
      if (result) {
        this.getWidgets();
      }
    });
  }
  async getWidgets() {
    this.widgetData = [];
    const tempStr = localStorage.getItem("widgets");
    let temp: any = JSON.parse(tempStr);

    if (temp != null && temp.length > 0) {
      this.widgets = temp
    }
    this.widgets.forEach(widget => {
      this.dashboardService.getProductSummery(widget.data.productId).subscribe(result => {
        let w: Widget = widget;
        w.data = result;
        this.widgetData.push(w);
      })
    });
  }
  deleteWidget(index:number){
    this.widgets.splice(index,1);
    localStorage.setItem("widgets",JSON.stringify(this.widgets));
    this.getWidgets();
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.widgets, event.previousIndex, event.currentIndex);
    moveItemInArray(this.widgetData, event.previousIndex, event.currentIndex);
    localStorage.setItem("widgets",JSON.stringify(this.widgets));
  }
}

