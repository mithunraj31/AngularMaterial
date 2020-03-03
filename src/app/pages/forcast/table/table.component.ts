import { ForecastService } from './../../../services/ForecastService';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  displayedColumns: string[] = [
    'setName',
    'productId',
    'productName',
    'description',
    'values',

  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  subColumns: any[] = [
    {
      value: "in qty",
      key: "incomingQuantity"
    },
    {
      value: "out qty",
      key: "requiredQuantity"
    },
    {
      value: "predicted stock",
      key: "currentQuantity"
    },
    {
      value: "stock",
      key: "quantity"
    },
  ]
  dataSource: Array<any> = [];
  spans = [];
  spanningColumns = ['productId', 'productName', 'description'];
  tempRowId = null;
  tempRowCount = null;
  productForecast;
  progress;
  unsub = new Subject();
  constructor(private forecastService: ForecastService) {

  }

  ngOnInit() {
    this.populateData();
    // console.log(this.dataSource);
    // console.log(this.displayedColumns);
  }

  populateData() {
    this.progress = true;
    // this.progress = false;
    this.forecastService.getProductForecast().pipe(takeUntil(this.unsub)).subscribe(data => {
      this.addColumnsToTables(data[0].products[0].values);
      this.productForecast = data;
      console.log(this.productForecast);
      let setcount = 0;
      let productcount = 0;
      let tempdata:any[]= [];
      data.forEach(productSet => {
        productSet.products.forEach(product => {
          this.subColumns.forEach(column => {

            let temp: any = {
              "setId": productSet.productId,
              "setObicNo": productSet.obicNo,
              "setName": productSet.productName,
              "setDescription": productSet.description,
              "setColor": setcount % 2 == 0 ? "#E8EAF6" : "#C5CAE9",

              "productId": product.productId,
              "obicNo": product.obicNo,
              "productName": product.productName,
              "description": product.description,
              "color": productcount % 2 == 0 ? "#E0F2F1" : "#B2DFDB",
              "values": column.value,

            }
            product.values.forEach(dateItem => {
              if ((column.key === "incomingQuantity" || column.key === "requiredQuantity") && (dateItem[column.key]==0)) {
                temp[this.getDateString(dateItem.date)] = "";
              } else {
                temp[this.getDateString(dateItem.date)] = dateItem[column.key];
              }
            });
            tempdata.push(temp);
            // this.dataSource.push(temp);
            
          })
          productcount++;
        });
        setcount++;
        
      });
      this.dataSource = tempdata;
      
      console.log(this.dataSource);
      this.progress = false;
      this.unsub.next();
      this.unsub.complete();
      console.log(this.progress);
    },error=>{
      this.progress = false;
    });

  }
  addColumnsToTables(dateArray) {
 
    dateArray.forEach(element => {
      const date = element.date;
      this.displayedColumns.push(this.getDateString(date));
    });
    this.columnsToDisplay = this.displayedColumns.slice();
    // console.log(this.columnsToDisplay);
  }
  getDateString(date: string) {
    return new Date(date).toLocaleDateString("en-US", { month: "numeric", day: "numeric" });
  }

  changeColor(data, set?) {
    if (set)
      return { 'background-color': data.setColor };

    return { 'background-color': data.color };
  }

  getRowSpanSet(col, index) {
    // console.log(col,index);
    const rowVal = this.dataSource[index];
    const cellVal = rowVal[col];
    let count = 0;
    for (let row of this.dataSource) {
      if (cellVal == row[col])
        count++;
    }
    return count;
  }
  getRowSpan(col, index) {

    return 4;
  }

  isTheSame(column, index) {
    let result = false;
    const i = index;
    if (i == 0) {
      result = false;
    } else {
      const valObj = this.dataSource[i];
      const preObj = this.dataSource[i - 1];

      if (valObj[column] == preObj[column]) {
        result = true;
      }
      // console.log (valObj[column],preObj[column]);
    }
    return result;
  }
}
