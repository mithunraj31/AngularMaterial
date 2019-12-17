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
  progress=true;
  dataSource = new MatTableDataSource<IncomingShipment>();
  shipments: IncomingShipment[] = [];
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  expandedElement: IncomingShipment | null;
  constructor(private shipmentService: IncomingShipmentService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getShipments();
  }

  getShipments() {
    this.shipmentService.getShipments().subscribe(result => {
      this.shipments = result;
      this.dataSource.data = this.shipments;
      this.dataSource.paginator = this.paginator;
      console.log(result);
    })
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editShipment(element){
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
          this.progress = false;
        }, error => {
          console.log(error);
          this.progress = false;
        })
      }
    });
  }

  deleteShipment(element){
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
          this.progress = false;

        }, error => {
          this.progress = true;
          console.log(error);
        })
      }
    });

  }
  openDialog(): void{
    const dialogRef = this.dialog.open(AddIncomingShipmentComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {

      console.log(result);
      if (result) {
        this.progress = true;
        this.shipmentService.addShipment(result).subscribe(result => {
          this.getShipments();
          this.progress = false;
        }, error => {
          console.log(error);
          this.progress = false;
        })
      }
    });
  }

}
