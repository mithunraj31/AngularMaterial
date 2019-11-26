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
    'recievedDate',
    'dueDate',
    'salesUser',
    'actions'
  ];
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
    this.orderService.getOrders().subscribe(result => {
      this.orders = result;
      this.dataSource.data = this.orders;
      console.log(this.orders);
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
        const order: Order = result;
        // change concat to replace when using real api
        this.orders.push(order);
        this.dataSource.data = this.orders;
      }
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editOrder(order: Order) {
    const dialogRef = this.dialog.open(EditOrderDialogComponent, {
      width: '600px',
      data: order
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        const order: Order = result;
        // change concat to replace when using real api
        console.log(order);
      }
    });
  }
  deleteOrder(order: Order) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '600px',
      data: this.orders[this.orders.indexOf(order)].proposalNo
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        console.log(this.orders.indexOf(order));
      this.orders.splice(this.orders.indexOf(order),1);
      this.dataSource.data = this.orders;
      }
    });
  }


}
