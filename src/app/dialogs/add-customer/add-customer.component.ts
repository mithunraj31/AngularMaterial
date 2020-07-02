import { UtilService } from './../../services/UtilService';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Customer } from 'src/app/models/Customer';
import { AddCustomerConfirmationComponent } from '../add-customer-confirmation/add-customer-confirmation.component';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {

  customerForm: FormGroup;
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public util: UtilService
  ) { }

  ngOnInit() {
    this.initializeCustomerForm();
  }

  initializeCustomerForm() {
    this.customerForm = new FormGroup({
      'customerName': new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-z0-9一-龠ぁ-ゔァ-ヴー!-/:-@\[-`{-~ 　]*$')
      ]),
      'zip': new FormControl('', [
        Validators.maxLength(8),
        Validators.pattern(/^[0-9\-]*$/)
      ]),
      'address': new FormControl('', [
        Validators.pattern('^[a-zA-z0-9一-龠ぁ-ゔァ-ヴー!-/:-@\[-`{-~ 　]*$')
        // Validators.pattern("/[一-龠]+|[ぁ-ゔ]+|[ァ-ヴー]+|[a-zA-Z0-9]+/g")
      ]),
      'tel': new FormControl('', [
        Validators.pattern(/^(\(?\+?[0-9]*\)?)?[0-9_\-\(\)]*$/)
      ]),
      'contactName': new FormControl('', [
        Validators.pattern('^[a-zA-z0-9一-龠ぁ-ゔァ-ヴー!-/:-@\[-`{-~ 　]*$')
      ]),
      'type': new FormControl('', [
        Validators.required
      ]),

    });
  }

  numberOnly(event): boolean {
    let result = false;
    const charCode = (event.which) ? event.which : event.keyCode;
    // if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    //   result = false;
    // }
    if (charCode === 43 || charCode === 45 || (charCode > 47 && charCode < 58)) {
      result = true;
    }
    return result;

  }
  validateZip(event): boolean {
    let result = false;
    const charCode = (event.which) ? event.which : event.keyCode;

    if (charCode === 45 || (charCode > 47 && charCode < 58)) {
      result = true;
    }
    return result;
  }

  onCancelClick(): void {
    this.dialogRef.close(null);
  }
  getErrorMessage(attribute: string) {
    // return this.customerForm.get(attribute).hasError('required') ? 'You must enter a value':'' ;
    switch (attribute) {
      case 'zip':
        return this.customerForm.get(attribute).hasError('required') ? 'You must enter a value' :
          this.customerForm.get(attribute).hasError('maxlength') ? 'zip code length must be 7' :
            this.customerForm.get(attribute).hasError('minlength') ? 'zip code length must be 7' : '';
        break;

      default:
        return this.customerForm.get(attribute).hasError('required') ? 'You must enter a value' : '';
        break;
    }
  }

  hankana2Zenkana(str, key) {
    const trnslated = this.util.hankaku2ZenkakuEN(this.util.hankana2Zenkana(str));
    this.customerForm.controls[key].setValue(trnslated);
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
        switch (result) {
          case 0:
            this.onCancelClick();
            break;
          case 1:
            this.dialogRef.close(this.customerForm.value);
            break;
          default:
            break;
        }
      });
    }
  }

}
