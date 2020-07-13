import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { Subject } from 'rxjs';
import { ForecastService } from 'src/app/services/ForecastService';
import { MatDialog } from '@angular/material';
import { OrderInfoComponent } from 'src/app/dialogs/order-info/order-info.component';
import { IncomingInfoComponent } from 'src/app/dialogs/incoming-info/incoming-info.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-kitting-schedule',
  templateUrl: './kitting-schedule.component.html',
  styleUrls: ['./kitting-schedule.component.scss']
})
export class KittingScheduleComponent implements OnInit {

  displayedColumns: string[] = [];
  smallTable = false;
  columnsToDisplay: string[] = [];
  subColumns: any[] = [];
  dataSource: Array<any> = [];
  spans = [];
  spanningColumns = ['obicNo', 'productName', 'description'];
  tempRowId = null;
  tempRowCount = null;
  productForecast;
  progress;
  unsub = new Subject();
  viewDate = new Date();

  constructor(private forecastService: ForecastService,
    @Inject(LOCALE_ID) public localeId: string,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.localizeSubColumns();
  }

  ngOnInit() {
    if(localStorage.getItem("smallTable")=="true"){
      this.smallTable = true;
    }else{
      this.smallTable =false;
    }
    try {
      this.route.queryParams
        .subscribe(params => {

          if (params.year && params.month) {
            this.viewDate = new Date(params.year + "-" + params.month);
          }
        });
    } catch (error) {

      this.viewDate = new Date();
    } finally {

      this.populateData();
    }
  }
  localizeSubColumns() {
    if (this.localeId === 'ja') {
      this.subColumns = [
        {
          value: '入荷',
          key: 'incoming'
        },
        {
          value: '出荷',
          key: 'outgoing'
        },
        {
          value: '在庫',
          key: 'currentQuantity'
        },
      ];
    } else {
      this.subColumns = [
        {
          value: 'in qty',
          key: 'incoming'
        },
        {
          value: 'out qty',
          key: 'outgoing'
        },
        {
          value: 'predicted stock',
          key: 'currentQuantity'
        },
      ];
    }
  }
  clickPrevious() {
    this.viewDate = new Date(
      this.viewDate.getFullYear(),
      this.viewDate.getMonth() - 1,
      this.viewDate.getDate()
    );
    this.router.navigate(['delivery-schedule/kitting'], { queryParams: { year: this.viewDate.getFullYear(), month: this.viewDate.getMonth() + 1 } });
    this.populateData();
  }
  clickNext() {
    this.viewDate = new Date(
      this.viewDate.getFullYear(),
      this.viewDate.getMonth() + 1,
      this.viewDate.getDate()
    );
    this.router.navigate(['delivery-schedule/kitting'], { queryParams: { year: this.viewDate.getFullYear(), month: this.viewDate.getMonth() + 1 } });
    this.populateData();
  }
  clickToday() {
    this.viewDate = new Date();
    this.router.navigate(['delivery-schedule/kitting'], { queryParams: { year: this.viewDate.getFullYear(), month: this.viewDate.getMonth() + 1 } });
    this.populateData();
  }

  populateData() {
    this.progress = true;
    // this.progress = false;

    this.forecastService.getKittingForcast(this.viewDate.getFullYear(), this.viewDate.getMonth()).subscribe(data => {

      this.addColumnsToTables(data[0].products[0].values);
      this.productForecast = data;

      let setcount = 0;
      let productcount = 0;
      const tempdata: any[] = [];
      data.forEach(productSet => {
        productSet.products.forEach(product => {
          this.subColumns.forEach(column => {

            const temp: any = {
              setId: productSet.productId,
              setObicNo: productSet.obicNo,
              setName: productSet.productName,
              setDescription: productSet.description,
              setColor: productSet.color ? productSet.color : '#ffffff',

              productId: product.productId,
              obicNo: product.obicNo,
              productName: product.productName,
              description: product.description,
              color: product.color ? product.color : '#ffffff',
              values: column.value,

            };
            product.values.forEach(dateItem => {
              if ((column.key === 'incoming' || column.key === 'outgoing') && (dateItem[column.key].quantity === 0)) {
                temp[this.getDateString(dateItem.date)] = {
                  quantity: '',
                  fixed: true
                };
              } else if (column.key === 'currentQuantity') {
                temp[this.getDateString(dateItem.date)] = {
                  quantity: dateItem[column.key],
                  fixed: true
                };
              } else {
                temp[this.getDateString(dateItem.date)] = dateItem[column.key];
              }
            });
            tempdata.push(temp);
            // this.dataSource.push(temp);

          });
          productcount++;
        });
        setcount++;

      });
      // this.dataSource = tempdata.slice(0, 9);
      this.dataSource = tempdata;

      this.progress = false;
      this.unsub.next();
      this.unsub.complete();

    }, error => {
      this.progress = false;
    });

  }
  addColumnsToTables(dateArray) {
    this.displayedColumns = new Array<string>();
    this.columnsToDisplay = new Array<string>();
    this.displayedColumns = [
      'setName',
      'obicNo',
      'productName',
      'description',
      'values',

    ];
    this.columnsToDisplay = this.displayedColumns.slice();
    dateArray.forEach(element => {
      const date = element.date;
      this.displayedColumns.push(this.getDateString(date));
    });
    this.columnsToDisplay = this.displayedColumns.slice();

  }
  getDateString(date: string) {
    return new Date(date).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' });
  }

  changeColor(data, set?) {
    const DateCss = {
      'background-color': data.color,
      cursor: 'default',
      color: '#212121'
    };

    if (set && set === 'set') {
      DateCss['background-color'] = data.setColor;

    } else if (set && data[set]) {
      // change color logic
      // Only FCST Orders
      if (data[set].contains && data[set].contains.fcst && !data[set].contains.confirmed && !data[set].contains.fulfilled) {
        DateCss['background-color'] = '#f8bbd0';
        DateCss.color = '#212121';
        
      } // Only Confirmed Orders
      else if (data[set].contains && !data[set].contains.fcst && data[set].contains.confirmed && !data[set].contains.fulfilled) {
        DateCss['background-color'] = '#81d4fa';
        DateCss.color = '#212121';
      } // Only fulfilled Orders
      else if (data[set].contains && !data[set].contains.fcst && !data[set].contains.confirmed && data[set].contains.fulfilled) {
        DateCss['background-color'] = data.color;
        DateCss.color = '#212121';
      } // FCST and Confirmed Orders
      else if (data[set].contains && data[set].contains.fcst && data[set].contains.confirmed && !data[set].contains.fulfilled) {
        DateCss['background'] = 'rgb(33,150,243)';
        DateCss['background'] = 'linear-gradient(0deg, #81d4fa 29%, #f8bbd0 66%)';
        DateCss.color = '#212121';
      }
      // FCST and Fulfilled Orders
      else if (data[set].contains && data[set].contains.fcst && !data[set].contains.confirmed && data[set].contains.fulfilled) {
        DateCss['background'] = 'rgb(33,150,243)';
        DateCss['background'] = 'linear-gradient(0deg, ' +data.color+' 29%, #f8bbd0 66%)';
        DateCss.color = '#212121';
      }
      // Confirmed and Fulfilled Orders
      else if (data[set].contains && !data[set].contains.fcst && data[set].contains.confirmed && data[set].contains.fulfilled) {
        DateCss['background'] = 'rgb(33,150,243)';
        DateCss['background'] = 'linear-gradient(0deg, ' +data.color+' 26%, #81d4fa 80%)';
        DateCss.color = '#212121';
      }
      // FCST and Confirmed and Fulfilled Orders
      else if (data[set].contains && data[set].contains.fcst && data[set].contains.confirmed && data[set].contains.fulfilled) {
        DateCss['background'] = 'rgb(33,150,243)';
        DateCss['background'] = 'linear-gradient(0deg, ' +data.color+' 22%, #81d4fa 52%, #f8bbd0 86%)';
        DateCss.color = '#212121';
      }
      //  end change color logic
      if (data[set].quantity < 0) {
        DateCss['font-weight'] = 'bold';
        DateCss.color = '#FF0000';
      }
      if (data[set].orders || data[set].incomingOrders) {
        DateCss.cursor = 'pointer';
      }
    }


    return DateCss;
  }

  getRowSpanSet(col, index) {

    const rowVal = this.dataSource[index];
    const cellVal = rowVal[col];
    let count = 0;
    for (const row of this.dataSource) {
      if (cellVal === row[col]) {
        count++;
      }
    }
    return count;
  }//
  getRowSpan(col, index) {

    return 3;
  }

  isTheSame(column, index) {
    let result = false;
    const i = index;
    if (i === 0) {
      result = false;
    } else {
      const valObj = this.dataSource[i];
      const preObj = this.dataSource[i - 1];
      if (valObj[column] === preObj[column]) {
        result = true;
      }

    }
    return result;
  }

  isTheSameI(column, index) {
    let result = false;
    const i = index;
    if (i === 0) {
      result = false;
    } else {
      const valObj = this.dataSource[i];
      const preObj = this.dataSource[i - 1];
      const compare1 = valObj[column] + valObj.productId + valObj.setId;
      const compare2 = preObj[column] + preObj.productId + preObj.setId;
      if (compare1 === compare2) {
        result = true;
      }

    }
    return result;
  }

  clickOrder(data) {
    const backUrl = {
      base: "delivery-schedule/kitting",
      year: this.viewDate.getFullYear(),
      month: this.viewDate.getMonth() + 1
    }
    if (data.orders) {
      const confirmDialogRef = this.dialog.open(OrderInfoComponent, {
        width: '700px',
        data: [data.orders, backUrl],
        disableClose: true,
        hasBackdrop: false
      });

    }
    if (data.incomingOrders) {
      const confirmDialogRef = this.dialog.open(IncomingInfoComponent, {
        width: '700px',
        data: [data.incomingOrders, backUrl],
        disableClose: true,
        hasBackdrop: false
      });
    }
  }

  onclickSmallTable(){
    localStorage.setItem("smallTable",String(this.smallTable));
    console.log(this.smallTable);
  }

}
