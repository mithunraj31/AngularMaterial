import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatTableDataSource, MatTable, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { IncomingShipment } from 'src/app/models/IncomingShipment';
import { IncomingShipmentService } from 'src/app/services/IncomingShipmentService';
import { UtilService } from 'src/app/services/UtilService';
import { EditIncomingShipmentComponent } from 'src/app/dialogs/edit-incoming-shipment/edit-incoming-shipment.component';
import { DeleteConfirmationDialogComponent } from 'src/app/dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { AddIncomingShipmentComponent } from 'src/app/dialogs/add-incoming-shipment/add-incoming-shipment.component';
import { ArrivalOrderDialogComponent } from 'src/app/dialogs/arrival-order-dialog/arrival-order-dialog.component';
import { ConfirmIncomingShipmentComponent } from 'src/app/dialogs/confirm-incoming-shipment/confirm-incoming-shipment.component';
import { SaveIncomingShipment } from 'src/app/models/SaveIncomingShipment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-arrived-shipments',
  templateUrl: './arrived-shipments.component.html',
  styleUrls: ['./arrived-shipments.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ]),]
})
export class ArrivedShipmentsComponent implements OnInit {

  columnsToDisplay: string[] = [
    'shipmentNo',
    'branch',
    'vendor',
    'productName',
    'orderDate',
    'quantity',
    'pendingQty',
    'desiredDeliveryDate',
    'confirmedQty',
    'fixedDeliveryDate',
    'user',
    // 'actions'
  ];
  id;
  searchSub;
  progress = false;
  dataSource = new MatTableDataSource<IncomingShipment>();
  shipments: IncomingShipment[] = [];
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild('paginatorTop', { static: true }) paginatorTop: MatPaginator;
  @ViewChild('paginatorBottom', { static: true }) paginatorBottom: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  expandedElement: IncomingShipment | null;
  constructor(
    private shipmentService: IncomingShipmentService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public util: UtilService) { }

  ngOnInit() {
    this.getShipments();
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'user': return item.user.firstName;
        case 'productName': return item.product.productName;
        default: return item[property];
      }
    };
    this.dataSource.sort = this.sort;

    this.dataSource.filterPredicate = (data, filter: string) => {
      const dataStr = JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) !== -1;
    };
    this.searchSub = this.route.params.subscribe(params => {
      if (params.id && params.id != 'arrived') {
        this.id = params.id;

        this.applyFilter(this.id);
      }
    });
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


  getShipments() {
    this.progress = true;
    this.shipmentService.getArrivedShipments().subscribe(result => {
      this.shipments = result;
      this.dataSource.data = this.shipments;
      this.dataSource.paginator = this.paginatorTop;
      // console.log(result);
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
    // console.log(element);

    dialogRef.afterClosed().subscribe(result => {

      // console.log(result);
      if (result) {
        this.progress = true;
        this.shipmentService.editShipment(result).subscribe(result => {
          this.getShipments();
        }, error => {
          // console.log(error);
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
          // console.log(error);
        });
      }
    });

  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddIncomingShipmentComponent, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {


      if (result) {

        this.progress = true;

        this.shipmentService.addShipment(result).subscribe(resultShipment => {
          this.getShipments();

        }, error => {
          this.progress = false;

        });
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
  confirmOrder(shipment: IncomingShipment) {
    const dialogRef = this.dialog.open(ConfirmIncomingShipmentComponent, {
      width: '600px',
      data: shipment
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        // console.log(result);
        const results: SaveIncomingShipment[] = result;
        this.progress = true;
        if (results[0]) {
          this.shipmentService.addShipment([results[0]]).subscribe(result => {
            this.shipmentService.addShipment([results[1]]).subscribe(() => {
              this.getShipments();

            })
          }, error => {
            this.progress = false;
          })

        } else {
          this.shipmentService.addShipment([results[1]]).subscribe(result => {
            this.getShipments();
          }, error => {
            // console.log(error);
            this.progress = false;
          })
        }
      }
    });
  }

  isDeletable(shipment: IncomingShipment) {
    let can = false;
    // if it partial order
    if (shipment.partial) {
      const main = this.findMain(shipment.shipmentNo, shipment.product.productId, shipment.branch);
      if (!main.fixed) {
        can = true;
      }
      if (shipment.arrived) {
        can = false;
      }

    } else { // if it is main order
      const partials = this.findPatials(shipment.shipmentNo, shipment.product.productId, shipment.branch);
      let partialNotInStock = false;
      let partialArrived = false;
      partials.forEach(partial => {
        if (partial.arrived) {
          partialArrived = true;
        } else {
          partialNotInStock = true;
        }
      });
      // if main is not confirmed or confirmed but not arrived
      if (!shipment.arrived) {
        if ((!partialArrived && !partialNotInStock) || (partialNotInStock && !partialArrived)) {
          can = true;
        }
      } else { // arrieved main order
        if ((!partialArrived && !partialNotInStock) || (!partialNotInStock && partialArrived)) {
          can = true;
        }
      }
    }
    // console.log(shipment)
    return !can;
  }
  findMain(shipmentNo: string, productId: number, branch: string): IncomingShipment {
    const found = this.shipments.filter(option =>
      option.shipmentNo === shipmentNo && option.product.productId === productId && option.branch === branch && !option.partial);
    return found[0];
  }
  findPatials(shipmentNo: string, productId: number, branch: string): IncomingShipment[] {
    const found = this.shipments.filter(option =>
      option.shipmentNo === shipmentNo && option.product.productId === productId && option.branch === branch && option.partial);
    return found;
  }

}
