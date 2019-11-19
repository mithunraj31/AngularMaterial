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
  customers: Customer[] = [];
  dataSource = new MatTableDataSource<Customer>();
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    public dialog: MatDialog,
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.customerService.getCustomers().subscribe(result => {
      this.customers = result;
      this.dataSource.data = this.customers;
      this.dataSource.paginator = this.paginator;

      console.log(result);
    })
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
        const customer: Customer = result;
        // change concat to replace when using real api
        this.customers.push(customer);
        this.dataSource.data = this.customers;
      }
    });
  }

  deleteCustomer(i: any) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '600px',
      data: this.customers[this.customers.indexOf(i)].contactName
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        console.log(this.customers.indexOf(i));
      this.customers.splice(this.customers.indexOf(i),1);
      this.dataSource.data = this.customers;
      }
    });
    
  }
  editCustomer(i: Customer) {
    const dialogRef = this.dialog.open(EditCustomerDialogComponent, {
      width: '600px',
      data: this.customers[this.customers.indexOf(i)]
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        const customer: Customer = result;
        // change concat to replace when using real api
        this.customers[this.customers.indexOf(i)] = customer;
        this.dataSource.data = this.customers;
      }
    });

  }
}
