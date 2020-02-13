import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddProductDialogComponent } from '../add-product-dialog/add-product-dialog.component';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss']
})
export class AddUserDialogComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      "firstName": new FormControl("",[
        Validators.required
      ]),
      "lastName": new FormControl("",[
        Validators.required
      ]),
      "email": new FormControl("",[
        Validators.required
      ]),
      "password": new FormControl("",[
        Validators.required
      ]),
      "role": new FormControl("2",[
        Validators.required
      ])
    })
  }
  onCancelClick(): void {
    this.dialogRef.close(null);
  }
  onSubmit(){
    if(this.userForm.valid){
      this.dialogRef.close(this.userForm.value);
    }
  }

}
