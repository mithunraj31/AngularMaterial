import { UtilService } from './../../../services/UtilService';
import { ArrivalOrderDialogComponent } from './../../../dialogs/arrival-order-dialog/arrival-order-dialog.component';
import { EditIncomingShipmentComponent } from './../../../dialogs/edit-incoming-shipment/edit-incoming-shipment.component';
import { AddIncomingShipmentComponent } from './../../../dialogs/add-incoming-shipment/add-incoming-shipment.component';
import { IncomingShipmentService } from './../../../services/IncomingShipmentService';

import { MatTableDataSource, MatTable, MatPaginator, MatDialog } from '@angular/material';
import { IncomingShipment } from './../../../models/IncomingShipment';
import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { DeleteConfirmationDialogComponent } from 'src/app/dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
  selector: 'app-incoming-shipments',
  templateUrl: './incoming-shipments.component.html',
  styleUrls: ['./incoming-shipments.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),]
})
export class IncomingShipmentsComponent implements OnInit {
  columnsToDisplay: string[] = [
    'shipmentNo',
    'arrivalDate',
    'user',
    'actions'
  ];
  progress = false;
  dataSource = new MatTableDataSource<IncomingShipment>();
  shipments: IncomingShipment[] = [];
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild('paginatorTop', { static: true }) paginatorTop: MatPaginator;
  @ViewChild('paginatorBottom', { static: true }) paginatorBottom: MatPaginator;
  expandedElement: IncomingShipment | null;
  constructor(
    private shipmentService: IncomingShipmentService,
    public dialog: MatDialog,
    public util: UtilService) { }

  ngOnInit() {
    this.getShipments();
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


  getShipments() {
    this.progress = true;
    this.shipmentService.getShipments().subscribe(result => {
      this.shipments = result;
      this.dataSource.data = this.shipments;
      this.dataSource.paginator = this.paginatorTop;
      console.log(result);
      this.onTopPaginateChange();
      this.progress = false;
    }, error => {
      this.progress = false;
    })
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editShipment(element) {
    const dialogRef = this.dialog.open(EditIncomingShipmentComponent, {
      width: '600px',
      data: element
    });
    console.log(element);

    dialogRef.afterClosed().subscribe(result => {

      console.log(result);
      if (result) {
        this.progress = true;
        this.shipmentService.editShipment(result).subscribe(result => {
          this.getShipments();
        }, error => {
          console.log(error);
          this.progress = false;
        })
      }
    });
  }

  deleteShipment(element) {
    const data = this.shipments[this.shipments.indexOf(element)];
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '600px',
      data: data.shipmentNo
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.progress = true;
        this.shipmentService.deleteShipment(data.incomingShipmentId).subscribe(result => {
          this.getShipments();

        }, error => {
          this.progress = true;
          console.log(error);
        })
      }
    });

  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddIncomingShipmentComponent, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {

      console.log(result);
      if (result) {
        this.progress = true;
        this.shipmentService.addShipment(result).subscribe(result => {
          this.getShipments();
        }, error => {
          console.log(error);
          this.progress = false;
        })
      }
    });
  }
  fullFillArrival(data: IncomingShipment) {
    const dialogRef = this.dialog.open(ArrivalOrderDialogComponent, {
      width: '600px',
      data: data.shipmentNo
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.progress = true;
        this.shipmentService.arrivalOrder(data.incomingShipmentId).subscribe(result => {
          this.getShipments();
        }, error => {
          this.progress = false;
        })
      }
    });
  }

}
