import { Component, OnInit, Inject, LOCALE_ID, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { ForecastService } from 'src/app/services/ForecastService';
import { MatDialog } from '@angular/material';
import { OrderInfoComponent } from 'src/app/dialogs/order-info/order-info.component';
import { IncomingInfoComponent } from 'src/app/dialogs/incoming-info/incoming-info.component';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'lodash';
import { ProductService } from 'src/app/services/ProductService';
import { SchedulePattern } from 'src/app/models/SchedulePattern';
import { AuthService } from 'src/app/auth/AuthService';

@Component({
  selector: 'app-delivery-schedule',
  templateUrl: './delivery-schedule.component.html',
  styleUrls: ['./delivery-schedule.component.scss']
})
export class DeliveryScheduleComponent implements OnInit {
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
  preview: any[];

  patterns: SchedulePattern[]
  selectedPattern: SchedulePattern;

  constructor(private forecastService: ForecastService,
    @Inject(LOCALE_ID) public localeId: string,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private authService: AuthService
  ) {
    this.route.queryParams.subscribe(params => {
      this.preview = [];
      if (params['preview']) {
        const previews: any[] = JSON.parse(params['preview']);
        previews.forEach(x => {
          x.items.forEach(i => {
            this.preview.push({setId: x.id, productId: i});
          });
        });
      }
    });
    this.localizeSubColumns();
    this.selectedPattern = null;
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

    this.productService.getSchedulePatterns().subscribe((scheculePatterns: SchedulePattern[]) => {
      this.patterns = scheculePatterns;
    });
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
    this.router.navigate(['delivery-schedule'], { queryParams: { year: this.viewDate.getFullYear(), month: this.viewDate.getMonth() + 1 } });
    this.populateData();
  }
  clickNext() {
    this.viewDate = new Date(
      this.viewDate.getFullYear(),
      this.viewDate.getMonth() + 1,
      this.viewDate.getDate()
    );
    this.router.navigate(['delivery-schedule'], { queryParams: { year: this.viewDate.getFullYear(), month: this.viewDate.getMonth() + 1 } });
    this.populateData();
  }
  clickToday() {
    this.viewDate = new Date();
    this.router.navigate(['delivery-schedule'], { queryParams: { year: this.viewDate.getFullYear(), month: this.viewDate.getMonth() + 1 } });
    this.populateData();
  }

  populateData(patternId: number = 0) {
    this.progress = true;
    // this.progress = false;

    let subscriber = null;
    if (this.selectedPattern) {
      subscriber = this.forecastService.getProductForecast(
        this.viewDate.getFullYear(),
        this.viewDate.getMonth(),
        this.selectedPattern.schedulePatternId);
    } else {
      subscriber = this.forecastService.getProductForecast(
        this.viewDate.getFullYear(),
        this.viewDate.getMonth());
    }


    subscriber.subscribe(data => {

      this.addColumnsToTables(data[0].products[0].values);
      this.productForecast = data;

      let tempdata: any[] = [];
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
        });

      });
      this.dataSource = [];
      if (this.isPreviewMode()) {
        this.preview.forEach(x => {

          const previewItems =  filter(tempdata,
              t => t.setId == x.setId && t.productId == x.productId);
          if (previewItems.length > 0) {
            previewItems.forEach(f => this.dataSource.push(f));

          }

        });
      } else {
        this.dataSource = tempdata;
      }

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
      base: "delivery-schedule",
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

  isPreviewMode() {
    return this.preview && this.preview.length > 0;
  }

  getUserId() {
    return this.authService.getUserId();
  }

  onAddPatternClicked() {
    this.router.navigate(['/product-viewer']);
  }

  onEditPatternClicked() {
    this.router.navigate([`/product-viewer/${this.selectedPattern.schedulePatternId}`]);
  }

}


