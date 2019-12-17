import { EditOutgoingShipmentComponent } from './../../../dialogs/edit-outgoing-shipment/edit-outgoing-shipment.component';
import { AddOutgoingShipmentComponent } from './../../../dialogs/add-outgoing-shipment/add-outgoing-shipment.component';
import { OutgoingShipment } from './../../../models/OutgoingShipment';
import { OutgoingShipmentService } from './../../../services/OutgoingShipmentService';
import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { DeleteConfirmationDialogComponent } from 'src/app/dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { MatTableDataSource, MatTable, MatPaginator, MatDialog } from '@angular/material';

@Component({
  selector: 'app-outgoing-shipments',
  templateUrl: './outgoing-shipments.component.html',
  styleUrls: ['./outgoing-shipments.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),]
})
export class OutgoingShipmentsComponent implements OnInit {
  columnsToDisplay: string[] = [
    'shipmentNo',
    'shipmentDate',
    'salesDestination',
    'user',
    'actions'
  ];
  progress=true;
  dataSource = new MatTableDataSource<OutgoingShipment>();
  shipments: OutgoingShipment[] = [];
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  expandedElement: OutgoingShipment | null;
  constructor(private shipmentService: OutgoingShipmentService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getShipments();
  }

  getShipments() {
    this.shipmentService.getShipments().subscribe(result => {
      this.shipments = result;
      this.dataSource.data = this.shipments;
      this.dataSource.paginator = this.paginator;
      console.log("result");
      console.log(result);
    })
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editShipment(element){
    const dialogRef = this.dialog.open(EditOutgoingShipmentComponent, {
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
        this.shipmentService.deleteShipment(data.outgoingShipmentId).subscribe(result => {
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
    const dialogRef = this.dialog.open(AddOutgoingShipmentComponent, {
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
