import { DataChangedDialogComponent } from './../../../dialogs/data-changed-dialog/data-changed-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Order } from 'src/app/models/Order';
import { MatTableDataSource, MatTable, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/OrderService';
import { UtilService } from 'src/app/services/UtilService';
import { Customer } from 'src/app/models/Customer';
import { ViewCustomerDialogComponent } from 'src/app/dialogs/view-customer-dialog/view-customer-dialog.component';
import { AddOrderDialogComponent } from 'src/app/dialogs/add-order-dialog/add-order-dialog.component';
import { SaveOrder } from 'src/app/models/SaveOrder';
import { EditOrderDialogComponent } from 'src/app/dialogs/edit-order-dialog/edit-order-dialog.component';
import { FulfillOrderDialogComponent } from 'src/app/dialogs/fulfill-order-dialog/fulfill-order-dialog.component';
import { UnfulfilledProductsComponent } from 'src/app/dialogs/unfulfilled-products/unfulfilled-products.component';
import { UnfulfillConfirmationComponent } from 'src/app/dialogs/unfulfill-confirmation/unfulfill-confirmation.component';
import { DeleteConfirmationDialogComponent } from 'src/app/dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { TransferToConfirmedOrderComponent } from 'src/app/dialogs/transfer-to-confirmed-order/transfer-to-confirmed-order.component';
import { Product } from 'src/app/models/Product';
import { ArgumentOutOfRangeError } from 'rxjs';
import { OrderedProduct } from 'src/app/models/OrderedProduct';
import { UndoConfimationDialogComponent } from 'src/app/dialogs/undo-confimation-dialog/undo-confimation-dialog.component';
import { resolve } from 'url';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ]),]
})
export class OrdersComponent implements OnInit {
  loadTime: Date;
  expandedElement;
  columnsToDisplay: string[] = [
    'proposalNo',
    'customerName',
    'salesDestination',
    'contractor',
    'amount',
    'receivedDate',
    'dueDate',
    'deliveryDate',
    'salesUser',
    'actions'
  ];
  progress = false;
  orders: Order[] = [];
  id: string;
  private searchSub: any;
  dataSource = new MatTableDataSource<Order>();
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild('paginatorTop', { static: true }) paginatorTop: MatPaginator;
  @ViewChild('paginatorBottom', { static: true }) paginatorBottom: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  sortCheckbox: SortCheckbox;
  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private orderService: OrderService,
    public util: UtilService) { }

  ngOnInit() {
    this.getOrderData();
    this.dataSource.paginator = this.paginatorTop;
    this.dataSource.sortingDataAccessor = (item, property) => {

      switch (property) {
        case 'customerName': return item.customer.customerName;
        case 'salesDestination': return item.salesDestination.customerName;
        case 'contractor': return item.contractor.customerName;
        case 'salesUser': return item.salesUser.firstName;
        default: return item[property];
      }
    };
    this.searchSub = this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {

        this.applyFilter(this.id);
      }
    });
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = (data, filter: string) => {
      const accumulator = (currentTerm, key) => {
        return key === 'contractor' ? currentTerm + data.contractor.customerName :
          key === 'salesUser' ? currentTerm + data.salesUser.firstName :
            key === 'salesDestination' ? currentTerm + data.salesDestination.customerName :
              key === 'customer' ? currentTerm + data.customer.customerName : currentTerm + data[key];
      };
      const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
      // Transform the filter by converting it to lowercase and removing whitespace.
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) !== -1;
    };
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
  onClickSortCheckbox() {
    localStorage.setItem("ordersSortChecklist", JSON.stringify(this.sortCheckbox));
    this.getOrderData();
  }
  getOrderData() {
    const ordersSortChecklist = localStorage.getItem("ordersSortChecklist");
    if (ordersSortChecklist) {
      this.sortCheckbox = JSON.parse(ordersSortChecklist);
    } else {
      this.sortCheckbox = {
        fcst: true,
        withKitting: true,
        withoutKitting: true,
        wait: true
      }
      localStorage.setItem("ordersSortChecklist", JSON.stringify(this.sortCheckbox));

    }
    this.progress = true;
    this.orderService.getOrders(this.sortCheckbox).subscribe(result => {
      this.orders = result;
      this.dataSource.data = this.orders;
      this.loadTime = new Date();

      this.progress = false;
      this.onTopPaginateChange();
    }, error => {
      this.progress = false;

    })

  }
  viewCustomer(customer: Customer) {
    const dialogRef = this.dialog.open(ViewCustomerDialogComponent, {
      width: '600px',
      data: customer
    });
  }
  openDialog(isFixed: boolean, Data?:Order) {
    const dialogRef = this.dialog.open(AddOrderDialogComponent, {
      width: '600px',
      data: {
        isFixed: isFixed,
        order: Data},
        disableClose: true
    }
    );

    dialogRef.afterClosed().subscribe(result => {

      if (result) {

        this.progress = true;
        const order: SaveOrder = result;
        order.fixed = isFixed;
        // change concat to replace when using real api
        this.orderService.addOrder(order).subscribe(result => {
          this.getOrderData();

        }, error => {

          this.progress = false;
        })
      }
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async editOrder(data: Order) {
    let isChanged = await this.isDataChanged(data.orderId);
    console.log(isChanged);
    if (isChanged.status) { // when data is changed
      //Load Warning popup
      const dialogRef = this.dialog.open(DataChangedDialogComponent, {
        width: '600px',
        data: isChanged,
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(result => {
        this.getOrderData();
      });
    } else { // When data is not changed.
      const dialogRef = this.dialog.open(EditOrderDialogComponent, {
        width: '600px',
        data: data,
        disableClose: true
      });
      // open edit dialog 
      dialogRef.afterClosed().subscribe(async result => {
        if (result) {// when result is valid
          let isChanged = await this.isDataChanged(data.orderId);
          if (isChanged.status) { // when data is changed
            //Load Warning popup
            const dialogRef = this.dialog.open(DataChangedDialogComponent, {
              width: '600px',
              data: isChanged,
              disableClose: true
            });

            dialogRef.afterClosed().subscribe(result => {
              this.getOrderData();
            });
          } else { // When data is not changed.
            this.progress = true;
            const order: SaveOrder = result;
            order.orderId = data.orderId;
            order.forcast = data.forecast;
            order.fixed = data.fixed;
            this.orderService.editOrder(order).subscribe(result => {
              this.getOrderData();
            }, error => {
              this.progress = false;
            })
          }
        }
      });
    }
  }

  async fullFillOrder(data: Order) {
    let isChanged = await this.isDataChanged(data.orderId);
    if (isChanged.status) { // when data is changed
      //Load Warning popup
      const dialogRef = this.dialog.open(DataChangedDialogComponent, {
        width: '600px',
        data: isChanged
      });

      dialogRef.afterClosed().subscribe(result => {
        this.getOrderData();
      });
    } else { // When data is not changed.
      const dialogRef = this.dialog.open(FulfillOrderDialogComponent, {
        width: '600px',
        data: data.proposalNo
      });

      dialogRef.afterClosed().subscribe(async result => {

        if (result) { //when data is valid
          let isChanged = await this.isDataChanged(data.orderId);
          if (isChanged.status) { // when data is changed
            //Load Warning popup
            const dialogRef = this.dialog.open(DataChangedDialogComponent, {
              width: '600px',
              data: isChanged
            });

            dialogRef.afterClosed().subscribe(result => {
              this.getOrderData();
            });
          } else { // When data is not changed.
            this.progress = true;
            this.orderService.fulfillOrder(data.orderId).subscribe(result => {
              this.getOrderData();
            }, error => {
              // open unfulfilled porducts

              const dialogRef = this.dialog.open(UnfulfilledProductsComponent, {
                width: '600px',
                data: error.error.unfulfilled
              });
              this.progress = false;
            })
          }
        }
      });
    }
  }
  async unFullFillOrder(data: Order) {
    let isChanged = await this.isDataChanged(data.orderId);
    if (isChanged.status) { // when data is changed
      //Load Warning popup
      const dialogRef = this.dialog.open(DataChangedDialogComponent, {
        width: '600px',
        data: isChanged
      });

      dialogRef.afterClosed().subscribe(result => {
        this.getOrderData();
      });
    } else { // When data is not changed.
      const dialogRef = this.dialog.open(UnfulfillConfirmationComponent, {
        width: '600px',
        data: data.proposalNo
      });

      dialogRef.afterClosed().subscribe(async result => {
        if (result) {// when data is valid
          let isChanged = await this.isDataChanged(data.orderId);
          if (isChanged.status) { // when data is changed
            //Load Warning popup
            const dialogRef = this.dialog.open(DataChangedDialogComponent, {
              width: '600px',
              data: isChanged
            });

            dialogRef.afterClosed().subscribe(result => {
              this.getOrderData();
            });
          } else { // When data is not changed.
            this.progress = true;
            this.orderService.unFulfillOrder(data.orderId).subscribe(result => {
              this.getOrderData();
            }, error => {
              this.progress = false;
            })
          }
        }
      });
    }
  }

  async deleteOrder(order: Order) {
    let isChanged = await this.isDataChanged(order.orderId);
    if (isChanged.status) { // when data is changed
      //Load Warning popup
      const dialogRef = this.dialog.open(DataChangedDialogComponent, {
        width: '600px',
        data: isChanged
      });

      dialogRef.afterClosed().subscribe(result => {
        this.getOrderData();
      });
    } else { // When data is not changed.
      const data = this.orders[this.orders.indexOf(order)];
      const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
        width: '600px',
        data: data.proposalNo
      });

      dialogRef.afterClosed().subscribe(async result => {
        if (result) { //when data is valid
          let isChanged = await this.isDataChanged(data.orderId);
          if (isChanged.status) { // when data is changed
            //Load Warning popup
            const dialogRef = this.dialog.open(DataChangedDialogComponent, {
              width: '600px',
              data: isChanged
            });

            dialogRef.afterClosed().subscribe(result => {
              this.getOrderData();
            });
          } else { // When data is not changed.
            this.progress = true;
            this.orderService.deleteOrder(data.orderId).subscribe(result => {
              this.getOrderData();
            }, error => {
              this.progress = false;
            })
          }
        }
      });
    }
  }
  async transferToConfirmedOrder(order: Order) {
    let isChanged = await this.isDataChanged(order.orderId);
    if (isChanged.status) { // when data is changed
      //Load Warning popup
      const dialogRef = this.dialog.open(DataChangedDialogComponent, {
        width: '600px',
        data: isChanged
      });

      dialogRef.afterClosed().subscribe(result => {
        this.getOrderData();
      });
    } else { // When data is not changed.
      const dialogRef = this.dialog.open(TransferToConfirmedOrderComponent, {
        width: '600px',
        data: order
      });

      dialogRef.afterClosed().subscribe(async result => {

        if (result) { // when data is valid
          let isChanged = await this.isDataChanged(order.orderId);
          if (isChanged.status) { // when data is changed
            //Load Warning popup
            const dialogRef = this.dialog.open(DataChangedDialogComponent, {
              width: '600px',
              data: isChanged
            });

            dialogRef.afterClosed().subscribe(result => {
              this.getOrderData();
            });
          } else { // When data is not changed.
            this.progress = true;
            const orderUpdate: SaveOrder = result;
            orderUpdate.fixed = true;
            orderUpdate.editReason = "2";
            orderUpdate.proposalNo = order.proposalNo;
            orderUpdate.customerId = order.customer.customerId;
            orderUpdate.userId = order.user.userId;
            orderUpdate.dueDate = new Date(order.dueDate).toISOString();
            this.orderService.editOrder(orderUpdate).subscribe(result => {
              this.getOrderData();

            }, error => {
              this.progress = false;

            });
          }
        }
      });
    }
  }
  getLTEAmount(products: OrderedProduct[]) {
    let amount = 0;
    products.forEach((product) => {
      if (product.product.obicNo.includes('MAF')) {
        amount = amount + product.quantity;
      }
    });
    return amount;
  }
  clickDisplay(order: Order, val: boolean) {
    this.orderService.display(order.orderId, val).subscribe(() => {
      this.getOrderData();
    });
  }
  async backToFCST(order: Order) {
    let isChanged = await this.isDataChanged(order.orderId);
    if (isChanged.status) { // when data is changed
      //Load Warning popup
      const dialogRef = this.dialog.open(DataChangedDialogComponent, {
        width: '600px',
        data: isChanged
      });

      dialogRef.afterClosed().subscribe(result => {
        this.getOrderData();
      });
    } else { // When data is not changed.
      const dialogRef = this.dialog.open(UndoConfimationDialogComponent, {
        width: '600px',
        data: "notShipped"
      });

      dialogRef.afterClosed().subscribe(async result => {
        if (result) { // when result is valid
          let isChanged = await this.isDataChanged(order.orderId);
          if (isChanged.status) { // when data is changed
            //Load Warning popup
            const dialogRef = this.dialog.open(DataChangedDialogComponent, {
              width: '600px',
              data: isChanged
            });

            dialogRef.afterClosed().subscribe(result => {
              this.getOrderData();
            });
          } else { // When data is not changed.
            this.progress = true;
            this.orderService.backToFCST(order.orderId).subscribe(() => {
              this.getOrderData();
            });
          }
        }
      });
    }
  }
  isDataChanged(orderId: number) {
    let lastEditedTime: Date;
    return new Promise<any>((resolve, reject) => {
      this.orderService.getOrderById(orderId).subscribe(result => {
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
export interface SortCheckbox {
  fcst: boolean;
  wait: boolean;
  withKitting: boolean;
  withoutKitting: boolean;
}
