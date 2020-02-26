import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from 'src/app/services/CustomerService';
import { Customer } from 'src/app/models/Customer';
import { MatTableDataSource, MatTable, MatPaginator, MatDialog } from '@angular/material';
import { Product } from 'src/app/models/Product';
import { AddCustomerComponent } from 'src/app/dialogs/add-customer/add-customer.component';
import { DeleteConfirmationDialogComponent } from 'src/app/dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { EditCustomerDialogComponent } from 'src/app/dialogs/edit-customer-dialog/edit-customer-dialog.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  displayedColumns: string[] = [
    'customerName',
    'zip',
    'address',
    'tel',
    'contactName',
    'type',
    'actions'
  ];
  progress = false;
  customers: Customer[] = [];
  dataSource = new MatTableDataSource<Customer>();
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild('paginatorTop', { static: true }) paginatorTop: MatPaginator;
  @ViewChild('paginatorBottom', { static: true }) paginatorBottom: MatPaginator;
  constructor(
    public dialog: MatDialog,
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.getCustomers();
    this.dataSource.paginator = this.paginatorTop;
  }

  getCustomers() {
    this.progress = true;
    this.customerService.getCustomers().subscribe(result => {
      this.customers = result;
      this.dataSource.data = this.customers;
      this.progress = false;
      this.onTopPaginateChange();
    }, error => {
      this.progress = false;
    })
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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddCustomerComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.progress = true;
        const customer: Customer = result;
        this.customerService.addCustomer(result).subscribe(result => {
          this.getCustomers();
          this.progress = false;
        }, error => {
          this.progress = false;
        })

      }
    });
  }

  deleteCustomer(i: any) {
    const data = this.customers[this.customers.indexOf(i)]
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '600px',
      data: data.customerName
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.progress = true;
        this.customerService.deleteCustomer(data.customerId).subscribe(result => {
          this.getCustomers();
          this.progress = false;
          console.log(result);
        }, error => {
          console.log(error);
          this.progress = false;
        })
      }
    });

  }
  editCustomer(i: Customer) {
    const data = this.customers[this.customers.indexOf(i)];
    const dialogRef = this.dialog.open(EditCustomerDialogComponent, {
      width: '600px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        const customer: Customer = result;
        customer.customerId = data.customerId;
        this.progress = true;
        this.customerService.editCustomer(customer).subscribe(result => {
          this.getCustomers();
          this.progress = false;
        }, error => {
          this.progress = false;
        })
      }
    });

  }
}
