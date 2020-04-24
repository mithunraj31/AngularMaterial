import { Component, OnInit, ViewChild } from '@angular/core';
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
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-fulfilled-orders',
  templateUrl: './fulfilled-orders.component.html',
  styleUrls: ['./fulfilled-orders.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ]),]
})
export class FulfilledOrdersComponent implements OnInit {

  expandedElement;
  columnsToDisplay: string[] = [
    'proposalNo',
    'customerName',
    'salesDestination',
    'contractor',
    'receivedDate',
    'dueDate',
    'deliveryDate',
    'salesUser',
    // 'actions'
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
      if (params.id && params.id != 'fulfilled') {
        this.id = params.id;

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

  getOrderData() {
    this.progress = true;
    this.orderService.getFulfilledOrders().subscribe(result => {
      this.orders = result;
      this.dataSource.data = this.orders;
      console.log(this.orders);
      this.progress = false;
      this.onTopPaginateChange();
    }, error => {
      this.progress = false;
      console.log(error);
    })

  }
  viewCustomer(customer: Customer) {
    const dialogRef = this.dialog.open(ViewCustomerDialogComponent, {
      width: '600px',
      data: customer
    });
  }
  openDialog(isFixed: boolean) {
    const dialogRef = this.dialog.open(AddOrderDialogComponent, {
      width: '600px',
      data: isFixed
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        console.log(result);
        this.progress = true;
        const order: SaveOrder = result;
        order.fixed = isFixed;
        // change concat to replace when using real api
        this.orderService.addOrder(order).subscribe(result => {
          this.getOrderData();
          console.log(result);
        }, error => {
          console.log(error);
          this.progress = false;
        })
      }
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editOrder(data: Order) {
    console.log(data);
    const dialogRef = this.dialog.open(EditOrderDialogComponent, {
      width: '600px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
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
    });
  }

  fullFillOrder(data: Order) {
    const dialogRef = this.dialog.open(FulfillOrderDialogComponent, {
      width: '600px',
      data: data.proposalNo
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.progress = true;
        this.orderService.fulfillOrder(data.orderId).subscribe(result => {
          this.getOrderData();
        }, error => {
          // open unfulfilled porducts
          console.log(error.error.unfulfilled);
          const dialogRef = this.dialog.open(UnfulfilledProductsComponent, {
            width: '600px',
            data: error.error.unfulfilled
          });
          this.progress = false;
        })
      }
    });
  }
  unFullFillOrder(data: Order) {
    const dialogRef = this.dialog.open(UnfulfillConfirmationComponent, {
      width: '600px',
      data: data.proposalNo
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.progress = true;
        this.orderService.unFulfillOrder(data.orderId).subscribe(result => {
          this.getOrderData();
        }, error => {
          this.progress = false;
        })
      }
    });
  }

  deleteOrder(order: Order) {
    const data = this.orders[this.orders.indexOf(order)];
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '600px',
      data: data.proposalNo
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.progress = true;
        this.orderService.deleteOrder(data.orderId).subscribe(result => {
          this.getOrderData();
        }, error => {
          this.progress = false;
        })
      }
    });
  }
  transferToConfirmedOrder(order: Order) {
    const dialogRef = this.dialog.open(TransferToConfirmedOrderComponent, {
      width: '600px',
      data: order
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.progress = true;
        const orderUpdate: SaveOrder = result;
        orderUpdate.fixed = true;
        orderUpdate.editReason = "Transfer to Confirmed";
        orderUpdate.proposalNo = order.proposalNo;
        orderUpdate.customerId = order.customer.customerId;
        orderUpdate.userId = order.user.userId;
        orderUpdate.dueDate = new Date(order.dueDate).toISOString();
        this.orderService.editOrder(orderUpdate).subscribe(result => {
          this.getOrderData();
          console.log(result);
        }, error => {
          this.progress = false;
          console.log(error);
        });
      }
    });
  }

}
