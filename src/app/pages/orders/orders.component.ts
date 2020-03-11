import { UtilService } from './../../services/UtilService';
import { UnfulfilledProductsComponent } from './../../dialogs/unfulfilled-products/unfulfilled-products.component';
import { FulfillOrderDialogComponent } from './../../dialogs/fulfill-order-dialog/fulfill-order-dialog.component';
import { SaveOrder } from './../../models/SaveOrder';
import { AddOrderDialogComponent } from './../../dialogs/add-order-dialog/add-order-dialog.component';
import { OrderedProduct } from './../../models/OrderedProduct';
import { Customer } from 'src/app/models/Customer';
import { OrderService } from './../../services/OrderService';
import { MatTableDataSource, MatTable, MatPaginator, MatDialog, MatSort } from '@angular/material';
import { Order } from './../../models/Order';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewCustomerDialogComponent } from 'src/app/dialogs/view-customer-dialog/view-customer-dialog.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { EditOrderDialogComponent } from 'src/app/dialogs/edit-order-dialog/edit-order-dialog.component';
import { DeleteConfirmationDialogComponent } from 'src/app/dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { UnfulfillConfirmationComponent } from 'src/app/dialogs/unfulfill-confirmation/unfulfill-confirmation.component';

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
    'actions'
  ];
  progress = false;
  orders: Order[] = [];
  id: string;
  private searchSub: any;
  dataSource = new MatTableDataSource<Order>();
  @ViewChild(MatTable, { static: true }) table: MatTable<any>
  @ViewChild('paginatorTop', { static: true }) paginatorTop: MatPaginator;
  @ViewChild('paginatorBottom', { static: true }) paginatorBottom: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private orderService: OrderService,
    public util: UtilService  ) { }

  ngOnInit() {
    this.getOrderData();
    this.dataSource.paginator = this.paginatorTop;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch(property) {
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
    this.dataSource.filterPredicate = (data, filter: string)  => {
      const accumulator = (currentTerm, key) => {
        return key === 'contractor' ? currentTerm + data.contractor.customerName : 
        key === 'salesUser' ? currentTerm + data.salesUser.firstName : 
        key === 'salesDestination' ? currentTerm + data.salesDestination.customerName :
        key === 'customer' ? currentTerm + data.customer.customerName :currentTerm + data[key];
      };
      const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
      // Transform the filter by converting it to lowercase and removing whitespace.
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) !== -1;
    };
  }

  onTopPaginateChange(){
    this.paginatorBottom.length = this.dataSource.data.length;
    this.paginatorBottom.pageSize = this.paginatorTop.pageSize;
    this.paginatorBottom.pageIndex = this.paginatorTop.pageIndex;
  }
  onBottomPaginateChange(event){
    if(event.previousPageIndex<event.pageIndex && event.pageIndex-event.previousPageIndex==1) {
      this.paginatorTop.nextPage();
    }
    if(event.previousPageIndex>event.pageIndex && event.pageIndex-event.previousPageIndex==-1) {
      this.paginatorTop.previousPage();
    }
    if(event.previousPageIndex<event.pageIndex && event.pageIndex-event.previousPageIndex>1) {
      this.paginatorTop.lastPage();
    }
    if(event.previousPageIndex>event.pageIndex && event.previousPageIndex-event.pageIndex>1) {
      this.paginatorTop.firstPage();
    }
    this.paginatorTop._changePageSize(this.paginatorBottom.pageSize);

  }

  getOrderData() {
    this.progress = true;
    this.orderService.getOrders().subscribe(result => {
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
  openDialog() {
    const dialogRef = this.dialog.open(AddOrderDialogComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        console.log(result);
        this.progress = true;
        const order: SaveOrder = result;
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


}
