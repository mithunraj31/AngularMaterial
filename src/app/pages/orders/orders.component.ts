import { SaveOrder } from './../../models/SaveOrder';
import { AddOrderDialogComponent } from './../../dialogs/add-order-dialog/add-order-dialog.component';
import { OrderedProduct } from './../../models/OrderedProduct';
import { Customer } from 'src/app/models/Customer';
import { OrderService } from './../../services/OrderService';
import { MatTableDataSource, MatTable, MatPaginator, MatDialog } from '@angular/material';
import { Order } from './../../models/Order';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewCustomerDialogComponent } from 'src/app/dialogs/view-customer-dialog/view-customer-dialog.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { EditOrderDialogComponent } from 'src/app/dialogs/edit-order-dialog/edit-order-dialog.component';
import { DeleteConfirmationDialogComponent } from 'src/app/dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),]
})
export class OrdersComponent implements OnInit {
  expandedElement;
  columnsToDisplay: string[] = [
    'proposalNo',
    'customer',
    'salesDestination',
    'contractor',
    'receivedDate',
    'dueDate',
    'salesUser',
    'actions'
  ];
  progress = false;
  orders: Order[] = [];
  dataSource = new MatTableDataSource<Order>();
  @ViewChild(MatTable, { static: true }) table: MatTable<any>
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    public dialog: MatDialog,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.getOrderData();
    this.dataSource.paginator = this.paginator;
  }

  getOrderData() {
    this.progress = true;
    this.orderService.getOrders().subscribe(result => {
      this.orders = result;
      this.dataSource.data = this.orders;
      console.log(this.orders);
      this.progress = false;
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
