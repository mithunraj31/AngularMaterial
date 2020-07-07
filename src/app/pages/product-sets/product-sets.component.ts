import { ProductComponent } from './../../models/ProductComponent';
import { UtilService } from './../../services/UtilService';
import { SaveProductSet } from './../../models/saveProductSet';
import { AddProductSetDialogComponent } from './../../dialogs/add-product-set-dialog/add-product-set-dialog.component';
import { ProductSet } from './../../models/ProductSet';
import { ProductService } from './../../services/ProductService';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable, MatPaginator, MatDialog, MatSort } from '@angular/material';
import { Product } from 'src/app/models/Product';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { EditProductSetDialogComponent } from 'src/app/dialogs/edit-product-set-dialog/edit-product-set-dialog.component';
import { DeleteConfirmationDialogComponent } from 'src/app/dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { SaveProductComponent } from 'src/app/models/saveProductComponent';
import { DataChangedDialogComponent } from 'src/app/dialogs/data-changed-dialog/data-changed-dialog.component';

@Component({
  selector: 'app-product-sets',
  templateUrl: './product-sets.component.html',
  styleUrls: ['./product-sets.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ]),]
})
export class ProductSetsComponent implements OnInit {
  loadTime: Date;
  columnsToDisplay: string[] = [
    'productName',
    'description',
    'price',
    // 'quantity',
    // 'leadTime',
    // 'moq',
    'obicNo',
    'actions'
  ];
  progress = false;
  dataSource = new MatTableDataSource<Product>();
  productSets: ProductSet[];
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild('paginatorTop', { static: true }) paginatorTop: MatPaginator;
  @ViewChild('paginatorBottom', { static: true }) paginatorBottom: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  expandedElement: ProductSet | null;
  constructor(
    private productService: ProductService,
    public dialog: MatDialog,
    public util: UtilService
  ) { }

  ngOnInit() {
    this.getProductSetData();
    this.dataSource.paginator = this.paginatorTop;
    this.dataSource.sort = this.sort;
  }

  getProductSetData() {
    this.progress = true;
    this.productService.getProductSets().subscribe(result => {
      this.productSets = result;
      this.dataSource.data = this.productSets;
      this.loadTime = new Date();
      this.progress = false;
      this.onTopPaginateChange();
    }, error => {
      this.progress = false;
    })
  }
  async deleteProduct(i: any) {
    const data = this.productSets[this.productSets.indexOf(i)];
    let isChanged = await this.isDataChanged(data.productId);
    if (isChanged.status) { // when data is changed
      //Load Warning popup
      const dialogRef = this.dialog.open(DataChangedDialogComponent, {
        width: '600px',
        data: isChanged
      });

      dialogRef.afterClosed().subscribe(result => {
        this.getProductSetData();
      });
    } else { // When data is not changed.
      const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
        width: '1000px',
        data: data.productName
      });

      dialogRef.afterClosed().subscribe(async result => {
        if (result) {
          let isChanged = await this.isDataChanged(data.productId);
          if (isChanged.status) { // when data is changed
            //Load Warning popup
            const dialogRef = this.dialog.open(DataChangedDialogComponent, {
              width: '600px',
              data: isChanged
            });

            dialogRef.afterClosed().subscribe(result => {
              this.getProductSetData();
            });
          } else { // When data is not changed.
            this.progress = true;
            this.productService.deleteProductSet(data.productId).subscribe(result => {
              this.getProductSetData();

            }, error => {
              this.progress = true;
              console.log(error);
            })
          }
        }
      });
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddProductSetDialogComponent, {
      width: '600px',
      data: this.productSets.length + 1
    });

    dialogRef.afterClosed().subscribe(result => {

      console.log(result);
      if (result) {
        this.progress = true;
        this.productService.addProductSet(result).subscribe(result => {
          this.getProductSetData();
        }, error => {
          console.log(error);
          this.progress = false;
        })
      }
    });
  }
  async editProductSet(data: ProductSet) {
    let isChanged = await this.isDataChanged(data.productId);
    if (isChanged.status) { // when data is changed
      //Load Warning popup
      const dialogRef = this.dialog.open(DataChangedDialogComponent, {
        width: '600px',
        data: isChanged
      });

      dialogRef.afterClosed().subscribe(result => {
        this.getProductSetData();
      });
    } else { // When data is not changed.
      const dialogRef = this.dialog.open(EditProductSetDialogComponent, {
        width: '600px',
        data: data
      });

      dialogRef.afterClosed().subscribe(async result => {
        console.log('The dialog was closed');
        if (result) {
          let isChanged = await this.isDataChanged(data.productId);
          if (isChanged.status) { // when data is changed
            //Load Warning popup
            const dialogRef = this.dialog.open(DataChangedDialogComponent, {
              width: '600px',
              data: isChanged
            });

            dialogRef.afterClosed().subscribe(result => {
              this.getProductSetData();
            });
          } else { // When data is not changed.
            this.progress = true;
            console.log(result);
            const productset: SaveProductSet = result;
            productset.productId = data.productId;
            productset.display = data.display;
            this.productService.editProductSet(productset).subscribe(result => {
              console.log(result);
              this.getProductSetData();
            }, error => {
              this.progress = false;
            })
          }
        }
      });
    }
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
  clickDisplay(product: ProductSet, val: boolean) {
    let ps: SaveProductComponent[] = [];
    product.products.forEach((e) => {
      const x: SaveProductComponent = {
        productId: e.product.productId,
        quantity: e.quantity
      }
      ps.push(x);
    })

    const p: SaveProductSet = {
      color: product.color,
      currency: product.currency,
      description: product.description,
      display: val,
      leadTime: product.leadTime,
      moq: product.moq,
      obicNo: product.obicNo,
      price: product.price,
      productId: product.productId,
      productName: product.productName,
      quantity: product.quantity,
      userId: product.userId,
      products: ps,
      sort: product.sort
    }


    this.productService.editProductSet(p).subscribe(() => {
      this.getProductSetData();
    })
  }

  isDataChanged(orderId: number) {
    let lastEditedTime: Date;
    return new Promise<any>((resolve, reject) => {
      this.productService.getProductSetById(orderId).subscribe(result => {
        lastEditedTime = new Date(result.updatedAt);
        console.log(result);
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
