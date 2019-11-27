import { IncomingShipmentService } from './../../../services/IncomingShipmentService';

import { MatTableDataSource, MatTable, MatPaginator, MatDialog } from '@angular/material';
import { IncomingShipment } from './../../../models/IncomingShipment';
import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

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
    this.shipmentService.getshipments().subscribe(result => {
      this.shipments = result;
      this.dataSource.data = this.shipments;
      this.dataSource.paginator = this.paginator;
    })
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editShipment(element){

  }
  deleteShipment(element){

  }
  openDialog(): void{
    
  }

}
