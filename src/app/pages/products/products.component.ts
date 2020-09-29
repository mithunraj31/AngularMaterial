import { ExcelServices } from './../../services/ExcelService';
import { UtilService } from './../../services/UtilService';
import { DeleteConfirmationDialogComponent } from './../../dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { ProductService } from './../../services/ProductService';
import { AddProductDialogComponent } from './../../dialogs/add-product-dialog/add-product-dialog.component';
import { Product } from './../../models/Product';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatTable, MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { UpdateProductDialogComponent } from 'src/app/dialogs/update-product-dialog/update-product-dialog.component';
import * as XLSX from 'xlsx';
import { DataChangedDialogComponent } from 'src/app/dialogs/data-changed-dialog/data-changed-dialog.component';
import { ProductsExportSelectDateComponent } from 'src/app/dialogs/products-export-select-date/products-export-select-date.component';

type AOA = any[][];


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {
  loadTime: Date;
  displayedColumns: string[] = [
    'productName',
    'description',
    'price',
    'quantity',
    'leadTime',
    'moq',
    'obicNo',
    'sort',
    'actions'
  ];
  products: Product[] = [];
  productName: string;
  dataSource = new MatTableDataSource<Product>();
  progress = false;
  data: AOA = [[1, 2], [3, 4]];
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild('paginatorTop', { static: true }) paginatorTop: MatPaginator;
  @ViewChild('paginatorBottom', { static: true }) paginatorBottom: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('importFile', { static: true }) importFile: ElementRef;
  constructor(
    public dialog: MatDialog,
    public productService: ProductService,
    public util: UtilService,
    private excel: ExcelServices) { }

  ngOnInit() {
    this.getProductData();
    this.dataSource.paginator = this.paginatorTop;
    this.dataSource.sort = this.sort;

  }
  getProductData() {
    this.progress = true;
    this.productService.getProducts().subscribe(result => {
      this.products = result;
      this.dataSource.data = this.products;
      this.loadTime = new Date();
      this.progress = false;
      this.onTopPaginateChange();
    }, error => {
      this.progress = false;
    })
  }

  onTopPaginateChange() {
    this.paginatorBottom.length = this.dataSource.data.length;
    this.paginatorBottom.pageSize = this.paginatorTop.pageSize;
    this.paginatorBottom.pageIndex = this.paginatorTop.pageIndex;
  }
  onBottomPaginateChange(event) {
    if (event.previousPageIndex < event.pageIndex && event.pageIndex - event.previousPageIndex == 1) {
      this.paginatorTop.nextPage();
    }
    if (event.previousPageIndex > event.pageIndex && event.pageIndex - event.previousPageIndex == -1) {
      this.paginatorTop.previousPage();
    }
    if (event.previousPageIndex < event.pageIndex && event.pageIndex - event.previousPageIndex > 1) {
      this.paginatorTop.lastPage();
    }
    if (event.previousPageIndex > event.pageIndex && event.previousPageIndex - event.pageIndex > 1) {
      this.paginatorTop.firstPage();
    }
    this.paginatorTop._changePageSize(this.paginatorBottom.pageSize);

  }


  openDialog(): void {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      width: '600px',
      data: this.products
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
          this.getProductData();
      }
    });
  }

  async editProduct(i: any) {
    const data = this.products[this.products.indexOf(i)];
    let isChanged = await this.isDataChanged(data.productId);
    if (isChanged.status) { // when data is changed
      //Load Warning popup
      const dialogRef = this.dialog.open(DataChangedDialogComponent, {
        width: '600px',
        data: isChanged
      });

      dialogRef.afterClosed().subscribe(result => {
        this.getProductData();
      });
    } else { // When data is not changed.
      const dialogRef = this.dialog.open(UpdateProductDialogComponent, {
        width: '600px',
        data: {
          allproducts:this.products,
          editableProduct:data,
          loadTime:this.loadTime
        }
      });

       dialogRef.afterClosed().subscribe(async result => {
         if(result){
        this.getProductData();
         }
       });
    }
  }

  async deleteProduct(i: any) {
    const data = this.products[this.products.indexOf(i)]
    if (data) { // when result is valid
      let isChanged = await this.isDataChanged(data.productId);
      if (isChanged.status) { // when data is changed
        //Load Warning popup
        const dialogRef = this.dialog.open(DataChangedDialogComponent, {
          width: '600px',
          data: isChanged
        });

        dialogRef.afterClosed().subscribe(result => {
          this.getProductData();
        });
      } else { // When data is not changed.
        const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
          width: '600px',
          data: data.productName
        });

        dialogRef.afterClosed().subscribe(async result => {
          if (result) {
            if (result) { // when result is valid
              let isChanged = await this.isDataChanged(data.productId);
              if (isChanged.status) { // when data is changed
                //Load Warning popup
                const dialogRef = this.dialog.open(DataChangedDialogComponent, {
                  width: '600px',
                  data: isChanged
                });

                dialogRef.afterClosed().subscribe(result => {
                  this.getProductData();
                });
              } else { // When data is not changed.
                this.progress = true;
                this.productService.deleteProduct(data.productId).subscribe(result => {
                  this.getProductData();
                }, error => {
                  this.progress = false;
                })
              }
            }
          }
        });

      }
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      this.insertDataAsAnArray(this.data);
    };
    reader.readAsBinaryString(target.files[0]);
  }
  insertDataAsAnArray(excelData: any[]) {
    let productArray: Product[] = [];
    let promiseArray: Promise<any>[] = [];
    excelData.slice(0).forEach((row) => {
      let valid = true;
      let tempProduct: Product = {

        obicNo: row[0] ? row[0] : " ",
        productName: row[1] ? row[1] : (valid = false),
        description: row[2] ? row[2] : (valid = false),
        currency: (row[3] == "USD" || row[3] == "JPY") ? row[3] : (valid = false),
        price: row[4] ? row[4] : (valid = false),
        moq: row[5] ? row[5] : 0,
        quantity: row[6] ? row[6] : 0,
        leadTime: row[7] ? row[7] : (valid = false),

      };
      if (valid) {
        let promise = new Promise((resolve, reject) => {

          this.productService.saveProduct(tempProduct).toPromise().then(() => {
            resolve();
          }).catch(() => {
            reject();
          })
        })
        promiseArray.push(promise);
      }
    })
    Promise.all(promiseArray).then(() => {
      this.getProductData();
    });
  }
  downloadTemplate() {
    window.location.href = "assets/downloads/Product-Import-Template.xlsx";
  }
  clickImport() {
    this.importFile.nativeElement.click();
  }

  clickExport() {
    const dialogRef = this.dialog.open(ProductsExportSelectDateComponent);

    dialogRef.afterClosed().subscribe(requestedDate => {
      if(requestedDate){
        this.productService.getProductHistory(requestedDate).subscribe(products=>{
          this.excel.generateExcel(products, requestedDate);

        })
      }
    });
  }
  clickDisplay(product: Product, val: boolean) {
    product.display = val;
    this.productService.updateProduct(product).subscribe(() => {
      this.getProductData();
    })
  }

  isDataChanged(orderId: number) {
    let lastEditedTime: Date;
    return new Promise<any>((resolve, reject) => {
      this.productService.getProductById(orderId).subscribe(result => {
        lastEditedTime = new Date(result.updatedAt);
        if (lastEditedTime > this.loadTime) {

          return resolve({
            status: true, user: result.user,
            editReason: result.editReason,
            updatedAt: result.updatedAt
          });
        }
        else {

          return resolve({ status: false, user: result.user });
        }
      });
    });
  }
}
