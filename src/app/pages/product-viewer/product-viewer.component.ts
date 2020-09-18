import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ProductService } from 'src/app/services/ProductService';
import { ProductSet } from 'src/app/models/ProductSet';
import { findIndex, find } from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { SchedulePattern } from 'src/app/models/SchedulePattern';
import { DeleteConfirmationDialogComponent } from '../../dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';


@Component({
  selector: 'app-product-viewer',
  templateUrl: './product-viewer.component.html',
  styleUrls: ['./product-viewer.component.scss']
})
export class ProductViewerComponent implements OnInit {

  /**
   * product set listings include product items
   */
  productSets: ProductSet[];

  /**
   * Viewer name the value binding with textbox in html
   */
  viewerName: string;

  /**
   * Fact for describe the viewer is private or not,
   * the value binding with check in html
   */
  isOnlyMe: boolean = false;

  /**
   * Use for render saved viewer data or router history from schedule pages.
   */
  preview: any[] = [];

  /**
   * Schedule pattern ID, Obtained data from route params.
   */
  patternId: number;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBarService: MatSnackBar,
    public dialog: MatDialog) {
      // get preview data from query string
      //  the data will receive when user clicked back button from any schedule page.
      this.route.queryParams.subscribe(queryStr => {
        this.preview = [];
        if (queryStr['preview']) {
          // query string format is string should parse to json before use
          this.preview = JSON.parse(queryStr['preview']);
        }
      });
  }

  ngOnInit() {
    // get pattern ID from route params
    this.route.params.subscribe(params => {
      // if ID is existings, get saved schedule patterm from API
      if (params['id']) {
        this.patternId = params['id'];

        this.productService.getSchedulePatternById(this.patternId)
          .subscribe(x => {
            this.viewerName = x.schedulePatternName;
            this.preview = JSON.parse(x.pattern);
            this.isOnlyMe = x.isPrivate;
            this.generateViewer();
          }, () => this.router.navigate(['/404']));

      } else {
        this.generateViewer();
      }
    });
  }

  /**
   * the method will generate Product set listings view
   * and re order according saved pattern if it exists.
   */
  generateViewer() {
    this.productService.getProductSets(true).subscribe((productSets: ProductSet[]) => {
      this.productSets = [];

      // set default ID, name, description to individual product set
      const individualIndex = findIndex(productSets, { productId: 0});
      productSets[individualIndex].productName = 'Individual Product set';
      productSets[individualIndex].description = 'Individual Product set';

      // if no preview data, will skip re order statement.
      if (!this.preview || this.preview.length == 0) {
        this.productSets = productSets;
        return;
      }

      // produce data according saved/preview pattern.
      this.preview.forEach(ex => {
        // find product set with saved/preview pattern's product set ID
        const productSet = find(productSets, p => p.productId == ex.id);
        if (productSet) {
          const products = [];
          // if contains products will re order product according existings data.
          if (ex.items && ex.items.length > 0) {
            ex.items.forEach(i => {
              const product = find(productSet.products, p => p.product.productId == i);
              if (product) {
                products.push(product);
              }
            });

            // if non order product or newest product will push last of ordered product.
            productSet.products
              .filter(x => !ex.items.includes(x.product.productId))
              .forEach(x => products.push(x));

          }
          else {
            // push all product to product set.
            productSet.products
              .forEach(x => products.push(x));
          }

          productSet.products = products;
          productSet.display = true;
          this.productSets.push(productSet)
        }
      });

      // if the obtained saved/preview pattern.
      // set non display to product set id is not contans in saved/preview pattern ids.
      productSets
       .filter(x => !this.preview.map(ex => ex.id).includes(x.productId))
        .map(x => {
          x.display = false;
          return x;
        })
        .forEach(x => this.productSets.push(x));
    });
  }

  /**
   * active when user droped product set listing item.
   * https://material.angular.io/cdk/drag-drop/overview
   * @param event drop Event object
   */
  dropProductSet(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.productSets, event.previousIndex, event.currentIndex);
  }


  /**
   * active when user droped product listing item in a product set.
   * https://material.angular.io/cdk/drag-drop/overview
   * @param productId product set ID
   * @param event drop Event object
   */
  dropProduct(productId: number, event: CdkDragDrop<string[]>) {
    // find index of droped item's product set ID
    const productSetIndex = findIndex(this.productSets, { productId });
    moveItemInArray(this.productSets[productSetIndex].products, event.previousIndex, event.currentIndex);
  }

  /**
   * When user clicked eye or block icon in Product set listings.
   * the method will update the Product Set's "display" property is visible in schedule page or not.
   * @param productId Product set ID
   * @param isDisplay Fact the product set is visible
   * @param $event drop Event object https://material.angular.io/cdk/drag-drop/overview
   */
  onDisableDisplayProductSet(productId: number, isDisplay: boolean, $event) {
    // cacel clickable event on Angualr Material's CDK drag and drop component
    $event.stopPropagation();
    const productSetIndex = findIndex(this.productSets, { productId });
    this.productSets[productSetIndex].display = isDisplay;
  }

  /**
   * When user clicked "Preview" button.
   * the method shall send last updated listings data to schedule page
   * via query string.
   */
  onPreviewClicked() {
    const preview = this.getViewerData();

      this.router.navigate(['/delivery-schedule'], {
        queryParams: {
          preview: JSON.stringify(preview)
        },
        queryParamsHandling: 'merge',
      });
  }

  /**
   * update visible/invisible all listings.
   * @param isDisplay Fact the listing is visible or invisible in schedule page.
   */
  onEnableAllProductSet(isDisplay: boolean) {
    this.productSets =  this.productSets.map(x => {
      x.display = isDisplay;
      return x;
    });
  }


  /**
   * the method shall produce last updated listings data and send save/update to API
   */
  onSaveClicked() {
    // Not allow below statement if no displayed listings.
    if (this.productSets.every (x => !x.display)) {
      this.snackBarService.open('Should display product set at least 1 set.', 'close', { duration: 5000})
    }

    let subscriber = null;

    // on edit mode will check pattern id first, if existing shall update the data.
    if (this.patternId > 0) {
      subscriber = this.productService.updateSchedulePattern(<SchedulePattern>{
        schedulePatternId: this.patternId,
        schedulePatternName: this.viewerName,
        pattern: JSON.stringify(this.getViewerData()),
        isPrivate: this.isOnlyMe
      });
    } else {
      subscriber = this.productService.saveSchedulePattern(<SchedulePattern>{
        schedulePatternName: this.viewerName,
        pattern: JSON.stringify(this.getViewerData()),
        isPrivate: this.isOnlyMe
      });
    }

    subscriber.subscribe(() => {
      this.snackBarService.open('Viewer is saved', 'close', { duration: 2000});
      setTimeout(() => {
        this.router.navigate(['/delivery-schedule']);
      }, 2000);
    }, () => {
      this.snackBarService.open('Somethings went wrong.', 'close', { duration: 5000})
    });
  }

  /**
   * When user clicked "Delete" button will display confirm dialog,
   * if user confirm the method shall send deleting viewer ID to API
   */
  onDeleteClicked() {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '600px',
      data: this.viewerName
    });

    // on delete confirmation dialog closed
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.deleteSchedulePatternById(this.patternId)
          .subscribe(() => {
            this.snackBarService.open('Viewer is deleted', 'close', { duration: 2000});
            setTimeout(() => {
              this.router.navigate(['/product-viewer']);
            }, 2000);

          },
          () => this.snackBarService.open('Somethings went wrong.', 'close', { duration: 5000}));
      }
    });
  }

  /**
   * produce Product set data to schedule pattern format.
   */
  private getViewerData() {
    return this.productSets
    .filter(x => x.display)
    .map(x => {
      return {
        id: x.productId,
        items: x.products.map(i => i.product.productId)
      };
    });
  }
}

