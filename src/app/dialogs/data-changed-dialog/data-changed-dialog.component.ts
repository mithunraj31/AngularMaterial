import { EditReason } from './../../models/EditReason';
import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ArrivalOrderDialogComponent } from '../arrival-order-dialog/arrival-order-dialog.component';

@Component({
  selector: 'app-data-changed-dialog',
  templateUrl: './data-changed-dialog.component.html',
  styleUrls: ['./data-changed-dialog.component.scss']
})
export class DataChangedDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ArrivalOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditReason,
    @Inject(LOCALE_ID) private localeId: string) { }

  ngOnInit() {
  }

  getEditReason() {
    if (this.localeId == "en") {
      return this.getEditReasonEnglish();
    } else if (this.localeId == "ja") {
      return this.getEditReasonJapanese();
    } else {
      return this.getEditReasonEnglish();
    }
  }
  getEditReasonEnglish() {
    switch (this.data.editReason) {
      case EditReasons.FulfilledToConfirmed:
        return "Transfired Fulfilled to Confirmed."
        break;
      case EditReasons.ConfirmedToFulfilled:
        return "Transfired Confirmed to Fulfilled."
        break;
      case EditReasons.ConfirmedToForcast:
        return "Transfired Confirmed to Forcast."
        break;
      case EditReasons.ForcastToConfirmed:
        return "Transfired Forcast to Confirmed."
        break;
      case EditReasons.IncomingArrivedToConfirmed:
        return "Transfired Arrived to Confirmed."
        break;
      case EditReasons.IncomingConfirmedToArrived:
        return "Transfired Confirmed to Arrived."
        break;
      case EditReasons.IncomingConfirmedToNotConfirm:
        return "Transfired Confirmed to Not Confirmed."
        break;
      case EditReasons.IncomingNotConfirmedToConfirmed:
        return "Transfired Not Confirmed to Confirmed."
        break;
      case EditReasons.Deleted:
        return "Deleted."
        break;
      default:
        return "Edited"
        break;
    }
  }
  getEditReasonJapanese() {
    switch (this.data.editReason) {
      case EditReasons.FulfilledToConfirmed:
        return "出荷済み→未出荷"
        break;
      case EditReasons.ConfirmedToFulfilled:
        return "未出荷→出荷済み"
        break;
      case EditReasons.ConfirmedToForcast:
        return "確定注文→フォーキャスト"
        break;
      case EditReasons.ForcastToConfirmed:
        return "フォーキャスト→確定注文"
        break;
      case EditReasons.IncomingArrivedToConfirmed:
        return "入荷済み→未入荷"
        break;
      case EditReasons.IncomingConfirmedToArrived:
        return "未入荷→入荷済み"
        break;
      case EditReasons.IncomingConfirmedToNotConfirm:
        return "確定納期→希望納期"
        break;
      case EditReasons.IncomingNotConfirmedToConfirmed:
        return "希望納期→確定納期"
        break;
      case EditReasons.Deleted:
        return "データは削除されました"
        break;
      default:
        return "編集されました"
        break;
    }
  }
}

enum EditReasons {
  Deleted = "1",
  ForcastToConfirmed = "2",
  ConfirmedToForcast = "3",
  ConfirmedToFulfilled = "4",
  FulfilledToConfirmed = "5",
  IncomingNotConfirmedToConfirmed = "6",
  IncomingConfirmedToNotConfirm = "7",
  IncomingConfirmedToArrived = "8",
  IncomingArrivedToConfirmed = "9",
  Edited = "10"
}