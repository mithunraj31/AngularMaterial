import { Customer } from './../../models/Customer';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { UtilService } from 'src/app/services/UtilService';
import { AddCustomerConfirmationComponent } from '../add-customer-confirmation/add-customer-confirmation.component';

@Component({
  selector: 'app-edit-customer-dialog',
  templateUrl: './edit-customer-dialog.component.html',
  styleUrls: ['./edit-customer-dialog.component.scss']
})
export class EditCustomerDialogComponent implements OnInit {

  customerForm: FormGroup;
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<EditCustomerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Customer,
    public util: UtilService
  ) { }

  ngOnInit() {
    this.initializeCustomerForm();
  }

  initializeCustomerForm() {
    this.customerForm = new FormGroup({
      "customerName": new FormControl(this.data.customerName, [
        Validators.required,
        Validators.pattern("^[a-zA-z0-9一-龠ぁ-ゔァ-ヴー!-/:-@\[-`{-~ 　]*$")
      ]),
      "zip": new FormControl(this.data.zip, [
        Validators.maxLength(8),
        Validators.pattern(/^[0-9\-]*$/)
      ]),
      "address": new FormControl(this.data.address, [
        Validators.pattern("^[a-zA-z0-9一-龠ぁ-ゔァ-ヴー!-/:-@\[-`{-~ 　]*$")
        // Validators.pattern("/[一-龠]+|[ぁ-ゔ]+|[ァ-ヴー]+|[a-zA-Z0-9]+/g")
      ]),
      "tel": new FormControl(this.data.tel, [
        Validators.pattern(/^(\(?\+?[0-9]*\)?)?[0-9_\-\(\)]*$/)
      ]),
      "contactName": new FormControl(this.data.contactName, [
        Validators.required,
        Validators.pattern("^[a-zA-z0-9一-龠ぁ-ゔァ-ヴー!-/:-@\[-`{-~ 　]*$")
      ]),
      "type": new FormControl(this.data.type, [
        Validators.required
      ]),

    })
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  onCancelClick(): void {
    this.dialogRef.close(null);
  }
  onSubmit() {
    if (this.customerForm.valid) {
      // open confimation dialog
      const confirmDialogRef = this.dialog.open(AddCustomerConfirmationComponent, {
        width: '600px',
        data: this.customerForm.value,
        disableClose: true
      });
      confirmDialogRef.afterClosed().subscribe(result => {
        // console.log('The dialog was closed');
        switch (result) {
          case 0:
            this.onCancelClick();
            break;
          case 1:
            this.dialogRef.close(this.customerForm.value);
            this.data = null;
            break;
          default:
            break;
        }
      });
    }
  }
  getErrorMessage(attribute: string) {
    return this.customerForm.get(attribute).hasError('required') ? 'You must enter a value' : '';
    // switch (attribute) {
    //   case "name":
    //       return this.productForm.get(attribute).hasError('required') ? 'You must enter a value':'' ;
    //     break;

    //   default:
    //     break;
    // }
  }
  validateZip(event): boolean {
    let result = false;
    const charCode = (event.which) ? event.which : event.keyCode;

    if (charCode === 45 || (charCode > 47 && charCode < 58)) {
      result = true;
    }
    return result;
  }
  hankana2Zenkana(str, key) {
    console.log(str, key);
    let trnslated = this.util.hankaku2ZenkakuEN(this.util.hankana2Zenkana(str));
    this.customerForm.controls[key].setValue(trnslated);
  }

}
