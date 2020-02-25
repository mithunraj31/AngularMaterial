import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = [
    'setName',
    'productId',
    'productName',
    'description',
    'values',

  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  subColumns: string[] = [
    "price",
    "moq",
    "leadTime",
    "obicNo",
    "quantity",
  ]
  dataSource: Array<any> = [];
  spans = [];
  spanningColumns = ['productId', 'productName', 'description'];
  tempRowId = null;
  tempRowCount = null;

  constructor() {
    // this.cacheSpan('productId', d => d.productId);
    // this.cacheSpan('productName', d => d.productName);
    // this.cacheSpan('description', d => d.description);
  }

  ngOnInit() {
    this.populateData(DATA);
    // console.log(this.dataSource);
    // console.log(this.displayedColumns);
  }

  populateData(data: any) {
    data.forEach(productSet => {
      productSet.products.forEach(product => {
        this.subColumns.forEach(column => {
  
          let temp: any = {
            "productId": product.productId,
            "productName": product.productName,
            "description": product.description,
            "values": column,
            "color": product.color,
            "setColor": productSet.color,
            "setName": productSet.productName
  
          }
          product.values.forEach(dateItem => {
            temp[this.getDateString(dateItem.date)] = dateItem[column];
  
          });
          this.dataSource.push(temp);
        })
        
      });
    });
    this.addColumnsToTables(data[0].products[0].values);
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
    if(set) 
      return { 'background-color': data.setColor};
    
    return { 'background-color': data.color};
  }

  // /**
  //  * Evaluated and store an evaluation of the rowspan for each row.
  //  * The key determines the column it affects, and the accessor determines the
  //  * value that should be checked for spanning.
  //  */
  // cacheSpan(key, accessor) {
  //   for (let i = 0; i < this.dataSource.length;) {
  //     let currentValue = accessor(this.dataSource[i]);
  //     let count = 1;

  //     // Iterate through the remaining rows to see how many match
  //     // the current value as retrieved through the accessor.
  //     for (let j = i + 1; j < this.dataSource.length; j++) {        
  //       if (currentValue != accessor(this.dataSource[j])) {
  //         break;
  //       }

  //       count++;
  //     } 

  //     if (!this.spans[i]) {
  //       this.spans[i] = {};
  //     }

  //     // Store the number of similar values that were found (the span)
  //     // and skip i to the next unique row.
  //     this.spans[i][key] = count;
  //     i += count;
  //   }
  // }

  getRowSpanSet(col, index) {
    console.log(col,index);
    const rowVal = this.dataSource[index];
    const cellVal = rowVal[col];
    let count = 0;
    for (let row of this.dataSource) {
      if(cellVal == row[col])
      count++;
    }
    return count;
  }
  getRowSpan(col, index) {
    
    return 5;
  }

  isTheSame(column,index) {
    let result = false;
    const i = index;
    if (i==0){
      result = false;
    }else{
    const valObj = this.dataSource[i];
    const preObj = this.dataSource[i-1];

    if(valObj[column]==preObj[column]){
      result = true;
    } 
    // console.log (valObj[column],preObj[column]);
  }
    return result;
  }
}

const DATA = [
  {
    productId: "1",
    productName: "sample set 1",
    color: "#4db6ac",
    products: [
      {
        "productId": 315,
        "productName": "Sensor",
        "description": "Vehicle sensor",
        "color": "#c5cae9",
        "values":
          [
            {
              "date": "2019-12-06T01:08:08",
              "price": 32553,
              "moq": 30,
              "leadTime": 20,
              "obicNo": "30",
              "quantity": 94,
            },
            {
              "date": "2019-12-07T01:08:08",
              "price": 32553,
              "moq": 30,
              "leadTime": 20,
              "obicNo": "30",
              "quantity": 94,
            },
            {
              "date": "2019-12-08T01:08:08",
              "price": 32553,
              "moq": 30,
              "leadTime": 20,
              "obicNo": "30",
              "quantity": 94,
            },
            {
              "date": "2019-12-09T01:08:08",
              "price": 32553,
              "moq": 30,
              "leadTime": 20,
              "obicNo": "30",
              "quantity": 94,
            },
            {
              "date": "2019-12-10T01:08:08",
              "price": 32553,
              "moq": 30,
              "leadTime": 20,
              "obicNo": "30",
              "quantity": 94,
            },
            {
              "date": "2019-12-11T01:08:08",
              "price": 32553,
              "moq": 30,
              "leadTime": 20,
              "obicNo": "30",
              "quantity": 94,
            },
            {
              "date": "2019-12-12T01:08:08",
              "price": 32553,
              "moq": 30,
              "leadTime": 20,
              "obicNo": "30",
              "quantity": 94,
            },
            {
              "date": "2019-12-13T01:08:08",
              "price": 32553,
              "moq": 30,
              "leadTime": 20,
              "obicNo": "30",
              "quantity": 94,
            },
            {
              "date": "2019-12-14T01:08:08",
              "price": 32553,
              "moq": 30,
              "leadTime": 20,
              "obicNo": "30",
              "quantity": 94,
            },
            {
              "date": "2019-12-15T01:08:08",
              "price": 32553,
              "moq": 30,
              "leadTime": 20,
              "obicNo": "30",
              "quantity": 94,
            },
            {
              "date": "2019-12-16T01:08:08",
              "price": 32553,
              "moq": 30,
              "leadTime": 20,
              "obicNo": "30",
              "quantity": 94,
            },
            {
              "date": "2019-12-17T01:08:08",
              "price": 32553,
              "moq": 30,
              "leadTime": 20,
              "obicNo": "30",
              "quantity": 94,
            },
          ]
    
      },
      {
        "productId": 316,
        "productName": "Camera",
        "description": "Front Camera",
        "color": "#81c784",
        "values":
          [
            {
              "date": "2019-12-06T01:08:08",
              "price": 32553,
              "moq": 30,
              "leadTime": 20,
              "obicNo": "30",
              "quantity": 94,
            },
            {
              "date": "2019-12-07T01:08:08",
              "price": 32553,
              "moq": 30,
              "leadTime": 20,
              "obicNo": "30",
              "quantity": 94,
            },
            {
              "date": "2019-12-08T01:08:08",
              "price": 32553,
              "moq": 30,
              "leadTime": 20,
              "obicNo": "30",
              "quantity": 94,
            },
            {
              "date": "2019-12-09T01:08:08",
              "price": 32553,
              "moq": 30,
              "leadTime": 20,
              "obicNo": "30",
              "quantity": 94,
            },
          ]
    
      },
    ]
  },
  {
    productId: "2",
    productName: "sample set 2",
    color: "#fff176",
    products: [
      {
        "productId": 315,
        "productName": "Sensor",
        "description": "Vehicle sensor",
        "color": "#c5cae9",
        "values":
          [
            {
              "date": "2019-12-06T01:08:08",
              "price": 32553,
              "moq": 30,
              "leadTime": 20,
              "obicNo": "30",
              "quantity": 94,
            },
            {
              "date": "2019-12-07T01:08:08",
              "price": 32553,
              "moq": 30,
              "leadTime": 20,
              "obicNo": "30",
              "quantity": 94,
            },
            {
              "date": "2019-12-08T01:08:08",
              "price": 32553,
              "moq": 30,
              "leadTime": 20,
              "obicNo": "30",
              "quantity": 94,
            },
            {
              "date": "2019-12-09T01:08:08",
              "price": 32553,
              "moq": 30,
              "leadTime": 20,
              "obicNo": "30",
              "quantity": 94,
            },
            {
              "date": "2019-12-10T01:08:08",
              "price": 32553,
              "moq": 30,
              "leadTime": 20,
              "obicNo": "30",
              "quantity": 94,
            },
            {
              "date": "2019-12-11T01:08:08",
              "price": 32553,
              "moq": 30,
              "leadTime": 20,
              "obicNo": "30",
              "quantity": 94,
            },
            {
              "date": "2019-12-12T01:08:08",
              "price": 32553,
              "moq": 30,
              "leadTime": 20,
              "obicNo": "30",
              "quantity": 94,
            },
            {
              "date": "2019-12-13T01:08:08",
              "price": 32553,
              "moq": 30,
              "leadTime": 20,
              "obicNo": "30",
              "quantity": 94,
            },
            {
              "date": "2019-12-14T01:08:08",
              "price": 32553,
              "moq": 30,
              "leadTime": 20,
              "obicNo": "30",
              "quantity": 94,
            },
            {
              "date": "2019-12-15T01:08:08",
              "price": 32553,
              "moq": 30,
              "leadTime": 20,
              "obicNo": "30",
              "quantity": 94,
            },
            {
              "date": "2019-12-16T01:08:08",
              "price": 32553,
              "moq": 30,
              "leadTime": 20,
              "obicNo": "30",
              "quantity": 94,
            },
            {
              "date": "2019-12-17T01:08:08",
              "price": 32553,
              "moq": 30,
              "leadTime": 20,
              "obicNo": "30",
              "quantity": 94,
            },
          ]
    
      },
      {
        "productId": 316,
        "productName": "Camera",
        "description": "Front Camera",
        "color": "#81c784",
        "values":
          [
            {
              "date": "2019-12-06T01:08:08",
              "price": 32553,
              "moq": 30,
              "leadTime": 20,
              "obicNo": "30",
              "quantity": 94,
            },
            {
              "date": "2019-12-07T01:08:08",
              "price": 32553,
              "moq": 30,
              "leadTime": 20,
              "obicNo": "30",
              "quantity": 94,
            },
            {
              "date": "2019-12-08T01:08:08",
              "price": 32553,
              "moq": 30,
              "leadTime": 20,
              "obicNo": "30",
              "quantity": 94,
            },
            {
              "date": "2019-12-09T01:08:08",
              "price": 32553,
              "moq": 30,
              "leadTime": 20,
              "obicNo": "30",
              "quantity": 94,
            },
          ]
    
      },
      {
        "productId": 317,
        "productName": "test",
        "description": "test Camera",
        "color": "#81c784",
        "values":
          [
            {
              "date": "2019-12-06T01:08:08",
              "price": 32553,
              "moq": 30,
              "leadTime": 20,
              "obicNo": "30",
              "quantity": 94,
            },
            {
              "date": "2019-12-07T01:08:08",
              "price": 32553,
              "moq": 30,
              "leadTime": 20,
              "obicNo": "30",
              "quantity": 94,
            },
            {
              "date": "2019-12-08T01:08:08",
              "price": 32553,
              "moq": 30,
              "leadTime": 20,
              "obicNo": "30",
              "quantity": 94,
            },
            {
              "date": "2019-12-09T01:08:08",
              "price": 32553,
              "moq": 30,
              "leadTime": 20,
              "obicNo": "30",
              "quantity": 94,
            },
          ]
    
      },
    ]
  }
 

]